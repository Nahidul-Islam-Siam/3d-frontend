import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { 
  ChevronDown, 
  Utensils, 
  GraduationCap, 
  BookHeart, 
  Home as HomeIcon, 
  Users 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideNav from "./side-nav";
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
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isServeOpen, setIsServeOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const [isRevealed, setIsRevealed] = useState(!isHomePage);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isHomePage) {
      setIsRevealed(true);
      return;
    }

    // On home page, hidden initially until video time finishes
    setIsRevealed(false);

    const handleReveal = () => setIsRevealed(true);
    const handleHide = () => setIsRevealed(false);

    const handleScroll = () => {
      const isPast = window.scrollY > 20;
      setHasScrolled(prev => prev !== isPast ? isPast : prev);
    };

    window.addEventListener('reveal-navbar', handleReveal);
    window.addEventListener('hide-navbar', handleHide);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('reveal-navbar', handleReveal);
      window.removeEventListener('hide-navbar', handleHide);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const navItems = [
    { label: "Welcome", to: "/" },
    { label: "Experience the Story", to: "/about" },
    { label: "Who We Are", to: "/who-we-are" },
    { label: "How We Serve", to: "/how-we-serve", hasDropdown: true },
    { label: "Join the Movement", to: "/movement" },
    { label: "Meet Us", to: "/meet-us" },
  ];

  return (
    <>
      <SideNav handleClose={toggleOpen} isOpen={isOpen} />
      
      <motion.nav 
        initial={{ y: isHomePage ? -80 : 0, opacity: isHomePage ? 0 : 1 }}
        animate={{ 
          y: isRevealed ? 0 : -80, 
          opacity: isRevealed ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 h-[74px] z-50 bg-[#FAF4E6] border-b border-[#e9dcbe] transition-shadow duration-300 ${
          hasScrolled ? 'shadow-[0_4px_25px_rgba(0,0,0,0.03)]' : ''
        } ${isRevealed ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="w-full h-full px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between">
          
          {/* 1. Official Logo (Positioned on the Left with Extra Gap to Menu) */}
          <div className="flex-shrink-0 mr-2 lg:mr-16 xl:mr-24">
            <Link to="/" className="flex items-center">
              <img 
                src={logoWithText} 
                alt="Live Achieve Believe" 
                className="h-[27px] w-auto object-contain" 
              />
            </Link>
          </div>

          {/* 2. Desktop Navigation Links (Centered, Single Line, Helvetica 16px) */}
          <div className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 whitespace-nowrap text-[16px] leading-[24px] font-normal text-[#746343]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;

              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    className="relative py-2 whitespace-nowrap"
                    onMouseEnter={() => setIsServeOpen(true)}
                    onMouseLeave={() => setIsServeOpen(false)}
                  >
                    <button 
                      className={`flex items-center gap-1.5 transition-colors hover:text-[#ea580c] font-normal text-[16px] leading-[24px] whitespace-nowrap ${
                        location.pathname.startsWith('/how-we-serve') ? 'text-[#ea580c] font-medium' : 'text-[#746343]'
                      }`}
                      onClick={() => setIsServeOpen(!isServeOpen)}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#746343] transition-transform duration-200 ${
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
                          className="absolute top-full -left-6 w-[360px] p-2.5 rounded-2xl bg-[#FAF4E6] border border-orange-200/90 shadow-xl grid gap-1 text-left"
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
                                className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-orange-100/40 transition-colors"
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
                  className={`relative py-1.5 whitespace-nowrap transition-colors hover:text-[#ea580c] font-normal text-[16px] leading-[24px] ${
                    isActive ? 'text-[#ea580c] font-medium' : 'text-[#746343]'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_1.5px_rgba(249,115,22,0.6)]" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 3. Official Orange Pill Donate Button (Extra Gap from Menu) */}
          <div className="flex items-center flex-shrink-0 ml-8 lg:ml-16 xl:mr-0 xl:ml-24">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3.5 pl-6 pr-4 py-2 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white shadow-sm transition-all whitespace-nowrap"
              >
                <span className="font-serif font-bold text-[15px] tracking-wide text-white leading-none whitespace-nowrap">
                  Donate
                </span>
                <img 
                  src={btnArrow} 
                  alt="" 
                  className="h-[21px] w-auto object-contain group-hover:translate-x-0.5 transition-transform" 
                />
              </motion.button>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleOpen}
              aria-label="Open navigation menu"
              className="lg:hidden ml-4 p-2 rounded-xl text-stone-800 hover:text-[#ea580c] hover:bg-orange-100/50 transition-colors"
            >
              <CiMenuFries className="w-6 h-6" />
            </button>
          </div>

        </div>
      </motion.nav>
    </>
  );
}
