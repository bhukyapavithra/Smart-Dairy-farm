// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface FarmerProfile {
  farmName: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  founded: string;
  contactPhone: string;
  profileImage?: string;
}

export interface CustomerProfile {
  address: string;
  preferredPaymentMethod: 'cash' | 'credit_card' | 'bank_transfer';
  deliveryInstructions: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: 'milk' | 'cheese' | 'yogurt' | 'butter' | 'other';
  imageUrl: string;
  farmerId: string;
  farmerName: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Order Types
export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  farmerId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  createdAt: string;
  completedAt?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}