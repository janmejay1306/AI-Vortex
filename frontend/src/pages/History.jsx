import { useState } from 'react';

const HISTORY_DATA = [
  { id: 1, idea: 'AI tools for students to boost productivity', platform: 'Instagram', score: 92, date: '2026-04-03', time: '2 hours ago', caption: 'Study smarter, not harder! These AI tools will 10x your productivity', hashtags: ['#AI', '#StudyTips', '#Productivity'] },
  { id: 2, idea: 'Morning motivation for success', platform: 'YouTube', score: 78, date: '2026-04-02', time: '1 day ago', caption: 'Your morning routine decides your entire day. Here is how to win before 8 AM', hashtags: ['#Morning', '#Success', '#Motivation'] },
  { id: 3, idea: 'Startup journey from idea to reality', platform: 'LinkedIn', score: 85, date: '2026-04-01', time: '2 days ago', caption: 'From a napkin sketch to funded startup — here is the real journey', hashtags: ['#Startup', '#Founder', '#Business'] },
  { id: 4, idea: 'Healthy meal prep for busy people', platform: 'TikTok', score: 71, date: '2026-03-30', time: '4 days ago', caption: 'Meal prep Sunday made easy! 5 meals in under 2 hours', hashtags: ['#MealPrep', '#Healthy', '#Food'] },
  { id: 5, idea: 'Remote work productivity hacks', platform: 'X', score: 88, date: '2026-03-28', time: '6 days ago', caption: 'Working from home does not mean working less. Try these 5 hacks', hashtags: ['#Remote', '#WFH', '#Productivity'] },
  { id: 6, idea: 'Budget travel tips for 2026', platform: 'Instagram', score: 67, date: '2026-03-25', time: '1 week ago', caption: 'Travel the world without breaking the bank', hashtags: ['#Travel', '#Budget', '#Adventure'] },
];

export default function History() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const platforms = ['all', 'Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'X'];
  const filtered = HISTORY_DATA.filter(h =>
    (filter === 'all' || h.platform === filter) &&
    (h.idea.toLowerCase().includes(search.toLowerCase()) || h.caption.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold">History</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          View all your previously generated content
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)}
               placeholder="Search history..."
               className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none
                          focus:ring-2 focus:ring-purple-300 bg-white" />
        <div className="flex gap-1.5 flex-wrap">
          {platforms.map(p => (
            <button key={p} onClick={() => setFilter(p)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all
                      ${filter === p ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-gray-200 text-gray-500 hover:border-purple-300'}`}>
              {p === 'all' ? 'All' : p}
            </button>
          ))}
        </div>
      </div>

      {/* History Cards */}
      <div className="space-y-3 stagger">
        {filtered.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-10 h-10 rounded-full bg-gray-100 mx-auto mb-3" />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No results found</p>
          </div>
        ) : filtered.map((h) => {
          const color = h.score >= 85 ? '#10b981' : h.score >= 70 ? '#f59e0b' : '#ef4444';
          return (
            <div key={h.id} className="card animate-fade-in-up hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                     style={{ color: 'var(--text-secondary)' }}>
                  {h.platform[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm truncate">"{h.idea}"</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 shrink-0" style={{ color: 'var(--text-muted)' }}>
                      {h.platform}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{h.caption}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {h.hashtags.map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ background: '#7c3aed10', color: '#7c3aed' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-extrabold" style={{ color }}>{h.score}%</div>
                  <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{h.time}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
