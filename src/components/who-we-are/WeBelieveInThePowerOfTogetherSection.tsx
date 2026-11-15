import { motion } from "framer-motion";
import rect94 from "@/assets/how-we-serve/we-belive/Rectangle 94.png";
import rect95 from "@/assets/how-we-serve/we-belive/Rectangle 95.png";
import rect96Copy from "@/assets/how-we-serve/we-belive/Rectangle 96 copy.png";
import rect96 from "@/assets/how-we-serve/we-belive/Rectangle 96.png";

interface WeBelieveInThePowerOfTogetherSectionProps {
  id?: string;
  className?: string;
}

export function WeBelieveInThePowerOfTogetherSection({
  id = "we-believe-in-the-power-of-together",
  className = "",
}: WeBelieveInThePowerOfTogetherSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* ─── Left Column: 4-Photo Collage ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-start"
          >
            <div className="flex items-start gap-3 sm:gap-4 max-w-[600px] w-full">
              {/* Left Photo Column */}
              <div className="flex-[54] flex flex-col gap-3 sm:gap-4">
                <div className="overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-xs">
                  <img
                    src={rect95}
                    alt="Volunteers sharing joy over a meal in the community kitchen"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-xs">
                  <img
                    src={rect96}
                    alt="Community kitchen food service line"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Right Photo Column */}
              <div className="flex-[46] flex flex-col gap-3 sm:gap-4">
                <div className="overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-xs">
                  <img
                    src={rect94}
                    alt="Young smiling girl receiving meal"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-xs">
                  <img
                    src={rect96Copy}
                    alt="Happy smiling community children outdoors"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column: Heading & Narrative ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.2",
              }}
              className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[44px] font-semibold tracking-tight mb-5 sm:mb-6"
            >
              We Believe in the<br />
              Power of Together.
            </h2>

            <div className="space-y-3.5 sm:space-y-4 font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#444444] leading-relaxed">
              <p>
                There is a beautiful truth about meaningful change. It rarely happens in isolation.
              </p>
              <p>
                It grows when people share ideas. When individuals bring different strengths to the same table. When organizations choose collaboration over competition. When someone says, &ldquo;I may not be able to do everything, but I can do something.&rdquo;
              </p>
              <p>
                At LAB, we believe every person has something valuable to contribute. A perspective. A skill. A connection. A willingness to listen. A heart for others.
              </p>
              <p>
                We don&apos;t have to think alike, look alike, or have lived the same experiences to work toward something meaningful together.
              </p>
              <p className="pt-2 font-bold text-[#F97316] text-[14px] sm:text-[14.5px] lg:text-[15px] leading-snug">
                Our differences can become our strengths when our purpose brings us together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WeBelieveInThePowerOfTogetherSection;
