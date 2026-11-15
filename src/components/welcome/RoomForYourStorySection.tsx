import { motion } from "framer-motion";
import volunteersImage from "@/assets/welcome/image 107.png";

interface RoomForYourStorySectionProps {
  id?: string;
  className?: string;
}

export function RoomForYourStorySection({
  id = "room-for-your-story",
  className = "",
}: RoomForYourStorySectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FFF3D9] pt-14 sm:pt-18 lg:pt-24 pb-12 sm:pb-16 lg:pb-0 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* ─── Left Column: Story Copy ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center lg:pb-20 xl:pb-24"
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.18",
              }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight mb-5 sm:mb-6"
            >
              Now There&apos;s Room for
              <br />
              Your Story
            </h2>

            <div className="space-y-4 max-w-xl font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#444444] leading-relaxed mb-6">
              <p>
                You don&apos;t have to be famous, wealthy, or have all the
                answers to make a difference.
              </p>
              <p>
                You can offer your time. Share your talents. Open a door. Make an
                introduction. Give what you can. Or simply choose to show up for
                someone.
              </p>
              <p>
                We don&apos;t believe everyone has to do everything. We believe
                everyone can do something. And together, those somethings can
                change lives.
              </p>
            </div>

            {/* Taglines */}
            <div className="space-y-1">
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="italic text-sm sm:text-base text-[#F97316] font-medium"
              >
                There&apos;s a Place for You Here.
              </p>
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="italic text-sm sm:text-base text-[#121010] font-medium"
              >
                Think Higher. Feel Deeper. Act with Purpose.
              </p>
            </div>
          </motion.div>

          {/* ─── Right Column: Volunteers Cutout (Flush with Bottom) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-end self-end"
          >
            <img
              src={volunteersImage}
              alt="Volunteers pointing up with smiling faces - Now There's Room for Your Story"
              className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] xl:max-w-[660px] h-auto block object-contain object-bottom select-none pointer-events-none"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default RoomForYourStorySection;
