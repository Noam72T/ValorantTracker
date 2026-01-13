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
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenue, {user?.username || user?.email?.split('@')[0]} !
          </h1>
          <p className="text-gray-300 text-lg">
            Suivez vos statistiques Valorant en temps réel
          </p>
        </div>

        {loading ? (
          <Loading message="Chargement de votre dashboard..." />
        ) : (
          <>
            {!user?.riotId && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-yellow-500 mb-2">
                  Configurez votre Riot ID
                </h3>
                <p className="text-gray-300 mb-4">
                  Ajoutez votre Riot ID dans votre profil pour accéder à toutes les fonctionnalités de tracking Valorant.
                </p>
                <Link
                  to="/profile"
                  className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
                >
                  Configurer maintenant
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">Rang Actuel</h3>
                  <img 
                    src={getRankIcon(stats?.mmr?.currenttierpatched)} 
                    alt="Rank"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="text-white text-2xl font-bold">
                  {stats?.mmr?.currenttierpatched || 'Non classé'}
                </p>
              </div>

              <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">RR (Rating)</h3>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-500" size={24} />
                  </div>
                </div>
                <p className="text-white text-2xl font-bold">
                  {stats?.mmr?.ranking_in_tier || '0'} RR
                </p>
              </div>

              <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">Skins Vus</h3>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Package className="text-purple-500" size={24} />
                  </div>
                </div>
                <p className="text-white text-2xl font-bold">
                  {shopStats?.uniqueSkins || 0}
                </p>
              </div>

              <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">Favoris</h3>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Star className="text-yellow-500" size={24} />
                  </div>
                </div>
                <p className="text-white text-2xl font-bold">
                  {favoritesCount}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Link
                to="/tracker"
                className="bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <Target className="text-red-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">Tracker</h3>
                    <p className="text-gray-400">Statistiques et historique des matchs</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Consultez vos performances, votre historique de matchs et vos statistiques détaillées.
                </p>
              </Link>

              <Link
                to="/shop"
                className="bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <ShoppingBag className="text-purple-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">Boutique</h3>
                    <p className="text-gray-400">Skins et probabilités</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Découvrez les skins disponibles et leurs probabilités d'apparition en boutique.
                </p>
              </Link>

              <Link
                to="/favorites"
                className="bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <Star className="text-yellow-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">Favoris</h3>
                    <p className="text-gray-400">Vos skins préférés</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Suivez vos skins favoris et recevez des estimations de leurs prochaines apparitions.
                </p>
              </Link>

              <Link
                to="/locker"
                className="bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-green-500/20 hover:border-green-500/40 transition group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <Package className="text-green-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">Casier</h3>
                    <p className="text-gray-400">Tous les skins Valorant</p>
                  </div>
                </div>
                <p className="text-gray-300">
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
