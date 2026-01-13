import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900">
      <nav className="bg-black/50 backdrop-blur-lg border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Valorant Tracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Mon Profil
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bienvenue {user?.username || user?.email} !
          </h2>
          <p className="text-xl text-gray-300">
            Suivez vos statistiques Valorant en temps réel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Profil Valorant</h3>
            <p className="text-gray-400">
              Consultez votre rang, MMR et statistiques de jeu
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Historique des matchs</h3>
            <p className="text-gray-400">
              Analysez vos dernières parties et performances
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Boutique journalière</h3>
            <p className="text-gray-400">
              Découvrez les skins disponibles aujourd'hui
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Skins favoris</h3>
            <p className="text-gray-400">
              Suivez vos skins préférés et leurs probabilités
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Estimations</h3>
            <p className="text-gray-400">
              Probabilités d'apparition des skins en boutique
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Paramètres</h3>
            <p className="text-gray-400">
              Gérez votre compte et vos préférences
            </p>
          </div>
        </div>

        {user?.riotId ? (
          <div className="mt-12 bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-red-500/20 text-center">
            <h3 className="text-2xl font-semibold text-white mb-2">Riot ID configuré</h3>
            <p className="text-gray-300 text-lg">{user.riotId}</p>
          </div>
        ) : (
          <div className="mt-12 bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-yellow-500/20 text-center">
            <h3 className="text-2xl font-semibold text-white mb-2">Configurez votre Riot ID</h3>
            <p className="text-gray-300 mb-4">
              Ajoutez votre Riot ID dans votre profil pour accéder à toutes les fonctionnalités
            </p>
            <Link
              to="/profile"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
            >
              Configurer maintenant
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
