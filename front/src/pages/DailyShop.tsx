import { useState, useEffect } from 'react';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { getDailyShop, getTimeUntilReset, type WeaponSkin } from '../data/weaponSkins';
import { Clock, Sparkles, ShoppingCart } from 'lucide-react';

export const DailyShop = () => {
  const [dailySkins, setDailySkins] = useState<WeaponSkin[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [selectedSkin, setSelectedSkin] = useState<WeaponSkin | null>(null);

  useEffect(() => {
    // Charger la boutique du jour
    setDailySkins(getDailyShop());

    // Mettre à jour le timer chaque seconde
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilReset());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Exclusive':
        return 'from-yellow-500 to-orange-500';
      case 'Ultra':
        return 'from-purple-500 to-pink-500';
      case 'Premium':
        return 'from-red-500 to-pink-500';
      case 'Deluxe':
        return 'from-blue-500 to-cyan-500';
      case 'Select':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBorderColor = (rarity: string) => {
    switch (rarity) {
      case 'Exclusive':
        return 'border-yellow-500/50';
      case 'Ultra':
        return 'border-purple-500/50';
      case 'Premium':
        return 'border-red-500/50';
      case 'Deluxe':
        return 'border-blue-500/50';
      case 'Select':
        return 'border-green-500/50';
      default:
        return 'border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* En-tête avec titre et timer */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <ShoppingCart className="text-red-500" size={40} />
                Boutique Quotidienne
              </h1>
              <p className="text-gray-300">Découvrez les skins du jour - Rotation quotidienne</p>
            </div>

            {/* Timer de reset */}
            <div className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-red-400" size={20} />
                <span className="text-gray-300 text-sm font-semibold">Temps restant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-black/50 rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <p className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</p>
                  <p className="text-xs text-gray-400">heures</p>
                </div>
                <span className="text-white text-2xl">:</span>
                <div className="bg-black/50 rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <p className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</p>
                  <p className="text-xs text-gray-400">min</p>
                </div>
                <span className="text-white text-2xl">:</span>
                <div className="bg-black/50 rounded-lg px-3 py-2 min-w-[60px] text-center">
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

        {/* Bannière featured (premier skin) */}
        {dailySkins.length > 0 && (
          <div className="mb-8 relative overflow-hidden rounded-2xl border-2 border-yellow-500/50 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-yellow-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Skin Featured du Jour</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-xl"></div>
                  <img 
                    src={dailySkins[0].image} 
                    alt={dailySkins[0].name}
                    className="relative w-full h-64 object-contain drop-shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x200?text=' + dailySkins[0].name;
                    }}
                  />
                </div>
                <div>
                  <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${getRarityColor(dailySkins[0].rarity)} text-white text-sm font-bold mb-3`}>
                    {dailySkins[0].rarity}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">{dailySkins[0].name}</h3>
                  <p className="text-gray-300 mb-1">Collection: <span className="text-white font-semibold">{dailySkins[0].collection}</span></p>
                  <p className="text-gray-300 mb-4">Arme: <span className="text-white font-semibold">{dailySkins[0].weapon}</span></p>
                  <div className="flex items-center gap-4">
                    <div className="bg-black/50 rounded-lg px-6 py-3">
                      <p className="text-yellow-400 text-3xl font-bold">{dailySkins[0].price} VP</p>
                    </div>
                    <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
                      Acheter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grille des autres skins */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Skins Disponibles Aujourd'hui</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailySkins.map((skin) => (
              <div
                key={skin.id}
                className={`group relative bg-gray-800 rounded-xl border-2 ${getRarityBorderColor(skin.rarity)} overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                onClick={() => setSelectedSkin(skin)}
              >
                {/* Badge de rareté */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r ${getRarityColor(skin.rarity)} text-white text-xs font-bold z-10`}>
                  {skin.rarity}
                </div>

                {/* Image du skin */}
                <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all"></div>
                  <img 
                    src={skin.image} 
                    alt={skin.name}
                    className="relative w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x150?text=' + skin.name;
                    }}
                  />
                </div>

                {/* Informations */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1 truncate">{skin.name}</h3>
                  <p className="text-gray-400 text-sm mb-1">{skin.collection}</p>
                  <p className="text-gray-500 text-xs mb-3">{skin.weapon}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-black/50 rounded px-3 py-1.5">
                      <p className="text-yellow-400 font-bold text-lg">{skin.price} VP</p>
                    </div>
                    <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-1.5 rounded font-semibold text-sm transition-all">
                      Acheter
                    </button>
                  </div>
                </div>

                {/* Effet hover */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-all pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de détails du skin */}
        {selectedSkin && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkin(null)}
          >
            <div 
              className="bg-gray-900 rounded-2xl border-2 border-purple-500/50 max-w-2xl w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedSkin(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>

              <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${getRarityColor(selectedSkin.rarity)} text-white text-sm font-bold mb-4`}>
                {selectedSkin.rarity}
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">{selectedSkin.name}</h2>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 mb-6">
                <img 
                  src={selectedSkin.image} 
                  alt={selectedSkin.name}
                  className="w-full h-64 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x300?text=' + selectedSkin.name;
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Collection</p>
                  <p className="text-white font-bold">{selectedSkin.collection}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Arme</p>
                  <p className="text-white font-bold">{selectedSkin.weapon}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-black/50 rounded-lg px-6 py-3 flex-1">
                  <p className="text-yellow-400 text-3xl font-bold text-center">{selectedSkin.price} VP</p>
                </div>
                <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
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
