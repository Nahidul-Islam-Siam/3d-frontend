import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CiMenuFries } from "react-icons/ci";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideNav from "./side-nav";
import logoWithText from "@/assets/logo/logo-with-text.png";
import logoIconWhite from "@/assets/logo/logo-icon-white.png";
import btnArrow from "@/assets/icons/btn-arrow.png";

interface NavItem {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
}

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isDonatePage = location.pathname === '/donate';
  const isYouMatterPage = location.pathname === '/how-we-serve/you-matter' || location.pathname === '/you-matter';
  const isStoriesPage = location.pathname === '/how-we-serve/stories-that-save-lives' || location.pathname === '/stories-that-save-lives';
  const isWelcomeHomePage = location.pathname === '/how-we-serve/welcome-home' || location.pathname === '/welcome-home';
  const isShowdownPage = location.pathname === '/suicide-awareness-showdown' || location.pathname === '/showdown';
  const isHowWeServePage = location.pathname === '/how-we-serve';
  const isDarkHeroPage = location.pathname === '/meet-us' || location.pathname === '/who-we-are' || isDonatePage || isYouMatterPage || isStoriesPage || isHowWeServePage || isWelcomeHomePage || isShowdownPage;
  const isTransparent = isDarkHeroPage && !hasScrolled;
  const isDarkScrolled = (isDonatePage || isStoriesPage || isShowdownPage) && hasScrolled;
  const isDarkTheme = isTransparent || isDarkScrolled;
  const [isRevealed, setIsRevealed] = useState(!isHomePage);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname, location.hash]);

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
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, [isHomePage]);

  const navItems: NavItem[] = [
    { label: "Welcome", to: "/" },
    { label: "Experience the Story", to: "/experience-the-story" },
    { label: "Who We Are", to: "/who-we-are" },
    { 
      label: "How We Serve", 
      to: "/how-we-serve",
      children: [
        { label: "A Place at the Table", to: "/how-we-serve/a-place-at-the-table" },
        { label: "Strong Foundations (You Matter)", to: "/how-we-serve/you-matter" },
        { label: "Stories That Save Lives (Showdown)", to: "/how-we-serve/stories-that-save-lives" },
        { label: "Welcome Home", to: "/how-we-serve/welcome-home" },
        { label: "A New Beginning", to: "/how-we-serve#a-new-beginning" },
      ]
    },
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
            : isDarkScrolled
              ? 'bg-[#08070B]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
              : 'bg-[#FAF4E6] border-b border-[#e9dcbe]'
        } ${hasScrolled && !isTransparent && !isDarkScrolled ? 'shadow-[0_4px_25px_rgba(0,0,0,0.03)]' : ''} ${
          isRevealed ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="w-full h-full px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between">
          
          {/* 1. Official Logo (White Icon on Dark Hero, Full Logo on Cream) */}
          <div className="flex-shrink-0 mr-2 lg:mr-16 xl:mr-24">
            <Link to="/" className="flex items-center">
              {isDarkTheme ? (
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
            isDarkTheme ? 'text-white/80' : 'text-[#746343]'
          }`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isDropdownOpen = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasDropdown && handleMouseLeave()}
                >
                  <Link 
                    to={item.to} 
                    className={`group/nav relative py-1.5 flex items-center gap-1.5 whitespace-nowrap transition-colors font-normal text-[16px] leading-[24px] ${
                      isDarkTheme
                        ? isActive
                          ? 'text-[#F97316] font-medium'
                          : 'text-white/80 hover:text-white'
                        : isActive 
                          ? 'text-[#ea580c] font-medium' 
                          : 'text-[#746343] hover:text-[#ea580c]'
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : 'rotate-0'
                        } ${
                          isDarkTheme 
                            ? isActive ? 'text-[#F97316]' : 'text-white/60 group-hover/nav:text-white' 
                            : isActive ? 'text-[#ea580c]' : 'text-[#746343]/70 group-hover/nav:text-[#ea580c]'
                        }`} 
                      />
                    )}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_1.5px_rgba(249,115,22,0.6)]" 
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hasDropdown && isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
                      >
                        <div className={`w-[245px] rounded-2xl p-2 border shadow-2xl ${
                          isDarkTheme
                            ? 'bg-[#0E0D12]/95 backdrop-blur-xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
                            : 'bg-[#FAF4E6]/95 backdrop-blur-xl border-[#e9dcbe] shadow-[0_20px_45px_rgba(116,99,67,0.18)]'
                        }`}>
                          <div className="flex flex-col space-y-0.5">
                            {item.children?.map((child) => {
                              const isChildActive = child.to.includes('#')
                                ? location.pathname === child.to.split('#')[0] && location.hash === `#${child.to.split('#')[1]}`
                                : location.pathname === child.to;

                              return (
                                <Link
                                  key={child.label}
                                  to={child.to}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`group/child relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] leading-snug transition-all duration-150 ${
                                    isDarkTheme
                                      ? isChildActive
                                        ? 'bg-white/10 text-[#F97316] font-medium'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                      : isChildActive
                                        ? 'bg-[#F2E5CA] text-[#ea580c] font-medium'
                                        : 'text-[#746343] hover:text-[#ea580c] hover:bg-[#F3E7CD]'
                                  }`}
                                >
                                  <span className="whitespace-nowrap font-normal group-hover/child:font-medium transition-all">
                                    {child.label}
                                  </span>
                                  <span 
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
                                      isChildActive
                                        ? 'bg-[#F97316] opacity-100 scale-100'
                                        : 'bg-[#F97316] opacity-0 group-hover/child:opacity-50 scale-75 group-hover/child:scale-100'
                                    }`} 
                                  />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                  isDarkTheme
                    ? isDonatePage
                      ? 'border border-[#F97316]/80 text-[#F97316] bg-transparent hover:bg-[#F97316]/10 shadow-none'
                      : 'border border-white/50 hover:border-white text-white bg-transparent hover:bg-white/10 shadow-none'
                    : 'bg-[#F97316] hover:bg-[#ea580c] text-white shadow-sm border border-transparent'
                }`}
              >
                <span className={`font-serif font-bold text-[15px] tracking-wide leading-none whitespace-nowrap ${
                  isDarkTheme && isDonatePage ? 'text-[#F97316]' : 'text-white'
                }`}>
                  Donate
                </span>
                <img 
                  src={btnArrow} 
                  alt="" 
                  className="h-[21px] w-auto object-contain group-hover:translate-x-0.5 transition-transform" 
                />
              </motion.button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleOpen}
            aria-label="Open navigation menu"
            className={`lg:hidden ml-4 p-2 rounded-xl transition-colors ${
              isDarkTheme 
                ? 'text-white hover:text-[#F97316] hover:bg-white/10' 
                : 'text-stone-800 hover:text-[#ea580c] hover:bg-orange-100/50'
            }`}
          >
            <CiMenuFries className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>
    </>
  );
}
