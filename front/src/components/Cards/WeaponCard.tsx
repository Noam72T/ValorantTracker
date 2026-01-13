import { Package } from 'lucide-react';

interface WeaponCardProps {
  weaponName: string;
  skinCount: number;
  defaultSkin?: string;
  onClick: () => void;
}

export const WeaponCard = ({ weaponName, skinCount, defaultSkin, onClick }: WeaponCardProps) => {
  const getWeaponIcon = () => {
    const icons: { [key: string]: string } = {
      'Classic': '🔫',
      'Shorty': '🔫',
      'Frenzy': '🔫',
      'Ghost': '🔫',
      'Sheriff': '🔫',
      'Stinger': '🔫',
      'Spectre': '🔫',
      'Bucky': '🔫',
      'Judge': '🔫',
      'Bulldog': '🔫',
      'Guardian': '🔫',
      'Phantom': '⚡',
      'Vandal': '⚡',
      'Marshal': '🎯',
      'Operator': '🎯',
      'Ares': '💥',
      'Odin': '💥',
      'Melee': '🗡️'
    };
    return icons[weaponName] || '🔫';
  };

  return (
    <button
      onClick={onClick}
      className="group bg-black/50 backdrop-blur-lg rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 overflow-hidden hover:scale-105 transform"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
        {defaultSkin ? (
          <img
            src={defaultSkin}
            alt={weaponName}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-6xl opacity-50">{getWeaponIcon()}</div>
        )}
        
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {skinCount}
        </div>
      </div>

      <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-red-400 transition">
          {weaponName}
        </h3>
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <Package size={14} />
          {skinCount} skin{skinCount > 1 ? 's' : ''}
        </p>
      </div>
    </button>
  );
};
