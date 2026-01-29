import { useState, useEffect } from 'react';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { getDailySkinsFromAPI, getTimeUntilReset, type ValorantSkin } from '../services/valorantSkinsService';
import { Clock, ShoppingCart } from 'lucide-react';

export const Shop = () => {
  const [dailySkins, setDailySkins] = useState<ValorantSkin[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [selectedSkin, setSelectedSkin] = useState<ValorantSkin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkins = async () => {
      setLoading(true);
      const skins = await getDailySkinsFromAPI();
      setDailySkins(skins);
      setLoading(false);
    };

    loadSkins();

    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilReset());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRarityColor = () => {
    return 'from-red-500 to-red-600';
  };

  const getRarityBorderColor = () => {
    return 'border-red-500/50';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <ShoppingCart className="text-red-500" size={40} />
                Boutique Quotidienne
              </h1>
              <p className="text-gray-300">Découvrez les skins du jour - Rotation quotidienne</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-red-500" size={20} />
                <span className="text-gray-300 text-sm font-semibold">Temps restant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-900 rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <p className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</p>
                  <p className="text-xs text-gray-400">heures</p>
                </div>
                <span className="text-white text-2xl">:</span>
                <div className="bg-gray-900 rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <p className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</p>
                  <p className="text-xs text-gray-400">min</p>
                </div>
                <span className="text-white text-2xl">:</span>
                <div className="bg-gray-900 rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <p className="text-2xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</p>
                  <p className="text-xs text-gray-400">sec</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              💡 <strong>Note :</strong> Ceci est une simulation de la boutique Valorant. 
              Les skins changent automatiquement chaque jour à minuit. Les prix sont en Valorant Points (VP).
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Skins Disponibles Aujourd'hui</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-white text-lg">Chargement des skins...</div>
            </div>
          ) : dailySkins.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-400 text-lg">Aucun skin disponible</div>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailySkins.map((skin, index) => (
              <div
                key={skin.uuid}
                className={`group relative bg-gray-900 rounded-xl border-2 ${getRarityBorderColor()} overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                onClick={() => setSelectedSkin(skin)}
              >
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r ${getRarityColor()} text-white text-xs font-bold z-10`}>
                  Skin #{index + 1}
                </div>

                <div className="relative h-48 bg-gray-800 flex items-center justify-center p-4">
                  <img 
                    src={skin.displayIcon} 
                    alt={skin.displayName}
                    className="relative w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1 truncate">{skin.displayName}</h3>
                  <p className="text-gray-400 text-sm mb-3">Skin Valorant</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-800 rounded px-3 py-1.5">
                      <p className="text-yellow-400 font-bold text-lg">1775 VP</p>
                    </div>
                    <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-1.5 rounded font-semibold text-sm transition-all">
                      Acheter
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-all pointer-events-none"></div>
              </div>
            ))}
          </div>
          )}
        </div>

        {selectedSkin && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkin(null)}
          >
            <div 
              className="bg-gray-900 rounded-2xl border-2 border-gray-700 max-w-2xl w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedSkin(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>

              <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${getRarityColor()} text-white text-sm font-bold mb-4`}>
                Skin Valorant
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">{selectedSkin.displayName}</h2>
              
              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <img 
                  src={selectedSkin.displayIcon} 
                  alt={selectedSkin.displayName}
                  className="w-full h-64 object-contain"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Nom du skin</p>
                  <p className="text-white font-bold">{selectedSkin.displayName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-800 rounded-lg px-6 py-3 flex-1">
                  <p className="text-yellow-400 text-3xl font-bold text-center">1775 VP</p>
                </div>
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
                  Acheter Maintenant
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
