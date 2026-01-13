import { X } from 'lucide-react';
import { CardSkin } from '../Cards/CardSkin';
import type { Skin } from '../../services/shopService';

interface WeaponSkinsModalProps {
  isOpen: boolean;
  onClose: () => void;
  weaponName: string;
  skins: Skin[];
  favorites: Set<string>;
  onToggleFavorite: (skinId: string) => void;
}

export const WeaponSkinsModal = ({
  isOpen,
  onClose,
  weaponName,
  skins,
  favorites,
  onToggleFavorite
}: WeaponSkinsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-500/20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">{weaponName}</h2>
            <p className="text-gray-400">{skins.length} skin{skins.length > 1 ? 's' : ''} disponible{skins.length > 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skins.map((skin) => (
              <CardSkin
                key={skin.id}
                skin={skin}
                onFavorite={() => onToggleFavorite(skin.id)}
                isFavorite={favorites.has(skin.id)}
                showProbability={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
