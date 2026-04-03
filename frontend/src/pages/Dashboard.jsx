import { useState } from 'react';
import { generateContent } from '../api';

/* ─── Stat Card ──────────────────────────────────────── */
function StatCard({ label, value, sub, color }) {
  return (
    <div className="card flex items-center gap-4 animate-fade-in-up">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
           style={{ background: color + '15' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
      </div>
      <div>
        <div className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{value}</div>
        <div className="text-xs font-medium" style={{ color: sub?.includes('+') || sub?.includes('High') ? '#10b981' : 'var(--text-secondary)' }}>
          {sub}
        </div>
      </div>
      <div className="ml-auto text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}

/* ─── Circular Score ─────────────────────────────────── */
function ScoreRing({ score, size = 120 }) {
  const r = (size / 2) - 10;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="7" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="7"
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                className="score-ring" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold" style={{ color }}>{score}%</span>
        <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
          {score >= 85 ? 'Very High' : score >= 70 ? 'High' : score >= 50 ? 'Moderate' : 'Low'}
        </span>
      </div>
    </div>
  );
}

/* ─── Metric Bar ─────────────────────────────────────── */
function MetricBar({ label, value, color = '#7c3aed' }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium w-24" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full bar-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-10 text-right" style={{ color: 'var(--text-primary)' }}>{value}%</span>
    </div>
  );
}

/* ─── Copy Button ────────────────────────────────────── */
function CopyBtn({ text, small }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy}
            className={`flex items-center gap-1 font-semibold rounded-lg transition-all cursor-pointer border-none
                        ${small ? 'text-[10px] px-2 py-1' : 'text-xs px-3 py-1.5'}`}
            style={{ color: copied ? '#10b981' : '#7c3aed', background: copied ? '#10b98112' : '#7c3aed08' }}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ─── Engagement Chart ───────────────────────────────── */
function EngagementChart() {
  const data = [
    { day: 'Mon', value: 2400 }, { day: 'Tue', value: 1800 },
    { day: 'Wed', value: 3200 }, { day: 'Thu', value: 2800 },
    { day: 'Fri', value: 5100 }, { day: 'Sat', value: 7200 },
    { day: 'Sun', value: 6800 },
  ];
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="flex items-end gap-2 h-36 mt-4">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div className="relative w-full">
            <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2
                            bg-gray-800 text-white text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap
                            transition-opacity z-10">
              {(d.value / 1000).toFixed(1)}K
            </div>
            <div className="chart-bar w-full rounded-t-lg cursor-pointer"
                 style={{
                   height: `${(d.value / max) * 120}px`,
                   background: i >= 4 ? 'var(--gradient-primary)' : '#e5e7eb',
                 }} />
          </div>
          <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Dashboard Page ─────────────────────────────────── */
export default function DashboardPage({ onNavigate }) {
  const [idea, setIdea] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const platforms = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube',   label: 'YouTube' },
    { id: 'linkedin',  label: 'LinkedIn' },
    { id: 'twitter',   label: 'X / Twitter' },
  ];

  const trending = [
    { title: 'AI Study Tools', posts: '1.2M posts', growth: '+112%', color: '#7c3aed' },
    { title: 'Student Productivity Hacks', posts: '890K posts', growth: '+76%', color: '#3b82f6' },
    { title: 'Notion Templates', posts: '680K posts', growth: '+54%', color: '#10b981' },
  ];

  const history = [
    { title: '"AI tools for students to boost productivity"', platform: 'Instagram', time: '2 hours ago', score: 92 },
    { title: '"Morning motivation for success"', platform: 'YouTube', time: '1 day ago', score: 78 },
    { title: '"Startup journey from idea to reality"', platform: 'LinkedIn', time: '2 days ago', score: 85 },
  ];

  const fetchContent = async (ideaText) => {
    const results = await Promise.all([
      generateContent(ideaText),
      generateContent(ideaText),
      generateContent(ideaText),
    ]);
    return results;
  };

  const handleGenerate = async () => {
    if (!idea.trim() || loading) return;
    setLoading(true);
    setSelectedCaption(0);
    try {
      const results = await fetchContent(idea.trim());
      setCaptions(results.map(r => r.caption));
      setResult(results[0]);
    } catch { setResult(null); setCaptions([]); }
    setLoading(false);
  };

  const handleRefresh = async () => {
    if (!idea.trim() || refreshing) return;
    setRefreshing(true);
    setSelectedCaption(0);
    try {
      const results = await fetchContent(idea.trim());
      setCaptions(results.map(r => r.caption));
      setResult(results[0]);
    } catch { /* keep old result */ }
    setRefreshing(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        <StatCard label="Trending Score" value="87" sub="High Opportunity" color="#f59e0b" />
        <StatCard label="Virality Prediction" value="92%" sub="Excellent Chance" color="#7c3aed" />
        <StatCard label="Engagement Rate" value="11.4%" sub="Above Average" color="#3b82f6" />
        <StatCard label="Audience Reach" value="2.3M" sub="Potential Reach" color="#10b981" />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Create Content */}
        <div className="lg:col-span-3 card animate-fade-in-up">
          <h3 className="font-bold text-sm mb-1">Create Content</h3>
          <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Enter your content idea or topic</p>
          <textarea value={idea} onChange={e => setIdea(e.target.value)}
                    placeholder="AI tools for students to boost productivity"
                    className="w-full h-24 px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none
                               outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent
                               transition-all bg-gray-50 placeholder:text-gray-400" />
          <div className="mt-3 mb-3">
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Platform</p>
            <div className="flex gap-1.5 flex-wrap">
              {platforms.map(p => (
                <button key={p.id} onClick={() => setPlatform(p.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                    transition-all cursor-pointer border ${platform === p.id
                                      ? 'bg-purple-50 border-purple-300 text-purple-700'
                                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} disabled={loading || !idea.trim()}
                  className="btn-gradient w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
            {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                     : 'Generate Content'}
          </button>
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-5 card animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Generated Content</h3>
            <div className="flex items-center gap-2">
              {result && (
                <button onClick={handleRefresh} disabled={refreshing}
                        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg
                                   transition-all cursor-pointer border-none hover:bg-purple-50"
                        style={{ color: '#7c3aed', background: '#7c3aed08' }}>
                  <svg className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              )}
              {result && <CopyBtn text={`${result.caption}\n\n${result.hook}\n\n${result.hashtags.join(' ')}`} />}
            </div>
          </div>
          {result ? (
            <div className="space-y-4">
              {/* 3 Caption Options */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Caption</label>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                    {captions.length} options
                  </span>
                </div>
                <div className="space-y-2">
                  {captions.map((cap, i) => (
                    <div key={i}
                         onClick={() => setSelectedCaption(i)}
                         className={`p-3 rounded-xl text-sm leading-relaxed flex items-start justify-between gap-2
                                     cursor-pointer transition-all border-2 ${
                                       selectedCaption === i
                                         ? 'border-purple-400 bg-purple-50/50'
                                         : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          selectedCaption === i ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          {i + 1}
                        </span>
                        <span>{cap}</span>
                      </div>
                      <CopyBtn text={cap} small />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Hook</label>
                <div className="mt-1.5 p-3 rounded-xl bg-gray-50 text-sm italic flex items-start justify-between gap-2">
                  <span>{result.hook}</span>
                  <CopyBtn text={result.hook} small />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Hashtags</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {result.hashtags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: '#7c3aed10', color: '#7c3aed', border: '1px solid #7c3aed20' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 mb-3" />
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Enter an idea and click Generate to see AI-powered content
              </p>
            </div>
          )}
        </div>

        {/* Trending Now */}
        <div className="lg:col-span-4 card animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Trending Now</h3>
            <button onClick={() => onNavigate('trends')}
                    className="text-xs text-purple-600 font-medium cursor-pointer border-none bg-transparent hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {trending.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => { setIdea(t.title); }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                     style={{ background: t.color }}>
                  {t.title[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{t.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.posts}</p>
                </div>
                <span className="text-xs font-bold text-emerald-500">{t.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Virality Prediction */}
        <div className="lg:col-span-4 card animate-fade-in-up">
          <h3 className="font-bold text-sm mb-4">Virality Prediction</h3>
          <div className="flex items-center gap-6">
            <ScoreRing score={result?.virality_score || 92} />
            <div className="flex-1 space-y-3">
              <MetricBar label="Relevance" value={95} color="#7c3aed" />
              <MetricBar label="Engagement" value={90} color="#3b82f6" />
              <MetricBar label="Timeliness" value={88} color="#10b981" />
              <MetricBar label="Shareability" value={94} color="#f59e0b" />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl flex items-center gap-2 text-xs"
               style={{ background: 'var(--gradient-glow)' }}>
            <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              Tip: Add a strong visual thumbnail to increase engagement
            </span>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="lg:col-span-4 card animate-fade-in-up" style={{ animationDelay: '0.06s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Optimization Suggestions</h3>
            <button onClick={() => onNavigate('strategy')}
                    className="text-xs text-purple-600 font-medium cursor-pointer border-none bg-transparent hover:underline">
              View Details
            </button>
          </div>
          <div className="space-y-3">
            {(result?.suggestions || ['Best time to post: 7:00 - 9:00 PM', 'Use Reels format (15-30s)', 'Add a hook in the first 3 seconds']).map((s, i) => {
              const badges = [
                { text: 'High Engagement', color: '#10b981' },
                { text: 'Optimal', color: '#3b82f6' },
                { text: 'High Impact', color: '#f59e0b' },
              ];
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                       style={{ background: 'var(--gradient-primary)' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
                        style={{ background: badges[i].color + '15', color: badges[i].color }}>
                    {badges[i].text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cross-Platform Strategy */}
        <div className="lg:col-span-4 card animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Cross-Platform Strategy</h3>
            <button onClick={() => onNavigate('strategy')}
                    className="text-xs text-purple-600 font-medium cursor-pointer border-none bg-transparent hover:underline">
              View Plan
            </button>
          </div>
          <div className="space-y-3">
            {[
              { platform: 'Instagram', format: 'Post Reel + Story', level: 'High', color: '#e1306c' },
              { platform: 'YouTube', format: 'Create Short Video', level: 'Medium', color: '#ff0000' },
              { platform: 'LinkedIn', format: 'Share Article + Post', level: 'High', color: '#0077b5' },
              { platform: 'X / Twitter', format: 'Post Thread + Tweet', level: 'High', color: '#1a1a2e' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                     style={{ background: p.color }}>
                  {p.platform[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{p.platform}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.format}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{
                        background: p.level === 'High' ? '#10b98115' : '#f59e0b15',
                        color: p.level === 'High' ? '#10b981' : '#f59e0b',
                      }}>
                  {p.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement + History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 card animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm">Engagement Overview</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <EngagementChart />
        </div>

        <div className="lg:col-span-5 card animate-fade-in-up" style={{ animationDelay: '0.06s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Recent History</h3>
            <button onClick={() => onNavigate('history')}
                    className="text-xs text-purple-600 font-medium cursor-pointer border-none bg-transparent hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold"
                     style={{ color: 'var(--text-secondary)' }}>
                  {h.platform[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{h.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{h.platform} - {h.time}</p>
                </div>
                <span className="text-sm font-bold" style={{ color: h.score >= 85 ? '#10b981' : '#f59e0b' }}>
                  {h.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
