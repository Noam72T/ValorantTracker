import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { gdprService, type ConsentData } from '../services/gdprService';
import { Button } from '../components/UI/Button';
import { Loading } from '../components/UI/Loading';

export const Privacy = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consent, setConsent] = useState<ConsentData | null>(null);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [password, setPassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadConsentStatus();
  }, []);

  const loadConsentStatus = async () => {
    if (!token) return;
    try {
      const data = await gdprService.getConsent(token);
      setConsent(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsentChange = async (field: keyof ConsentData, value: boolean) => {
    if (!token || !consent) return;
    setSaving(true);
    try {
      const updated = await gdprService.updateConsent(token, { [field]: value });
      setConsent({ ...consent, ...updated });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    if (!token) return;
    setExporting(true);
    try {
      const data = await gdprService.exportData(token);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `valorant-tracker-data-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setExporting(false);
    }
  };

  const handleRequestDeletion = async () => {
    if (!token) return;
    if (!confirm('Supprimer votre compte dans 30 jours ?')) {
      return;
    }
    setDeleting(true);
    try {
      await gdprService.requestDelete(token);
      await loadConsentStatus();
      alert('Suppression programmée dans 30 jours');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDeletion = async () => {
    if (!token) return;
    setDeleting(true);
    try {
      await gdprService.cancelDelete(token);
      await loadConsentStatus();
      alert('Suppression annulée');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!token || !password) return;
    setDeleting(true);
    try {
      await gdprService.deleteNow(token, password);
      alert('Compte supprimé');
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur. Vérifiez votre mot de passe.');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
      setPassword('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 rounded border border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Confidentialité et RGPD</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Gestion des consentements</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Consentement général</h3>
                    <p className="text-sm text-gray-400">Accepter les conditions d'utilisation</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent?.consentGiven || false}
                      onChange={(e) => handleConsentChange('consentGiven', e.target.checked)}
                      disabled={saving}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Traitement des données</h3>
                    <p className="text-sm text-gray-400">Autoriser le traitement de vos données personnelles</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent?.dataProcessingConsent || false}
                      onChange={(e) => handleConsentChange('dataProcessingConsent', e.target.checked)}
                      disabled={saving}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Communications marketing</h3>
                    <p className="text-sm text-gray-400">Recevoir des informations sur les nouveautés</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent?.marketingConsent || false}
                      onChange={(e) => handleConsentChange('marketingConsent', e.target.checked)}
                      disabled={saving}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Vos droits RGPD</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Droit d'accès et de portabilité</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Téléchargez toutes vos données personnelles au format JSON
                  </p>
                  <Button
                    onClick={handleExportData}
                    disabled={exporting}
                    variant="secondary"
                  >
                    {exporting ? 'Export en cours...' : 'Exporter mes données'}
                  </Button>
                </div>

                {consent?.deletionRequestedAt ? (
                  <div className="p-4 bg-yellow-900 border border-yellow-700 rounded-lg">
                    <h3 className="text-white font-medium mb-2">⚠️ Suppression programmée</h3>
                    <p className="text-sm text-gray-300 mb-4">
                      Votre compte sera supprimé le {new Date(new Date(consent.deletionRequestedAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
                    </p>
                    <Button
                      onClick={handleCancelDeletion}
                      disabled={deleting}
                      variant="secondary"
                    >
                      Annuler la suppression
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Droit à l'oubli</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Demander la suppression de votre compte et de toutes vos données (effective dans 30 jours)
                    </p>
                    <Button
                      onClick={handleRequestDeletion}
                      disabled={deleting}
                      variant="danger"
                    >
                      Demander la suppression
                    </Button>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Zone de danger</h2>
              <div className="p-4 bg-red-900 border border-red-700 rounded-lg">
                <h3 className="text-white font-medium mb-2">Suppression immédiate du compte</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Cette action est irréversible et supprimera immédiatement toutes vos données.
                </p>
                {!showDeleteConfirm ? (
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    variant="danger"
                  >
                    Supprimer mon compte maintenant
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe pour confirmer"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                    <div className="flex gap-3">
                      <Button
                        onClick={handleDeleteAccount}
                        disabled={deleting || !password}
                        variant="danger"
                      >
                        Confirmer la suppression
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setPassword('');
                        }}
                        variant="secondary"
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="text-sm text-gray-400">
              <h2 className="text-lg font-semibold text-white mb-3">À propos de vos données</h2>
              <p className="mb-2">
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité 
                et de suppression de vos données personnelles.
              </p>
              <p>
                Pour toute question concernant vos données personnelles, contactez-nous à privacy@valoranttracker.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
