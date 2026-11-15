import { motion } from "framer-motion";
import rect94 from "@/assets/how-we-serve/heart/Rectangle 94.png";
import rect95 from "@/assets/how-we-serve/heart/Rectangle 95.png";
import rect96Copy from "@/assets/how-we-serve/heart/Rectangle 96 copy.png";
import rect96 from "@/assets/how-we-serve/heart/Rectangle 96.png";

interface TheHeartOfLabSectionProps {
  id?: string;
  className?: string;
}

export function TheHeartOfLabSection({
  id = "the-heart-of-lab",
  className = "",
}: TheHeartOfLabSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* ─── Left Column: Heading & Narrative ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#666666] font-medium mb-3 sm:mb-4">
              THE HEART OF LAB
            </p>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.2",
              }}
              className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[44px] font-semibold tracking-tight mb-5 sm:mb-6"
            >
              We are people who<br />
              believe in people.
            </h2>

            <div className="space-y-3.5 sm:space-y-4 font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#444444] leading-relaxed">
              <p>
                We believe compassion can be courageous. Kindness can be intentional. Faith can inspire meaningful action. And ordinary people, working together, can create extraordinary possibilities.
              </p>
              <p>
                We do not claim to have every answer. We are committed to asking better questions, building meaningful relationships, continuing to learn, and remaining open to the possibilities that emerge when people come together.
              </p>
              <p>
                Our measure of success is not simply how much we do. It is whether people experience dignity, respect, connection, and genuine care along the way.
              </p>
              <p>
                Because at the heart of every mission, every relationship, and every opportunity is something that must never be forgotten.
              </p>
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="pt-2 font-bold text-[#F97316] text-[16px] sm:text-[17px] lg:text-[18px] leading-snug tracking-tight"
              >
                A person. And that person matters.
              </p>
            </div>
          </motion.div>

          {/* ─── Right Column: 4-Photo Collage ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="flex items-start gap-3 sm:gap-4 max-w-[600px] w-full">
              {/* Left Photo Column */}
              <div className="flex-[54] flex flex-col gap-3 sm:gap-4">
                <div className="overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-xs">
                  <img
                    src={rect95}
                    alt="Hands held together in care and support"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-xs">
                  <img
                    src={rect96Copy}
                    alt="Community members walking together in connection"
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
                    alt="Support group circle discussion and listening"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="overflow-hidden rounded-[14px] sm:rounded-[16px] shadow-xs">
                  <img
                    src={rect96}
                    alt="Volunteers packing aid packages together"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TheHeartOfLabSection;
