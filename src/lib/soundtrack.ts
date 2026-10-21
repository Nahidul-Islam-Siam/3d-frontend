// Subtle procedural warm piano and strings using Web Audio API
class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    
    // Fade in master gain smoothly
    this.masterGain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2.5);

    // Warm string pad drone (roots: F3, C4, A4)
    this.createDrone([174.61, 261.63, 440.0]);

    // Arpeggiated soft piano notes
    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C maj
      [220.0, 261.63, 329.63, 440.0],  // A min
      [174.61, 220.0, 261.63, 349.23], // F maj
      [196.0, 246.94, 293.66, 392.0]   // G maj
    ];
    let chordIdx = 0;

    const playNextChord = () => {
      if (!this.isPlaying || !this.ctx) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          if (this.isPlaying) this.playPianoNote(freq);
        }, i * 450 + Math.random() * 80);
      });

      this.timer = window.setTimeout(playNextChord, 4200);
    };

    playNextChord();
  }

  private playPianoNote(frequency: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, now);

    // Warm low-pass filter simulates felt acoustic piano hammer
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 2.0);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3.2);
  }

  private createDrone(frequencies: number[]) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    frequencies.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 3.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
    });
  }

  public stop() {
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    }
    this.isPlaying = false;
  }

  public getActive(): boolean {
    return this.isPlaying;
  }
}

export const soundscape = new AmbientSoundscape();

