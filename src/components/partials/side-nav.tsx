import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoWithText from '@/assets/logo/logo-with-text.png';
import btnArrow from '@/assets/icons/btn-arrow.png';
import { 
  Sparkles, 
  Heart, 
  Compass, 
  Utensils, 
  BookHeart, 
  Home as HomeIcon, 
  Users, 
  HandHeart, 
  PhoneCall, 
  Church,
  ChevronRight,
  X
} from 'lucide-react';

interface SideNavProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface NavSectionItem {
  to: string;
  label: string;
  icon: typeof Sparkles;
  badge?: string;
  doorNumber?: number;
}

interface NavSection {
  title: string;
  items: NavSectionItem[];
}

const navSections: NavSection[] = [
  {
    title: "The Main Journey",
    items: [
      { to: "/", label: "Welcome", icon: Sparkles },
      { to: "/experience-the-story", label: "Experience the Story", icon: Compass },
      { to: "/who-we-are", label: "Who We Are", icon: BookHeart },
      { to: "/movement", label: "Join the Movement", icon: Users },
      { to: "/meet-us", label: "Meet Us", icon: Users },
    ]
  },
  {
    title: "How We Serve — The 7 Doors",
    items: [
      { to: "/how-we-serve/a-place-at-the-table", label: "A Place at the Table", icon: Utensils },
      { to: "/how-we-serve/strong-foundations", label: "Strong Foundations", icon: Heart },
      { to: "/how-we-serve/stories-that-save-lives", label: "Stories That Save Lives", icon: BookHeart },
      { to: "/how-we-serve/welcome-home", label: "Welcome Home", icon: HomeIcon },
      { to: "/how-we-serve#a-new-beginning", label: "A New Beginning", icon: Sparkles },
      { to: "/how-we-serve/serve-beside-us", label: "Serve Beside Us", icon: HandHeart },
      { to: "/#your-story", label: "Your Story", icon: Users },
    ]
  },
  {
    title: "Ways to Walk Beside Us",
    items: [
      { to: "/donate", label: "Give Hope / Donate", icon: Heart },
      { to: "/contact?subject=partner", label: "Partner as a Church / School", icon: Church },
      { to: "/contact?subject=community", label: "Bring Experience to Community", icon: PhoneCall },
    ]
  }
];

export default function SideNav({ isOpen, handleClose }: SideNavProps) {
  const location = useLocation();

  const isItemActive = (to: string) => {
    if (to.includes('#')) {
      const [path, hash] = to.split('#');
      return location.pathname === path && location.hash === `#${hash}`;
    }
    return location.pathname === to;
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Subtle Warm Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-0 select-none lg:hidden bg-stone-900/40 backdrop-blur-xs z-50"
            onClick={handleClose}
          />

          {/* Luxury Warm Cream Drawer */}
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 w-[340px] max-w-[88vw] bg-[#FAF4E6] border-r border-[#E5DAC3] overflow-y-auto lg:hidden shadow-[12px_0_40px_rgba(30,20,10,0.12)] flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between h-[74px] px-6 border-b border-[#E8DEC4] bg-[#FAF4E6] sticky top-0 z-10">
                <Link to="/" onClick={handleClose} className="flex items-center">
                  <img 
                    src={logoWithText} 
                    alt="Live Achieve Believe" 
                    className="h-9 sm:h-10 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={handleClose}
                  type="button"
                  aria-label="Close menu"
                  className="p-2 rounded-full text-[#3A3226] hover:text-[#121010] hover:bg-[#EFE5CE] active:scale-95 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Sections */}
              <div className="p-5 space-y-7">
                {navSections.map((section) => (
                  <div key={section.title} className="space-y-1.5">
                    <div className="px-3 pb-1 flex items-center justify-between">
                      <span className="text-[11px] font-sans font-bold tracking-[0.18em] text-[#8C7654] uppercase">
                        {section.title}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const active = isItemActive(item.to);

                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={handleClose}
                            className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 text-[13.5px] leading-snug ${
                              active
                                ? 'bg-[#F2E5CA] text-[#E06D28] font-semibold shadow-xs'
                                : 'text-[#2B251F] font-medium hover:text-[#E06D28] hover:bg-[#F2E7CF]/70'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Icon 
                                className={`w-4 h-4 transition-colors flex-shrink-0 ${
                                  active 
                                    ? 'text-[#E06D28]' 
                                    : 'text-[#8C7654] group-hover:text-[#E06D28]'
                                }`} 
                              />
                              <span className="truncate">{item.label}</span>
                            </div>

                            <ChevronRight 
                              className={`w-3.5 h-3.5 transition-all flex-shrink-0 ${
                                active
                                  ? 'text-[#E06D28] opacity-100 translate-x-0'
                                  : 'text-[#B8A78D] opacity-40 group-hover:opacity-100 group-hover:text-[#E06D28] group-hover:translate-x-0.5'
                              }`} 
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Donate CTA Card */}
            <div className="p-5 border-t border-[#E8DEC4] space-y-3 bg-[#F4EBDB]/95 sticky bottom-0">
              <Link 
                to="/donate" 
                onClick={handleClose}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-[#F97316] hover:bg-[#ea580c] active:scale-[0.99] text-white text-[14px] font-serif font-bold tracking-wider shadow-[0_4px_16px_rgba(249,115,22,0.25)] transition-all"
              >
                <span>Give Hope / Donate</span>
                <img src={btnArrow} alt="" className="h-3.5 w-auto object-contain" />
              </Link>
              <p className="text-[10.5px] leading-relaxed text-center text-[#7A6E5D] font-serif italic px-2">
                &ldquo;Healing begins when people are seen, heard, and reminded that they matter.&rdquo;
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
