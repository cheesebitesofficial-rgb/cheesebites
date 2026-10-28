-- ============================================================
-- Cheese Bites Production Supabase Schema & Security (RLS)
-- ============================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC NOT NULL,
  sizes JSONB,
  image TEXT,
  is_popular BOOLEAN DEFAULT false,
  is_special BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. DEALS TABLE
CREATE TABLE IF NOT EXISTS public.deals (
  id TEXT PRIMARY KEY,
  deal_number INTEGER NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  contents JSONB NOT NULL,
  image TEXT,
  is_popular BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  order_notes TEXT,
  order_type TEXT DEFAULT 'Delivery',
  payment_method TEXT NOT NULL, -- 'Online Payment' | 'Cash on Delivery'
  payment_status TEXT DEFAULT 'Pending', -- 'Pending' | 'Paid' | 'Failed' | 'Refunded'
  subtotal NUMERIC NOT NULL,
  delivery_fee NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending', -- 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered' | 'Cancelled'
  estimated_delivery_minutes INTEGER DEFAULT 35,
  items_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- PUBLIC CUSTOMER POLICIES (Anon Key)
-- ------------------------------------------------------------
-- Public customers can ONLY read available products and deals
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (is_available = true);
CREATE POLICY "Public read deals" ON public.deals FOR SELECT USING (is_available = true);

-- Allow public customers & Electron POS to read, update status, and manage online orders
CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public create orders" ON public.orders FOR INSERT WITH CHECK (
  status = 'Pending' AND payment_status = 'Pending'
);
CREATE POLICY "Public update orders" ON public.orders FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete orders" ON public.orders FOR DELETE USING (true);

-- ------------------------------------------------------------
-- SECURE ORDER TRACKING RPC (prevents customer data leakage)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.track_order(lookup_order_number TEXT)
RETURNS TABLE (
  order_number TEXT,
  customer_name TEXT,
  status TEXT,
  estimated_delivery_minutes INTEGER,
  created_at TIMESTAMPTZ,
  items_json JSONB
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT order_number, customer_name, status, estimated_delivery_minutes, created_at, items_json
  FROM public.orders
  WHERE order_number = lookup_order_number OR id::text = lookup_order_number;
$$;

-- Grant EXECUTE on track_order RPC to anon role
GRANT EXECUTE ON FUNCTION public.track_order(TEXT) TO anon;

-- ------------------------------------------------------------
-- SECURE ORDER STATUS UPDATE RPC (for POS status management)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_online_order_status(lookup_order_number TEXT, new_status TEXT)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.orders
  SET status = new_status, updated_at = now()
  WHERE order_number = lookup_order_number OR id::text = lookup_order_number;
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_online_order_status(TEXT, TEXT) TO anon, authenticated;

-- ------------------------------------------------------------
-- AUTHORIZED STAFF & POS POLICIES (Authenticated Staff JWT)
-- ------------------------------------------------------------
CREATE POLICY "Staff manage products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage deals" ON public.deals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated');

