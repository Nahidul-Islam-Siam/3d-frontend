import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Calendar, Sparkles } from 'lucide-react';
// import showdownPoster from '@/assets/welcome/audition_banner.png';

export default function NextEventSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#2B173E] via-[#1B0C2A] to-[#140820] text-white py-20 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-b border-purple-900/40">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#F97316]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#8b5cf6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10 space-y-12 lg:space-y-16">
        
        {/* Top Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-white/10">
          
          {/* Left Title & Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-3 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-wider uppercase text-[#fed7aa]">
              <Sparkles className="w-3 h-3 text-[#F97316]" />
              <span>Next Upcoming Event</span>
            </div>

            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            >
              What’s Coming Up Next
            </h2>

            <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
              Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope.
            </p>
          </motion.div>

          {/* Right Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            {/* Tickets Open Now Button */}
            <a
              href="https://tickets.liveachievebelieve.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-serif font-bold tracking-wider uppercase shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all hover:scale-105"
            >
              <span>TICKETS OPEN NOW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Audition Button */}
            <a
              href="/movement"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-serif font-semibold tracking-wider transition-all hover:scale-105"
            >
              <span>Audition</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

        </div>

        {/* Featured Showcase Poster */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative w-full max-w-[1080px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/15 group"
        >
          <img
            src="../../assets/welcome/audition_banner.png"
            alt="Showdown Suicide Awareness - Where Are You Now? Letters to Etcetera"
            className="w-full h-auto object-cover block select-none group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          />

          {/* Interactive Floating Quick-Book Overlay Bar at the bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F97316] uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>November 14, 2026 • 7:00 PM EST</span>
              </div>
              <p className="text-white text-sm sm:text-base font-serif">
                Join our global community for an evening of live retrospective stories & unscripted dialogues.
              </p>
            </div>

            <a
              href="https://tickets.liveachievebelieve.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-serif font-bold uppercase tracking-wider shadow-lg hover:shadow-orange-500/40 transition-all flex-shrink-0"
            >
              <span>Reserve Seat</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
