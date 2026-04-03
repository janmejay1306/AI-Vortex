import { useState } from 'react';

export default function Analytics() {
  const [period, setPeriod] = useState('7d');

  const metrics = [
    { label: 'Total Impressions', value: '284K', change: '+18.2%', up: true },
    { label: 'Profile Visits', value: '12.4K', change: '+9.7%', up: true },
    { label: 'Content Shares', value: '3.2K', change: '+24.5%', up: true },
    { label: 'Save Rate', value: '8.6%', change: '-1.2%', up: false },
  ];

  const topPosts = [
    { title: 'AI Tools Every Student Needs', platform: 'Instagram', views: '45.2K', engagement: '12.4%', date: 'Mar 28' },
    { title: 'How I Built a Startup at 22', platform: 'LinkedIn', views: '28.7K', engagement: '8.9%', date: 'Mar 25' },
    { title: '5 Fitness Myths Busted', platform: 'YouTube', views: '92.1K', engagement: '6.2%', date: 'Mar 22' },
    { title: 'Morning Routine for Productivity', platform: 'X', views: '18.3K', engagement: '5.8%', date: 'Mar 20' },
  ];

  const weeklyData = [
    { day: 'Mon', impressions: 32000 },
    { day: 'Tue', impressions: 28000 },
    { day: 'Wed', impressions: 45000 },
    { day: 'Thu', impressions: 38000 },
    { day: 'Fri', impressions: 52000 },
    { day: 'Sat', impressions: 68000 },
    { day: 'Sun', impressions: 61000 },
  ];

  const maxImp = Math.max(...weeklyData.map(d => d.impressions));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold">Analytics</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Track your content performance across all platforms
          </p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {['7d', '30d', '90d'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-none transition-all
                      ${period === p ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}>
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {metrics.map((m, i) => (
          <div key={i} className="card animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{m.label}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {m.change}
              </span>
            </div>
            <div className="text-2xl font-extrabold">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card">
        <h3 className="font-bold text-sm mb-4">Weekly Performance</h3>
        <div className="flex items-end gap-3 h-40">
          {weeklyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="opacity-0 group-hover:opacity-100 text-[10px] font-medium text-gray-600 transition-opacity">
                {(d.impressions / 1000).toFixed(0)}K
              </div>
              <div className="chart-bar w-full rounded-t-lg cursor-pointer"
                   style={{ height: `${(d.impressions / maxImp) * 140}px`, background: 'var(--gradient-primary)' }} />
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Posts */}
      <div className="card">
        <h3 className="font-bold text-sm mb-4">Top Performing Posts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Content</th>
                <th className="text-left py-3 px-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Platform</th>
                <th className="text-right py-3 px-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Views</th>
                <th className="text-right py-3 px-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Engagement</th>
                <th className="text-right py-3 px-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 font-medium">{p.title}</td>
                  <td className="py-3 px-2">{p.platform}</td>
                  <td className="py-3 px-2 text-right font-semibold">{p.views}</td>
                  <td className="py-3 px-2 text-right text-emerald-600 font-semibold">{p.engagement}</td>
                  <td className="py-3 px-2 text-right" style={{ color: 'var(--text-muted)' }}>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
