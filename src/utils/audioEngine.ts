/**
 * Real-time Web Audio API sound generator for Pleading Sanity's Healing Hz.
 * Generates accurate pure Solfeggio frequencies, binaural beats, and ambient soundscapes.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private primaryOsc: OscillatorNode | null = null;
  private binauralOsc: OscillatorNode | null = null;
  private primaryGain: GainNode | null = null;
  private binauralGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Ambient sound nodes
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private fireNode: AudioNode | null = null;
  private fireGain: GainNode | null = null;
  private cosmicDroneGain: GainNode | null = null;
  private cosmicDroneOsc1: OscillatorNode | null = null;
  private cosmicDroneOsc2: OscillatorNode | null = null;

  private isPlayingFreq = false;
  private currentFrequency = 528;
  private currentBinauralBeat = 4; // 4Hz Theta wave

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setMasterVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime, 0.05);
    }
  }

  public playFrequency(hz: number, binauralHz = 4) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.currentFrequency = hz;
    this.currentBinauralBeat = binauralHz;

    // Stop existing freq oscillators if any
    this.stopFrequency();

    // Create primary oscillator
    this.primaryOsc = this.ctx.createOscillator();
    this.primaryOsc.type = 'sine';
    this.primaryOsc.frequency.setValueAtTime(hz, this.ctx.currentTime);

    this.primaryGain = this.ctx.createGain();
    this.primaryGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.primaryGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 1.2);

    // Create stereo panner for Left ear if supported
    if (this.ctx.createStereoPanner) {
      const panL = this.ctx.createStereoPanner();
      panL.pan.setValueAtTime(-0.8, this.ctx.currentTime);
      this.primaryOsc.connect(this.primaryGain);
      this.primaryGain.connect(panL);
      panL.connect(this.masterGain);
    } else {
      this.primaryOsc.connect(this.primaryGain);
      this.primaryGain.connect(this.masterGain);
    }

    // Binaural second oscillator slightly offset for brainwave entrainment
    this.binauralOsc = this.ctx.createOscillator();
    this.binauralOsc.type = 'sine';
    this.binauralOsc.frequency.setValueAtTime(hz + binauralHz, this.ctx.currentTime);

    this.binauralGain = this.ctx.createGain();
    this.binauralGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.binauralGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 1.2);

    if (this.ctx.createStereoPanner) {
      const panR = this.ctx.createStereoPanner();
      panR.pan.setValueAtTime(0.8, this.ctx.currentTime);
      this.binauralOsc.connect(this.binauralGain);
      this.binauralGain.connect(panR);
      panR.connect(this.masterGain);
    } else {
      this.binauralOsc.connect(this.binauralGain);
      this.binauralGain.connect(this.masterGain);
    }

    this.primaryOsc.start();
    this.binauralOsc.start();
    this.isPlayingFreq = true;
  }

  public stopFrequency() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (this.primaryGain) {
      this.primaryGain.gain.setTargetAtTime(0, now, 0.3);
    }
    if (this.binauralGain) {
      this.binauralGain.gain.setTargetAtTime(0, now, 0.3);
    }

    const oldPrimary = this.primaryOsc;
    const oldBinaural = this.binauralOsc;

    setTimeout(() => {
      try {
        oldPrimary?.stop();
        oldPrimary?.disconnect();
        oldBinaural?.stop();
        oldBinaural?.disconnect();
      } catch {
        // Ignored
      }
    }, 400);

    this.primaryOsc = null;
    this.binauralOsc = null;
    this.isPlayingFreq = false;
  }

  // Rain sound generator (Filtered Pink/Brownian Noise)
  public setRainVolume(vol: number) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (vol <= 0.001) {
      if (this.rainGain) {
        this.rainGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
      }
      return;
    }

    if (!this.rainNode) {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.11;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      noiseSource.connect(filter);
      filter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      noiseSource.start();
      this.rainNode = noiseSource;
    }

    if (this.rainGain) {
      this.rainGain.gain.setTargetAtTime(vol * 0.5, this.ctx.currentTime, 0.2);
    }
  }

  // Deep space cosmic drone synthesizer
  public setCosmicDroneVolume(vol: number) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (vol <= 0.001) {
      if (this.cosmicDroneGain) {
        this.cosmicDroneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      }
      return;
    }

    if (!this.cosmicDroneOsc1) {
      this.cosmicDroneOsc1 = this.ctx.createOscillator();
      this.cosmicDroneOsc2 = this.ctx.createOscillator();

      this.cosmicDroneOsc1.type = 'triangle';
      this.cosmicDroneOsc2.type = 'sine';

      this.cosmicDroneOsc1.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2
      this.cosmicDroneOsc2.frequency.setValueAtTime(98.00, this.ctx.currentTime); // G2

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.cosmicDroneGain = this.ctx.createGain();
      this.cosmicDroneOsc1.connect(filter);
      this.cosmicDroneOsc2.connect(filter);
      filter.connect(this.cosmicDroneGain);
      this.cosmicDroneGain.connect(this.masterGain);

      this.cosmicDroneOsc1.start();
      this.cosmicDroneOsc2.start();
    }

    if (this.cosmicDroneGain) {
      this.cosmicDroneGain.gain.setTargetAtTime(vol * 0.35, this.ctx.currentTime, 0.3);
    }
  }

  // Soft affirmation bell chime
  public playChime(freq = 528) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 2.6);
  }

  public getIsPlaying(): boolean {
    return this.isPlayingFreq;
  }

  public getCurrentFrequency(): number {
    return this.currentFrequency;
  }
}

export const audioEngine = new AudioSynthesizer();
