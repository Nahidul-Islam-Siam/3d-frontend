import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { 
  Sparkles, 
  Heart, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Utensils, 
  GraduationCap, 
  BookHeart, 
  Home as HomeIcon, 
  Users 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideNav from "./side-nav";
import { soundscape } from "@/lib/soundtrack";

const ministries = [
  {
    title: "A Place at the Table",
    subtitle: "Community Meals & Dignity",
    to: "/how-we-serve#table",
    icon: Utensils,
    tag: "Meals"
  },
  {
    title: "Strong Foundations",
    subtitle: "Youth Development & LEADS",
    to: "/how-we-serve#youth",
    icon: GraduationCap,
    tag: "Next Gen"
  },
  {
    title: "Stories That Save Lives",
    subtitle: "Suicide Awareness Showdown",
    to: "/how-we-serve#stories",
    icon: BookHeart,
    tag: "Mental Health"
  },
  {
    title: "Welcome Home",
    subtitle: "Veteran Housing & Restoration",
    to: "/how-we-serve#veterans",
    icon: HomeIcon,
    tag: "Veterans"
  },
  {
    title: "Serve Beside Us",
    subtitle: "Volunteer Family Opportunities",
    to: "/how-we-serve#volunteer",
    icon: Users,
    tag: "Community"
  }
];

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isServeOpen, setIsServeOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const location = useLocation();

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAudio = () => {
    const active = soundscape.toggle();
    setAudioActive(active);
  };

  return (
    <>
      <SideNav handleClose={toggleOpen} isOpen={isOpen} />
      
      <motion.nav 
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 h-[84px] z-50 transition-all duration-300 ${
          scrollY > 30 
            ? 'bg-[#09090b]/90 border-b border-amber-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]' 
            : 'bg-gradient-to-b from-[#09090b]/95 via-[#09090b]/70 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-600/10 to-transparent border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-105 group-hover:border-amber-300 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-serif tracking-[0.2em] font-semibold text-[#fcfaf7] group-hover:text-amber-200 transition-colors uppercase">
                Live Achieve Believe
              </span>
              <span className="text-[10px] tracking-[0.25em] text-stone-400 uppercase font-mono">
                People Matter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-[0.16em] uppercase text-stone-300">
            <Link 
              to="/" 
              className={`hover:text-amber-300 transition-colors py-2 relative ${
                location.pathname === '/' ? 'text-amber-300' : ''
              }`}
            >
              Welcome
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              )}
            </Link>

            <Link 
              to="/about" 
              className="hover:text-amber-300 transition-colors py-2"
            >
              Experience the Story
            </Link>

            {/* How We Serve with Interactive Mega-Menu */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsServeOpen(true)}
              onMouseLeave={() => setIsServeOpen(false)}
            >
              <button 
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors uppercase"
                onClick={() => setIsServeOpen(!isServeOpen)}
              >
                <span>How We Serve</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServeOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isServeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-20 w-[420px] p-3 rounded-2xl bg-[#0f0f12]/95 border border-amber-500/25 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid gap-1.5 text-left"
                  >
                    <div className="px-3 py-2 border-b border-stone-800 text-[10px] tracking-widest text-amber-400 font-semibold uppercase flex items-center justify-between">
                      <span>The 5 Doorways of Compassion</span>
                      <span className="text-stone-500">Hallway</span>
                    </div>

                    {ministries.map((m) => {
                      const Icon = m.icon;
                      return (
                        <Link
                          key={m.title}
                          to={m.to}
                          onClick={() => setIsServeOpen(false)}
                          className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 group-hover/item:text-amber-300 group-hover/item:border-amber-400/40 transition-colors mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-serif font-medium text-stone-100 group-hover/item:text-amber-200 normal-case">
                                {m.title}
                              </span>
                              <span className="text-[9px] font-mono text-stone-400 bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                                {m.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 normal-case font-sans">
                              {m.subtitle}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/movement" 
              className="hover:text-amber-300 transition-colors py-2"
            >
              Join the Movement
            </Link>

            <Link 
              to="/about" 
              className="hover:text-amber-300 transition-colors py-2"
            >
              Meet Us
            </Link>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Audio Ambient Pill */}
            <button
              onClick={toggleAudio}
              title="Toggle warm piano ambient soundtrack"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 transition-all"
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="text-amber-300 text-[11px]">PIANO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-[11px]">SOUND</span>
                </>
              )}
            </button>

            {/* Donate / Give Hope CTA */}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-medium text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all font-mono"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-stone-950 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Donate / Give Hope</span>
              </motion.button>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={toggleOpen}
              aria-label="Open mobile menu"
              className="lg:hidden p-2 rounded-xl text-stone-300 hover:text-amber-300 hover:bg-white/5 transition-colors"
            >
              <CiMenuFries className="w-6 h-6" />
            </button>
          </div>

        </div>
      </motion.nav>
    </>
  );
}
