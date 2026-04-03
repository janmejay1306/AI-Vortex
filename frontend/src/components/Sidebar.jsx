const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard' },
  { id: 'trends',     label: 'Trend Detection' },
  { id: 'creator',    label: 'Content Creator' },
  { id: 'viral',      label: 'Viral Prediction' },
  { id: 'analytics',  label: 'Analytics' },
  { id: 'strategy',   label: 'Strategy Generator' },
  { id: 'history',    label: 'History' },
  { id: 'settings',   label: 'Settings' },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-90 md:hidden" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3 border-b border-white/8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white tracking-tight"
               style={{ background: 'var(--gradient-primary)' }}>
            AV
          </div>
          <div>
            <div className="text-white font-bold text-base tracking-tight">AI Vortex</div>
            <div className="text-[11px] font-medium" style={{ color: 'var(--sidebar-text)' }}>
              Viral Content Assistant
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => { onNavigate(item.id); onClose?.(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                           transition-all duration-200 w-full text-left cursor-pointer border-none outline-none"
                style={{
                  background: isActive ? 'var(--sidebar-active)' : 'transparent',
                  color: isActive ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--sidebar-hover)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Upgrade Card */}
        <div className="px-4 pb-5">
          <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #1e1060, #2d1b69)' }}>
            <div className="text-white font-bold text-sm mb-1">Upgrade to Pro</div>
            <p className="text-xs mb-3" style={{ color: 'var(--sidebar-text)' }}>
              Unlock advanced features, more credits, and real-time data.
            </p>
            <button className="w-full py-2 rounded-lg text-xs font-bold text-white cursor-pointer border-none"
                    style={{ background: 'var(--gradient-green)' }}>
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
