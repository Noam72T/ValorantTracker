import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    riotId: user?.riotId || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        riotId: user.riotId || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await authService.updateProfile(formData);
      updateUser(response.data.user);
      setSuccess('Profil mis à jour avec succès');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);

    try {
      await authService.updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('Mot de passe mis à jour avec succès');
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-red-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Mon Profil</h1>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">Informations du compte</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    >
                      Modifier
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-white text-lg">{user.email}</p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <p className="text-gray-400 text-sm mb-1">Nom d'utilisateur</p>
                      <p className="text-white text-lg">{user.username || 'Non défini'}</p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <p className="text-gray-400 text-sm mb-1">Riot ID</p>
                      <p className="text-white text-lg">{user.riotId || 'Non défini'}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nom d'utilisateur
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Riot ID
                      </label>
                      <input
                        type="text"
                        value={formData.riotId}
                        onChange={(e) => setFormData({ ...formData, riotId: e.target.value })}
                        placeholder="Pseudo#TAG"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
                      >
                        {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            username: user.username || '',
                            riotId: user.riotId || '',
                            email: user.email || '',
                          });
                        }}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="border-t border-gray-700 pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">Sécurité</h2>
                  {!isChangingPassword && (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    >
                      Changer le mot de passe
                    </button>
                  )}
                </div>

                {isChangingPassword && (
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
                      >
                        {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        }}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="border-t border-gray-700 pt-8">
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
