
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/';
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (!isLoginMode && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    if (isLoginMode) {
      const loggedIn = login(email, password);
      if (loggedIn) {
        navigate(returnTo);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // In a real app, this would create a new user
      // For demo purposes, we'll just switch to login mode
      alert('Account created successfully! Please login.');
      setIsLoginMode(true);
    }
  };
  
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-blue-900 mx-auto mb-2" />
        <h1 className="text-3xl font-bold">{isLoginMode ? 'Login' : 'Sign Up'}</h1>
        <p className="text-gray-600 mt-2">
          {isLoginMode 
            ? 'Welcome back to RxMarketplace' 
            : 'Create an account to start shopping'}
        </p>
      </div>
      
      {/* Admin Login Hint */}
      {isLoginMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 text-sm">
          <p className="text-blue-800 font-semibold mb-1">Demo Credentials</p>
          <p className="text-blue-700">
            <strong>Admin access:</strong> admin@rxmarket.com / admin123
          </p>
          <p className="text-blue-700 mt-1">
            <strong>Regular user:</strong> Any email/password combination
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="********"
            />
          </div>
          
          {!isLoginMode && (
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="********"
              />
            </div>
          )}
          
          <button 
            type="submit"
            className="btn btn-primary w-full mb-4"
          >
            {isLoginMode ? 'Login' : 'Create Account'}
          </button>
          
          <p className="text-center text-gray-600 text-sm">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-1 text-blue-700 hover:text-blue-900 focus:outline-none"
            >
              {isLoginMode ? 'Sign up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;