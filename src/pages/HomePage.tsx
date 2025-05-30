
import { Link } from 'react-router-dom';
import { Cpu, Shield, BadgeDollarSign, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  // Get 4 featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg text-white p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Verified Network Equipment at Competitive Prices
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
            Reconditioned and fully tested enterprise-grade routers, switches, firewalls, and servers with verification guarantees.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn btn-secondary">
              Browse Products
            </Link>
            <Link to="/login" className="btn bg-white text-blue-900 hover:bg-blue-50">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-10">Why Choose RxMarketplace?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="inline-flex items-center justify-center bg-blue-100 text-blue-800 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Equipment</h3>
            <p className="text-gray-600">Every device undergoes rigorous testing and verification before listing.</p>
          </div>
          
          <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="inline-flex items-center justify-center bg-teal-100 text-teal-800 p-3 rounded-full mb-4">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Grade</h3>
            <p className="text-gray-600">Enterprise-level hardware at a fraction of new retail pricing.</p>
          </div>
          
          <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="inline-flex items-center justify-center bg-orange-100 text-orange-800 p-3 rounded-full mb-4">
              <BadgeDollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
            <p className="text-gray-600">Save 40-70% compared to new equipment without sacrificing quality.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Equipment</h2>
          <Link to="/products" className="text-blue-700 hover:text-blue-900 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Looking for specific network equipment?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Our inventory is constantly updating with new verified equipment. 
          If you don't see what you need, contact us and we'll help source it for you.
        </p>
        <Link to="/products" className="btn btn-primary">
          Explore All Products
        </Link>
      </section>
    </div>
  );
};

export default HomePage;