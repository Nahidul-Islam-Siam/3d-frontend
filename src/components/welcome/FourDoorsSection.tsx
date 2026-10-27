import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import doorsSectionImg from '@/assets/welcome/doors-section.png';

interface DoorItem {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  tag: string;
  // Percentage coordinates across the 1920px image width for desktop hotspots
  leftPercent: string;
  widthPercent: string;
}

const doors: DoorItem[] = [
  {
    id: 'story',
    title: 'Experience the Story',
    subtitle: 'watch & feel it',
    path: '/about',
    tag: 'Documentary',
    leftPercent: '11%',
    widthPercent: '18%',
  },
  {
    id: 'serve',
    title: 'How We Serve',
    subtitle: 'step into our work',
    path: '/how-we-serve',
    tag: 'Pathways',
    leftPercent: '31%',
    widthPercent: '18%',
  },
  {
    id: 'movement',
    title: 'Join the Movement',
    subtitle: 'be part of it',
    path: '/movement',
    tag: 'Community',
    leftPercent: '51%',
    widthPercent: '18%',
  },
  {
    id: 'meet',
    title: 'Meet Us',
    subtitle: 'the people here',
    path: '/meet-us',
    tag: 'Stewards',
    leftPercent: '71%',
    widthPercent: '18%',
  },
];

export default function FourDoorsSection() {
  const [hoveredDoor, setHoveredDoor] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#201308] text-[#FAF4E6] py-20 lg:py-28 overflow-hidden select-none border-t border-b border-[#3d2411]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3a200d]/60 via-[#201308] to-[#120a04]" />
      
      {/* Decorative Warm Spotlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-10 lg:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF4E6]/10 border border-[#FAF4E6]/20 backdrop-blur-sm text-xs font-serif tracking-widest uppercase text-[#F97316]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pathways of Hope</span>
          </div>

          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF4E6]"
          >
            Where would you like to go?
          </h2>

          <p className="text-sm sm:text-base text-[#D4C3B3] font-sans leading-relaxed">
            Four open doors into the heart of our community. Step through the one calling you.
          </p>
        </motion.div>

        {/* ─── DESKTOP/TABLET COMPOSITE 3D DOORS DISPLAY ─── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-full max-w-[1240px] mx-auto hidden md:block rounded-2xl overflow-hidden shadow-2xl border border-stone-800/80 bg-[#190f06]"
        >
          {/* Main 3D Doors Graphic */}
          <img 
            src={doorsSectionImg} 
            alt="Where would you like to go? Four open doors"
            className="w-full h-auto object-contain block select-none pointer-events-none"
          />

          {/* Interactive Hover Hotspots positioned exactly over each of the 4 doors */}
          {doors.map((door) => {
            const isHovered = hoveredDoor === door.id;

            return (
              <Link
                key={door.id}
                to={door.path}
                onMouseEnter={() => setHoveredDoor(door.id)}
                onMouseLeave={() => setHoveredDoor(null)}
                style={{
                  left: door.leftPercent,
                  width: door.widthPercent,
                  top: '22%',
                  bottom: '6%',
                }}
                className="absolute z-20 group cursor-pointer flex flex-col justify-end items-center p-4 transition-all duration-300 rounded-xl"
              >
                {/* Golden Backlight Glow inside the door aperture on hover */}
                <div 
                  className={`absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none ${
                    isHovered 
                      ? 'opacity-100 bg-gradient-to-t from-[#F97316]/30 via-[#f59e0b]/15 to-transparent shadow-[inset_0_0_40px_rgba(249,115,22,0.4)]' 
                      : 'opacity-0'
                  }`}
                />

                {/* Floating "Step Inside" Action Indicator */}
                <div 
                  className={`relative z-10 mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 ${
                    isHovered 
                      ? 'opacity-100 translate-y-0 bg-[#F97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-105' 
                      : 'opacity-0 translate-y-3 bg-black/60 text-stone-300 border border-white/10'
                  }`}
                >
                  <span>Step Inside</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* ─── MOBILE RESPONSIVE CARDS (Clean cards on smaller screens) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden pt-4">
          {doors.map((door, idx) => (
            <motion.div
              key={door.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Link
                to={door.path}
                className="group block p-6 rounded-2xl bg-[#2b190c]/80 border border-[#4a2b16] hover:border-[#F97316] transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)]"
              >
                <div className="flex items-center justify-between text-xs font-serif text-[#F97316] uppercase tracking-wider mb-2">
                  <span>{door.tag}</span>
                  <span className="opacity-60">Door 0{idx + 1}</span>
                </div>

                <h3 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl font-bold text-[#FAF4E6] group-hover:text-[#F97316] transition-colors"
                >
                  {door.title}
                </h3>

                <p className="text-xs text-[#C8B8A6] mt-1 italic font-serif">
                  {door.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-serif font-semibold text-[#F97316] group-hover:translate-x-1 transition-transform">
                  <span>Step Inside</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
