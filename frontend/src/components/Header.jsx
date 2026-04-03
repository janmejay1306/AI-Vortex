import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function Header({ onMenuToggle, onNavigate }) {
  const { settings } = useSettings();
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, text: 'Your fitness post reached 12K views!', time: '2h ago' },
    { id: 2, text: 'New trending topic: "AI in Education"', time: '4h ago' },
    { id: 3, text: 'Weekly analytics report is ready', time: '1d ago' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-8 h-16">
        {/* Left — Mobile menu + Title */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuToggle}
                  className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100
                             text-gray-600 border-none cursor-pointer text-sm font-bold">
            =
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              AI Powered Viral Content & Digital Marketing Assistant
            </h1>
            <p className="text-xs hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
              Create Smarter &bull; Post Better &bull; Grow Faster
            </p>
          </div>
        </div>

        {/* Right — Notifications + Avatar */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button onClick={() => setShowNotif(!showNotif)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50
                               hover:bg-gray-100 transition-colors cursor-pointer border-none relative">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Dropdown */}
            {showNotif && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  <span className="text-xs text-purple-600 font-medium cursor-pointer">Mark all read</span>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <button onClick={() => onNavigate('profile')}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold
                             cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-all"
                  style={{ background: 'var(--gradient-primary)' }}>
            {settings.name ? settings.name[0].toUpperCase() : 'U'}
          </button>
        </div>
      </div>

      {/* Click outside to close notifications */}
      {showNotif && (
        <div className="fixed inset-0 z-30" onClick={() => setShowNotif(false)} />
      )}
    </header>
  );
}
