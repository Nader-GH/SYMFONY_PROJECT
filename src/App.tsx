import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartContext from './context/CartContext';
import AuthContext from './context/AuthContext';
import { Product } from './types';

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const login = (email: string, password: string) => {
    // Mock login - in a real app, this would validate against a backend
    if (email === 'admin@rxmarket.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else if (email && password) {
      setIsLoggedIn(true);
      setIsAdmin(false);
    }
    return isLoggedIn;
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };
  
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal }}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;