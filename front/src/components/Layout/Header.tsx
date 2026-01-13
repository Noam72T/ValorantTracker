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
    <header className="bg-black/50 backdrop-blur-lg border-b border-red-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <h1 className="text-xl font-bold text-white">Valorant Tracker</h1>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/tracker"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <TrendingUp size={18} />
                <span>Tracker</span>
              </Link>
              <Link
                to="/locker"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <Package size={18} />
                <span>Casier</span>
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <ShoppingBag size={18} />
                <span>Boutique</span>
              </Link>
              <Link
                to="/favorites"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <Star size={18} />
                <span>Favoris</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-gray-400">Connecté en tant que</p>
              <p className="text-sm font-medium text-white">{user?.username || user?.email}</p>
            </div>

            <Link
              to="/profile"
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition"
              title="Mon profil"
            >
              <User size={20} />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              title="Se déconnecter"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
