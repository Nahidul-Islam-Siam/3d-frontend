import { motion } from 'framer-motion';

export default function WhoWeAreStorySection() {
  return (
    <section className="relative w-full bg-[#FAF4E6] pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 overflow-hidden select-none">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* ─── Left Column: Subtract.png Photo with Notch Caption ─── */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[640px]">
              {/* Photo with Cutout Corner */}
              <img
                src="/who/Subtract.png"
                alt="Community volunteers serving food"
                className="w-full h-auto object-contain block drop-shadow-[0_12px_32px_rgba(40,30,20,0.06)]"
              />

              {/* Caption Locked Exactly Inside the Cutout Notch */}
              <div className="absolute bottom-0 right-0 h-[17%] w-[58%] flex items-center justify-center pr-2 sm:pr-4">
                <p className="font-serif text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#2C241D] font-normal tracking-tight whitespace-nowrap">
                  We don&apos;t just see a need. We see a person.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column: Headline & Narrative ─── */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center"
          >
            {/* Heading */}
            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#F97316] leading-tight tracking-tight"
            >
              Who We Are
            </h2>

            {/* Narrative Paragraphs */}
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-[#635645] text-xs sm:text-[14px] md:text-[15px] leading-relaxed font-sans font-normal">
              <p>
                Live Achieve Believe, Inc. (LAB) is a faith-rooted, Tampa Bay-based 501(c)(3) nonprofit dedicated to strengthening lives and building a community where everyone feels seen, heard, valued, and supported.
              </p>
              <p>
                Our work supports individuals experiencing homelessness, veterans, families, and youth through essential resources, meaningful connections, and community-driven programs.
              </p>
              <p>
                We also use storytelling, music, and the performing arts to bring people together and encourage meaningful conversations.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

