import { useState, useEffect } from 'react';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { Loading } from '../components/UI/Loading';
import { CardSkin } from '../components/Cards/CardSkin';
import { favoriteService, type Favorite } from '../services/favoriteService';
import { Star, Bell, BellOff, Trash2 } from 'lucide-react';

export const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoriteService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      await favoriteService.removeFavorite(id);
      setFavorites(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error('Erreur suppression favori:', error);
    }
  };

  const handleToggleNotification = async (id: string, currentState: boolean) => {
    try {
      await favoriteService.updateFavorite(id, !currentState);
      setFavorites(prev => prev.map(f =>
        f.id === id ? { ...f, notificationEnabled: !currentState } : f
      ));
    } catch (error) {
      console.error('Erreur mise à jour notification:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Star className="text-yellow-500" fill="currentColor" />
            Mes Favoris
          </h1>
          <p className="text-gray-300">Suivez vos skins préférés et leurs probabilités d'apparition</p>
        </div>

        {loading ? (
          <Loading message="Chargement de vos favoris..." />
        ) : favorites.length === 0 ? (
          <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-yellow-500/20 p-12 text-center">
            <Star className="text-yellow-500/50 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-white mb-2">
              Aucun favori pour le moment
            </h3>
            <p className="text-gray-400 mb-6">
              Ajoutez des skins à vos favoris depuis la boutique pour les suivre ici
            </p>
            <a
              href="/shop"
              className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
            >
              Découvrir la boutique
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="relative">
                  <CardSkin
                    skin={favorite.skin}
                    isFavorite={true}
                    showProbability={true}
                    probability={favorite.probability?.probabilityScore}
                  />

                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleToggleNotification(favorite.id, favorite.notificationEnabled)}
                      className={`p-2 rounded-full backdrop-blur-lg transition ${
                        favorite.notificationEnabled
                          ? 'bg-blue-500 text-white'
                          : 'bg-black/50 text-gray-400 hover:text-blue-500'
                      }`}
                      title={favorite.notificationEnabled ? 'Notifications activées' : 'Notifications désactivées'}
                    >
                      {favorite.notificationEnabled ? <Bell size={18} /> : <BellOff size={18} />}
                    </button>

                    <button
                      onClick={() => handleRemoveFavorite(favorite.id)}
                      className="p-2 rounded-full bg-red-500/80 hover:bg-red-600 text-white backdrop-blur-lg transition"
                      title="Retirer des favoris"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {favorite.probability && (
                    <div className="mt-4 bg-black/50 backdrop-blur-lg rounded-lg border border-yellow-500/20 p-4">
                      <h4 className="text-white font-semibold mb-3">Statistiques</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Probabilité</span>
                          <span className="text-green-500 font-bold">
                            {favorite.probability.probabilityScore}%
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Dernière apparition</span>
                          <span className="text-gray-300 text-sm">
                            {favorite.probability.daysSinceLastAppearance} jours
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Apparitions totales</span>
                          <span className="text-gray-300 text-sm">
                            {favorite.probability.totalAppearances}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-gray-700">
                          <span className="text-xs text-gray-500">
                            Estimation: {favorite.probability.estimatedNextAppearance}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};
