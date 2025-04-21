
-- Users Table
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories Table
CREATE TABLE categories (
  category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

-- Products Table
CREATE TABLE products (
  product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES categories(category_id),
  stock_quantity INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart Table
CREATE TABLE cart (
  cart_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart Items Table
CREATE TABLE cart_items (
  cart_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES cart(cart_id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(product_id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(cart_id, product_id)
);

-- Reviews Table
CREATE TABLE reviews (
  review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(user_id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT,
  delivery_address TEXT NOT NULL,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  order_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(product_id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL
);

-- Payments Table
CREATE TABLE payments (
  payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(order_id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  amount DECIMAL(10, 2) NOT NULL,
  transaction_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admins Table
CREATE TABLE admins (
  admin_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id),
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Log Table
CREATE TABLE inventory_log (
  log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(product_id),
  quantity_change INTEGER NOT NULL,
  reason TEXT NOT NULL,
  admin_id UUID REFERENCES admins(admin_id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for products table (public read)
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- RLS Policies for categories table (public read)
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- RLS Policies for cart table
CREATE POLICY "Users can view their own cart" ON cart
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert into their own cart" ON cart
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for cart_items table
CREATE POLICY "Users can view their own cart items" ON cart_items
  FOR SELECT USING (
    cart_id IN (SELECT cart_id FROM cart WHERE user_id = auth.uid())
  );
  
CREATE POLICY "Users can insert their own cart items" ON cart_items
  FOR INSERT WITH CHECK (
    cart_id IN (SELECT cart_id FROM cart WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update their own cart items" ON cart_items
  FOR UPDATE USING (
    cart_id IN (SELECT cart_id FROM cart WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete their own cart items" ON cart_items
  FOR DELETE USING (
    cart_id IN (SELECT cart_id FROM cart WHERE user_id = auth.uid())
  );

-- Similar policies would be needed for orders, reviews, etc.
