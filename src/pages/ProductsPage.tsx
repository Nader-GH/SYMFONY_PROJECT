import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['router', 'switch', 'firewall', 'server', 'other'];
  const conditions = ['like-new', 'excellent', 'good', 'fair'];

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by condition
    if (selectedCondition) {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedCondition, priceRange]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSelectedCategory(category);
      searchParams.set('category', category);
      setSearchParams(searchParams);
    }
  };

  const handleConditionChange = (condition: string) => {
    setSelectedCondition(selectedCondition === condition ? '' : condition);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCondition('');
    setPriceRange([0, 3000]);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Network Equipment</h1>
        
        <div className="w-full md:w-auto flex items-center bg-white rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="flex-grow px-4 py-2 focus:outline-none"
          />
          <div className="p-2 text-gray-500">
            <Search size={20} />
          </div>
        </div>
        
        <button 
          className="md:hidden flex items-center gap-2 btn btn-outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar - Desktop */}
        <div className={`md:block ${showFilters ? 'block' : 'hidden'} w-full md:w-64 bg-white p-4 rounded-lg shadow-sm border border-gray-200`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Filter size={18} />
              Filters
            </h2>
            <button 
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`} className="capitalize">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Condition Filter */}
            <div>
              <h3 className="font-medium mb-2">Condition</h3>
              <div className="space-y-2">
                {conditions.map(condition => (
                  <div key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`condition-${condition}`}
                      checked={selectedCondition === condition}
                      onChange={() => handleConditionChange(condition)}
                      className="mr-2"
                    />
                    <label htmlFor={`condition-${condition}`} className="capitalize">
                      {condition.replace('-', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="min-price" className="text-sm">Min Price</label>
                    <input
                      type="range"
                      id="min-price"
                      min={0}
                      max={3000}
                      step={100}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="text-sm">Max Price</label>
                    <input
                      type="range"
                      id="max-price"
                      min={0}
                      max={3000}
                      step={100}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
              <button 
                onClick={resetFilters}
                className="btn btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
