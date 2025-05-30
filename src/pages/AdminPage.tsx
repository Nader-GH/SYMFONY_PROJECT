
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Edit, Trash2, Plus } from 'lucide-react';
import { products as initialProducts } from '../data/products';
import AuthContext from '../context/AuthContext';
import { Product } from '../types';

const AdminPage = () => {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
        <p className="text-gray-600 mb-6">
          You need administrator privileges to access this page.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };
  
  const toggleProductStatus = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, verified: !p.verified } : p
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button 
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add New Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-blue-900 text-white font-semibold flex justify-between items-center">
            <h2 className="text-lg">Manage Products</h2>
            <span>{products.length} products</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="h-10 w-10 rounded-md object-cover mr-3"
                        />
                        <div className="truncate max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {product.condition.replace('-', ' ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleProductStatus(product.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${product.verified 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        {product.verified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Products</span>
                <span className="font-medium">{products.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-800 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Verified Products</span>
                <span className="font-medium">{products.filter(p => p.verified).length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(products.filter(p => p.verified).length / products.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Low Stock (&lt;3)</span>
                <span className="font-medium">{products.filter(p => p.stock < 3).length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${(products.filter(p => p.stock < 3).length / products.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {['router', 'switch', 'firewall', 'server', 'other'].map(category => {
              const count = products.filter(p => p.category === category).length;
              const percentage = (count / products.length) * 100;
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{category}s</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center p-2 rounded-md hover:bg-gray-50">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div className="text-sm">
                <p className="text-gray-800">Product verified: Cisco 4321 ISR Router</p>
                <p className="text-gray-500 text-xs">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-2 rounded-md hover:bg-gray-50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="text-sm">
                <p className="text-gray-800">New product added: HP ProLiant DL380</p>
                <p className="text-gray-500 text-xs">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center p-2 rounded-md hover:bg-gray-50">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <div className="text-sm">
                <p className="text-gray-800">Low stock alert: FortiGate 100F Firewall</p>
                <p className="text-gray-500 text-xs">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center p-2 rounded-md hover:bg-gray-50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="text-sm">
                <p className="text-gray-800">Price updated: Juniper SRX340 Firewall</p>
                <p className="text-gray-500 text-xs">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;