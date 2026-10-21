import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronRight, 
  Play, 
  Pause, 
  Heart,
  Compass, 
  Users, 
  BookOpen, 
  Home as HomeIcon,
  HelpCircle,
  Layers
} from 'lucide-react';
import SpotlightCanvas from './SpotlightCanvas';
import { soundscape } from '@/lib/soundtrack';

interface WelcomeExperienceProps {
  onEnterHallway?: () => void;
}

// 8 Cinematic Moments in the Sequence
const cinematicMoments = [
  {
    title: "Empty Stage",
    description: "Silence before the story begins. A place where every voice can find resonance.",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1600&q=80",
    quote: "Every person has a story."
  },
  {
    title: "Hands Preparing a Meal",
    description: "Fresh ingredients, heartfelt warmth. Nourishment prepared with dignity.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80",
    quote: "Every story deserves to be heard."
  },
  {
    title: "Volunteer Smiling",
    description: "The joy of choosing to be present for someone else's tomorrow.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80",
    quote: "Every person deserves hope."
  },
  {
    title: "Meal Being Served",
    description: "A warm plate across a wooden table. An invitation to belong.",
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1600&q=80",
    quote: "This isn't simply a website."
  },
  {
    title: "Child Laughing",
    description: "Resilience taking root in the next generation. Pure, unfiltered hope.",
    image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1600&q=80",
    quote: "It's an invitation."
  },
  {
    title: "Handwritten Letter",
    description: "Words etched in ink on parchment. Conversations that heal and restore.",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1600&q=80",
    quote: "Where compassion becomes action..."
  },
  {
    title: "People Embracing",
    description: "Compassion made visible. No one walks their heaviest chapters alone.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80",
    quote: "Where hope becomes visible..."
  },
  {
    title: "Veteran Receiving Keys & Opening Front Door",
    description: "A brass key turns. A porch light glows. A new chapter begins.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    quote: "And every story matters. Including yours."
  }
];

// Spoken dialogue segments for on-camera COO delivery
const dialogueSegments = [
  "Welcome.",
  "We're really glad you're here.",
  "Before you learn about what we do, I'd love for you to know who we are.",
  "Live Achieve Believe isn't just an organization.",
  "It's a family of people who believe that every person has value, every story matters, and every life deserves hope.",
  "Some people come here because they're looking for a way to give back. Some are searching for answers.",
  "Some are simply curious about who we are. And some arrive carrying burdens no one else can see.",
  "Wherever you find yourself today, we're honored that you're here.",
  "We don't believe people should be defined by the hardest chapter of their lives.",
  "We believe healing begins when people are seen, heard, and reminded that they matter.",
  "That's why everything we do—from serving meals and mentoring students to supporting veterans—is centered on one simple truth:",
  "People matter.",
  "So before you explore our website, before you learn about our programs, and before you decide whether to partner with us…",
  "We simply want to say… Welcome home.",
  "We hope that as you journey through these pages, you'll discover not only who we are—but perhaps something meaningful about yourself as well."
];

export default function WelcomeExperience({ onEnterHallway }: WelcomeExperienceProps) {
  // Experience stages: 
  // 0 = complete darkness
  // 1 = warm spotlight & welcome
  // 2 = cinematic montage
  // 3 = curtain opening & COO on-camera
  // 4 = hallway gateway
  const [stage, setStage] = useState<number>(0);
  const [montageIndex, setMontageIndex] = useState<number>(0);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isPlayingDialogue, setIsPlayingDialogue] = useState<boolean>(true);
  const [showColorKey, setShowColorKey] = useState<boolean>(false);

  // Step inside from complete darkness
  const handleAwaken = () => {
    if (stage === 0) {
      setStage(1);
      soundscape.start();
    }
  };

  // Automatic cycle for montage when in stage 2
  useEffect(() => {
    if (stage !== 2) return;
    const interval = setInterval(() => {
      setMontageIndex((prev) => {
        if (prev < cinematicMoments.length - 1) {
          return prev + 1;
        } else {
          setStage(3);
          return prev;
        }
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [stage]);

  // Dialogue pacing in stage 3
  useEffect(() => {
    if (stage !== 3 || !isPlayingDialogue) return;
    const interval = setInterval(() => {
      setDialogueIndex((prev) => {
        if (prev < dialogueSegments.length - 1) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 4800);

    return () => clearInterval(interval);
  }, [stage, isPlayingDialogue]);

  return (
    <div className="relative w-full min-h-[calc(100vh-84px)] bg-[#050505] text-[#f7f5f0] overflow-hidden font-sans select-none flex flex-col justify-between">
      {/* 3D Dust and Ambient Lighting Canvas */}
      <SpotlightCanvas />

      {/* Floating Director's Key Control (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setShowColorKey(!showColorKey)}
          aria-label="Color key guidance"
          className="px-3.5 py-2 rounded-full text-xs font-mono tracking-wider bg-stone-900/90 hover:bg-stone-800 border border-stone-700/60 backdrop-blur-md transition-all flex items-center gap-2 text-stone-300 shadow-xl"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Director's Script Key</span>
        </button>
      </div>

      {/* Director's Color Key Modal / Floating Card */}
      <AnimatePresence>
        {showColorKey && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-20 right-6 z-50 max-w-sm p-4 rounded-xl bg-stone-900/95 border border-stone-700/60 backdrop-blur-xl shadow-2xl text-xs space-y-2.5 font-sans"
          >
            <div className="font-semibold tracking-wider uppercase text-[11px] text-stone-200 border-b border-stone-800 pb-1.5 flex items-center justify-between">
              <span>Creative Direction: Color Key</span>
              <button onClick={() => setShowColorKey(false)} className="text-stone-500 hover:text-stone-300">&times;</button>
            </div>
            <div className="flex items-center gap-2 text-stone-100 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
              <span>White / Black: Website copy</span>
            </div>
            <div className="flex items-center gap-2 text-sky-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>Blue: Spoken dialogue for video & captions</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400 italic">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-500" />
              <span>Gray Italic: Creative & designer direction</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 0: COMPLETE DARKNESS */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            key="stage-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
            onClick={handleAwaken}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center cursor-pointer px-6"
          >
            <motion.div 
              animate={{ opacity: [0.3, 0.85, 0.3] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="text-center space-y-4"
            >
              <div className="w-3 h-3 mx-auto rounded-full bg-amber-400/90 shadow-[0_0_25px_#f59e0b]" />
              <p className="text-stone-300 text-sm md:text-base tracking-[0.3em] uppercase font-light">
                Complete Darkness. Silence.
              </p>
              <p className="text-amber-400/80 text-xs font-mono tracking-widest pt-2">
                Click anywhere to illuminate & awaken
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 1: WARM SPOTLIGHT & "WELCOME" */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            key="stage-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center"
          >
            {/* Ambient Radial Spotlight */}
            <div 
              className="absolute pointer-events-none w-[600px] h-[600px] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle,rgba(251,191,36,0.35)_0%,rgba(180,83,9,0.15)_45%,transparent_75%)]"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="relative space-y-6 max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Emotional Identity: Belonging</span>
              </div>
              
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif tracking-tight text-[#faf7f2] drop-shadow-[0_4px_40px_rgba(251,191,36,0.25)]">
                WELCOME
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="space-y-2 font-serif text-2xl md:text-3xl text-stone-300 font-light"
              >
                <p>We've been expecting you.</p>
                <p className="text-base font-sans tracking-widest uppercase text-stone-400 font-normal">
                  Step inside.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="pt-6"
              >
                <button
                  onClick={() => setStage(2)}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-semibold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(251,191,36,0.4)] font-mono"
                >
                  <span>Begin Cinematic Sequence</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <p className="text-[11px] text-stone-500 font-mono tracking-widest pt-2 uppercase">
                Visitor Takeaway: "I've been expected."
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 2: CINEMATIC SEQUENCE MONTAGE */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            key="stage-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 flex-1 flex flex-col justify-between p-6 md:p-12"
          >
            {/* Background Cinematic Visual with Smooth Dissolve */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={montageIndex}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cinematicMoments[montageIndex].image})` }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
            </div>

            {/* Top Indicator */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-stone-400">
              <span className="uppercase tracking-widest">
                Act I: The Cinematic Sequence ({montageIndex + 1} / {cinematicMoments.length})
              </span>
              <button 
                onClick={() => setStage(3)}
                className="hover:text-amber-300 underline underline-offset-4 transition-colors"
              >
                Skip to Curtain & COO Welcome &rarr;
              </button>
            </div>

            {/* Central Narrative Block */}
            <div className="relative z-10 max-w-3xl my-auto space-y-6">
              <motion.div
                key={`text-${montageIndex}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                  <span>Moment {montageIndex + 1}</span>
                  <span>&bull;</span>
                  <span>{cinematicMoments[montageIndex].title}</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif text-[#faf7f2] leading-tight">
                  "{cinematicMoments[montageIndex].quote}"
                </h2>

                <p className="text-lg text-stone-300 font-light leading-relaxed">
                  {cinematicMoments[montageIndex].description}
                </p>
              </motion.div>

              {/* Official Website Copy Ribbon */}
              <div className="pt-6 border-t border-stone-800/80">
                <p className="text-sm text-stone-400 font-sans leading-relaxed">
                  <span className="text-stone-200 font-medium">This isn't simply a website.</span> It's an invitation to experience a place where compassion becomes action, hope becomes visible, and every story matters. <span className="text-amber-300 font-serif italic">Including yours.</span>
                </p>
              </div>
            </div>

            {/* Bottom Progress Bars */}
            <div className="relative z-10 flex items-center gap-2 py-4">
              {cinematicMoments.map((moment, idx) => (
                <button
                  key={moment.title}
                  onClick={() => setMontageIndex(idx)}
                  className="flex-1 h-1.5 rounded-full overflow-hidden bg-stone-800/80 transition-all hover:h-2"
                >
                  <div 
                    className={`h-full transition-all duration-300 ${
                      idx === montageIndex 
                        ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]' 
                        : idx < montageIndex ? 'bg-amber-400/40' : 'bg-transparent'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 3: THE THEATRE CURTAIN OPENS & COO ON-CAMERA WELCOME */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            key="stage-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex-1 flex flex-col justify-between p-6 md:p-12 overflow-hidden"
          >
            {/* Theatrical Curtain Layer (Parts to Left and Right) */}
            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              className="fixed inset-y-0 left-0 w-1/2 bg-gradient-to-r from-red-950 via-rose-950 to-stone-900 border-r border-amber-500/20 shadow-[10px_0_40px_rgba(0,0,0,0.8)] z-30 pointer-events-none flex items-center justify-end pr-8"
            >
              <div className="h-full w-12 bg-black/40 blur-md" />
            </motion.div>

            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              className="fixed inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red-950 via-rose-950 to-stone-900 border-l border-amber-500/20 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] z-30 pointer-events-none flex items-center justify-start pl-8"
            >
              <div className="h-full w-12 bg-black/40 blur-md" />
            </motion.div>

            {/* COO Setting Background: Warm natural room with natural daylight */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80"
                alt="COO Greet with warm smile in open room"
                className="w-full h-full object-cover object-center opacity-40 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
            </div>

            {/* Top Bar with Director Note */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Act II: The Encounter
                </span>
                <p className="text-xs text-stone-400 italic">
                  Creative Direction: The COO never stands behind a desk. Greet people naturally, smile, and walk through the space.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingDialogue(!isPlayingDialogue)}
                  className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5"
                >
                  {isPlayingDialogue ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingDialogue ? "Pause Speech" : "Resume Speech"}</span>
                </button>
              </div>
            </div>

            {/* Main Center Video / Dialogue Presentation */}
            <div className="relative z-10 max-w-4xl mx-auto my-auto w-full py-8 space-y-6">
              {/* Spoken Dialogue (BLUE per design color key) */}
              <div className="p-6 md:p-8 rounded-2xl bg-black/60 border border-sky-500/40 backdrop-blur-xl shadow-[0_0_50px_rgba(56,189,248,0.15)] relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                      Spoken Dialogue / On-Camera Welcome (Captions)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">
                    Segment {dialogueIndex + 1} of {dialogueSegments.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={dialogueIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl md:text-3xl font-serif text-sky-200 leading-relaxed drop-shadow"
                  >
                    "{dialogueSegments[dialogueIndex]}"
                  </motion.p>
                </AnimatePresence>

                {/* Progress scrub through dialogue */}
                <div className="mt-6 flex items-center gap-1.5">
                  {dialogueSegments.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDialogueIndex(i)}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i === dialogueIndex ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : i < dialogueIndex ? 'bg-sky-400/40' : 'bg-stone-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Website Copy (BLACK / CREAM per design color key) */}
              <div className="grid md:grid-cols-2 gap-6 bg-stone-950/60 p-6 rounded-xl border border-stone-800 backdrop-blur-md">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-2">
                    Website Copy (Black)
                  </h3>
                  <p className="text-stone-200 font-serif text-base leading-relaxed">
                    Live Achieve Believe isn't just an organization. It's a family of people who believe that every person has value, every story matters, and every life deserves hope.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-2">
                    Core Mission
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    We don't believe people should be defined by the hardest chapter of their lives. We believe healing begins when people are seen, heard, and reminded that they matter.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Invitation Transition into Softly Lit Hallway */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-800/80">
              <div className="text-xs text-stone-400 italic font-serif">
                As the COO says "Welcome home," the doorway opens into the softly lit hallway...
              </div>

              <button
                onClick={() => onEnterHallway ? onEnterHallway() : setStage(4)}
                className="group px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(251,191,36,0.4)] flex items-center gap-2"
              >
                <span>Step Into The Hallway</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 4: TRANSITION PORTAL / HALLWAY ENTRANCE */}
      <AnimatePresence>
        {stage === 4 && (
          <motion.div
            key="stage-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Warm Walnut Hallway Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2b1810]/40 via-[#050505] to-[#120a06]" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <HomeIcon className="w-7 h-7" />
              </div>

              <h2 className="text-4xl md:text-6xl font-serif text-[#faf7f2]">
                Welcome Home.
              </h2>

              <p className="text-stone-300 text-lg font-light leading-relaxed">
                The softly lit hallway opens before you. Warm walnut flooring, brass sconces, and five doors waiting to be discovered.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 text-left">
                <div className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs">
                  <span className="text-amber-400 font-mono block mb-1">01</span>
                  <span className="text-stone-200 font-medium">Experience the Story</span>
                </div>
                <div className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs">
                  <span className="text-amber-400 font-mono block mb-1">02</span>
                  <span className="text-stone-200 font-medium">How We Serve</span>
                </div>
                <div className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs">
                  <span className="text-amber-400 font-mono block mb-1">03</span>
                  <span className="text-stone-200 font-medium">Join the Movement</span>
                </div>
                <div className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs">
                  <span className="text-amber-400 font-mono block mb-1">04</span>
                  <span className="text-stone-200 font-medium">Meet Us</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setStage(1)}
                  className="text-xs text-stone-500 hover:text-stone-300 font-mono tracking-wider uppercase underline underline-offset-4"
                >
                  &larr; Replay Welcome Sequence
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
