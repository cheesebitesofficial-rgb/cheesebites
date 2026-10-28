import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Order, OrderStatus, OrderType, CartItem } from '../types';
import { supabaseApi } from '../lib/supabase';

interface CreateOrderData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  orderNotes?: string;
  orderType: OrderType;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (data: CreateOrderData) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  deleteAllOrders: () => void;
  togglePaymentStatus: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  refreshOrderFromSupabase: (orderIdOrNumber: string) => Promise<Order | undefined>;
}

const LOCAL_STORAGE_KEY = 'cheese_bites_orders_v1';

// Pre-seeded initial demo orders
const SAMPLE_INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-84920',
    orderNumber: 'CB-84920',
    customerName: 'Ahmed Malik',
    customerPhone: '0300-5551234',
    deliveryAddress: 'House 42, Street 12, F-8/3, Islamabad',
    orderNotes: 'Please add extra garlic sauce sachets!',
    orderType: 'Delivery',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        cartItemId: 'p-15-Large-default',
        itemId: 'p-15',
        name: 'Cheese Bites Special Pizza',
        category: 'Pizza',
        price: 1500,
        quantity: 1,
        selectedSize: 'Large',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      },
    ],
    subtotal: 1500,
    deliveryFee: 0,
    total: 1500,
    status: 'Preparing',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedDeliveryMinutes: 35,
  },
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_INITIAL_ORDERS;
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
      return SAMPLE_INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Real-time Order Sync across tabs using BroadcastChannel & window storage events
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('cb_orders_sync');
        channel.onmessage = (event) => {
          if (event.data?.type === 'STATUS_UPDATE') {
            const { orderId, orderNumber, status } = event.data;
            setOrders(prev => {
              const copy = [...prev];
              const targetId = String(orderId || orderNumber || '');
              const numOnly = targetId.replace(/[^0-9]/g, '');
              const idx = copy.findIndex(o => {
                const oId = String(o.id || '');
                const oNum = String(o.orderNumber || '');
                return oId === targetId || oNum === targetId || (numOnly && (oId.includes(numOnly) || oNum.includes(numOnly)));
              });
              if (idx > -1 && copy[idx].status !== status) {
                copy[idx] = { ...copy[idx], status };
                try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy)); } catch(e){}
                return copy;
              }
              return prev;
            });
          } else if (event.data?.type === 'NEW_ORDER' || event.data?.type === 'UPDATE_ORDERS') {
            try {
              const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
              if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) setOrders(parsed);
              }
            } catch (err) {
              console.error(err);
            }
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not supported:', e);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setOrders(parsed);
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (channel) channel.close();
    };
  }, []);

  // Real-time Cloud Relay Sync between Website and Electron POS via ntfy.sh
  useEffect(() => {
    const syncRealtimeCloud = async () => {
      let cloudOrders: Order[] = [];
      let statusUpdates: any[] = [];

      // 1. Fetch live orders sent to cloud channel
      try {
        const res = await fetch('https://ntfy.sh/cheesebites_orders_v2/json?poll=1&since=24h');
        if (res.ok) {
          const text = await res.text();
          const lines = text.trim().split('\n').filter(Boolean);
          cloudOrders = lines.map(line => {
            try {
              const msg = JSON.parse(line);
              return typeof msg.message === 'string' ? JSON.parse(msg.message) : msg.message;
            } catch(e) { return null; }
          }).filter(o => o && (o.id || o.orderNumber));
        }
      } catch(e) { console.warn('Orders poll error:', e); }

      // 2. Fetch live status updates sent from POS
      try {
        const res = await fetch('https://ntfy.sh/cheesebites_status_v2/json?poll=1&since=24h');
        if (res.ok) {
          const text = await res.text();
          const lines = text.trim().split('\n').filter(Boolean);
          statusUpdates = lines.map(line => {
            try {
              const msg = JSON.parse(line);
              const data = typeof msg.message === 'string' ? JSON.parse(msg.message) : msg.message;
              return { ...data, _timestamp: msg.time || 0 };
            } catch(e) { return null; }
          }).filter(Boolean);
        }
      } catch(e) { console.warn('Status poll error:', e); }

      // 3. Update orders state & localStorage
      if (cloudOrders.length > 0 || statusUpdates.length > 0) {
        setOrders(prev => {
          const combinedMap = new Map<string, Order>();
          prev.forEach(o => combinedMap.set(String(o.orderNumber || o.id), o));
          cloudOrders.forEach(o => {
            const key = String(o.orderNumber || o.id);
            if (!combinedMap.has(key)) {
              combinedMap.set(key, o);
            }
          });

          const mergedList = Array.from(combinedMap.values());
          let changed = false;

          const latestStatusMap = new Map<string, any>();
          statusUpdates.forEach(upd => {
            if (!upd || !upd.status) return;
            const targetId = String(upd.orderId || upd.orderNumber || upd.id || '');
            const numOnly = targetId.replace(/[^0-9]/g, '');
            const key = numOnly || targetId;
            const existing = latestStatusMap.get(key);
            if (!existing || upd._timestamp >= existing._timestamp) {
              latestStatusMap.set(key, upd);
            }
          });

          latestStatusMap.forEach(upd => {
            const targetId = String(upd.orderId || upd.orderNumber || upd.id || '');
            const numOnly = targetId.replace(/[^0-9]/g, '');
            const targetStatus = upd.status;

            const idx = mergedList.findIndex(o => {
              const oId = String(o.id || '');
              const oNum = String(o.orderNumber || '');
              return oId === targetId || oNum === targetId || (numOnly && (oId.includes(numOnly) || oNum.includes(numOnly)));
            });

            if (idx > -1 && mergedList[idx].status !== targetStatus) {
              mergedList[idx] = { ...mergedList[idx], status: targetStatus };
              changed = true;
            }
          });

          const finalList = mergedList.sort(
            (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          );

          if (changed || cloudOrders.length > 0) {
            try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalList)); } catch(e){}
          }
          return finalList;
        });
      }

      if (!supabaseApi.isConfigured()) return;
      const res = await supabaseApi.fetchAllOrders();
      if (res.success && res.orders) {
        const fetchedOrders: Order[] = res.orders.map((o: any) => {
          const parsedItems: CartItem[] = typeof o.items_json === 'string'
            ? JSON.parse(o.items_json)
            : (o.items_json || []);

          return {
            id: o.id || o.order_number || o.orderNumber,
            orderNumber: o.order_number || o.orderNumber,
            customerName: o.customer_name || o.customerName || 'Online Customer',
            customerPhone: o.customer_phone || o.customerPhone || '0300-0000000',
            deliveryAddress: o.delivery_address || o.deliveryAddress || 'Address Provided Online',
            orderNotes: o.order_notes || o.orderNotes || '',
            orderType: (o.order_type || o.orderType || 'Delivery') as OrderType,
            paymentMethod: o.payment_method || o.paymentMethod || 'Cash on Delivery',
            items: parsedItems,
            subtotal: Number(o.subtotal || 0),
            deliveryFee: Number(o.delivery_fee || o.deliveryFee || 0),
            total: Number(o.total || 0),
            status: (o.status || 'Pending') as OrderStatus,
            createdAt: o.created_at || o.createdAt || new Date().toISOString(),
            estimatedDeliveryMinutes: o.estimated_delivery_minutes || o.estimatedDeliveryMinutes || 35,
          };
        });

        if (fetchedOrders.length > 0) {
          setOrders(prev => {
            const combinedMap = new Map<string, Order>();
            prev.forEach(o => combinedMap.set(o.orderNumber, o));
            fetchedOrders.forEach(o => combinedMap.set(o.orderNumber, o));
            return Array.from(combinedMap.values()).sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
        }
      }
    };

    syncRealtimeCloud();
    const interval = setInterval(syncRealtimeCloud, 3000);

    // Instant SSE Listener for Status Updates
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('https://ntfy.sh/cheesebites_status_v2/sse');
      eventSource.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.event === 'message' && msg.message) {
            const upd = typeof msg.message === 'string' ? JSON.parse(msg.message) : msg.message;
            if (upd && upd.status) {
              setOrders(prev => {
                const targetId = String(upd.orderId || upd.orderNumber || upd.id || '');
                const numOnly = targetId.replace(/[^0-9]/g, '');
                const targetStatus = upd.status;
                const copy = [...prev];
                let changed = false;
                
                const idx = copy.findIndex(o => {
                  const oId = String(o.id || '');
                  const oNum = String(o.orderNumber || '');
                  return oId === targetId || oNum === targetId || (numOnly && (oId.includes(numOnly) || oNum.includes(numOnly)));
                });
                
                if (idx > -1 && copy[idx].status !== targetStatus) {
                  copy[idx] = { ...copy[idx], status: targetStatus };
                  changed = true;
                }
                
                if (changed) {
                  try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy)); } catch(err){}
                  return copy;
                }
                return prev;
              });
            }
          }
        } catch (err) {}
      };
    } catch(err) { console.warn('SSE Error:', err); }

    return () => {
      clearInterval(interval);
      if (eventSource) eventSource.close();
    };
  }, []);

  const createOrder = (data: CreateOrderData): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ord-${randomNum}`;
    const orderNumber = `CB-${randomNum}`;

    const formattedItems = data.items.map(item => ({
      ...item,
      name: item.name,
      category: item.category || 'Food Item',
      selectedSize: item.selectedSize || 'Standard',
      selected_size: item.selectedSize || 'Standard',
      quantity: item.quantity,
      price: item.price
    }));

    const newOrder: Order = {
      ...data,
      items: formattedItems,
      id: orderId,
      orderNumber,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      estimatedDeliveryMinutes: data.orderType === 'Delivery' ? 35 : 20,
    };

    // Save locally first for instant UI response
    setOrders(prev => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        if (typeof BroadcastChannel !== 'undefined') {
          const bc = new BroadcastChannel('cb_orders_sync');
          bc.postMessage({ type: 'NEW_ORDER', order: newOrder });
          bc.close();
        }
      } catch (e) {
        console.error(e);
      }

      // Sync to ntfy.sh Cloud Relay for Electron POS
      fetch('https://ntfy.sh/cheesebites_orders_v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      }).catch(console.warn);

      return updated;
    });

    // Direct POS Webhook forward (Local Cheese Bites POS App on 5050/8765 + Remote Endpoint)
    try {
      const posEndpoints = [
        'http://localhost:8765/api/online-order',
        'http://localhost:5050/api/online-order',
        typeof localStorage !== 'undefined' ? localStorage.getItem('cb_pos_endpoint') : null
      ].filter(Boolean) as string[];

      posEndpoints.forEach(endpoint => {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder),
        }).catch(err => console.warn('POS Webhook sync offline for', endpoint, err));
      });
    } catch (e) {
      console.warn('POS Webhook error:', e);
    }

    // Asynchronously submit order to Supabase shared database
    supabaseApi.createOnlineOrder({
      order_number: orderNumber,
      customer_name: data.customerName,
      customer_phone: data.customerPhone,
      delivery_address: data.deliveryAddress,
      order_notes: data.orderNotes,
      order_type: data.orderType,
      payment_method: data.paymentMethod === 'Online Payment' ? 'Online Payment' : 'Cash on Delivery',
      payment_status: 'Pending',
      subtotal: data.subtotal,
      delivery_fee: data.deliveryFee,
      discount: 0,
      total: data.total,
      status: 'Pending',
      estimated_delivery_minutes: data.orderType === 'Delivery' ? 35 : 20,
      items: data.items.map(item => ({
        item_id: item.itemId,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        selected_size: item.selectedSize,
        extra_toppings: item.extraToppings,
        contents: item.contents,
        image: item.image,
      })),
    }).catch(err => {
      console.warn('Network offline or Supabase connection pending:', err);
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => {
      const updated = prev.map(ord => (ord.id === orderId || ord.orderNumber === orderId ? { ...ord, status } : ord));
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        // Broadcast status update to POS via ntfy.sh
        fetch('https://ntfy.sh/cheesebites_status_v2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, status })
        }).catch(console.warn);
      } catch (e) {}
      return updated;
    });
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId && ord.orderNumber !== orderId));
  };

  const deleteAllOrders = () => {
    setOrders([]);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
  };

  const togglePaymentStatus = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          const currentMethod = ord.paymentMethod || 'Cash on Delivery';
          const newMethod = currentMethod.includes('Paid') ? 'Cash on Delivery' : 'Paid (Online/Cash)';
          return { ...ord, paymentMethod: newMethod };
        }
        return ord;
      })
    );
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(ord => ord.id === orderId || ord.orderNumber === orderId);
  };

  const refreshOrderFromSupabase = async (orderIdOrNumber: string): Promise<Order | undefined> => {
    const res = await supabaseApi.fetchOrderStatus(orderIdOrNumber);
    if (res.success && res.order) {
      const o = res.order;
      const parsedItems: CartItem[] = typeof o.items_json === 'string' 
        ? JSON.parse(o.items_json) 
        : (o.items_json || []);

      const updatedOrder: Order = {
        id: o.id || o.order_number || o.orderNumber,
        orderNumber: o.order_number || o.orderNumber,
        customerName: o.customer_name || o.customerName || 'Online Customer',
        customerPhone: o.customer_phone || o.customerPhone || '0300-0000000',
        deliveryAddress: o.delivery_address || o.deliveryAddress || 'Address Provided Online',
        orderNotes: o.order_notes || o.orderNotes || '',
        orderType: (o.order_type || o.orderType || 'Delivery') as OrderType,
        paymentMethod: o.payment_method || o.paymentMethod || 'Cash on Delivery',
        items: parsedItems,
        subtotal: Number(o.subtotal || 0),
        deliveryFee: Number(o.delivery_fee || o.deliveryFee || 0),
        total: Number(o.total || 0),
        status: (o.status || 'Pending') as OrderStatus,
        createdAt: o.created_at || o.createdAt || new Date().toISOString(),
        estimatedDeliveryMinutes: o.estimated_delivery_minutes || o.estimatedDeliveryMinutes || 35,
      };

      setOrders(prev => {
        const idx = prev.findIndex(item => item.orderNumber === o.order_number || item.id === o.id);
        if (idx > -1) {
          const copy = [...prev];
          copy[idx] = updatedOrder;
          return copy;
        }
        return [updatedOrder, ...prev];
      });

      return updatedOrder;
    }
    return getOrderById(orderIdOrNumber);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        deleteAllOrders,
        togglePaymentStatus,
        getOrderById,
        refreshOrderFromSupabase,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
