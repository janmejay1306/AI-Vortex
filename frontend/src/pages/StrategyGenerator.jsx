import { useState } from 'react';

const STRATEGIES = [
  {
    id: 1,
    title: '7-Day Instagram Growth Sprint',
    description: 'Post one reel daily using trending audio + strategic hashtags for max reach.',
    platform: 'Instagram',
    difficulty: 'Medium',
    duration: '7 days',
    steps: [
      'Research 5 trending songs in your niche',
      'Create a content calendar for 7 days',
      'Film 7 short reels (15-30 sec each)',
      'Schedule posts at peak hours (7PM, 12PM)',
      'Engage with 20 accounts in your niche daily',
      'Track metrics and adjust strategy',
    ],
  },
  {
    id: 2,
    title: 'LinkedIn Authority Blueprint',
    description: 'Build thought leadership with consistent value-driven posts and articles.',
    platform: 'LinkedIn',
    difficulty: 'Easy',
    duration: '14 days',
    steps: [
      'Identify 3 core topics in your expertise',
      'Write 2 long-form articles per week',
      'Share daily insights + personal stories',
      'Comment on 10 industry posts daily',
      'Connect with 5 new professionals daily',
      'Analyze post performance weekly',
    ],
  },
  {
    id: 3,
    title: 'YouTube Shorts Explosion',
    description: 'Leverage YouTube Shorts to rapidly grow subscribers and views.',
    platform: 'YouTube',
    difficulty: 'Hard',
    duration: '30 days',
    steps: [
      'Study top 10 shorts in your niche',
      'Create a hook template for the first 2 seconds',
      'Batch record 15-20 shorts per session',
      'Post 2-3 shorts daily at peak times',
      'Optimize titles and descriptions for SEO',
      'Cross-promote on other platforms',
    ],
  },
  {
    id: 4,
    title: 'X (Twitter) Thread Strategy',
    description: 'Grow your audience with viral threads and strategic engagement.',
    platform: 'X',
    difficulty: 'Medium',
    duration: '21 days',
    steps: [
      'Write 3 threads per week (8-12 tweets each)',
      'Use a strong hook in tweet #1',
      'Include actionable tips and data points',
      'Quote tweet and add value to trending topics',
      'Engage in Spaces conversations weekly',
      'Build a reply network with 10 accounts',
    ],
  },
];

export default function StrategyGenerator() {
  const [expanded, setExpanded] = useState(1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold">Strategy Generator</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Get platform-specific content strategies to grow your audience
        </p>
      </div>

      <div className="space-y-4 stagger">
        {STRATEGIES.map((s) => {
          const isOpen = expanded === s.id;
          const diffColor = s.difficulty === 'Easy' ? '#10b981' : s.difficulty === 'Medium' ? '#f59e0b' : '#ef4444';
          return (
            <div key={s.id} className="card animate-fade-in-up overflow-hidden">
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : s.id)}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                     style={{ background: 'var(--gradient-primary)' }}>
                  {s.platform[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base">{s.title}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: diffColor + '15', color: diffColor }}>
                    {s.difficulty}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100" style={{ color: 'var(--text-muted)' }}>
                    {s.duration}
                  </span>
                  <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                       style={{ color: 'var(--text-muted)' }}
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {isOpen && (
                <div className="mt-5 pt-4 border-t border-gray-100 animate-fade-in">
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                    Step-by-step Plan
                  </h4>
                  <div className="space-y-3">
                    {s.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                              style={{ background: 'var(--gradient-primary)' }}>{i+1}</span>
                        <span className="text-sm font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-gradient px-5 py-2 rounded-xl text-xs mt-5">
                    Save Strategy
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
