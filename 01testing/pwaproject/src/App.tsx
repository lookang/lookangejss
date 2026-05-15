import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Wifi, WifiOff } from 'lucide-react';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });

    // PWA update available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setIsUpdateAvailable(true);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      setInstallPrompt(null);
    }
  };

  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">PWA Demo</h1>
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="text-green-500" size={24} />
              ) : (
                <WifiOff className="text-red-500" size={24} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                Connection Status: 
                <span className={isOnline ? "text-green-500" : "text-red-500"}>
                  {isOnline ? " Online" : " Offline"}
                </span>
              </p>
            </div>

            {installPrompt && (
              <button
                onClick={handleInstall}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download size={20} />
                <span>Install App</span>
              </button>
            )}

            {isUpdateAvailable && (
              <button
                onClick={handleUpdate}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw size={20} />
                <span>Update Available - Click to Refresh</span>
              </button>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-semibold text-blue-800 mb-2">PWA Features:</h2>
              <ul className="list-disc list-inside text-blue-600 space-y-1">
                <li>Works offline</li>
                <li>Installable on devices</li>
                <li>Automatic updates</li>
                <li>Native app-like experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;