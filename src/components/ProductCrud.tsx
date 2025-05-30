import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  
  const getConditionColor = (condition: string) => {
    switch(condition) {
      case 'like-new': return 'bg-green-100 text-green-800';
      case 'excellent': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
    }
  };

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
        />
        {product.verified && (
          <div className="absolute top-2 right-2 badge badge-verified flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold truncate">
            <Link to={`/products/${product.id}`} className="hover:text-blue-700 transition-colors">
              {product.name}
            </Link>
          </h3>
          <span className="text-lg font-bold text-blue-900">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className={`badge ${getConditionColor(product.condition)}`}>
            {product.condition.replace('-', ' ')}
          </span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
          
          <div className="flex space-x-2">
            <Link 
              to={`/products/${product.id}`} 
              className="btn btn-outline py-1 px-3 text-xs"
            >
              Details
            </Link>
            <button 
              className="btn btn-primary py-1 px-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !isLoggedIn}
              title={!isLoggedIn ? 'Please login to add to cart' : ''}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

