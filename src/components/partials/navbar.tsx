import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";
import SideNav from "./side-nav";
import logoWithText from "@/assets/logo/logo-with-text.png";
import logoIconWhite from "@/assets/logo/logo-icon-white.png";
import btnArrow from "@/assets/icons/btn-arrow.png";

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isDarkHeroPage = location.pathname === '/meet-us' || location.pathname === '/who-we-are' || location.pathname === '/donate';
  const isTransparent = isDarkHeroPage && !hasScrolled;
  const [isRevealed, setIsRevealed] = useState(!isHomePage);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Initial reveal state
    setIsRevealed(!isHomePage);
 
    const handleReveal = () => setIsRevealed(true);
    const handleHide = () => setIsRevealed(false);

    const handleScroll = () => {
      const isPast = window.scrollY > 40;
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
    { label: "How We Serve", to: "/how-we-serve" },
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
        className={`fixed top-0 left-0 right-0 h-[74px] z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-[#FAF4E6] border-b border-[#e9dcbe]'
        } ${hasScrolled && !isTransparent ? 'shadow-[0_4px_25px_rgba(0,0,0,0.03)]' : ''} ${
          isRevealed ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="w-full h-full px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between">
          
          {/* 1. Official Logo (White Icon on Dark Hero, Full Logo on Cream) */}
          <div className="flex-shrink-0 mr-2 lg:mr-16 xl:mr-24">
            <Link to="/" className="flex items-center">
              {isTransparent ? (
                <img 
                  src={logoIconWhite} 
                  alt="Live Achieve Believe" 
                  className="h-[30px] w-auto object-contain transition-opacity duration-300" 
                />
              ) : (
                <img 
                  src={logoWithText} 
                  alt="Live Achieve Believe" 
                  className="h-[27px] w-auto object-contain transition-opacity duration-300" 
                />
              )}
            </Link>
          </div>

          {/* 2. Desktop Navigation Links (Centered, Single Line, Helvetica 16px) */}
          <div className={`hidden lg:flex items-center justify-center gap-7 xl:gap-9 whitespace-nowrap text-[16px] leading-[24px] font-normal transition-colors duration-300 ${
            isTransparent ? 'text-white/80' : 'text-[#746343]'
          }`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link 
                  key={item.label}
                  to={item.to} 
                  className={`relative py-1.5 whitespace-nowrap transition-colors font-normal text-[16px] leading-[24px] ${
                    isTransparent
                      ? isActive
                        ? 'text-[#F97316] font-medium'
                        : 'text-white/80 hover:text-white'
                      : isActive 
                        ? 'text-[#ea580c] font-medium' 
                        : 'text-[#746343] hover:text-[#ea580c]'
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

          {/* 3. Donate Button (Figma Outline on Dark Hero, Solid Orange on Cream) */}
          <div className="flex items-center flex-shrink-0 ml-8 lg:ml-16 xl:mr-0 xl:ml-24">
            <Link to="/donate">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group inline-flex items-center gap-3.5 pl-6 pr-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  isTransparent
                    ? 'border border-white/50 hover:border-white text-white bg-transparent hover:bg-white/10 shadow-none'
                    : 'bg-[#F97316] hover:bg-[#ea580c] text-white shadow-sm border border-transparent'
                }`}
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
              className={`lg:hidden ml-4 p-2 rounded-xl transition-colors ${
                isTransparent 
                  ? 'text-white hover:text-[#F97316] hover:bg-white/10' 
                  : 'text-stone-800 hover:text-[#ea580c] hover:bg-orange-100/50'
              }`}
            >
              <CiMenuFries className="w-6 h-6" />
            </button>
          </div>

        </div>
      </motion.nav>
    </>
  );
}
