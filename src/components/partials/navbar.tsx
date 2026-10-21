import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Utensils, 
  GraduationCap, 
  BookHeart, 
  Home as HomeIcon, 
  Users 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideNav from "./side-nav";
import { soundscape } from "@/lib/soundtrack";
import logoWithText from "@/assets/logo/logo-with-text.png";
import btnArrow from "@/assets/icons/btn-arrow.png";

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

  const isHomePage = location.pathname === '/';
  const [isRevealed, setIsRevealed] = useState(!isHomePage);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isHomePage) {
      setIsRevealed(true);
      return;
    }

    const handleReveal = () => setIsRevealed(true);
    window.addEventListener('reveal-navbar', handleReveal);

    // Fallback timer to ensure navbar always reveals smoothly
    const timer = setTimeout(() => setIsRevealed(true), 2200);

    return () => {
      window.removeEventListener('reveal-navbar', handleReveal);
      clearTimeout(timer);
    };
  }, [isHomePage]);

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

  const navItems = [
    { label: "Welcome", to: "/" },
    { label: "Experience the Story", to: "/about" },
    { label: "Who We Are", to: "/about#who-we-are" },
    { label: "How We Serve", to: "/how-we-serve", hasDropdown: true },
    { label: "Join the Movement", to: "/movement" },
    { label: "Meet Us", to: "/about#team" },
  ];

  return (
    <>
      <SideNav handleClose={toggleOpen} isOpen={isOpen} />
      
      <motion.nav 
        initial={{ y: -60, opacity: 0 }}
        animate={{ 
          y: isRevealed ? 0 : -60, 
          opacity: isRevealed ? 1 : 0 
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 h-[76px] z-50 transition-all duration-300 bg-[#FAF4E6] border-b border-orange-200/60 ${
          scrollY > 20 ? 'shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : ''
        } ${isRevealed ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* 1. Official Brand Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src={logoWithText} 
              alt="Live Achieve Believe" 
              className="h-7 sm:h-8 w-auto object-contain" 
            />
          </Link>

          {/* 2. Desktop Navigation Links (Title-case, active orange dot) */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-sans font-medium text-stone-700">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to || (item.to === '/about' && location.pathname === '/about' && !location.hash);

              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    className="relative py-2"
                    onMouseEnter={() => setIsServeOpen(true)}
                    onMouseLeave={() => setIsServeOpen(false)}
                  >
                    <button 
                      className={`flex items-center gap-1 transition-colors hover:text-[#ea580c] ${
                        location.pathname.startsWith('/how-we-serve') ? 'text-[#ea580c] font-semibold' : ''
                      }`}
                      onClick={() => setIsServeOpen(!isServeOpen)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                        isServeOpen ? 'rotate-180 text-[#ea580c]' : ''
                      }`} />
                    </button>

                    <AnimatePresence>
                      {isServeOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full -left-12 w-[380px] p-2.5 rounded-2xl bg-[#FAF4E6] border border-orange-200/90 shadow-xl grid gap-1 text-left"
                        >
                          <div className="px-3 py-1.5 border-b border-orange-100 text-[10px] font-mono tracking-wider text-[#ea580c] font-bold uppercase">
                            How We Serve Ministries
                          </div>

                          {ministries.map((m) => {
                            const Icon = m.icon;
                            return (
                              <Link
                                key={m.title}
                                to={m.to}
                                onClick={() => setIsServeOpen(false)}
                                className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-orange-50/80 transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-orange-100/70 text-[#ea580c] flex items-center justify-center mt-0.5">
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-stone-900 group-hover/item:text-[#ea580c]">
                                      {m.title}
                                    </span>
                                    <span className="text-[9px] font-mono text-stone-500 bg-white px-1.5 py-0.2 rounded border border-orange-100">
                                      {m.tag}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-stone-500">
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
                );
              }

              return (
                <Link 
                  key={item.label}
                  to={item.to} 
                  className={`relative py-1.5 transition-colors hover:text-[#ea580c] ${
                    isActive ? 'text-[#ea580c] font-semibold' : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ea580c] shadow-[0_0_8px_#ea580c]" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 3. Right Action Cluster: Audio + Pill Donate Button */}
          <div className="flex items-center gap-3">
            {/* Subtle Piano Soundtrack Button */}
            <button
              onClick={toggleAudio}
              title="Toggle ambient piano soundscape"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-orange-100/60 hover:bg-orange-200/60 text-stone-700 transition-colors"
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#ea580c] animate-pulse" />
                  <span className="text-[#ea580c] text-[11px] font-bold">PIANO</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                  <span className="text-[11px]">SOUND</span>
                </>
              )}
            </button>

            {/* Official Orange Pill Donate CTA */}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white shadow-sm transition-all"
              >
                <span className="font-serif font-bold text-sm tracking-wide">
                  Donate
                </span>
                <img 
                  src={btnArrow} 
                  alt="" 
                  className="h-5 w-auto object-contain group-hover:translate-x-0.5 transition-transform" 
                />
              </motion.button>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleOpen}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-[#ea580c] hover:bg-orange-100/50 transition-colors"
            >
              <CiMenuFries className="w-6 h-6" />
            </button>
          </div>

        </div>
      </motion.nav>
    </>
  );
}
