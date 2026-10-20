/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CulinaryView } from './views/CulinaryView';
import { CultureView } from './views/CultureView';
import { RegionsView } from './views/RegionsView';
import { QuizView } from './views/QuizView';
import { FavoritesView } from './views/FavoritesView';
import { TourismView } from './views/TourismView';
import { UniversalSearchModal } from './components/UniversalSearchModal';
import { DishDetailModal } from './components/DishDetailModal';
import { CultureDetailModal } from './components/CultureDetailModal';
import { ProvinceDetailModal } from './components/ProvinceDetailModal';
import { AuthModal } from './components/AuthModal';
import { AuthConfigModal } from './components/AuthConfigModal';
import { Toast } from './components/Toast';
import { Dish, CultureArticle, ProvinceInfo, Region } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<Region>('bac');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<CultureArticle | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceInfo | null>(null);

  const {
    isFbConfigModalOpen,
    setIsFbConfigModalOpen,
    isGoogleConfigModalOpen,
    setIsGoogleConfigModalOpen,
  } = useAuth();

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRegionFromHome = (region: Region) => {
    setSelectedRegionFilter(region);
    setActiveTab('regions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectDish={(dish) => setSelectedDish(dish)}
            onSelectCulture={(article) => setSelectedCulture(article)}
            onSelectRegion={handleSelectRegionFromHome}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {activeTab === 'culinary' && (
          <CulinaryView
            onSelectDish={(dish) => setSelectedDish(dish)}
            initialRegion="all"
          />
        )}

        {activeTab === 'culture' && (
          <CultureView
            onSelectCulture={(article) => setSelectedCulture(article)}
          />
        )}

        {activeTab === 'regions' && (
          <RegionsView
            defaultRegion={selectedRegionFilter}
            onSelectProvince={(province) => setSelectedProvince(province)}
            onSelectDish={(dish) => setSelectedDish(dish)}
          />
        )}

        {activeTab === 'tourism' && (
          <TourismView
            onSelectDish={(dish) => setSelectedDish(dish)}
          />
        )}

        {activeTab === 'quiz' && <QuizView />}

        {activeTab === 'favorites' && (
          <FavoritesView
            onSelectDish={(dish) => setSelectedDish(dish)}
            onSelectCulture={(article) => setSelectedCulture(article)}
            onSelectProvince={(province) => setSelectedProvince(province)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Universal Search Modal */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDish={(dish) => setSelectedDish(dish)}
        onSelectCulture={(article) => setSelectedCulture(article)}
        onSelectProvince={(province) => setSelectedProvince(province)}
      />

      {/* User Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Facebook SDK Configuration Assistant Modal */}
      <AuthConfigModal
        isOpen={isFbConfigModalOpen}
        onClose={() => setIsFbConfigModalOpen(false)}
        type="facebook"
      />

      {/* Google Sign-In Configuration Assistant Modal */}
      <AuthConfigModal
        isOpen={isGoogleConfigModalOpen}
        onClose={() => setIsGoogleConfigModalOpen(false)}
        type="google"
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      {/* Culture Detail Modal */}
      <CultureDetailModal
        article={selectedCulture}
        onClose={() => setSelectedCulture(null)}
      />

      {/* Province Detail Modal */}
      <ProvinceDetailModal
        province={selectedProvince}
        onClose={() => setSelectedProvince(null)}
        onSelectDish={(dish) => setSelectedDish(dish)}
      />

      {/* Global Toast Alerts */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
