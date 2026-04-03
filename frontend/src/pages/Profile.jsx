import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

/* ─── Social Platform Data ───────────────────────────── */
const SOCIAL_PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    username: '@janmejay.creates',
    followers: 12400,
    following: 856,
    posts: 234,
    growth: +8.2,
    weeklyGrowth: [180, 220, 195, 310, 280, 350, 420],
    engagement: 4.8,
    topContent: 'Reels',
    avgLikes: 1240,
    avgComments: 86,
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    color: '#000000',
    gradient: 'linear-gradient(135deg, #15202b, #1a1a2e)',
    username: '@janmejay_x',
    followers: 5830,
    following: 412,
    posts: 1560,
    growth: +12.5,
    weeklyGrowth: [80, 120, 95, 200, 180, 250, 310],
    engagement: 3.2,
    topContent: 'Threads',
    avgLikes: 320,
    avgComments: 45,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    gradient: 'linear-gradient(135deg, #ff0000, #cc0000)',
    username: 'Janmejay Studio',
    followers: 28700,
    following: 0,
    posts: 87,
    growth: +22.1,
    weeklyGrowth: [400, 520, 610, 580, 720, 890, 1100],
    engagement: 6.1,
    topContent: 'Shorts',
    avgLikes: 3400,
    avgComments: 210,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0077B5',
    gradient: 'linear-gradient(135deg, #0077b5, #005885)',
    username: 'Janmejay Sharma',
    followers: 3200,
    following: 1240,
    posts: 156,
    growth: +15.8,
    weeklyGrowth: [40, 55, 48, 78, 92, 105, 130],
    engagement: 5.4,
    topContent: 'Articles',
    avgLikes: 450,
    avgComments: 62,
  },
];

/* ─── Helpers ────────────────────────────────────────── */
function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

/* ─── Mini Sparkline ─────────────────────────────────── */
function Sparkline({ data, color, height = 40 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" points={points} />
      <polygon fill={`url(#grad-${color.replace('#','')})`}
               points={`0,${height} ${points} ${w},${height}`} />
    </svg>
  );
}

/* ─── Platform Detail Card ───────────────────────────── */
function PlatformCard({ platform, isExpanded, onToggle }) {
  return (
    <div className="card animate-fade-in-up overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 cursor-pointer" onClick={onToggle}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0 shadow-lg"
             style={{ background: platform.gradient }}>
          {platform.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base">{platform.name}</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              platform.growth > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
              +{platform.growth}%
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{platform.username}</p>
        </div>
        <div className="hidden sm:block">
          <Sparkline data={platform.weeklyGrowth} color={platform.color} />
        </div>
        <svg className={`w-5 h-5 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
             style={{ color: 'var(--text-muted)' }}
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center p-3 rounded-xl bg-gray-50">
          <div className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {formatNum(platform.followers)}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            {platform.id === 'youtube' ? 'Subscribers' : 'Followers'}
          </div>
        </div>
        <div className="text-center p-3 rounded-xl bg-gray-50">
          <div className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {formatNum(platform.following)}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Following
          </div>
        </div>
        <div className="text-center p-3 rounded-xl bg-gray-50">
          <div className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {platform.posts}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Posts
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Engagement</div>
            <div className="text-lg font-bold text-purple-600">{platform.engagement}%</div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50">
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Avg Likes</div>
            <div className="text-lg font-bold text-pink-600">{formatNum(platform.avgLikes)}</div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50">
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Avg Comments</div>
            <div className="text-lg font-bold text-amber-600">{formatNum(platform.avgComments)}</div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Top Format</div>
            <div className="text-lg font-bold text-emerald-600">{platform.topContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Profile Page ───────────────────────────────────── */
export default function ProfilePage() {
  const { settings } = useSettings();
  const [expanded, setExpanded] = useState('instagram');

  const totalFollowers = SOCIAL_PLATFORMS.reduce((a, p) => a + p.followers, 0);
  const avgGrowth = (SOCIAL_PLATFORMS.reduce((a, p) => a + p.growth, 0) / SOCIAL_PLATFORMS.length).toFixed(1);
  const totalPosts = SOCIAL_PLATFORMS.reduce((a, p) => a + p.posts, 0);
  const avgEng = (SOCIAL_PLATFORMS.reduce((a, p) => a + p.engagement, 0) / SOCIAL_PLATFORMS.length).toFixed(1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="card overflow-hidden" style={{ padding: 0 }}>
        {/* Banner */}
        <div className="h-32 sm:h-40 relative" style={{ background: 'var(--gradient-primary)' }}>
          <div className="absolute inset-0 opacity-20"
               style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="px-6 pb-6 -mt-12 sm:-mt-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-xl
                            flex items-center justify-center text-4xl font-bold text-white"
                 style={{ background: 'var(--gradient-primary)' }}>
              {settings.name ? settings.name[0].toUpperCase() : 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-extrabold">{settings.name || 'User'}</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                {settings.bio || 'Digital Creator'}
              </p>
            </div>
            <button className="btn-gradient px-5 py-2.5 rounded-xl text-sm">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 stagger">
        {[
          { label: 'Total Followers', value: formatNum(totalFollowers), color: '#7c3aed' },
          { label: 'Avg Growth', value: `+${avgGrowth}%`, color: '#10b981' },
          { label: 'Total Posts', value: totalPosts, color: '#3b82f6' },
          { label: 'Avg Engagement', value: `${avgEng}%`, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="card animate-fade-in-up text-center py-5">
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Platform Cards */}
      <div>
        <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
          Social Media Platforms
        </h3>
        <div className="space-y-4 stagger">
          {SOCIAL_PLATFORMS.map((p) => (
            <PlatformCard
              key={p.id}
              platform={p}
              isExpanded={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>

      {/* Growth Comparison */}
      <div className="card">
        <h3 className="font-bold text-sm mb-4">Platform Growth Comparison</h3>
        <div className="space-y-4">
          {SOCIAL_PLATFORMS.map((p) => (
            <div key={p.id} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                   style={{ background: p.gradient }}>
                {p.name[0]}
              </div>
              <span className="text-sm font-medium w-24">{p.name}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bar-fill transition-all"
                     style={{
                       width: `${(p.growth / 25) * 100}%`,
                       background: p.gradient,
                     }} />
              </div>
              <span className="text-sm font-bold w-16 text-right text-emerald-600">+{p.growth}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
