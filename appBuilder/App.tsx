import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import InteractiveBuilder from './components/InteractiveBuilder';
import SettingsPage from './components/SettingsPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<InteractiveBuilder />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;