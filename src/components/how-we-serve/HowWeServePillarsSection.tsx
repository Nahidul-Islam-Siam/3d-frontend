import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";
import doorOnePhoto from "@/assets/how-we-serve/image 48.png";
import doorTwoPhoto from "@/assets/how-we-serve/image 49.png";
import doorThreePhoto from "@/assets/how-we-serve/image 50.png";
import doorFourPhoto from "@/assets/how-we-serve/image 51.png";
import doorFivePhoto from "@/assets/how-we-serve/image 52.png";
import doorSixPhoto from "@/assets/how-we-serve/image 53.png";
import doorSevenPhoto from "@/assets/how-we-serve/image 53 copy.png";

interface HowWeServePillarsSectionProps {
  id?: string;
  className?: string;
}

export function HowWeServePillarsSection({
  id = "how-we-serve-pillars",
  className = "",
}: HowWeServePillarsSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full select-none overflow-hidden ${className}`}
    >
      {/* ══════════════════════════════════════════════════════════
          DOOR ONE: A PLACE AT THE TABLE (Canvas Cream: #FAF4E6)
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#FAF4E6] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
          <div
            id="door-one"
          className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          <span id="a-place-at-the-table" className="absolute -top-24 pointer-events-none" />
          {/* Left Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <span
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-xs sm:text-[13px] font-bold text-[#8F6629] uppercase tracking-[0.18em] mb-3 block"
            >
              DOOR ONE: A PLACE AT THE TABLE
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.16",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3"
            >
              Sometimes hope begins
              <br />
              with a meal.
            </h2>

            <p
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-base sm:text-lg font-semibold text-[#1C140D] mb-3.5"
            >
              Community Meals &amp; Outreach
            </p>

            <div className="space-y-3.5 max-w-xl font-sans text-[15px] sm:text-base lg:text-[16.5px] text-[#3E342B] leading-relaxed mb-6">
              <p>No one should have to wonder if there is a place for them.</p>
              <p>
                Every meal we share is an opportunity to restore dignity, create
                connection, and remind someone they are not alone.
              </p>
            </div>

            <div className="mb-3 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How We Serve
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                LAB works alongside community partners and through direct outreach to provide
                meals, encouragement, and meaningful human connection...
              </p>
            </div>

            <div className="mb-6 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How You Can Help
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                You can help create another place at the table by preparing meals, serving alongside
                volunteers, donating food or supplies, sponsoring...
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FigmaButton
                to="/movement?tab=volunteer"
                variant="primary"
                size="md"
              >
                Volunteer
              </FigmaButton>

              <FigmaButton
                to="/donate?category=supplies"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Donate Food
              </FigmaButton>

              <FigmaButton
                to="/donate?category=meals"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Sponsor A Meal
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=partnership"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Partner With Us
              </FigmaButton>
            </div>
          </motion.div>

          {/* Right Column: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end items-center"
          >
            <div className="w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] aspect-[663/566] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-[#FAF4E6]">
              <img
                src={doorOnePhoto}
                alt="Community meals and family sharing fresh food around warm dining table"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ══════════════════════════════════════════════════════════
        DOOR TWO: STRONG FOUNDATIONS (Warm Cream: #FFF3D9)
    ══════════════════════════════════════════════════════════ */}
    <div className="w-full bg-[#FFF3D9] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20 border-y border-[rgba(227,182,143,0.35)]">
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <div
          id="door-two"
          className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          <span id="strong-foundations" className="absolute -top-24 pointer-events-none" />
          <span id="you-matter" className="absolute -top-24 pointer-events-none" />
          {/* Left Column: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-start items-center order-2 lg:order-1"
          >
            <div className="w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] aspect-[663/566] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-[#FFF3D9]">
              <img
                src={doorTwoPhoto}
                alt="Mentor guiding youth in library during LEADS youth development session"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left order-1 lg:order-2"
          >
            <span
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-xs sm:text-[13px] font-bold text-[#8F6629] uppercase tracking-[0.18em] mb-3 block"
            >
              DOOR TWO: STRONG FOUNDATIONS
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.16",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3"
            >
              Sometimes hope begins
              <br />
              with guidance.
            </h2>

            <p
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-base sm:text-lg font-semibold text-[#1C140D] mb-3.5"
            >
              LEADS Youth Development
            </p>

            <div className="space-y-3.5 max-w-xl font-sans text-[15px] sm:text-base lg:text-[16.5px] text-[#3E342B] leading-relaxed mb-6">
              <p>
                Every young person deserves to know that their voice matters, their choices
                have meaning, and their future holds possibilities.
              </p>
              <p>
                Sometimes all it takes is encouragement, guidance, and someone willing to
                believe in their potential.
              </p>
              <p>
                At LAB, we believe investing in young people means investing in the future of
                our communities.
              </p>
            </div>

            <div className="mb-3 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How We Serve
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                Through our partnership with Life Skills, Empowerment and Development Services, the
                LEADS youth-development initiative helps....
              </p>
            </div>

            <div className="mb-6 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How You Can Help
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                Community members and organizations can support youth development by volunteering,
                sharing appropriate professional skills...
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FigmaButton
                to="/movement?tab=youth"
                variant="primary"
                size="md"
              >
                Support Youth Development
              </FigmaButton>

              <FigmaButton
                to="/movement?tab=volunteer"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Volunteer
              </FigmaButton>

              <FigmaButton
                to="/donate?category=youth-sponsor"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Become A Sponsor
              </FigmaButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ══════════════════════════════════════════════════════════
        DOOR THREE: STORIES THAT SAVE LIVES (Canvas Cream: #FAF4E6)
    ══════════════════════════════════════════════════════════ */}
    <div className="w-full bg-[#FAF4E6] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <div
          id="door-three"
          className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          <span id="stories-that-save-lives" className="absolute -top-24 pointer-events-none" />
          <span id="suicide-awareness-showdown" className="absolute -top-24 pointer-events-none" />
          {/* Left Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <span
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-xs sm:text-[13px] font-bold text-[#8F6629] uppercase tracking-[0.18em] mb-3 block"
            >
              DOOR THREE: STORIES THAT SAVE LIVES
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.16",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3"
            >
              Sometimes hope begins
              <br />
              with one conversation.
            </h2>

            <p
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-base sm:text-lg font-semibold text-[#1C140D] mb-3.5"
            >
              Suicide Awareness Showdown
            </p>

            <div className="space-y-3.5 max-w-xl font-sans text-[15px] sm:text-base lg:text-[16.5px] text-[#3E342B] leading-relaxed mb-6">
              <p>Some of the most important stories are the ones people find hardest to tell.</p>
              <p>
                Behind everyday smiles and conversations, individuals may be navigating struggles
                that others cannot see.
              </p>
              <p>
                We believe storytelling can help create understanding, strengthen connection, and
                encourage people to reach out for support.
              </p>
            </div>

            <div className="mb-3 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How We Serve
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                LAB is developing an original theatrical production: Suicide Awareness Showdown:
                Where Are You Now? Letters to Etcetera....
              </p>
            </div>

            <div className="mb-6 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How You Can Help
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                There are opportunities for performers, production volunteers, creative
                professionals, sponsors, community partners...
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FigmaButton
                to="/suicide-awareness-showdown"
                variant="primary"
                size="md"
              >
                Audition
              </FigmaButton>

              <FigmaButton
                to="/movement?tab=volunteer"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Volunteer
              </FigmaButton>

              <FigmaButton
                to="/suicide-awareness-showdown#sponsor"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Sponsor
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=partnership"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Partner
              </FigmaButton>

              <FigmaButton
                to="/donate"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Donate
              </FigmaButton>
            </div>
          </motion.div>

          {/* Right Column: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end items-center"
          >
            <div className="w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] aspect-[663/566] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-[#FAF4E6]">
              <img
                src={doorThreePhoto}
                alt="Stage spotlight and theatrical curtains for Suicide Awareness Showdown"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ══════════════════════════════════════════════════════════
        DOOR FOUR: WELCOME HOME (Warm Cream: #FFF3D9)
    ══════════════════════════════════════════════════════════ */}
    <div className="w-full bg-[#FFF3D9] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20 border-y border-[rgba(227,182,143,0.35)]">
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <div
          id="door-four"
          className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          <span id="welcome-home" className="absolute -top-24 pointer-events-none" />
          {/* Left Column: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-start items-center order-2 lg:order-1"
          >
            <div className="w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] aspect-[663/566] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-[#FFF3D9]">
              <img
                src={doorFourPhoto}
                alt="Sunlit warm living room with furniture for veteran housing initiative"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left order-1 lg:order-2"
          >
            <span
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-xs sm:text-[13px] font-bold text-[#8F6629] uppercase tracking-[0.18em] mb-3 block"
            >
              DOOR FOUR: WELCOME HOME
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.16",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3"
            >
              Sometimes hope begins
              <br />
              with a key.
            </h2>

            <p
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-base sm:text-lg font-semibold text-[#1C140D] mb-3.5"
            >
              Veteran Housing Initiatives
            </p>

            <div className="space-y-3.5 max-w-xl font-sans text-[15px] sm:text-base lg:text-[16.5px] text-[#3E342B] leading-relaxed mb-6">
              <p>A key can represent so much more than the ability to open a door.</p>
              <p>
                It can represent stability. Independence. Comfort. A place to rest. And the
                opportunity to begin a new chapter.
              </p>
              <p>
                For veterans navigating housing challenges, the journey toward a stable home can be
                life-changing.
              </p>
            </div>

            <div className="mb-3 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How We Serve
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                LAB works to support veterans in securing and settling into housing, with a focus on
                helping transform living spaces into welcoming homes...
              </p>
            </div>

            <div className="mb-6 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How You Can Help
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                Property owners and landlords can explore housing partnerships. Individuals and
                businesses can donate suitable furniture, household...
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FigmaButton
                to="/contact?subject=housing-partner"
                variant="primary"
                size="md"
              >
                Become A Housing Partner
              </FigmaButton>

              <FigmaButton
                to="/donate?category=furnishings"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Donate Furnishings
              </FigmaButton>

              <FigmaButton
                to="/donate?category=home-sponsor"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Sponsor A Home
              </FigmaButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ══════════════════════════════════════════════════════════
        DOOR FIVE: A NEW BEGINNING (Canvas Cream: #FAF4E6)
    ══════════════════════════════════════════════════════════ */}
    <div className="w-full bg-[#FAF4E6] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <div
          id="door-five"
          className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          <span id="a-new-beginning" className="absolute -top-24 pointer-events-none" />
          {/* Left Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <span
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-xs sm:text-[13px] font-bold text-[#8F6629] uppercase tracking-[0.18em] mb-3 block"
            >
              DOOR FIVE: A NEW BEGINNING
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.16",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3"
            >
              Sometimes hope begins
              <br />
              with the little things.
            </h2>

            <p
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-base sm:text-lg font-semibold text-[#1C140D] mb-3.5"
            >
              Household Essentials, Clothing &amp; Shoes
            </p>

            <div className="space-y-3.5 max-w-xl font-sans text-[15px] sm:text-base lg:text-[16.5px] text-[#3E342B] leading-relaxed mb-6">
              <p>A fresh beginning often starts with the everyday things many of us take for granted.</p>
              <p>
                A clean set of sheets. A pair of comfortable shoes. A warm blanket. A kitchen
                stocked with basic necessities.
              </p>
              <p>
                These items may seem small, but they can bring comfort, ease daily burdens, and help
                someone feel at home.
              </p>
            </div>

            <div className="mb-3 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How We Serve
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                LAB collects and distributes practical items to help individuals and families meet
                everyday needs and move forward...
              </p>
            </div>

            <div className="mb-6 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How You Can Help
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                You can contribute clean, usable clothing, shoes, household goods, and other
                requested necessities. Businesses, schools, churches, and community groups can...
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FigmaButton
                to="/donate?category=supplies"
                variant="primary"
                size="md"
              >
                Donate Essentials
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=drive"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Organize A Collection Drive
              </FigmaButton>

              <FigmaButton
                to="/movement?tab=volunteer"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Volunteer
              </FigmaButton>
            </div>
          </motion.div>

          {/* Right Column: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end items-center"
          >
            <div className="w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] aspect-[663/566] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-[#FAF4E6]">
              <img
                src={doorFivePhoto}
                alt="Boxes and storage bags packed with blankets, shoes, and fresh household essentials"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ══════════════════════════════════════════════════════════
        DOOR SIX: SERVE BESIDE US (Warm Cream: #FFF3D9)
    ══════════════════════════════════════════════════════════ */}
    <div className="w-full bg-[#FFF3D9] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20 border-y border-[rgba(227,182,143,0.35)]">
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <div
          id="door-six"
          className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          <span id="serve-beside-us" className="absolute -top-24 pointer-events-none" />
          {/* Left Column: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-start items-center order-2 lg:order-1"
          >
            <div className="w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] aspect-[663/566] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-[#FFF3D9]">
              <img
                src={doorSixPhoto}
                alt="Cheerful volunteers packing fresh produce boxes and community meal kits together"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left order-1 lg:order-2"
          >
            <span
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-xs sm:text-[13px] font-bold text-[#8F6629] uppercase tracking-[0.18em] mb-3 block"
            >
              DOOR SIX: SERVE BESIDE US
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.16",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3"
            >
              Sometimes hope begins with
              <br />
              someone who says yes.
            </h2>

            <p
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-base sm:text-lg font-semibold text-[#1C140D] mb-3.5"
            >
              Volunteer Opportunities
            </p>

            <div className="space-y-3.5 max-w-xl font-sans text-[15px] sm:text-base lg:text-[16.5px] text-[#3E342B] leading-relaxed mb-6">
              <p>You don&apos;t have to have extraordinary resources to make an extraordinary difference.</p>
              <p>
                Sometimes the most meaningful thing you can offer is your time. Your energy. Your skills.
                Your willingness to show up.
              </p>
              <p>
                At LAB, volunteers are more than helping hands. They are an essential part of the
                relationships and experiences that bring our mission to life.
              </p>
            </div>

            <div className="mb-3 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How We Serve
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                Volunteer opportunities may include community meal preparation and service, outreach
                activities, donation sorting, home-furnishing projects...
              </p>
            </div>

            <div className="mb-6 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How You Can Help
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                Tell us what you enjoy doing, what skills you would like to share, and how you hope to
                make a difference. Whether you have a few hours, an occasional weekend,...
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FigmaButton
                to="/movement?tab=volunteer"
                variant="primary"
                size="md"
              >
                Become A Volunteer
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=group-volunteer"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Bring Your Group
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=talents"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Share Your Talents
              </FigmaButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ══════════════════════════════════════════════════════════
        DOOR SEVEN: YOUR STORY (Canvas Cream: #FAF4E6)
    ══════════════════════════════════════════════════════════ */}
    <div className="w-full bg-[#FAF4E6] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <div
          id="door-seven"
          className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          <span id="your-story" className="absolute -top-24 pointer-events-none" />
          {/* Left Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <span
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-xs sm:text-[13px] font-bold text-[#8F6629] uppercase tracking-[0.18em] mb-3 block"
            >
              DOOR SEVEN: YOUR STORY
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.16",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3"
            >
              Every story has the power to
              <br />
              change another.
            </h2>

            <p
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className="text-base sm:text-lg font-semibold text-[#1C140D] mb-3.5"
            >
              Join the Movement
            </p>

            <div className="space-y-3.5 max-w-xl font-sans text-[15px] sm:text-base lg:text-[16.5px] text-[#3E342B] leading-relaxed mb-6">
              <p>
                You&apos;ve walked through our hallway. You&apos;ve discovered different ways compassion
                can become action. And now there is one more door. This one is yours.
              </p>
              <p>
                Because the story of LAB isn&apos;t only about the people who founded it or the
                programs we offer. It&apos;s also about the people who choose to become part of what
                happens next.
              </p>
              <p>
                People who believe that kindness matters. That community matters. That showing up
                matters. And that meaningful change becomes possible when we work together.
              </p>
            </div>

            <div className="mb-3 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How We Serve
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                <span className="font-semibold text-[#121010]">Volunteer:</span> Share your time,
                talents, and willingness to serve.
                <br />
                <span className="font-semibold text-[#121010]">Partner:</span> Bring your
                organization, business, or community group alongside LAB to help expand
                opportunities and resources...
              </p>
            </div>

            <div className="mb-6 max-w-xl">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="text-[15px] sm:text-base font-bold text-[#1C140D] mb-1.5"
              >
                How You Can Help
              </h3>
              <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#554637] leading-relaxed">
                You don&apos;t need to do everything. You simply need to find the something that
                speaks to your heart. We don&apos;t believe everyone has to do everything. We
                believe everyone...
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FigmaButton
                to="/movement?tab=volunteer"
                variant="primary"
                size="md"
              >
                Volunteer
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=partner"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Partner
              </FigmaButton>

              <FigmaButton
                to="/donate"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Sponsor
              </FigmaButton>

              <FigmaButton
                to="/donate"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Donate
              </FigmaButton>

              <FigmaButton
                to="/movement"
                variant="outline"
                size="md"
                className="!border-[#DFCCA7] !text-[#121010] hover:!border-[#F97316] hover:!text-[#F97316] hover:!bg-[#F97316]/5"
              >
                Connect With LAB
              </FigmaButton>
            </div>
          </motion.div>

          {/* Right Column: Photo (Portrait aspect) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end items-center"
          >
            <div className="w-full max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] aspect-[663/760] sm:aspect-[663/784] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-[#FAF4E6]">
              <img
                src={doorSevenPhoto}
                alt="Smiling young woman in striped knit sweater sitting comfortably"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default HowWeServePillarsSection;
