import { useState } from 'react';

const TRENDS = [
  { id: 1, title: 'AI Tools for Students', posts: '1.2M', growth: '+112%', category: 'Technology', heat: 98, color: '#7c3aed' },
  { id: 2, title: 'Student Productivity Hacks', posts: '890K', growth: '+76%', category: 'Education', heat: 88, color: '#3b82f6' },
  { id: 3, title: 'Notion Templates 2026', posts: '680K', growth: '+54%', category: 'Productivity', heat: 82, color: '#10b981' },
  { id: 4, title: 'Startup Funding Tips', posts: '520K', growth: '+89%', category: 'Business', heat: 91, color: '#f59e0b' },
  { id: 5, title: 'Fitness Transformation', posts: '1.5M', growth: '+45%', category: 'Health', heat: 85, color: '#ec4899' },
  { id: 6, title: 'Remote Work Setup', posts: '430K', growth: '+62%', category: 'Lifestyle', heat: 78, color: '#06b6d4' },
  { id: 7, title: 'Budget Travel Hacks', posts: '720K', growth: '+38%', category: 'Travel', heat: 72, color: '#8b5cf6' },
  { id: 8, title: 'Healthy Meal Prep Ideas', posts: '950K', growth: '+67%', category: 'Food', heat: 86, color: '#f97316' },
];

export default function TrendsPage() {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(TRENDS.map(t => t.category))];
  const filtered = filter === 'all' ? TRENDS : TRENDS.filter(t => t.category === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold">Trend Detection</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Discover what's trending across social media platforms right now
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border
                    ${filter === c
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'}`}>
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      {/* Trend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger">
        {filtered.map((t) => (
          <div key={t.id} className="card animate-fade-in-up cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                   style={{ background: t.color }}>
                {t.title[0]}
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                {t.growth}
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1 group-hover:text-purple-600 transition-colors">{t.title}</h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{t.posts} posts - {t.category}</p>
            {/* Heat bar */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Heat</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bar-fill" style={{ width: `${t.heat}%`, background: t.color }} />
              </div>
              <span className="text-xs font-bold">{t.heat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
