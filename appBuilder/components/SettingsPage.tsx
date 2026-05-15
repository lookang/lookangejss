
import React, { useState, useEffect } from 'react';
import { type ApiKeys } from '../types';

const SettingsPage: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openAI: '',
    claude: '',
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem('apiKeys');
      if (savedKeys) {
        const parsedKeys = JSON.parse(savedKeys);
        setApiKeys({
          openAI: parsedKeys.openAI || '',
          claude: parsedKeys.claude || '',
        });
      }
    } catch (error) {
      console.error("Failed to load API keys from localStorage:", error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiKeys(prevKeys => ({ ...prevKeys, [name]: value }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error("Failed to save API keys to localStorage:", error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">API Settings</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <p className="text-gray-400 mb-6">
          Your API keys for other services are stored securely in your browser's local storage and are never sent to our servers. The Google Gemini API is configured automatically and does not require a key here.
        </p>
        <div className="space-y-6">
          <div>
            <label htmlFor="openAI" className="block text-sm font-medium text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="openAI"
              name="openAI"
              value={apiKeys.openAI}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Enter your OpenAI API Key"
            />
          </div>
          <div>
            <label htmlFor="claude" className="block text-sm font-medium text-gray-300 mb-2">
              Anthropic Claude API Key
            </label>
            <input
              type="password"
              id="claude"
              name="claude"
              value={apiKeys.claude}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Enter your Claude API Key"
            />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end">
          {saveStatus === 'saved' && <span className="text-green-400 mr-4">Settings saved!</span>}
          {saveStatus === 'error' && <span className="text-red-400 mr-4">Failed to save.</span>}
          <button
            onClick={handleSave}
            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;