import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Home, ShoppingBag, Star, TrendingUp, Package } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <h1 className="text-lg font-bold text-white">Valorant Tracker</h1>
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
                <Home size={16} />
                <span>Dashboard</span>
              </Link>
              <Link to="/tracker" className="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
                <TrendingUp size={16} />
                <span>Tracker</span>
              </Link>
              <Link to="/locker" className="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
                <Package size={16} />
                <span>Casier</span>
              </Link>
              <Link to="/shop" className="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
                <ShoppingBag size={16} />
                <span>Boutique</span>
              </Link>
              <Link to="/favorites" className="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
                <Star size={16} />
                <span>Favoris</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-400">Connecté en tant que</p>
              <p className="text-sm font-medium text-white">{user?.username || user?.email}</p>
            </div>

            <Link
              to="/profile"
              className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
              title="Mon profil"
            >
              <User size={18} />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded bg-red-600 hover:bg-red-700 text-white"
              title="Se déconnecter"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
