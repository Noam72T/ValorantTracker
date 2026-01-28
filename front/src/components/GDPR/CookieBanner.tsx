import { useState, useEffect } from 'react';
import { Button } from '../UI/Button';

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-gray-300">
            <p className="mb-2 text-white font-bold">🍪 Cookies</p>
            <p>
              Ce site utilise des cookies pour fonctionner. En acceptant, vous acceptez notre politique RGPD.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleReject} variant="secondary">
              Refuser
            </Button>
            <Button onClick={handleAccept} variant="primary">
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
