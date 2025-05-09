
export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  image: string;
  inStock: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartCondition {
  type: 'include' | 'exclude';
  productId: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  deliveryLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  distance: number;
  deliveryFee: number;
  subtotal: number;
  total: number;
  status: 'pending' | 'accepted' | 'delivered' | 'cancelled';
  timestamp: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface AdminLocation {
  latitude: number;
  longitude: number;
  address: string;
}
