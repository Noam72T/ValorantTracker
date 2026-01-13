import { Star, TrendingUp } from 'lucide-react';
import type { Skin } from '../../services/shopService';

interface CardSkinProps {
  skin: Skin;
  onFavorite?: () => void;
  isFavorite?: boolean;
  showProbability?: boolean;
  probability?: number;
}

export const CardSkin = ({ skin, onFavorite, isFavorite, showProbability, probability }: CardSkinProps) => {
  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'Exclusive':
        return 'from-yellow-500 to-orange-500';
      case 'Ultra':
        return 'from-purple-500 to-pink-500';
      case 'Premium':
        return 'from-blue-500 to-cyan-500';
      case 'Deluxe':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-red-500/20 hover:border-red-500/40 transition overflow-hidden group">
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
        {skin.imageUrl ? (
          <img
            src={skin.imageUrl}
            alt={skin.displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-600 text-4xl">🔫</div>
          </div>
        )}
        
        {skin.rarity && (
          <div className={`absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r ${getRarityColor(skin.rarity)} text-white text-xs font-semibold`}>
            {skin.rarity}
          </div>
        )}

        {onFavorite && (
          <button
            onClick={onFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-lg transition ${
              isFavorite
                ? 'bg-yellow-500 text-white'
                : 'bg-black/50 text-gray-400 hover:text-yellow-500'
            }`}
          >
            <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}

        {showProbability && probability !== undefined && (
          <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-lg flex items-center gap-1">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-white text-xs font-semibold">{probability}%</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 truncate">
          {skin.displayName}
        </h3>
        
        {skin.weaponType && (
          <p className="text-gray-400 text-sm mb-2">{skin.weaponType}</p>
        )}

        <div className="flex items-center justify-between">
          {skin.price && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 font-bold">{skin.price}</span>
              <span className="text-gray-400 text-xs">VP</span>
            </div>
          )}

          {skin.lastAppearance && (
            <p className="text-gray-500 text-xs">
              Vu il y a {Math.floor((Date.now() - new Date(skin.lastAppearance).getTime()) / (1000 * 60 * 60 * 24))}j
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
