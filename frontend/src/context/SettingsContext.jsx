import { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  // Profile
  name: 'Janmejay Sharma',
  email: 'janmejay@example.com',
  bio: 'Digital Creator • Content Strategist • Tech Enthusiast',

  // Content Preferences
  defaultPlatform: 'instagram',
  toneOfVoice: 'professional',
  hashtagCount: '6',
  captionLength: 'medium',
  contentLanguage: 'en',
  includeEmojis: true,
  includeCTA: true,

  // Generation
  captionVariations: '3',
  autoGenerateHook: true,
  autoGenerateHashtags: true,

  // Notifications
  pushNotifications: true,
  emailDigest: true,
  trendAlerts: true,
  weeklyReport: true,
  performanceAlerts: false,

  // Privacy & Data
  autoSaveHistory: true,
  shareAnalytics: false,
  publicProfile: false,

  // Appearance
  compactMode: false,
  animationsEnabled: true,
  showTrendingSection: true,
  showEngagementChart: true,
  dashboardLayout: 'default',

  // API & Integration
  apiEndpoint: 'http://localhost:8000/api',
  requestTimeout: '10',
};

const STORAGE_KEY = 'ai-vortex-settings';

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch {}
  return { ...DEFAULT_SETTINGS };
}

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateSettings = (updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings({ ...DEFAULT_SETTINGS });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

export { DEFAULT_SETTINGS };
