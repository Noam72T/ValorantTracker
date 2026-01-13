import { useState, useEffect } from 'react';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { Loading } from '../components/UI/Loading';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { CardSkin } from '../components/Cards/CardSkin';
import { WeaponCard } from '../components/Cards/WeaponCard';
import { WeaponSkinsModal } from '../components/Modals/WeaponSkinsModal';
import { skinService } from '../services/skinService';
import { favoriteService } from '../services/favoriteService';
import { skinSyncService } from '../services/skinSyncService';
import type { Skin } from '../services/shopService';
import { Search, RefreshCw, Package, Grid3x3 } from 'lucide-react';

export const Locker = () => {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [allSkins, setAllSkins] = useState<Skin[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [syncStatus, setSyncStatus] = useState<{ totalSkins: number; lastSync: string | null } | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'weapons' | 'all'>('weapons');

  useEffect(() => {
    fetchData();
    fetchSyncStatus();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [skinsData, favsData] = await Promise.all([
        skinService.getAllSkins({ limit: 5000 }),
        favoriteService.getFavorites().catch(() => [])
      ]);

      setAllSkins(skinsData.skins);
      setFavorites(new Set(favsData.map(f => f.skinId)));
    } catch (error) {
      console.error('Erreur chargement casier:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSyncStatus = async () => {
    try {
      const status = await skinSyncService.getSyncStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Erreur statut sync:', error);
    }
  };

  const handleSync = async () => {
    if (!confirm('Synchroniser tous les skins depuis l\'API Valorant ? Cela peut prendre quelques secondes.')) {
      return;
    }

    try {
      setSyncing(true);
      const result = await skinSyncService.syncAllSkins();
      alert(`Synchronisation terminée !\n${result.created} skins créés\n${result.updated} skins mis à jour`);
      await fetchData();
      await fetchSyncStatus();
    } catch (error: any) {
      console.error('Erreur sync:', error);
      alert(error.response?.data?.message || 'Erreur lors de la synchronisation');
    } finally {
      setSyncing(false);
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

  // Grouper les skins par arme
  const weaponGroups = allSkins.reduce((acc, skin) => {
    const weapon = skin.weaponType || 'Unknown';
    if (!acc[weapon]) {
      acc[weapon] = [];
    }
    acc[weapon].push(skin);
    return acc;
  }, {} as Record<string, Skin[]>);

  // Filtrer par recherche
  const filteredWeapons = Object.keys(weaponGroups).filter(weapon =>
    weapon.toLowerCase().includes(search.toLowerCase())
  ).sort();

  const filteredSkins = search
    ? allSkins.filter(skin =>
        skin.displayName.toLowerCase().includes(search.toLowerCase()) ||
        skin.weaponType?.toLowerCase().includes(search.toLowerCase())
      )
    : allSkins;

  const selectedWeaponSkins = selectedWeapon ? weaponGroups[selectedWeapon] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Package className="text-red-500" />
                Mon Casier
              </h1>
              <p className="text-gray-300">Tous les skins Valorant disponibles</p>
            </div>

            <Button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2"
              variant="secondary"
            >
              <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Synchronisation...' : 'Synchroniser'}
            </Button>
          </div>

          {syncStatus && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  <strong className="text-white">{syncStatus.totalSkins}</strong> skins dans la base
                </span>
                {syncStatus.lastSync && (
                  <span className="text-gray-400">
                    Dernière sync: {new Date(syncStatus.lastSync).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-red-500/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={viewMode === 'weapons' ? "Rechercher une arme..." : "Rechercher un skin..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode('weapons')}
                variant={viewMode === 'weapons' ? 'primary' : 'secondary'}
                className="flex items-center gap-2"
              >
                <Package size={18} />
                Par arme
              </Button>
              <Button
                onClick={() => setViewMode('all')}
                variant={viewMode === 'all' ? 'primary' : 'secondary'}
                className="flex items-center gap-2"
              >
                <Grid3x3 size={18} />
                Tous
              </Button>
            </div>
          </div>

          {loading ? (
            <Loading message="Chargement des skins..." />
          ) : allSkins.length === 0 ? (
            <div className="text-center py-12">
              <Search className="text-gray-600 mx-auto mb-4" size={48} />
              <p className="text-gray-400 mb-4">Aucun skin trouvé</p>
              <Button onClick={handleSync} disabled={syncing}>
                Synchroniser les skins
              </Button>
            </div>
          ) : viewMode === 'weapons' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWeapons.map((weaponName) => {
                const weaponSkins = weaponGroups[weaponName];
                const defaultSkin = weaponSkins.find(s => s.imageUrl)?.imageUrl;
                
                return (
                  <WeaponCard
                    key={weaponName}
                    weaponName={weaponName}
                    skinCount={weaponSkins.length}
                    defaultSkin={defaultSkin}
                    onClick={() => setSelectedWeapon(weaponName)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkins.map((skin) => (
                <div key={skin.id}>
                  <CardSkin
                    skin={skin}
                    onFavorite={() => handleToggleFavorite(skin.id)}
                    isFavorite={favorites.has(skin.id)}
                    showProbability={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <WeaponSkinsModal
        isOpen={selectedWeapon !== null}
        onClose={() => setSelectedWeapon(null)}
        weaponName={selectedWeapon || ''}
        skins={selectedWeaponSkins}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};
