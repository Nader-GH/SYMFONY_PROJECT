
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const CartPage = () => {
  const { cart, removeFromCart, cartTotal } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (!isLoggedIn) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Please Login to View Your Cart</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to access your shopping cart</p>
        <button 
          onClick={() => navigate('/login', { state: { returnTo: '/cart' } })}
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    );
  }
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }
  
  // Count quantities of each unique product
  const cartItems = cart.reduce((acc: { [key: number]: number }, product) => {
    if (!acc[product.id]) {
      acc[product.id] = 0;
    }
    acc[product.id]++;
    return acc;
  }, {});
  
  // Create an array of unique products with quantities
  const uniqueProducts = Object.keys(cartItems).map(id => {
    const product = cart.find(p => p.id === parseInt(id));
    return {
      ...product,
      quantity: cartItems[parseInt(id)]
    };
  });
  
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here in a real application!');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="lg:flex lg:space-x-6">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold">Items ({cart.length})</h2>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {uniqueProducts.map((item: any) => (
                <li key={item.id} className="p-4 flex items-center">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  
                  <div className="flex-1">
                    <Link 
                      to={`/products/${item.id}`}
                      className="font-semibold text-lg hover:text-blue-700 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                    <div className="flex mt-1">
                      <span className="badge badge-condition inline-block mt-1">
                        {item.condition.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-red-600 hover:text-red-800 flex items-center text-sm"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="p-4 bg-gray-50 border-t text-right">
              <Link to="/products" className="text-blue-700 hover:text-blue-900 text-sm font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold">Order Summary</h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>$9.95</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(cartTotal * 0.07).toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-xl text-blue-900">
                  ${(cartTotal + 9.95 + cartTotal * 0.07).toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="btn btn-primary w-full mt-6"
              >
                Proceed to Checkout
              </button>
              
              <div className="text-center text-sm text-gray-600 mt-4">
                <p>Secure checkout powered by Stripe</p>
                <p className="mt-1">Free returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;