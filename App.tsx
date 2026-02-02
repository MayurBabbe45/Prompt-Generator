
import React, { useState, useEffect, useCallback } from 'react';
import { Header, Container, Section } from './components/Layout';
import { synthesizePrompt } from './services/geminiService';
import { SynthesisResult, SynthesisStatus } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<SynthesisStatus>(SynthesisStatus.IDLE);
  const [result, setResult] = useState<SynthesisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSynthesize = async () => {
    if (!input.trim()) return;

    setStatus(SynthesisStatus.ANALYZING);
    setError(null);
    setResult(null);

    // Simulated step-by-step updates for aesthetic feedback
    try {
      setTimeout(() => setStatus(SynthesisStatus.ARCHITECTING), 800);
      setTimeout(() => setStatus(SynthesisStatus.REFINING), 1600);

      const data = await synthesizePrompt(input);
      
      setTimeout(() => {
        setResult(data);
        setStatus(SynthesisStatus.COMPLETED);
      }, 2200);
    } catch (err: any) {
      setError(err.message || 'Calibration failed.');
      setStatus(SynthesisStatus.ERROR);
    }
  };

  const getStatusText = () => {
    switch (status) {
      case SynthesisStatus.ANALYZING: return "Synthesizing Intent...";
      case SynthesisStatus.ARCHITECTING: return "Architecting Logic Flow...";
      case SynthesisStatus.REFINING: return "Calibrating Constraints...";
      default: return "";
    }
  };

  const copyToClipboard = () => {
    if (result?.artifact) {
      navigator.clipboard.writeText(result.artifact);
      alert('Artifact copied to clipboard.');
    }
  };

  return (
    <div className="min-h-screen">
      <Container>
        <Header />

        <Section title="Raw Input">
          <div className="glass rounded-xl p-1 glow-indigo focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all duration-300">
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 p-4 min-h-[120px] text-zinc-100 placeholder-zinc-600 resize-none font-light"
              placeholder="Inject your raw intent here (e.g., 'I want a prompt for writing clear MERN documentation')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== SynthesisStatus.IDLE && status !== SynthesisStatus.COMPLETED && status !== SynthesisStatus.ERROR}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSynthesize}
              disabled={!input.trim() || (status !== SynthesisStatus.IDLE && status !== SynthesisStatus.COMPLETED && status !== SynthesisStatus.ERROR)}
              className={`px-8 py-3 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-500 border border-indigo-500/30 ${
                status === SynthesisStatus.IDLE || status === SynthesisStatus.COMPLETED || status === SynthesisStatus.ERROR
                  ? 'bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-100 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {status === SynthesisStatus.IDLE ? 'Initiate Synthesis' : status === SynthesisStatus.COMPLETED ? 'Resynthesize' : 'Processing...'}
            </button>
          </div>
        </Section>

        {(status !== SynthesisStatus.IDLE && status !== SynthesisStatus.COMPLETED && status !== SynthesisStatus.ERROR) && (
          <div className="flex flex-col items-center justify-center my-12 anim-pulse">
            <div className="text-indigo-400 text-sm tracking-[0.2em] uppercase mb-4">{getStatusText()}</div>
            <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-700 w-1/2"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5 text-red-200 text-center mb-12">
            <p className="text-sm font-light italic">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <hr className="border-zinc-800" />
            
            <Section title="Acknowledgment">
              <p className="text-zinc-300 italic font-light text-lg">"{result.acknowledgment}"</p>
            </Section>

            <Section title="Synthesis Strategy">
              <div className="glass p-6 rounded-xl text-zinc-400 text-sm leading-relaxed border-l-2 border-l-indigo-500/50">
                {result.strategy}
              </div>
            </Section>

            <Section title="The Artifact">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-900/50">
                    <span className="text-xs font-mono text-zinc-500 tracking-wider">WORLD_BEST_PROMPT.md</span>
                    <button 
                      onClick={copyToClipboard}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest"
                    >
                      Copy Artifact
                    </button>
                  </div>
                  <pre className="p-6 mono text-xs md:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                    {result.artifact}
                  </pre>
                </div>
              </div>
            </Section>

            <div className="text-center pb-24">
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Calibration Complete. Harmonic Alignment Achieved.</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;
