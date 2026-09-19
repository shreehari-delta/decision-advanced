import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface QueryComposerProps {
  onSubmit: (query: string) => void;
}

export const QueryComposer = ({ onSubmit }: QueryComposerProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      <form 
        onSubmit={handleSubmit} 
        // Large pill shape, translucent glass, soft lavender/blue glow, and shadow
        className="w-full relative flex items-center bg-white/20 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(139,92,246,0.15),inset_0_2px_15px_rgba(255,255,255,0.7)] ring-1 ring-blue-300/40 rounded-full p-2 transition-all"
      >
        <div className="pl-5 pr-2 text-blue-600/80">
          <Sparkles size={22} strokeWidth={2} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What would you like to figure out?"
          className="w-full bg-transparent px-3 py-3 text-lg text-slate-800 placeholder:text-slate-500 outline-none font-medium"
        />
        
        {/* Circular Blue Gradient Arrow Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className="ml-2 w-12 h-12 flex items-center justify-center shrink-0 bg-gradient-to-br from-blue-400 to-indigo-600 text-white rounded-full disabled:opacity-50 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all"
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
};