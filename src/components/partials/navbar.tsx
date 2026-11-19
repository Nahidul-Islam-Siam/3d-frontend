import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideNav from "./side-nav";
import logoWithText from "@/assets/logo/logo-with-text.png";
import btnArrow from "@/assets/icons/btn-arrow.png";

interface ProgramChild {
  label: string;
  subtitle: string;
  to: string;
  doorNumber: number;
}

interface NavItem {
  label: string;
  to: string;
  children?: ProgramChild[];
}

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isDonatePage = location.pathname === '/donate';
  const isShowdownPage = location.pathname === '/suicide-awareness-showdown' || location.pathname === '/showdown';
  const isDarkHeroPage = isDonatePage || isShowdownPage;
  const isTransparent = isDarkHeroPage && !hasScrolled;
  const isDarkScrolled = isDarkHeroPage && hasScrolled;
  const isDarkTheme = isDarkHeroPage;
  const isCreamPage = location.pathname.startsWith('/how-we-serve') || location.pathname === '/welcome-home' || location.pathname === '/you-matter' || location.pathname === '/strong-foundations' || location.pathname === '/serve-beside-us' || location.pathname === '/stories-that-save-lives' || location.pathname === '/your-story';
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

  const handleChildClick = (to: string) => {
    setOpenDropdown(null);
    if (to.includes('#')) {
      const [path, hash] = to.split('#');
      if (location.pathname === path) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const navItems: NavItem[] = [
    { label: "Welcome", to: "/" },
    { label: "Experience the Story", to: "/experience-the-story" },
    { label: "Who We Are", to: "/who-we-are" },
    { 
      label: "How We Serve", 
      to: "/how-we-serve",
      children: [
        { 
          doorNumber: 1, 
          label: "A Place at the Table", 
          subtitle: "Community meals, listening & human dignity", 
          to: "/how-we-serve/a-place-at-the-table" 
        },
        { 
          doorNumber: 2, 
          label: "Strong Foundations", 
          subtitle: "Youth development, respect & guidance", 
          to: "/how-we-serve/strong-foundations" 
        },
        { 
          doorNumber: 3, 
          label: "Stories That Save Lives", 
          subtitle: "Theatre, music & honest conversations", 
          to: "/how-we-serve/stories-that-save-lives" 
        },
        { 
          doorNumber: 4, 
          label: "Welcome Home", 
          subtitle: "Furnished housing & moves for veterans", 
          to: "/how-we-serve/welcome-home" 
        },
        { 
          doorNumber: 5, 
          label: "A New Beginning", 
          subtitle: "Household essentials & fresh starts", 
          to: "/how-we-serve#a-new-beginning" 
        },
        { 
          doorNumber: 6, 
          label: "Serve Beside Us", 
          subtitle: "Volunteers working together with purpose", 
          to: "/how-we-serve/serve-beside-us" 
        },
        { 
          doorNumber: 7, 
          label: "Your Story", 
          subtitle: "An open doorway inviting you to join", 
          to: "/how-we-serve/your-story" 
        },
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
              : (hasScrolled || isCreamPage)
                ? 'bg-[#FAF4E6]/95 backdrop-blur-md border-b border-[#e9dcbe] shadow-[0_4px_25px_rgba(0,0,0,0.03)]'
                : 'bg-transparent border-b border-transparent shadow-none'
        } ${
          isRevealed ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="w-full h-full px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between">
          
          {/* 1. Official Logo (White Icon on Dark Hero, Full Logo on Cream) */}
          <div className="flex-shrink-0 mr-2 lg:mr-16 xl:mr-24">
            <Link to="/" className="flex items-center">
              {isDarkTheme ? (
                <img 
                  src={logoWithText} 
                  alt="Live Achieve Believe" 
                  className="h-[34px] sm:h-[38px] lg:h-[42px] w-auto object-contain brightness-0 invert transition-all duration-300" 
                />
              ) : (
                <img 
                  src={logoWithText} 
                  alt="Live Achieve Believe" 
                  className="h-[34px] sm:h-[38px] lg:h-[42px] w-auto object-contain transition-all duration-300" 
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

                  {/* Clean, Natural & Smooth Creamy Dropdown */}
                  <AnimatePresence>
                    {hasDropdown && isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
                      >
                        <div className="w-[285px] rounded-2xl p-2 bg-[#FAF4E6] border border-[#DECDB0] shadow-[0_16px_40px_rgba(40,25,10,0.12),0_2px_6px_rgba(40,25,10,0.04)]">
                          <div className="flex flex-col space-y-0.5">
                            {item.children?.map((child) => {
                              const isChildActive = child.to.includes('#')
                                ? location.pathname === child.to.split('#')[0] && location.hash === `#${child.to.split('#')[1]}`
                                : location.pathname === child.to;

                              return (
                                <Link
                                  key={child.label}
                                  to={child.to}
                                  onClick={() => handleChildClick(child.to)}
                                  className={`group/child relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] leading-snug transition-all duration-150 ${
                                    isChildActive
                                      ? 'bg-[#F2E5CA] text-[#E06D28] font-semibold'
                                      : 'text-[#272624] hover:text-[#E06D28] hover:bg-[#F2E5CA]'
                                  }`}
                                >
                                  <span className="whitespace-nowrap font-normal group-hover/child:font-medium transition-all">
                                    {child.label}
                                  </span>

                                  <span 
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-150 flex-shrink-0 ${
                                      isChildActive
                                        ? 'bg-[#E06D28] opacity-100 scale-100'
                                        : 'bg-[#E06D28] opacity-0 group-hover/child:opacity-80 scale-75 group-hover/child:scale-100'
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
            type="button"
            aria-label="Open navigation menu"
            className={`lg:hidden ml-3 sm:ml-4 p-2 rounded-xl transition-all cursor-pointer ${
              isDarkTheme 
                ? 'text-white hover:text-[#F97316] hover:bg-white/10 active:scale-95' 
                : 'text-[#1A1612] hover:text-[#ea580c] hover:bg-[#F2E5CA] active:scale-95'
            }`}
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      </motion.nav>
    </>
  );
}
