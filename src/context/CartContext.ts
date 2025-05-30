import { createContext } from 'react';
import { CartContextType } from '../types';

const defaultValue: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartTotal: 0
};

const CartContext = createContext<CartContextType>(defaultValue);

export default CartContext;

