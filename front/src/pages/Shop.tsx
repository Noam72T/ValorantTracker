import { useState, useEffect } from 'react';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { Loading } from '../components/UI/Loading';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { CardSkin } from '../components/Cards/CardSkin';
import { skinService, type Probability } from '../services/skinService';
import { favoriteService } from '../services/favoriteService';
import type { Skin } from '../services/shopService';
import { Search, TrendingUp, Filter } from 'lucide-react';

export const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [skins, setSkins] = useState<Skin[]>([]);
  const [probabilities, setProbabilities] = useState<Probability[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [showProbabilities, setShowProbabilities] = useState(true);

  useEffect(() => {
    fetchData();
  }, [search, selectedRarity]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [skinsData, probsData, favsData] = await Promise.all([
        skinService.getAllSkins({
          limit: 50,
          search: search || undefined,
          rarity: selectedRarity || undefined
        }),
        skinService.getProbabilities(20),
        favoriteService.getFavorites().catch(() => [])
      ]);

      setSkins(skinsData.skins);
      setProbabilities(probsData);
      setFavorites(new Set(favsData.map(f => f.skinId)));
    } catch (error) {
      console.error('Erreur chargement boutique:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (skinId: string) => {
    try {
      if (favorites.has(skinId)) {
        const fav = await favoriteService.getFavorites();
        const favToRemove = fav.find(f => f.skinId === skinId);
        if (favToRemove) {
          await favoriteService.removeFavorite(favToRemove.id);
          setFavorites(prev => {
            const newSet = new Set(prev);
            newSet.delete(skinId);
            return newSet;
          });
        }
      } else {
        await favoriteService.addFavorite(skinId);
        setFavorites(prev => new Set(prev).add(skinId));
      }
    } catch (error) {
      console.error('Erreur favori:', error);
    }
  };

  const getProbabilityForSkin = (skinId: string) => {
    const prob = probabilities.find(p => p.skinId === skinId);
    return prob?.probabilityScore;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Boutique Valorant</h1>
          <p className="text-gray-300">Découvrez les skins et leurs probabilités d'apparition</p>
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              💡 <strong>Note :</strong> La boutique personnelle n'est pas accessible via l'API publique. 
              Vous pouvez consulter les skins disponibles, leurs probabilités d'apparition et ajouter vos favoris pour suivre quand ils apparaîtront en jeu.
            </p>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-purple-500" />
            Top Probabilités
          </h2>

          {probabilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {probabilities.slice(0, 6).map((prob) => (
                <div
                  key={prob.skinId}
                  className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20"
                >
                  <h3 className="text-white font-semibold mb-2">{prob.skinName}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Probabilité</span>
                    <span className="text-green-500 font-bold text-lg">{prob.probabilityScore}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Dernière apparition</span>
                    <span className="text-gray-300 text-sm">{prob.daysSinceLastAppearance}j</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <span className="text-xs text-gray-500">Estimation: {prob.estimatedNextAppearance}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Aucune donnée de probabilité disponible</p>
          )}
        </div>

        <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-red-500/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Rechercher un skin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              <option value="">Toutes les raretés</option>
              <option value="Exclusive">Exclusive</option>
              <option value="Ultra">Ultra</option>
              <option value="Premium">Premium</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Select">Select</option>
            </select>

            <Button
              onClick={() => setShowProbabilities(!showProbabilities)}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              {showProbabilities ? 'Masquer' : 'Afficher'} probabilités
            </Button>
          </div>

          {loading ? (
            <Loading message="Chargement des skins..." />
          ) : skins.length === 0 ? (
            <div className="text-center py-12">
              <Search className="text-gray-600 mx-auto mb-4" size={48} />
              <p className="text-gray-400">Aucun skin trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skins.map((skin) => (
                <CardSkin
                  key={skin.id}
                  skin={skin}
                  onFavorite={() => handleToggleFavorite(skin.id)}
                  isFavorite={favorites.has(skin.id)}
                  showProbability={showProbabilities}
                  probability={getProbabilityForSkin(skin.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
