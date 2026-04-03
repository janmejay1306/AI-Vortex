import { useState } from 'react';
import { useSettings, DEFAULT_SETTINGS } from '../context/SettingsContext';

/* ─── Toggle Switch ──────────────────────────────────── */
function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)}
            className="w-11 h-6 rounded-full transition-all duration-300 cursor-pointer border-none relative shrink-0"
            style={{ background: value ? '#7c3aed' : '#d1d5db' }}>
      <div className="w-4.5 h-4.5 bg-white rounded-full absolute top-[3px] transition-all duration-300 shadow-sm"
           style={{ left: value ? '22px' : '3px', width: '18px', height: '18px' }} />
    </button>
  );
}

/* ─── Section Header ─────────────────────────────────── */
function SectionHeader({ title, description }) {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-sm">{title}</h3>
      {description && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{description}</p>}
    </div>
  );
}

/* ─── Input Field ────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      {children}
    </div>
  );
}

/* ─── Toggle Row ─────────────────────────────────────── */
function ToggleRow({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <div className="pr-4">
        <p className="text-sm font-medium">{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</p>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}

/* ─── Input Class ────────────────────────────────────── */
const inputClass = `w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none
                    focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-gray-50
                    transition-all`;

const selectClass = `w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none
                     bg-gray-50 cursor-pointer focus:ring-2 focus:ring-purple-300 focus:border-transparent
                     transition-all`;

/* ─── Settings Page ──────────────────────────────────── */
export default function Settings() {
  const { settings, updateSetting, resetSettings } = useSettings();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showReset, setShowReset] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    resetSettings();
    setShowReset(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'content', label: 'Content' },
    { id: 'generation', label: 'Generation' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy & Data' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'advanced', label: 'Advanced' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold">Settings</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Manage your account, content preferences, and application behavior
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border-none
                                whitespace-nowrap ${activeTab === t.id
                                  ? 'bg-purple-600 text-white shadow-sm'
                                  : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ════════════ PROFILE TAB ════════════ */}
        {activeTab === 'profile' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <SectionHeader title="Personal Information" description="Update your display name, email, and bio" />
              <div className="space-y-4">
                <Field label="Full Name">
                  <input value={settings.name} onChange={e => updateSetting('name', e.target.value)}
                         className={inputClass} placeholder="Your full name" />
                </Field>
                <Field label="Email Address">
                  <input type="email" value={settings.email} onChange={e => updateSetting('email', e.target.value)}
                         className={inputClass} placeholder="your@email.com" />
                </Field>
                <Field label="Bio">
                  <textarea value={settings.bio} onChange={e => updateSetting('bio', e.target.value)}
                            className={`${inputClass} resize-none h-20`}
                            placeholder="Tell us about yourself..." />
                </Field>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ CONTENT TAB ════════════ */}
        {activeTab === 'content' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <SectionHeader title="Content Preferences" description="Configure how your content is generated" />
              <div className="space-y-4">
                <Field label="Default Platform">
                  <select value={settings.defaultPlatform} onChange={e => updateSetting('defaultPlatform', e.target.value)}
                          className={selectClass}>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">X / Twitter</option>
                  </select>
                </Field>
                <Field label="Tone of Voice">
                  <select value={settings.toneOfVoice} onChange={e => updateSetting('toneOfVoice', e.target.value)}
                          className={selectClass}>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual & Friendly</option>
                    <option value="motivational">Motivational</option>
                    <option value="educational">Educational</option>
                    <option value="humorous">Humorous</option>
                    <option value="storytelling">Storytelling</option>
                    <option value="authoritative">Authoritative</option>
                  </select>
                </Field>
                <Field label="Caption Length">
                  <select value={settings.captionLength} onChange={e => updateSetting('captionLength', e.target.value)}
                          className={selectClass}>
                    <option value="short">Short (1-2 lines)</option>
                    <option value="medium">Medium (2-4 lines)</option>
                    <option value="long">Long (4-6 lines)</option>
                  </select>
                </Field>
                <Field label="Content Language">
                  <select value={settings.contentLanguage} onChange={e => updateSetting('contentLanguage', e.target.value)}
                          className={selectClass}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="pt">Portuguese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                  </select>
                </Field>
                <Field label="Hashtag Count">
                  <select value={settings.hashtagCount} onChange={e => updateSetting('hashtagCount', e.target.value)}
                          className={selectClass}>
                    {['3', '5', '6', '8', '10', '15', '20', '30'].map(n => (
                      <option key={n} value={n}>{n} hashtags</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="card">
              <SectionHeader title="Content Formatting" description="Control how emojis and calls-to-action appear" />
              <ToggleRow label="Include Emojis" desc="Add relevant emojis to captions and hooks"
                         value={settings.includeEmojis} onChange={v => updateSetting('includeEmojis', v)} />
              <ToggleRow label="Include Call-to-Action" desc="Add engagement-driving CTAs to generated content"
                         value={settings.includeCTA} onChange={v => updateSetting('includeCTA', v)} />
            </div>
          </div>
        )}

        {/* ════════════ GENERATION TAB ════════════ */}
        {activeTab === 'generation' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <SectionHeader title="Generation Settings" description="Control how AI generates your content" />
              <div className="space-y-4">
                <Field label="Caption Variations">
                  <select value={settings.captionVariations} onChange={e => updateSetting('captionVariations', e.target.value)}
                          className={selectClass}>
                    <option value="1">1 variation</option>
                    <option value="2">2 variations</option>
                    <option value="3">3 variations</option>
                    <option value="5">5 variations</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="card">
              <SectionHeader title="Auto-Generation" description="Enable or disable automatic content features" />
              <ToggleRow label="Auto-generate Hook" desc="Automatically create an attention-grabbing hook"
                         value={settings.autoGenerateHook} onChange={v => updateSetting('autoGenerateHook', v)} />
              <ToggleRow label="Auto-generate Hashtags" desc="Automatically create relevant hashtags for your content"
                         value={settings.autoGenerateHashtags} onChange={v => updateSetting('autoGenerateHashtags', v)} />
            </div>
          </div>
        )}

        {/* ════════════ NOTIFICATIONS TAB ════════════ */}
        {activeTab === 'notifications' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <SectionHeader title="Notification Preferences" description="Choose what notifications you want to receive" />
              <ToggleRow label="Push Notifications" desc="Get real-time notifications in your browser"
                         value={settings.pushNotifications} onChange={v => updateSetting('pushNotifications', v)} />
              <ToggleRow label="Email Digest" desc="Receive a weekly summary of your content performance"
                         value={settings.emailDigest} onChange={v => updateSetting('emailDigest', v)} />
              <ToggleRow label="Trend Alerts" desc="Get notified when new topics are trending in your niche"
                         value={settings.trendAlerts} onChange={v => updateSetting('trendAlerts', v)} />
              <ToggleRow label="Weekly Report" desc="Receive a detailed weekly analytics report via email"
                         value={settings.weeklyReport} onChange={v => updateSetting('weeklyReport', v)} />
              <ToggleRow label="Performance Alerts" desc="Get alerts when your content hits engagement milestones"
                         value={settings.performanceAlerts} onChange={v => updateSetting('performanceAlerts', v)} />
            </div>
          </div>
        )}

        {/* ════════════ PRIVACY TAB ════════════ */}
        {activeTab === 'privacy' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <SectionHeader title="Data & Privacy" description="Control how your data is stored and shared" />
              <ToggleRow label="Auto-save History" desc="Automatically save all generated content to your history"
                         value={settings.autoSaveHistory} onChange={v => updateSetting('autoSaveHistory', v)} />
              <ToggleRow label="Share Analytics" desc="Allow anonymous usage data to improve AI quality"
                         value={settings.shareAnalytics} onChange={v => updateSetting('shareAnalytics', v)} />
              <ToggleRow label="Public Profile" desc="Make your profile visible to other users"
                         value={settings.publicProfile} onChange={v => updateSetting('publicProfile', v)} />
            </div>

            <div className="card">
              <SectionHeader title="Data Management" description="Export or delete your data" />
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200
                                   bg-white hover:bg-gray-50 transition-all cursor-pointer">
                  Export All Data
                </button>
                <button className="px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200
                                   bg-white hover:bg-gray-50 transition-all cursor-pointer">
                  Clear History
                </button>
                <button className="px-4 py-2.5 rounded-xl text-sm font-medium border border-red-200
                                   bg-white hover:bg-red-50 text-red-600 transition-all cursor-pointer">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ APPEARANCE TAB ════════════ */}
        {activeTab === 'appearance' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <SectionHeader title="Display" description="Customize how the app looks and feels" />
              <ToggleRow label="Compact Mode" desc="Reduce spacing and padding for denser information display"
                         value={settings.compactMode} onChange={v => updateSetting('compactMode', v)} />
              <ToggleRow label="Animations" desc="Enable smooth transitions and micro-animations"
                         value={settings.animationsEnabled} onChange={v => updateSetting('animationsEnabled', v)} />
            </div>

            <div className="card">
              <SectionHeader title="Dashboard Widgets" description="Show or hide sections on the main dashboard" />
              <ToggleRow label="Trending Section" desc="Show trending topics on the dashboard"
                         value={settings.showTrendingSection} onChange={v => updateSetting('showTrendingSection', v)} />
              <ToggleRow label="Engagement Chart" desc="Show the engagement overview chart on the dashboard"
                         value={settings.showEngagementChart} onChange={v => updateSetting('showEngagementChart', v)} />
              <div className="pt-2">
                <Field label="Dashboard Layout">
                  <select value={settings.dashboardLayout} onChange={e => updateSetting('dashboardLayout', e.target.value)}
                          className={selectClass}>
                    <option value="default">Default (Full Layout)</option>
                    <option value="compact">Compact (Condensed)</option>
                    <option value="focus">Focus Mode (Content Only)</option>
                  </select>
                </Field>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ ADVANCED TAB ════════════ */}
        {activeTab === 'advanced' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card">
              <SectionHeader title="API Configuration" description="Configure backend connection settings" />
              <div className="space-y-4">
                <Field label="API Endpoint">
                  <input value={settings.apiEndpoint} onChange={e => updateSetting('apiEndpoint', e.target.value)}
                         className={inputClass} placeholder="http://localhost:8000/api" />
                </Field>
                <Field label="Request Timeout (seconds)">
                  <select value={settings.requestTimeout} onChange={e => updateSetting('requestTimeout', e.target.value)}
                          className={selectClass}>
                    {['5', '10', '15', '20', '30', '60'].map(n => (
                      <option key={n} value={n}>{n} seconds</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="card">
              <SectionHeader title="Reset" description="Restore all settings to their default values" />
              <div>
                {!showReset ? (
                  <button onClick={() => setShowReset(true)}
                          className="px-4 py-2.5 rounded-xl text-sm font-medium border border-red-200
                                     bg-white hover:bg-red-50 text-red-600 transition-all cursor-pointer">
                    Reset All Settings
                  </button>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                    <p className="text-sm font-medium text-red-700 flex-1">
                      Are you sure? This will reset all settings to defaults.
                    </p>
                    <button onClick={handleReset}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white
                                       border-none cursor-pointer hover:bg-red-700 transition-all">
                      Confirm Reset
                    </button>
                    <button onClick={() => setShowReset(false)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600
                                       border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <SectionHeader title="About" />
              <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span>App Version</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>1.0.0 Beta</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span>Framework</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>React + Vite</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span>Backend</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Django REST Framework</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>CSS</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Tailwind CSS v4</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Save Bar ──────────────────────────────────── */}
        <div className="mt-6 flex items-center gap-3 sticky bottom-4">
          <button onClick={handleSave}
                  className={`btn-gradient px-8 py-3 rounded-xl text-sm transition-all ${saved ? 'scale-95' : ''}`}>
            {saved ? 'Saved Successfully' : 'Save Settings'}
          </button>
          {saved && (
            <span className="text-sm font-medium text-emerald-600 animate-fade-in">
              All changes have been saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
