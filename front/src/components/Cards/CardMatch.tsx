import { useState } from 'react';
import type { Match } from '../../services/valorantService';
import { getAgentImage, getMapImage } from '../../utils/valorantAssets';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

interface CardMatchProps {
  match: Match;
}

export const CardMatch = ({ match }: CardMatchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const kda = match.deaths > 0 ? ((match.kills + match.assists) / match.deaths).toFixed(2) : match.kills + match.assists;

  // Extraire les joueurs du metadata
  const allPlayers = match.metadata?.players?.all_players || [];
  const redTeam = allPlayers.filter((p: any) => p.team === 'Red');
  const blueTeam = allPlayers.filter((p: any) => p.team === 'Blue');

  const calculatePlayerKDA = (player: any) => {
    const kills = player.stats?.kills || 0;
    const deaths = player.stats?.deaths || 0;
    const assists = player.stats?.assists || 0;
    return deaths > 0 ? ((kills + assists) / deaths).toFixed(2) : (kills + assists).toFixed(2);
  };

  return (
    <div className={`bg-gray-800 rounded border ${
      match.won ? 'border-green-600' : 'border-red-600'
    } overflow-hidden relative`}>
      <div className="absolute inset-0 opacity-10">
        <img src={getMapImage(match.map)} alt={match.map} className="w-full h-full object-cover" />
      </div>
      
      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded overflow-hidden border-2 border-gray-700">
              <img src={getAgentImage(match.agent)} alt={match.agent} className="w-full h-full object-cover" />
              <div className={`absolute top-0 right-0 px-1.5 py-0.5 text-xs font-bold ${
                match.won ? 'bg-green-600' : 'bg-red-600'
              } text-white`}>
                {match.won ? 'V' : 'D'}
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-1">
                {match.won ? 'Victoire' : 'Défaite'}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">{match.gameMode}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">{match.map}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-white font-bold text-lg mb-1">
              {match.roundsWon} - {match.roundsLost}
            </p>
            <p className="text-gray-500 text-xs">
              {match.matchDate ? new Date(match.matchDate).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit'
              }) : 'Date inconnue'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          <div className="bg-gray-700 rounded p-2 border border-gray-600">
            <p className="text-gray-400 text-xs mb-1">Agent</p>
            <p className="text-white font-bold text-sm">{match.agent}</p>
          </div>

          <div className="bg-gray-700 rounded p-2 border border-gray-600">
            <p className="text-gray-400 text-xs mb-1">K/D/A</p>
            <p className="text-white font-bold text-sm">
              <span className="text-green-400">{match.kills}</span>
              <span className="text-gray-500">/</span>
              <span className="text-red-400">{match.deaths}</span>
              <span className="text-gray-500">/</span>
              <span className="text-blue-400">{match.assists}</span>
            </p>
          </div>

          <div className="bg-gray-700 rounded p-2 border border-gray-600">
            <p className="text-gray-400 text-xs mb-1">KDA</p>
            <p className={`font-bold text-sm ${
              parseFloat(kda.toString()) >= 1.5 ? 'text-green-500' : 
              parseFloat(kda.toString()) >= 1.0 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {kda}
            </p>
          </div>

          <div className="bg-gray-700 rounded p-2 border border-gray-600">
            <p className="text-gray-400 text-xs mb-1">Score</p>
            <p className="text-white font-bold text-sm">{match.score}</p>
          </div>
        </div>

        {match.rrChange !== undefined && match.rrChange !== null && (
          <div className="mt-2 flex items-center justify-between bg-gray-700 rounded p-2 border border-gray-600">
            <span className="text-gray-400 text-sm">RR</span>
            <span className={`font-bold ${
              match.rrChange > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {match.rrChange > 0 ? '+' : ''}{match.rrChange}
            </span>
          </div>
        )}

        {/* Bouton pour afficher les détails des joueurs */}
        {allPlayers.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 rounded p-3 border border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                <span className="text-white font-semibold text-sm">Statistiques des joueurs</span>
                <span className="text-gray-400 text-xs">({allPlayers.length} joueurs)</span>
              </div>
              {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>

            {/* Menu déroulant avec les stats des joueurs */}
            {isExpanded && (
              <div className="mt-2 bg-gray-900 rounded border border-gray-600 overflow-hidden">
                {/* Équipe Rouge */}
                {redTeam.length > 0 && (
                  <div className="border-b border-gray-700">
                    <div className="bg-red-900/30 px-3 py-2 border-b border-red-800/50">
                      <h4 className="text-red-400 font-bold text-sm flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Équipe Rouge
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-700">
                      {redTeam.map((player: any, idx: number) => (
                        <div key={idx} className="p-3 hover:bg-gray-800/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <img 
                                src={getAgentImage(player.character)} 
                                alt={player.character} 
                                className="w-8 h-8 rounded border border-gray-600"
                              />
                              <div>
                                <p className="text-white font-semibold text-sm">{player.name}#{player.tag}</p>
                                <p className="text-gray-400 text-xs">{player.character}</p>
                              </div>
                            </div>
                            {player.currenttier_patched && (
                              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                {player.currenttier_patched}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">K/D/A</p>
                              <p className="text-white font-bold">
                                <span className="text-green-400">{player.stats?.kills || 0}</span>/
                                <span className="text-red-400">{player.stats?.deaths || 0}</span>/
                                <span className="text-blue-400">{player.stats?.assists || 0}</span>
                              </p>
                            </div>
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">KDA</p>
                              <p className="text-yellow-400 font-bold">{calculatePlayerKDA(player)}</p>
                            </div>
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">Score</p>
                              <p className="text-white font-bold">{player.stats?.score || 0}</p>
                            </div>
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">HS%</p>
                              <p className="text-purple-400 font-bold">{player.stats?.headshots || 0}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Équipe Bleue */}
                {blueTeam.length > 0 && (
                  <div>
                    <div className="bg-blue-900/30 px-3 py-2 border-b border-blue-800/50">
                      <h4 className="text-blue-400 font-bold text-sm flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        Équipe Bleue
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-700">
                      {blueTeam.map((player: any, idx: number) => (
                        <div key={idx} className="p-3 hover:bg-gray-800/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <img 
                                src={getAgentImage(player.character)} 
                                alt={player.character} 
                                className="w-8 h-8 rounded border border-gray-600"
                              />
                              <div>
                                <p className="text-white font-semibold text-sm">{player.name}#{player.tag}</p>
                                <p className="text-gray-400 text-xs">{player.character}</p>
                              </div>
                            </div>
                            {player.currenttier_patched && (
                              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                {player.currenttier_patched}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">K/D/A</p>
                              <p className="text-white font-bold">
                                <span className="text-green-400">{player.stats?.kills || 0}</span>/
                                <span className="text-red-400">{player.stats?.deaths || 0}</span>/
                                <span className="text-blue-400">{player.stats?.assists || 0}</span>
                              </p>
                            </div>
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">KDA</p>
                              <p className="text-yellow-400 font-bold">{calculatePlayerKDA(player)}</p>
                            </div>
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">Score</p>
                              <p className="text-white font-bold">{player.stats?.score || 0}</p>
                            </div>
                            <div className="bg-gray-800 rounded p-1.5 text-center">
                              <p className="text-gray-400 mb-0.5">HS%</p>
                              <p className="text-purple-400 font-bold">{player.stats?.headshots || 0}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
