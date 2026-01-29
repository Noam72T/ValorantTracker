// Service pour récupérer les skins depuis l'API Valorant officielle
import axios from 'axios';

const VALORANT_API_BASE = 'https://valorant-api.com/v1';

export interface ValorantSkin {
  uuid: string;
  displayName: string;
  themeUuid: string;
  contentTierUuid: string | null;
  displayIcon: string;
  wallpaper: string | null;
  assetPath: string;
  chromas: Array<{
    uuid: string;
    displayName: string;
    displayIcon: string;
    fullRender: string;
    swatch: string | null;
    streamedVideo: string | null;
    assetPath: string;
  }>;
  levels: Array<{
    uuid: string;
    displayName: string;
    levelItem: string | null;
    displayIcon: string;
    streamedVideo: string | null;
    assetPath: string;
  }>;
}

export interface ValorantWeapon {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  weaponStats: any;
  shopData: any;
  skins: ValorantSkin[];
}

// Cache pour éviter de refaire les requêtes
let skinsCache: ValorantSkin[] | null = null;

export const fetchAllSkins = async (): Promise<ValorantSkin[]> => {
  if (skinsCache) {
    return skinsCache;
  }

  try {
    const response = await axios.get<{ status: number; data: ValorantWeapon[] }>(
      `${VALORANT_API_BASE}/weapons`
    );

    if (response.data.status === 200) {
      // Extraire tous les skins de toutes les armes
      const allSkins: ValorantSkin[] = [];
      
      response.data.data.forEach(weapon => {
        weapon.skins.forEach(skin => {
          // Filtrer les skins par défaut et ceux sans image
          if (skin.displayIcon && !skin.displayName.includes('Standard')) {
            allSkins.push(skin);
          }
        });
      });

      skinsCache = allSkins;
      return allSkins;
    }
    
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des skins:', error);
    return [];
  }
};

// Fonction pour obtenir des skins aléatoires pour la boutique quotidienne
export const getDailySkinsFromAPI = async (): Promise<ValorantSkin[]> => {
  const allSkins = await fetchAllSkins();
  
  if (allSkins.length === 0) {
    return [];
  }

  // Utiliser la date comme seed pour un random déterministe
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const seed = today.getTime();
  
  const seededRandom = (s: number) => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };
  
  // Mélanger le tableau avec le seed du jour
  const shuffled = [...allSkins];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Retourner 4 skins pour la boutique quotidienne
  return shuffled.slice(0, 4);
};

// Fonction pour obtenir le temps restant avant le reset
export const getTimeUntilReset = (): { hours: number; minutes: number; seconds: number } => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
};
