import { Router, Shield, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Router className="h-6 w-6 text-teal-400" />
              <span className="text-xl font-bold">RxMarketplace</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted source for quality verified network equipment.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-teal-300 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-teal-300 transition-colors">Products</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-teal-300 transition-colors">Login</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-teal-300 transition-colors">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=router" className="text-gray-400 hover:text-teal-300 transition-colors">Routers</Link></li>
              <li><Link to="/products?category=switch" className="text-gray-400 hover:text-teal-300 transition-colors">Switches</Link></li>
              <li><Link to="/products?category=firewall" className="text-gray-400 hover:text-teal-300 transition-colors">Firewalls</Link></li>
              <li><Link to="/products?category=server" className="text-gray-400 hover:text-teal-300 transition-colors">Servers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">info@rxmarketplace.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-4 flex items-center space-x-3">
              <Shield className="h-5 w-5 text-teal-400" />
              <span className="text-sm text-gray-400">Every product verified & guaranteed</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} RxMarketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
