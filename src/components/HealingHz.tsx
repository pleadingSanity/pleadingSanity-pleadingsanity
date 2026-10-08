import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CloudRain, 
  Sparkles, 
  Timer, 
  Sliders, 
  RotateCcw,
  Check,
  Info
} from 'lucide-react';
import { SOLFEGGIO_FREQUENCIES } from '../data/mockData';
import { SolfeggioFrequency } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface HealingHzProps {
  initialHz?: number | null;
}

export const HealingHz: React.FC<HealingHzProps> = ({ initialHz }) => {
  const [activeFrequency, setActiveFrequency] = useState<SolfeggioFrequency>(
    SOLFEGGIO_FREQUENCIES.find((f) => f.hz === (initialHz || 528)) || SOLFEGGIO_FREQUENCIES[5]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.65);
  const [binauralWave, setBinauralWave] = useState<'theta' | 'alpha' | 'delta' | 'none'>('theta');
  const [rainVolume, setRainVolume] = useState(0.25);
  const [droneVolume, setDroneVolume] = useState(0.2);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // If initialHz changes from parent hero compass
  useEffect(() => {
    if (initialHz) {
      const target = SOLFEGGIO_FREQUENCIES.find((f) => f.hz === initialHz);
      if (target) {
        setActiveFrequency(target);
        if (isPlaying) {
          const offset = getBinauralOffset(binauralWave);
          audioEngine.playFrequency(target.hz, offset);
        }
      }
    }
  }, [initialHz]);

  const getBinauralOffset = (wave: string): number => {
    switch (wave) {
      case 'delta': return 2;
      case 'theta': return 4;
      case 'alpha': return 8;
      default: return 0;
    }
  };

  // Toggle playback
  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stopFrequency();
      audioEngine.setRainVolume(0);
      audioEngine.setCosmicDroneVolume(0);
      setIsPlaying(false);
    } else {
      const offset = getBinauralOffset(binauralWave);
      audioEngine.playFrequency(activeFrequency.hz, offset);
      audioEngine.setMasterVolume(masterVolume);
      audioEngine.setRainVolume(rainVolume);
      audioEngine.setCosmicDroneVolume(droneVolume);
      setIsPlaying(true);
    }
  };

  // Select new frequency
  const handleSelectFrequency = (freq: SolfeggioFrequency) => {
    setActiveFrequency(freq);
    if (isPlaying) {
      const offset = getBinauralOffset(binauralWave);
      audioEngine.playFrequency(freq.hz, offset);
    }
  };

  // Change binaural state
  const handleBinauralChange = (wave: 'theta' | 'alpha' | 'delta' | 'none') => {
    setBinauralWave(wave);
    if (isPlaying) {
      const offset = getBinauralOffset(wave);
      audioEngine.playFrequency(activeFrequency.hz, offset);
    }
  };

  // Volume listeners
  const handleVolumeChange = (newVol: number) => {
    setMasterVolume(newVol);
    audioEngine.setMasterVolume(newVol);
  };

  const handleRainChange = (newVol: number) => {
    setRainVolume(newVol);
    if (isPlaying) {
      audioEngine.setRainVolume(newVol);
    }
  };

  const handleDroneChange = (newVol: number) => {
    setDroneVolume(newVol);
    if (isPlaying) {
      audioEngine.setCosmicDroneVolume(newVol);
    }
  };

  // Session timer handler
  useEffect(() => {
    if (!timerMinutes) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(timerMinutes * 60);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          if (isPlaying) {
            handleTogglePlay();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerMinutes]);

  // Audio Oscilloscope & Waveform Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
      const height = (canvas.height = 140);

      ctx.clearRect(0, 0, width, height);

      const analyser = audioEngine.getAnalyser();

      if (isPlaying && analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Draw oscilloscope wave
        ctx.lineWidth = 2;
        ctx.strokeStyle = activeFrequency.accentHex;
        ctx.shadowBlur = 10;
        ctx.shadowColor = activeFrequency.accentHex;
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Frequency glow center indicator
        ctx.shadowBlur = 0;
      } else {
        // Idle gentle breathing baseline line
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.beginPath();
        const time = Date.now() * 0.002;
        for (let x = 0; x < width; x += 5) {
          const y = height / 2 + Math.sin(x * 0.02 + time) * 6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, activeFrequency]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      audioEngine.stopFrequency();
      audioEngine.setRainVolume(0);
      audioEngine.setCosmicDroneVolume(0);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>PLEADING SANITY · ACOUSTIC RECOVERY</span>
            <span aria-hidden="true">·</span>
            <span>WEB AUDIO SYNTHESIS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Healing Hz Sanctuary
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Ten calibrated Solfeggio frequencies synthesized in real-time. Paired with binaural brainwave entrainment 
            and organic ambient noise to down-regulate the nervous system during crisis, static, and insomnia.
          </p>
        </div>

        <button
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-1.5 self-start md:self-auto rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
        >
          <Info className="h-3.5 w-3.5 text-indigo-400" />
          <span>{showGuide ? 'Hide Frequency Guide' : 'Solfeggio Science'}</span>
        </button>
      </div>

      {/* Guide Drawer */}
      {showGuide && (
        <div className="mt-6 rounded-xl border border-indigo-900/40 bg-[#0e1220] p-6 text-sm text-slate-300 space-y-4">
          <h3 className="font-display text-base font-bold text-white">
            The Science of Solfeggio & Neuro-Acoustic Entrainment
          </h3>
          <p className="leading-relaxed">
            The brain operates through neural oscillations (brainwaves). When subjected to steady rhythmic auditory stimuli—such as a pure sine wave paired with a subtle binaural offset—the brain naturally synchronizes its firing frequency. This process, known as <strong>frequency-following response (FFR)</strong>, helps shift an overstimulated fight-or-flight state into parasympathetic calm.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-bold text-indigo-300">Theta Waves (4 Hz)</span>
              <p className="text-slate-400 mt-1">Deep REM-level calm, emotional processing, and subconscious trauma unwinding.</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-bold text-cyan-300">Alpha Waves (8 Hz)</span>
              <p className="text-slate-400 mt-1">Grounded alertness, reduction of racing catastrophic thoughts, and sensory equilibrium.</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-bold text-amber-300">Delta Waves (2 Hz)</span>
              <p className="text-slate-400 mt-1">Profound nervous exhaustion relief, biological rest, and deep dreamless recovery.</p>
            </div>
          </div>
        </div>
      )}

      {/* Active Studio Player Console */}
      <div className="mt-8 rounded-2xl border border-indigo-900/40 bg-gradient-to-b from-[#0e1324] to-[#090c16] p-6 shadow-2xl">
        {/* Real-time Oscilloscope Display */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-black/60 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: isPlaying ? activeFrequency.accentHex : '#475569' }} />
              <span className="font-mono">{activeFrequency.hz} Hz · {activeFrequency.title}</span>
            </div>
            <div className="font-mono text-indigo-400">
              {isPlaying ? 'OSCILLATING LIVE' : 'STANDBY'}
            </div>
          </div>

          <div className="w-full h-[120px] flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Active Benefit Tag */}
          <div className="mt-2 text-center">
            <p className="text-xs text-slate-300 font-medium italic">
              "{activeFrequency.benefit}"
            </p>
          </div>
        </div>

        {/* Central Transport & Controls */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          {/* Main Play / Frequency Badge */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleTogglePlay}
              className={`flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-lg transition-transform hover:scale-105 ${
                isPlaying 
                  ? 'bg-rose-600 shadow-rose-600/30' 
                  : 'bg-indigo-600 shadow-indigo-600/30 hover:bg-indigo-500'
              }`}
              title={isPlaying ? 'Pause Sound' : 'Play Sound'}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold text-white">
                  {activeFrequency.hz} Hz
                </span>
                <span className="text-xs text-indigo-300 font-medium">
                  {activeFrequency.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Focus: {activeFrequency.chakraOrFocus}
              </p>
            </div>
          </div>

          {/* Master Volume */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <button 
              onClick={() => handleVolumeChange(masterVolume > 0 ? 0 : 0.65)}
              className="text-slate-400 hover:text-white"
            >
              {masterVolume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <div className="flex-1">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Master Volume</span>
                <span className="font-mono">{Math.round(masterVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={masterVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Session Timer Presets */}
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-400 mr-1">Timer:</span>
            {[
              { label: '5m', val: 5 },
              { label: '15m', val: 15 },
              { label: '30m', val: 30 },
              { label: '∞', val: null }
            ].map((t) => (
              <button
                key={t.label}
                onClick={() => setTimerMinutes(t.val)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  timerMinutes === t.val
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
            {timeLeft !== null && timeLeft > 0 && (
              <span className="ml-2 font-mono text-xs text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </div>

        {/* Ambient Soundscape & Binaural Layer Mixer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Binaural Entrainment Selector */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                Binaural Brainwave Layer
              </span>
              <span className="text-[10px] font-mono text-indigo-400 uppercase">
                {binauralWave}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleBinauralChange('theta')}
                className={`p-2 rounded text-left border transition-colors ${
                  binauralWave === 'theta'
                    ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold">Theta (4 Hz)</div>
                <div className="text-[10px] text-slate-500">Trauma relief</div>
              </button>

              <button
                onClick={() => handleBinauralChange('alpha')}
                className={`p-2 rounded text-left border transition-colors ${
                  binauralWave === 'alpha'
                    ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold">Alpha (8 Hz)</div>
                <div className="text-[10px] text-slate-500">Mind quiet</div>
              </button>

              <button
                onClick={() => handleBinauralChange('delta')}
                className={`p-2 rounded text-left border transition-colors ${
                  binauralWave === 'delta'
                    ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold">Delta (2 Hz)</div>
                <div className="text-[10px] text-slate-500">Exhaustion</div>
              </button>

              <button
                onClick={() => handleBinauralChange('none')}
                className={`p-2 rounded text-left border transition-colors ${
                  binauralWave === 'none'
                    ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold">Pure Tone</div>
                <div className="text-[10px] text-slate-500">Single sine</div>
              </button>
            </div>
          </div>

          {/* Ambient Rain Mixer */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <CloudRain className="h-3.5 w-3.5 text-sky-400" />
                Soft Pink-Noise Rain
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {Math.round(rainVolume * 100)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Organic filtered pink noise to mask intrusive environmental sounds.
            </p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={rainVolume}
              onChange={(e) => handleRainChange(parseFloat(e.target.value))}
              className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Cosmic Drone Synthesizer */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-purple-400" />
                Cosmic Void Drone
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {Math.round(droneVolume * 100)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Warm sub-bass harmonic drone (C2 + G2) providing a soft sonic womb.
            </p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={droneVolume}
              onChange={(e) => handleDroneChange(parseFloat(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 10 Solfeggio Frequencies Grid */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-white">
            Select Calibrated Frequency
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            10 Master Tones Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SOLFEGGIO_FREQUENCIES.map((freq) => {
            const isSelected = activeFrequency.hz === freq.hz;
            return (
              <button
                key={freq.hz}
                onClick={() => handleSelectFrequency(freq)}
                className={`group flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/50 shadow-md ring-1 ring-indigo-500'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-xl font-extrabold text-white">
                      {freq.hz} <span className="text-xs font-mono font-normal text-slate-400">Hz</span>
                    </span>
                    {isSelected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
                    {freq.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {freq.benefit}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{freq.chakraOrFocus.split(' ')[0]}</span>
                  <span className="group-hover:text-indigo-400 transition-colors">
                    {isSelected && isPlaying ? 'Playing' : 'Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
