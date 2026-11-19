import { motion } from 'framer-motion';
import avatar1 from '@/assets/join-movement/faces/face_student.png';
import avatar2 from '@/assets/join-movement/faces/face_sculptor.png';
import avatar3 from '@/assets/join-movement/faces/face_handshake.png';

interface TestimonialCard {
  name: string;
  role: string;
  eyebrow: string;
  quote: string;
  avatar: string;
}

const testimonials: TestimonialCard[] = [
  {
    name: 'David K.',
    role: 'VOLUNTEER · 2 YEARS',
    eyebrow: 'WHAT THIS MISSION MEANS TO ME',
    quote:
      '“I thought I was coming to help someone else. I didn\'t realize how much this community would change me. I arrived empty; I leave every week overflowing.”',
    avatar: avatar1,
  },
  {
    name: 'Maya R.',
    role: 'SATURDAY TEAM · 1 YEAR',
    eyebrow: 'WHY I KEEP COMING BACK',
    quote:
      '“I came for one Saturday just to fulfill a community hour requirement. I\'ve been here every single weekend ever since. These people became my family.”',
    avatar: avatar2,
  },
  {
    name: 'Carlos M.',
    role: 'LOGISTICS LEAD · 4 YEARS',
    eyebrow: 'WHAT GIVES ME HOPE',
    quote:
      '“Nobody stands above anyone else here. You look to your left and right, and everyone is simply loving the person in front of them.”',
    avatar: avatar3,
  },
];

export default function UnfilteredHumanVoicesSection() {
  return (
    <section 
      id="unfiltered-voices"
      className="relative w-full min-h-screen bg-[#FAF4E6] text-[#2C261E] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden flex flex-col justify-center"
    >
      {/* Background Soft Center Amber Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto">
        {/* ─── Centered Header (Figma 1:1) ─── */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C140D] mb-3"
          >
            Unfiltered Human Voices
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#554637] text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto"
          >
            Not institutional praise. Real people recounting how showing up changed their own inner landscape.
          </motion.p>
        </div>

        {/* ─── 3 Testimonial Cards in Row (Figma 1:1) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {testimonials.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[24px] bg-[#FFF3D9] border border-[#F97316] shadow-[0_4px_24px_rgba(249,115,22,0.06)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F97316]/40 bg-white flex-shrink-0">
                    <img 
                      src={card.avatar} 
                      alt={card.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-base sm:text-lg font-bold text-[#1C140D] tracking-wide"
                    >
                      {card.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-[#8F6629] font-sans font-semibold">
                      {card.role}
                    </p>
                  </div>
                </div>

                {/* Orange Eyebrow Tag */}
                <p 
                  className="text-[11px] uppercase tracking-[0.14em] text-[#F97316] font-sans font-semibold mb-3.5"
                >
                  {card.eyebrow}
                </p>

                {/* Quote */}
                <p className="text-[#443324] text-xs sm:text-[13.5px] leading-relaxed font-sans font-light">
                  {card.quote}
                </p>
              </div>

              {/* Bottom Subtle Amber Accent */}
              <div className="w-8 h-0.5 rounded-full bg-[#F97316]/40 group-hover:w-14 group-hover:bg-[#F97316] transition-all duration-300 mt-6" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
