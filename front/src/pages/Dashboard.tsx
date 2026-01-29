import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { Loading } from '../components/UI/Loading';
import { valorantService } from '../services/valorantService';
import { shopService } from '../services/shopService';
import { favoriteService } from '../services/favoriteService';
import { getRankIcon } from '../utils/rankIcons';
import { TrendingUp, ShoppingBag, Star, Target, Package } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [shopStats, setShopStats] = useState<any>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [shopStatsData, favoritesData] = await Promise.all([
          shopService.getShopStats().catch(() => null),
          favoriteService.getFavorites().catch(() => [])
        ]);

        setShopStats(shopStatsData);
        setFavoritesCount(favoritesData.length);

        if (user?.riotId) {
          try {
            const playerStats = await valorantService.getPlayerStats();
            setStats(playerStats);
          } catch (error) {
            console.error('Erreur stats Valorant:', error);
          }
        }
      } catch (error) {
        console.error('Erreur chargement dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">
            Bienvenue, {user?.username || user?.email?.split('@')[0]} !
          </h1>
          <p className="text-gray-400">
            Suivez vos statistiques Valorant en temps réel
          </p>
        </div>

        {loading ? (
          <Loading message="Chargement de votre dashboard..." />
        ) : (
          <>
            {!user?.riotId && (
              <div className="bg-yellow-900 border border-yellow-700 rounded p-4 mb-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                  Configurez votre Riot ID
                </h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Ajoutez votre Riot ID dans votre profil pour accéder à toutes les fonctionnalités.
                </p>
                <Link
                  to="/profile"
                  className="inline-block px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
                >
                  Configurer
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-400 text-sm">Rang Actuel</h3>
                  <img 
                    src={getRankIcon(stats?.mmr?.currenttierpatched)} 
                    alt="Rank"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-white text-xl font-bold">
                  {stats?.mmr?.currenttierpatched || 'Bronze 1'}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-400 text-sm">RR (Rating)</h3>
                  <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                </div>
                <p className="text-white text-xl font-bold">
                  {stats?.mmr?.ranking_in_tier || '62'} RR
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-400 text-sm">Skins Vus</h3>
                  <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center">
                    <Package className="text-white" size={20} />
                  </div>
                </div>
                <p className="text-white text-xl font-bold">
                  {shopStats?.uniqueSkins || 0}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-400 text-sm">Favoris</h3>
                  <div className="w-10 h-10 bg-yellow-600 rounded flex items-center justify-center">
                    <Star className="text-white" size={20} />
                  </div>
                </div>
                <p className="text-white text-xl font-bold">
                  {favoritesCount}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Link
                to="/tracker"
                className="bg-gray-800 p-6 rounded border border-gray-700 hover:border-red-600 transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Tracker</h3>
                    <p className="text-gray-400 text-sm">Statistiques et historique des matchs</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Consultez vos performances, votre historique de matchs et vos statistiques détaillées.
                </p>
              </Link>

              <Link
                to="/shop"
                className="bg-gray-800 p-6 rounded border border-gray-700 hover:border-purple-600 transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center">
                    <ShoppingBag className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Boutique</h3>
                    <p className="text-gray-400 text-sm">Skins et probabilités</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Découvrez les skins disponibles et leurs probabilités d'apparition en boutique.
                </p>
              </Link>

              <Link
                to="/favorites"
                className="bg-gray-800 p-6 rounded border border-gray-700 hover:border-yellow-600 transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-600 rounded flex items-center justify-center">
                    <Star className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Favoris</h3>
                    <p className="text-gray-400 text-sm">Vos skins préférés</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Suivez vos skins favoris et recevez des estimations de leurs prochaines apparitions.
                </p>
              </Link>

              <Link
                to="/locker"
                className="bg-gray-800 p-6 rounded border border-gray-700 hover:border-green-600 transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center">
                    <Package className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Casier</h3>
                    <p className="text-gray-400 text-sm">Tous les skins Valorant</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Explorez tous les skins Valorant organisés par arme et ajoutez vos favoris.
                </p>
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};
