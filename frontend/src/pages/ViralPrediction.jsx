import { useState } from 'react';

const MOCK_RESULTS = [
  { idea: 'AI tools for students', score: 92, level: 'Very High', factors: { relevance: 95, timing: 88, uniqueness: 91, engagement: 94 } },
  { idea: 'Morning routine tips', score: 74, level: 'High', factors: { relevance: 72, timing: 80, uniqueness: 68, engagement: 76 } },
  { idea: 'Startup pitch mistakes', score: 85, level: 'High', factors: { relevance: 88, timing: 82, uniqueness: 86, engagement: 84 } },
];

export default function ViralPrediction() {
  const [idea, setIdea] = useState('');
  const [results, setResults] = useState(MOCK_RESULTS);

  const predict = () => {
    if (!idea.trim()) return;
    const score = Math.floor(Math.random() * 40) + 60;
    setResults([
      { idea: idea.trim(), score, level: score >= 85 ? 'Very High' : score >= 70 ? 'High' : 'Moderate',
        factors: { relevance: score + Math.floor(Math.random()*5 - 2), timing: score - 5 + Math.floor(Math.random()*10),
                   uniqueness: score - 3 + Math.floor(Math.random()*8), engagement: score + Math.floor(Math.random()*6 - 3) } },
      ...results,
    ]);
    setIdea('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold">Viral Prediction</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Predict how likely your content idea is to go viral
        </p>
      </div>

      {/* Input */}
      <div className="card flex flex-col sm:flex-row gap-3">
        <input value={idea} onChange={e => setIdea(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && predict()}
               placeholder="Enter a content idea to predict virality..."
               className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none
                          focus:ring-2 focus:ring-purple-300 bg-gray-50" />
        <button onClick={predict} disabled={!idea.trim()}
                className="btn-gradient px-6 py-3 rounded-xl text-sm whitespace-nowrap">
          Predict
        </button>
      </div>

      {/* Results */}
      <div className="space-y-4 stagger">
        {results.map((r, i) => {
          const color = r.score >= 85 ? '#10b981' : r.score >= 70 ? '#f59e0b' : '#ef4444';
          return (
            <div key={i} className="card animate-fade-in-up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Score circle */}
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="6"
                            strokeLinecap="round" strokeDasharray={2*Math.PI*34}
                            strokeDashoffset={2*Math.PI*34*(1-r.score/100)} className="score-ring" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold" style={{ color }}>{r.score}%</span>
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1">"{r.idea}"</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: color + '15', color }}>{r.level} Potential</span>
                </div>
                {/* Factor bars */}
                <div className="w-full sm:w-64 space-y-2">
                  {Object.entries(r.factors).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="text-[10px] font-medium capitalize w-20" style={{ color: 'var(--text-muted)' }}>{k}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bar-fill" style={{ width: `${Math.min(v,100)}%`, background: color }} />
                      </div>
                      <span className="text-[10px] font-bold w-8 text-right">{Math.min(v,100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
