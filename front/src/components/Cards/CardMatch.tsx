import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import type { Match } from '../../services/valorantService';

interface CardMatchProps {
  match: Match;
}

export const CardMatch = ({ match }: CardMatchProps) => {
  const kda = match.deaths > 0 ? ((match.kills + match.assists) / match.deaths).toFixed(2) : match.kills + match.assists;

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 transition-all hover:border-gray-600 overflow-hidden ${
      match.won ? 'hover:shadow-green-500/10' : 'hover:shadow-red-500/10'
    } hover:shadow-lg`}>
      <div className={`h-1 ${match.won ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`} />
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center ${
              match.won ? 'bg-green-500/10' : 'bg-red-500/10'
            }`}>
              <Trophy className={match.won ? 'text-green-500' : 'text-red-500'} size={28} />
              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                match.won ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {match.won ? 'V' : 'D'}
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                {match.won ? 'Victoire' : 'Défaite'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">{match.gameMode}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-sm">{match.map}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-white font-bold text-xl mb-1">
              {match.roundsWon} - {match.roundsLost}
            </p>
            <p className="text-gray-500 text-xs">
              {match.matchDate ? new Date(match.matchDate).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }) : 'Date inconnue'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1.5">Agent</p>
            <p className="text-white font-bold text-sm">{match.agent}</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1.5">K/D/A</p>
            <p className="text-white font-bold text-sm">
              <span className="text-green-400">{match.kills}</span>
              <span className="text-gray-600 mx-1">/</span>
              <span className="text-red-400">{match.deaths}</span>
              <span className="text-gray-600 mx-1">/</span>
              <span className="text-blue-400">{match.assists}</span>
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1.5">KDA</p>
            <p className={`font-bold text-sm ${
              parseFloat(kda.toString()) >= 1.5 ? 'text-green-500' : 
              parseFloat(kda.toString()) >= 1.0 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {kda}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1.5">Score</p>
            <p className="text-white font-bold text-sm">{match.score}</p>
          </div>
        </div>

        {match.rrChange !== undefined && match.rrChange !== null && (
          <div className="mt-3 flex items-center justify-between bg-gray-800/30 rounded-xl p-3 border border-gray-700/30">
            <span className="text-gray-400 text-sm font-medium">Changement RR</span>
            <div className="flex items-center gap-2">
              {match.rrChange > 0 ? (
                <TrendingUp className="text-green-500" size={18} />
              ) : (
                <TrendingDown className="text-red-500" size={18} />
              )}
              <span className={`font-bold text-lg ${
                match.rrChange > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {match.rrChange > 0 ? '+' : ''}{match.rrChange}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
