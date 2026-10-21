import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineXMark } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  Compass, 
  Utensils, 
  GraduationCap, 
  BookHeart, 
  Home as HomeIcon, 
  Users, 
  HandHeart, 
  PhoneCall, 
  Church, 
  HelpCircle 
} from 'lucide-react';

interface SideNavProps {
  isOpen: boolean;
  handleClose: () => void;
}

const navSections = [
  {
    title: "The Main Journey",
    items: [
      { to: "/", label: "Welcome", icon: Sparkles },
      { to: "/about", label: "Experience the Story", icon: Compass },
      { to: "/about#who-we-are", label: "Who We Are", icon: BookHeart },
      { to: "/movement", label: "Join the Movement", icon: Users },
      { to: "/about#team", label: "Meet Us", icon: Users },
    ]
  },
  {
    title: "How We Serve (The 5 Doors)",
    items: [
      { to: "/how-we-serve#table", label: "A Place at the Table", icon: Utensils },
      { to: "/how-we-serve#youth", label: "Strong Foundations (LEADS)", icon: GraduationCap },
      { to: "/how-we-serve#stories", label: "Stories That Save Lives", icon: BookHeart },
      { to: "/how-we-serve#veterans", label: "Welcome Home (Veterans)", icon: HomeIcon },
      { to: "/how-we-serve#volunteer", label: "Serve Beside Us (Volunteers)", icon: HandHeart },
    ]
  },
  {
    title: "Ways to Walk Beside Us",
    items: [
      { to: "/contact#donate", label: "Give Hope / Donate", icon: Heart },
      { to: "/contact#partner", label: "Partner as a Church / School", icon: Church },
      { to: "/contact", label: "Bring Experience to Community", icon: PhoneCall },
    ]
  }
];

export default function SideNav({ isOpen, handleClose }: SideNavProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 select-none lg:hidden bg-black/80 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-[320px] max-w-[85vw] bg-[#0c0c0e] border-r border-amber-500/20 overflow-y-auto lg:hidden shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between h-[80px] px-6 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-serif tracking-[0.2em] font-semibold text-[#fcfaf7] uppercase">
                      Live Achieve Believe
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase">
                      People Matter
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
                >
                  <HiOutlineXMark className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Sections */}
              <div className="p-5 space-y-6">
                {navSections.map((section, idx) => (
                  <div key={section.title} className="space-y-2">
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 px-2">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={handleClose}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-amber-200 hover:bg-amber-500/10 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-stone-400" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Donate CTA */}
            <div className="p-5 border-t border-stone-800 space-y-3 bg-[#08080a]">
              <Link 
                to="/contact" 
                onClick={handleClose}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold tracking-wider uppercase font-mono shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Give Hope / Donate</span>
              </Link>
              <p className="text-[10px] text-center text-stone-500 font-serif italic">
                "Healing begins when people are seen, heard, and reminded that they matter."
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
