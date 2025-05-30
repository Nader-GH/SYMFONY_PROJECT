
export interface Product {
  id: number;
  name: string;
  category: 'router' | 'switch' | 'firewall' | 'server' | 'other';
  price: number;
  condition: 'like-new' | 'excellent' | 'good' | 'fair';
  description: string;
  specifications: string[];
  verified: boolean;
  imageUrl: string;
  stock: number;
}

export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}