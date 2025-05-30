
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === Number(productId));
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/products')}
          className="btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (isLoggedIn) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate('/cart');
    } else {
      navigate('/login', { state: { returnTo: `/products/${productId}` } });
    }
  };
  
  const getConditionLabel = (condition: string) => {
    switch(condition) {
      case 'like-new': return 'Like New - Indistinguishable from new equipment';
      case 'excellent': return 'Excellent - Minor cosmetic imperfections, fully functional';
      case 'good': return 'Good - Visible signs of use but fully tested and operational';
      case 'fair': return 'Fair - Significant cosmetic wear but functions as intended';
      default: return condition;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                  <p className="text-gray-600 capitalize mb-2">{product.category}</p>
                </div>
                <span className="text-2xl font-bold text-blue-900">${product.price.toFixed(2)}</span>
              </div>
              
              <div className="my-4 flex items-center space-x-3">
                <span className={`badge ${product.verified ? 'badge-verified' : 'bg-gray-100 text-gray-800'} flex items-center space-x-1`}>
                  {product.verified && <ShieldCheck className="w-3 h-3" />}
                  <span>{product.verified ? 'Verified' : 'Unverified'}</span>
                </span>
                <span className="badge badge-condition">{getConditionLabel(product.condition)}</span>
              </div>
              
              <div className="my-6">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="my-6">
                <h2 className="text-lg font-semibold mb-3">Specifications</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  <Truck className="mr-2 h-5 w-5" />
                  <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                </div>
                
                {product.stock > 0 && (
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 text-gray-600 hover:text-blue-700 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <MinusCircle className="h-5 w-5" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 text-gray-600 hover:text-blue-700 disabled:opacity-50"
                      disabled={quantity >= product.stock}
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => navigate('/products')}
                  className="btn btn-outline flex-1"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 flex items-center justify-center"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
              </div>
              
              {!isLoggedIn && (
                <p className="text-center text-sm text-gray-600 mt-3">
                  Please login to add items to your cart
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Warranty Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <ShieldCheck className="mr-2 h-5 w-5" />
          RxMarketplace Verification & Warranty
        </h2>
        <p className="text-blue-800 mb-4">
          All verified equipment undergoes our comprehensive 32-point inspection process, ensuring full functionality and performance.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
            <h3 className="font-semibold mb-1">90-Day Hardware Warranty</h3>
            <p className="text-gray-600">Equipment is guaranteed to function as specified for 90 days from purchase.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
            <h3 className="font-semibold mb-1">Free Technical Support</h3>
            <p className="text-gray-600">Our certified technicians are available to help with setup and troubleshooting.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
            <h3 className="font-semibold mb-1">30-Day Returns</h3>
            <p className="text-gray-600">Not satisfied? Return within 30 days for a full refund (minus shipping).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;