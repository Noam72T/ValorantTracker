import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { Loading } from '../components/UI/Loading';
import { Button } from '../components/UI/Button';
import { CardMatch } from '../components/Cards/CardMatch';
import { valorantService, type Match } from '../services/valorantService';
import { getRankIcon } from '../utils/rankIcons';
import { TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';

export const Tracker = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [matchSize, setMatchSize] = useState<number>(20);

  const fetchData = async () => {
    if (!user?.riotId) {
      setLoading(false);
      return;
    }

    try {
      setError('');
      const [playerStats, storedMatches] = await Promise.all([
        valorantService.getPlayerStats(),
        valorantService.getStoredMatches(matchSize, 0)
      ]);

      setStats(playerStats);
      
      // Filtrer les matchs par mode si nécessaire
      let filteredMatches = storedMatches.matches;
      if (selectedMode !== 'all') {
        filteredMatches = storedMatches.matches.filter(
          (match: Match) => match.gameMode.toLowerCase() === selectedMode.toLowerCase()
        );
      }
      
      setMatches(filteredMatches);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Récupérer les matchs selon le mode sélectionné
      const mode = selectedMode === 'all' ? 'competitive' : selectedMode;
      await valorantService.getMatchHistory(mode, matchSize);
      await fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, selectedMode, matchSize]);

  const calculateWinRate = () => {
    if (matches.length === 0) return 0;
    const wins = matches.filter(m => m.won).length;
    return Math.round((wins / matches.length) * 100);
  };

  const calculateAvgKDA = () => {
    if (matches.length === 0) return '0.00';
    const totalKDA = matches.reduce((acc, m) => {
      const kda = m.deaths > 0 ? (m.kills + m.assists) / m.deaths : m.kills + m.assists;
      return acc + kda;
    }, 0);
    return (totalKDA / matches.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Tracker Valorant
              </h1>
              <p className="text-gray-400">Vos statistiques et historique de matchs</p>
            </div>

            {user?.riotId && (
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-500/20"
              >
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Mise à jour...' : 'Actualiser'}
              </Button>
            )}
          </div>

          {user?.riotId && (
            <div className="flex flex-wrap gap-3 items-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-5">
              <div className="flex items-center gap-3">
                <label className="text-gray-400 text-sm font-medium">Mode de jeu</label>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="all">Tous les modes</option>
                  <option value="competitive">Compétitif</option>
                  <option value="unrated">Non classé</option>
                  <option value="spikerush">Spike Rush</option>
                  <option value="deathmatch">Deathmatch</option>
                  <option value="escalation">Escalation</option>
                  <option value="replication">Replication</option>
                  <option value="snowball">Snowball Fight</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-gray-400 text-sm font-medium">Nombre de matchs</label>
                <select
                  value={matchSize}
                  onChange={(e) => setMatchSize(Number(e.target.value))}
                  className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value={10}>10 matchs</option>
                  <option value={20}>20 matchs</option>
                  <option value={30}>30 matchs</option>
                  <option value={50}>50 matchs</option>
                </select>
              </div>

              <div className="ml-auto bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/50">
                <span className="text-gray-400 text-sm">
                  <span className="text-white font-bold">{matches.length}</span> match{matches.length > 1 ? 's' : ''} affiché{matches.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        {!user?.riotId ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
            <AlertCircle className="text-yellow-500 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-semibold text-yellow-500 mb-2">
              Riot ID non configuré
            </h3>
            <p className="text-gray-300 mb-6">
              Veuillez ajouter votre Riot ID dans votre profil pour accéder au tracker.
            </p>
            <Button onClick={() => window.location.href = '/profile'}>
              Configurer mon Riot ID
            </Button>
          </div>
        ) : loading ? (
          <Loading message="Chargement de vos statistiques..." />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="text-gray-400 text-sm">Rang Actuel</h3>
                      <p className="text-white text-xl font-bold">
                        {stats.mmr?.currenttierpatched || 'Non classé'}
                      </p>
                    </div>
                    <img 
                      src={getRankIcon(stats.mmr?.currenttierpatched)} 
                      alt="Rank Icon"
                      className="w-16 h-16 object-contain ml-auto"
                    />
                  </div>
                  <div className="text-center pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Rating Points</p>
                    <p className="text-white text-2xl font-bold">
                      {stats.mmr?.ranking_in_tier ?? 0} RR
                    </p>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm">Taux de victoire</h3>
                      <p className="text-white text-xl font-bold">{calculateWinRate()}%</p>
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Matchs joués</p>
                    <p className="text-white text-2xl font-bold">{matches.length}</p>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm">KDA Moyen</h3>
                      <p className="text-white text-xl font-bold">{calculateAvgKDA()}</p>
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Performance</p>
                    <p className={`text-xl font-bold ${
                      parseFloat(calculateAvgKDA()) >= 1.5 ? 'text-green-500' :
                      parseFloat(calculateAvgKDA()) >= 1.0 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {parseFloat(calculateAvgKDA()) >= 1.5 ? 'Excellent' :
                       parseFloat(calculateAvgKDA()) >= 1.0 ? 'Bon' : 'À améliorer'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Historique des matchs</h2>
                {selectedMode !== 'all' && (
                  <span className="text-sm text-gray-300 bg-red-500/20 border border-red-500/30 px-4 py-1.5 rounded-full font-medium">
                    Filtré: <span className="text-red-400">{selectedMode}</span>
                  </span>
                )}
              </div>

              {matches.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-gray-600" size={40} />
                  </div>
                  <p className="text-gray-300 text-lg font-semibold mb-2">
                    {selectedMode !== 'all' 
                      ? `Aucun match ${selectedMode} trouvé` 
                      : 'Aucun match trouvé'}
                  </p>
                  <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                    Cliquez sur "Actualiser" pour charger vos derniers matchs depuis l'API Valorant
                  </p>
                  <Button 
                    onClick={handleRefresh} 
                    disabled={refreshing}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold"
                  >
                    {refreshing ? 'Chargement...' : 'Charger mes matchs'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {matches.map((match) => (
                    <CardMatch key={match.matchId} match={match} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};
