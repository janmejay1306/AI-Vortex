import { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/Dashboard';
import TrendsPage from './pages/Trends';
import ContentCreator from './pages/ContentCreator';
import ViralPrediction from './pages/ViralPrediction';
import Analytics from './pages/Analytics';
import StrategyGenerator from './pages/StrategyGenerator';
import History from './pages/History';
import ProfilePage from './pages/Profile';
import Settings from './pages/Settings';

const PAGES = {
  dashboard: DashboardPage,
  trends: TrendsPage,
  creator: ContentCreator,
  viral: ViralPrediction,
  analytics: Analytics,
  strategy: StrategyGenerator,
  history: History,
  profile: ProfilePage,
  settings: Settings,
};

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PageComponent = PAGES[activePage] || DashboardPage;

  const navigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={navigate}
        />
        <main className="flex-1" key={activePage}>
          <PageComponent onNavigate={navigate} />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
