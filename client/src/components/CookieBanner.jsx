import { useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem('cookie-consent')
  );

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.loadGA?.();
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem('cookie-consent', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">
          Ce site utilise des cookies pour vous offrir la meilleure expérience utilisateur possible. Acceptez-vous l'utilisation des cookies ?
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2 text-sm rounded-lg border border-gray-400 hover:bg-gray-700 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-lg bg-green-500 hover:bg-green-600 font-semibold transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
