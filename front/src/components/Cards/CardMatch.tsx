import type { Match } from '../../services/valorantService';
import { getAgentImage, getMapImage } from '../../utils/valorantAssets';

interface CardMatchProps {
  match: Match;
}

export const CardMatch = ({ match }: CardMatchProps) => {
  const kda = match.deaths > 0 ? ((match.kills + match.assists) / match.deaths).toFixed(2) : match.kills + match.assists;

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
      </div>
    </div>
  );
};
