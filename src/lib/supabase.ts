function getSupabaseUrl(): string {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('cb_supabase_url') : null;
  return saved || import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
}

function getSupabaseAnonKey(): string {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('cb_supabase_key') : null;
  return saved || import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';
}

export interface SupabaseOrderPayload {
  id?: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  order_notes?: string;
  order_type: 'Delivery' | 'Takeaway';
  payment_method: 'Online Payment' | 'Cash on Delivery';
  payment_status: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  estimated_delivery_minutes?: number;
  items: Array<{
    item_id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    selected_size?: string;
    extra_toppings?: any[];
    contents?: string[];
    image: string;
  }>;
}

export const supabaseApi = {
  isConfigured: (): boolean => {
    const url = getSupabaseUrl();
    return !!(url && url !== 'https://xyzcompany.supabase.co' && !url.includes('placeholder'));
  },

  async createOnlineOrder(orderData: SupabaseOrderPayload): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!this.isConfigured()) {
      return { success: true, data: orderData };
    }

    const url = getSupabaseUrl();
    const key = getSupabaseAnonKey();

    try {
      const response = await fetch(`${url}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          order_number: orderData.order_number,
          customer_name: orderData.customer_name,
          customer_phone: orderData.customer_phone,
          delivery_address: orderData.delivery_address,
          order_notes: orderData.order_notes || '',
          order_type: orderData.order_type,
          payment_method: orderData.payment_method,
          payment_status: orderData.payment_status || 'Pending',
          subtotal: orderData.subtotal,
          delivery_fee: orderData.delivery_fee,
          discount: orderData.discount || 0,
          total: orderData.total,
          status: orderData.status || 'Pending',
          estimated_delivery_minutes: orderData.estimated_delivery_minutes || 35,
          items_json: orderData.items,
          created_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return { success: false, error: errText };
      }

      const data = await response.json();
      return { success: true, data: Array.isArray(data) ? data[0] : data };
    } catch (err: any) {
      console.error('Network error posting order to Supabase:', err);
      return { success: false, error: err.message || 'Offline/Network Error' };
    }
  },

  async fetchOrderStatus(orderIdOrNumber: string): Promise<{ success: boolean; order?: any }> {
    if (!this.isConfigured()) {
      return { success: false };
    }

    const url = getSupabaseUrl();
    const key = getSupabaseAnonKey();

    try {
      const response = await fetch(`${url}/rest/v1/rpc/track_order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': key,
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({ lookup_order_number: orderIdOrNumber }),
      });

      if (!response.ok) return { success: false };
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return { success: true, order: data[0] };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  async fetchLiveMenu(): Promise<{ success: boolean; products?: any[]; deals?: any[] }> {
    if (!this.isConfigured()) {
      return { success: false };
    }

    const url = getSupabaseUrl();
    const key = getSupabaseAnonKey();

    try {
      const [resProd, resDeals] = await Promise.all([
        fetch(`${url}/rest/v1/products?is_available=eq.true&select=*`, {
          headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
        }),
        fetch(`${url}/rest/v1/deals?is_available=eq.true&select=*`, {
          headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
        }),
      ]);

      if (resProd.ok && resDeals.ok) {
        const products = await resProd.json();
        const deals = await resDeals.json();
        return { success: true, products, deals };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  async fetchAllOrders(): Promise<{ success: boolean; orders?: any[] }> {
    if (!this.isConfigured()) {
      return { success: false };
    }

    const url = getSupabaseUrl();
    const key = getSupabaseAnonKey();

    try {
      const response = await fetch(`${url}/rest/v1/orders?select=*&order=created_at.desc`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
        },
      });

      if (!response.ok) return { success: false };
      const data = await response.json();
      return { success: true, orders: data };
    } catch (err) {
      console.error('Failed to fetch all orders from Supabase:', err);
      return { success: false };
    }
  },
};
