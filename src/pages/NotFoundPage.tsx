
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertCircle className="h-16 w-16 text-orange-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;