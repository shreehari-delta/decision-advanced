import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReasoningOrb } from './components/ui/ReasoningOrb';
import { QueryComposer } from './components/ui/QueryComposer';
import { ReasoningMap } from './components/ui/ReasoningMap';
import { TrustPanel } from './components/ui/TrustPanel';

export default function App() {
  const [query, setQuery] = useState('');
  const [appState, setAppState] = useState<'idle' | 'understanding' | 'clarifying' | 'result'>('idle');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [clarificationData, setClarificationData] = useState<any>(null);
  const [clarificationAnswers, setClarificationAnswers] = useState<Record<string, string>>({});
  const [domain, setDomain] = useState<string>('knowledge');

  // 1. Create a reference for the result container
  const resultRef = useRef<HTMLDivElement>(null);

  // 2. Automatically scroll to the result when appState changes to 'result'
  useEffect(() => {
    if (appState === 'result' && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // 100ms delay ensures Framer Motion has mounted the element before scrolling
    }
  }, [appState]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleQuerySubmit = async (submittedQuery: string) => {
    setQuery(submittedQuery);
    setAppState('understanding');

    try {
      const triageRes = await fetch(`${API_BASE_URL}/api/triage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: submittedQuery })
      });
      const triageData = await triageRes.json();

      if (triageData.needs_clarification && triageData.questions?.length > 0) {
        setClarificationData(triageData);
        setAppState('clarifying');
      } else {
        await executeAnalysis(submittedQuery, {});
      }
    } catch (err) {
      console.error('Error during triage:', err);
      await executeAnalysis(submittedQuery, {});
    }
  };

  const executeAnalysis = async (targetQuery: string, answers: Record<string, string>) => {
    setAppState('understanding');
    try {
      const res = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: targetQuery, answers })
      });
      const data = await res.json();
      setAnalysisResult(data);
      setDomain(data.domain || 'knowledge');
      setAppState('result');
    } catch (err) {
      console.error('Error during analysis:', err);
      setAnalysisResult({
        domain: 'knowledge',
        title: 'Analysis Error',
        description: 'Could not connect to backend server. Is node server.js running?',
        dataPoints: []
      });
      setAppState('result');
    }
  };

  const handleClarificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeAnalysis(query, clarificationAnswers);
  };

  const renderResult = () => {
    if (!analysisResult) return <p className="text-slate-500">No analysis available.</p>;

    const textContent = analysisResult.description || analysisResult.answer || analysisResult.text || analysisResult.summary;

    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
            {analysisResult.domain || 'Analysis'}
          </span>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            {analysisResult.title || 'Result'}
          </span>
        </div>

        <p className="text-slate-900 text-lg leading-relaxed font-normal">
          {textContent || JSON.stringify(analysisResult)}
        </p>

        {analysisResult.dataPoints && analysisResult.dataPoints.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-100/60">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Key Considerations
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {analysisResult.dataPoints.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2 text-slate-700 text-sm font-medium">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <main 
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-x-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/bg-pleasant.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen py-12">
        <AnimatePresence mode="wait">
          {appState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-3xl w-full"
            >
              <div className="w-24 h-24 mb-16">
                <ReasoningOrb state="idle"/>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-3">
                Ask anything.
              </h1>
              <p className="text-lg text-slate-600 mb-8 font-medium">
                We'll figure out what kind of answer it needs.
              </p>
              
              <QueryComposer onSubmit={handleQuerySubmit}/>
            </motion.div>
          )}

          {appState === 'understanding' && (
            <motion.div
              key="understanding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center max-w-xl w-full"
            >
              <div className="w-28 h-28 mb-16">
                <ReasoningOrb state="understanding"/>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                Analyzing your query...
              </h2>
            </motion.div>
          )}

          {appState === 'clarifying' && (
            <motion.div
              key="clarifying"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center max-w-2xl w-full"
            >
              <div className="w-24 h-24 mb-16">
                <ReasoningOrb state="clarifying"/>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                I need a bit more context.
              </h2>
              <p className="text-slate-600 text-sm mb-8 text-center max-w-lg">
                To give you a precise analysis for "{query}", please clarify:
              </p>

              <form onSubmit={handleClarificationSubmit} className="w-full bg-white/50 backdrop-blur-2xl border border-white/80 rounded-3xl p-8 shadow-xl">
                {clarificationData?.questions?.map((q: string, idx: number) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <label className="block text-sm font-semibold text-slate-800 mb-2">{q}</label>
                    <input
                      type="text"
                      required
                      placeholder="Your answer..."
                      onChange={(e) => setClarificationAnswers({ ...clarificationAnswers, [idx]: e.target.value })}
                      className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                ))}
                <button type="submit" className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-all">
                  Continue Analysis
                </button>
              </form>
            </motion.div>
          )}

          {appState === 'result' && (
            <motion.div
              ref={resultRef} // 3. Attach the reference to the top of the result wrapper
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl flex flex-col items-center pt-8"
            >
              <div className="w-24 h-24 mb-16">
                <ReasoningOrb state="complete"/>
              </div>

              <h2 className="text-2xl text-slate-800 mb-6 text-center max-w-2xl font-semibold">
                "{query}"
              </h2>

              <div className="w-full bg-white/60 backdrop-blur-2xl border border-white/80 shadow-xl rounded-3xl p-8 mb-8 text-slate-900">
                {renderResult()}
              </div>

              <ReasoningMap domain={domain}/>
              <TrustPanel domain={domain}/>

              <button
                onClick={() => { 
                  setAppState('idle'); 
                  setQuery(''); 
                  // Scroll back to top when resetting
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-8 px-6 py-3 bg-white/40 hover:bg-white/70 border border-white/60 text-slate-700 rounded-full font-medium transition-all shadow-sm"
              >
                Ask another question
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}