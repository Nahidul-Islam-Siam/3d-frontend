import { motion } from "framer-motion";

// Assets for Block 1 (Right collage)
import rect134 from "@/assets/experience-story/journey/Rectangle 134.png";
import rect130 from "@/assets/experience-story/journey/Rectangle 130.png";
import rect133 from "@/assets/experience-story/journey/Rectangle 133.png";
import rect129 from "@/assets/experience-story/journey/Rectangle 129.png";
import rect131 from "@/assets/experience-story/journey/Rectangle 131.png";

// Assets for Block 2 (Left collage & Callout banner)
import rect130Copy from "@/assets/experience-story/journey/Rectangle 130 copy.png";
import rect129Copy from "@/assets/experience-story/journey/Rectangle 129 copy.png";
import rect133Copy from "@/assets/experience-story/journey/Rectangle 133 copy.png";
import rect131Copy from "@/assets/experience-story/journey/Rectangle 131 copy.png";
import image104 from "@/assets/experience-story/journey/image 104.png";

export interface ThreeJourneysSectionProps {
  id?: string;
  className?: string;
}

export default function ThreeJourneysSection({
  id = "three-journeys-one-shared-purpose",
  className = "",
}: ThreeJourneysSectionProps) {
  const bulletPoints = [
    "A person experiencing homelessness is more than their housing situation.",
    "A family facing hunger is more than an empty pantry.",
    "A young person struggling to find direction is more than the challenges before them.",
    "A veteran rebuilding stability is more than the circumstances that brought them to this moment.",
    "And someone navigating emotional struggles is so much more than what they may be feeling today.",
  ];

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-28 scroll-mt-24 select-none ${className}`}
    >
      <div className="w-full max-w-[1140px] xl:max-w-[1180px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* ─── Header: Section Title & Subtitle (3-line wrap matching Figma) ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#141414] tracking-tight leading-tight mb-3"
          >
            Three Journeys. One Shared Purpose.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#555555] font-sans text-xs sm:text-[13.5px] leading-relaxed max-w-xl mx-auto space-y-0.5"
          >
            <p>Different experiences. Different roads. Different chapters.</p>
            <p>Yet the founder, COO, and DOO share a conviction that has become</p>
            <p>the heartbeat of Live Achieve Believe.</p>
          </motion.div>
        </div>

        {/* ─── Block 1: "We don't just see a need. We see a person." ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-12 xl:gap-14 items-start mb-20 sm:mb-28">
          {/* Left Column: Narrative & Bullets (Aligned to top of image collage) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start"
          >
            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#141414] leading-snug mb-5">
              We don't just see a need.
              <br />
              We see a person.
            </h3>

            {/* Bullet Points */}
            <ul className="space-y-2.5 mb-5">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-xs sm:text-[13px] text-[#444444] leading-relaxed"
                >
                  <span className="mr-2 text-[#141414] font-bold select-none">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-[13px] text-[#444444] leading-relaxed">
              <p>
                Every person carries possibilities, strengths, and a future worth investing in.
                That belief inspires LAB to serve in ways that reach beyond any single circumstance.
              </p>
              <p>
                Through meals, housing initiatives, youth development, household essentials,
                meaningful conversations, and the arts, we seek to create opportunities for people to
                experience dignity, connection, encouragement, and hope.
              </p>
              <p className="font-medium text-[#222222]">
                But we also recognize something important.
              </p>
            </div>
          </motion.div>

          {/* Right Column: 5-Image Collage (Both sub-columns stretch to flush bottom) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-[1.18fr_1fr] gap-3 sm:gap-3.5 w-full"
          >
            {/* Left Sub-Column (3 Images: Homeless, Youth, Soup Kitchen) */}
            <div className="flex flex-col gap-3 sm:gap-3.5">
              <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[344/153]">
                <img
                  src={rect134}
                  alt="A person experiencing homelessness"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[344/278]">
                <img
                  src={rect130}
                  alt="Youth in circle discussion"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[344/255]">
                <img
                  src={rect133}
                  alt="Volunteers serving warm meals"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Sub-Column (2 Images: Family with produce, Senior art workshop - heights weighted to flush bottom) */}
            <div className="flex flex-col gap-3 sm:gap-3.5">
              <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[286/390] sm:aspect-[286/395]">
                <img
                  src={rect129}
                  alt="Family receiving fresh produce box"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[286/290] sm:aspect-[286/295]">
                <img
                  src={rect131}
                  alt="Community art and expression workshop"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Block 2: "No one person, and no one organization, can do everything." ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* Left Column: 4-Image 2x2 Collage (Uniform clean grid rows matching Figma) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-3 sm:gap-3.5 w-full order-2 lg:order-1"
          >
            {/* Top-Left: Planning with laptop */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[1.18]">
              <img
                src={rect130Copy}
                alt="Volunteers planning community projects"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Top-Right: Packing food boxes */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[1.18]">
              <img
                src={rect129Copy}
                alt="Volunteers organizing food packages"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Bottom-Left: Faith and community outreach */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[1.18]">
              <img
                src={rect133Copy}
                alt="Community gathered for fellowship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Bottom-Right: Conference collaboration meeting */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[1.18]">
              <img
                src={rect131Copy}
                alt="Collaborative partnership meeting"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative & Callout Banner (Top aligned) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start order-1 lg:order-2"
          >
            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#141414] leading-snug mb-5">
              No one person, and no one
              <br />
              organization, can do everything.
            </h3>

            <div className="space-y-3.5 text-xs sm:text-[13px] text-[#444444] leading-relaxed mb-6">
              <p>
                That's why partnership is such an important part of our journey.
              </p>
              <p>
                We are committed to building relationships with organizations, businesses, faith
                communities, mental-health professionals, volunteers, and people who share our desire
                to make a meaningful difference.
              </p>
              <p>
                Together, we can extend our reach, strengthen the support available within our
                communities, and meet more people where they are.
              </p>
              <p>
                Our vision is to stretch our arms wide through collaboration, creating a community of
                compassion where more people can find the encouragement, resources, and
                opportunities they need.
              </p>
            </div>

            {/* Highlight Callout Card (Dashed blue border with light blue tint matching Figma) */}
            <div className="border border-dashed border-[#7AAEC2] bg-[#EAF3F6]/60 rounded-[10px] p-3 sm:p-3.5 flex items-center gap-3.5">
              <img
                src={image104}
                alt="One mission many hands"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain flex-shrink-0 select-none"
              />
              <div className="flex flex-col justify-center">
                <h4 className="font-serif font-bold text-base sm:text-lg lg:text-[19px] text-[#141414] leading-tight">
                  One mission. Many hands.
                </h4>
                <p className="font-serif font-bold text-base sm:text-lg lg:text-[19px] text-[#141414] leading-tight mt-0.5">
                  Countless possibilities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

