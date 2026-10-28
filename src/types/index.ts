export type PizzaSize = 'Small' | 'Medium' | 'Large' | 'X-Large';
export type Category = 
  | 'Pizza' 
  | 'Burgers' 
  | 'Sandwiches' 
  | 'Roll Paratha' 
  | 'Pasta' 
  | 'Fried Chicken' 
  | 'Fries' 
  | 'Deals';

export type DealCategory = 
  | 'Solo Era' 
  | 'Hits Different' 
  | 'Squad Goals' 
  | 'The Big Flex'
  | 'Duo Pizza Deals';

export interface SizeOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  basePrice: number;
  sizes?: SizeOption[];
  supportsExtraToppings?: boolean;
  isPopular?: boolean;
  isSpecial?: boolean;
}

export interface DealItem {
  id: string;
  dealNumber: number;
  name: string;
  category: DealCategory;
  price: number;
  contents: string[];
  image: string;
  isPopular?: boolean;
  isSpecial?: boolean;
}

export interface ExtraTopping {
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  itemId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  extraToppings?: ExtraTopping[];
  contents?: string[];
  image: string;
}

export type OrderStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Preparing' 
  | 'Ready' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled';

export type OrderType = 'Delivery' | 'Takeaway';

export interface Order {
  id: string;
  orderNumber: string;
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
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryMinutes: number;
}

export interface AuthUser {
  username: string;
  name: string;
  role: 'admin' | 'staff';
}

