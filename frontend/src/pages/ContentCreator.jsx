import { useState } from 'react';
import { generateContent } from '../api';

export default function ContentCreator() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState({});

  const quickIdeas = [
    'AI Tools for Students',
    'Startup Life Reality',
    'Fitness Transformation Journey',
    'Study Tips That Actually Work',
    'Side Hustle Ideas 2026',
    'Creative Portfolio Tips',
  ];

  const handleGenerate = async () => {
    if (!idea.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateContent(idea.trim());
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    }
    setLoading(false);
  };

  const copyField = async (key, text) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied({ [key]: true });
    setTimeout(() => setCopied({}), 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold">Content Creator</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Generate viral content with AI-powered captions, hashtags, and hooks
        </p>
      </div>

      {/* Input Area */}
      <div className="card">
        <textarea value={idea} onChange={e => setIdea(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
                  placeholder="Enter your content idea... (e.g., 'AI tools for students to boost productivity')"
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none
                             outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50 placeholder:text-gray-400" />

        {/* Quick Ideas */}
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {quickIdeas.map((q) => (
            <button key={q} onClick={() => setIdea(q)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700
                               hover:bg-purple-100 transition-colors cursor-pointer border border-purple-100">
              {q}
            </button>
          ))}
        </div>

        <button onClick={handleGenerate} disabled={loading || !idea.trim()}
                className="btn-gradient px-8 py-3 rounded-xl text-sm flex items-center gap-2">
          {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                   : 'Generate Content'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="card bg-red-50 border border-red-200 text-red-700 text-sm font-medium animate-fade-in-up">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger">
          {/* Caption */}
          <div className="card animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">Caption</h3>
              <button onClick={() => copyField('caption', result.caption)}
                      className="text-xs font-semibold px-3 py-1 rounded-lg border-none cursor-pointer"
                      style={{ color: copied.caption ? '#10b981' : '#7c3aed', background: copied.caption ? '#10b98112' : '#7c3aed08' }}>
                {copied.caption ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-sm leading-relaxed">{result.caption}</p>
          </div>

          {/* Hook */}
          <div className="card animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">Hook</h3>
              <button onClick={() => copyField('hook', result.hook)}
                      className="text-xs font-semibold px-3 py-1 rounded-lg border-none cursor-pointer"
                      style={{ color: copied.hook ? '#10b981' : '#7c3aed', background: copied.hook ? '#10b98112' : '#7c3aed08' }}>
                {copied.hook ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-sm italic">"{result.hook}"</p>
          </div>

          {/* Hashtags */}
          <div className="card animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">Hashtags</h3>
              <button onClick={() => copyField('tags', result.hashtags.join(' '))}
                      className="text-xs font-semibold px-3 py-1 rounded-lg border-none cursor-pointer"
                      style={{ color: copied.tags ? '#10b981' : '#7c3aed', background: copied.tags ? '#10b98112' : '#7c3aed08' }}>
                {copied.tags ? 'Copied' : 'Copy All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.hashtags.map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: '#7c3aed10', color: '#7c3aed', border: '1px solid #7c3aed20' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Virality Score */}
          <div className="card animate-fade-in-up">
            <h3 className="font-bold text-sm mb-4">Virality Score</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="7" />
                  <circle cx="50" cy="50" r="42" fill="none"
                          stroke={result.virality_score >= 75 ? '#10b981' : result.virality_score >= 50 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="7" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 42}
                          strokeDashoffset={2 * Math.PI * 42 * (1 - result.virality_score / 100)}
                          className="score-ring" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-extrabold">{result.virality_score}</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ background: 'var(--gradient-primary)' }}>{i+1}</span>
                    <span className="font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
