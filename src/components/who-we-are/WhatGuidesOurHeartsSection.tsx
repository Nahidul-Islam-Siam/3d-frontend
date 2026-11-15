import React from "react";
import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";

interface GuideItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const guideItems: GuideItem[] = [
  {
    id: "compassion",
    title: "We believe compassion should be genuine.",
    description:
      "Not something reserved for special occasions, but something reflected in the way we treat people every day.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M3.33398 14.4904C3.33398 21.7243 12.6497 29.763 17.3518 33.2792C18.9342 34.4623 21.0672 34.4623 22.6495 33.2792C27.3517 29.763 36.6673 21.7243 36.6673 14.4904C36.6673 9.70906 33.1585 5.83301 28.334 5.83301C25.834 5.83301 23.334 6.66634 20.0007 9.99967C16.6673 6.66634 14.1673 5.83301 11.6673 5.83301C6.84275 5.83301 3.33398 9.70906 3.33398 14.4904Z"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
      </svg>
    ),
  },
  {
    id: "dignity",
    title: "We believe dignity is not earned.",
    description: "It belongs to every person.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M31.1813 5.82524C28.0275 4.25604 24.1682 3.33301 20 3.33301C15.8318 3.33301 11.9725 4.25604 8.8186 5.82524C7.27197 6.59477 6.49865 6.97954 5.74933 8.18931C5 9.39909 5 10.5705 5 12.9132V18.7282C5 28.2005 12.5706 33.467 16.955 35.7227C18.1778 36.3518 18.7892 36.6663 20 36.6663C21.2108 36.6663 21.8222 36.3518 23.0448 35.7227C27.4293 33.467 35 28.2005 35 18.7282V12.9132C35 10.5705 35 9.39911 34.2507 8.18931C33.5013 6.97952 32.728 6.59477 31.1813 5.82524Z"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
      </svg>
    ),
  },
  {
    id: "listening",
    title: "We believe listening is an act of respect.",
    description:
      "Understanding begins when we make room for someone else’s perspective.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M10.1289 29.9997C10.1289 33.6815 12.044 36.6663 15.5135 36.6663C18.983 36.6663 21.7955 34.1663 22.693 29.9997C23.1233 28.0018 24.005 26.7942 25.3853 25.833C28.975 23.333 31.6673 19.4868 31.6673 14.9997C31.6673 8.55636 26.444 3.33301 20.0007 3.33301C13.5573 3.33301 8.33398 8.55636 8.33398 14.9997"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
        <path
          d="M15 25C17.3083 25 19.1797 23.321 19.1797 21.25C19.1797 19.179 17.3083 17.5 15 17.5C15 14.1385 15.7731 10 20.0157 10C22.9997 10 24.7493 12.2903 25 15.25"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
      </svg>
    ),
  },
  {
    id: "faith",
    title: "We believe faith inspires action.",
    description:
      "Our faith-rooted foundation encourages us to love generously, serve humbly, and welcome people with compassion.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M36.6673 20.0003C32.6673 20.0003 29.4452 17.7782 28.334 16.667H11.6673C10.5562 17.7782 7.33398 20.0003 3.33398 20.0003L3.61868 20.5697C4.46565 22.2637 6.19697 23.3337 8.09082 23.3337H31.9105C33.8043 23.3337 35.5357 22.2637 36.3827 20.5697L36.6673 20.0003Z"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
        <path
          d="M31.6673 6.66634C29.2457 6.66634 27.109 5.85181 25.5533 4.96244C23.9138 4.02516 23.0942 3.55652 22.6735 3.44476C22.2528 3.33301 21.6928 3.33301 20.5725 3.33301H19.4288C18.3085 3.33301 17.7485 3.33301 17.3278 3.44476C16.9072 3.55652 16.0874 4.02516 14.448 4.96244C12.8923 5.85181 10.7557 6.66634 8.33398 6.66634L8.61868 7.23574C9.46565 8.92966 11.197 9.99967 13.0908 9.99967H26.9105C28.8043 9.99967 30.5357 8.92966 31.3827 7.23574L31.6673 6.66634Z"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
        <path
          d="M28.334 16.6667V10"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
        <path
          d="M11.666 16.6667V10"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
        <path
          d="M31.666 36.6663V23.333"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
        <path
          d="M8.33398 36.6663V23.333"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
        <path
          d="M5 36.667H35"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
        <path
          d="M16.666 36.6663V31.6663C16.666 29.8253 18.1583 28.333 19.9993 28.333C21.8403 28.333 23.3327 29.8253 23.3327 31.6663V36.6663"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
      </svg>
    ),
  },
  {
    id: "relationships",
    title: "We believe relationships create possibilities.",
    description:
      "Meaningful connections can encourage growth, strengthen communities, and remind us that we do not have to navigate life alone.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M15.0427 21.66C15.1454 19.567 15.4363 18.2202 16.2597 17.1877C16.5322 16.846 16.8422 16.5361 17.1838 16.2637C18.2163 15.4403 19.5632 15.1494 21.6562 15.0466M28.3257 15C31.4118 15.0393 33.1817 15.2398 34.4655 16.2637C34.8072 16.5361 35.117 16.846 35.3895 17.1877C36.6627 18.7843 36.6627 21.1323 36.6627 25.8285V25.8285V25.8285C36.6627 30.5247 36.6627 32.8728 35.3895 34.4693C35.117 34.811 34.8072 35.121 34.4655 35.3935C32.8688 36.6667 30.5208 36.6667 25.8247 36.6667C21.1285 36.6667 18.7803 36.6667 17.1838 35.3935C16.8422 35.121 16.5322 34.811 16.2597 34.4693C15.2359 33.1855 15.0354 31.4157 14.9961 28.3297"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
        <path
          d="M24.9542 18.3397C24.8513 20.4327 24.5605 21.7795 23.737 22.812C23.4645 23.1537 23.1546 23.4635 22.813 23.736C21.7805 24.5595 20.4337 24.8503 18.3407 24.9532M11.671 24.9997C8.58497 24.9603 6.81513 24.7598 5.53127 23.736C5.18962 23.4635 4.87965 23.1537 4.6072 22.812C3.33398 21.2153 3.33398 18.8673 3.33398 14.1711C3.33398 9.47494 3.33398 7.12684 4.6072 5.53029C4.87965 5.18864 5.18962 4.87867 5.53127 4.60622C7.12782 3.33301 9.47592 3.33301 14.1721 3.33301C18.8683 3.33301 21.2163 3.33301 22.813 4.60622C23.1546 4.87867 23.4645 5.18864 23.737 5.53029C24.7608 6.81416 24.9613 8.58399 25.0007 11.67"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="#F97316"
        />
      </svg>
    ),
  },
  {
    id: "hope",
    title: "And we believe hope is worth nurturing.",
    description:
      "Not as a promise that every road will be easy, but as a reminder that new possibilities can still emerge.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M20 36.6667V15"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
        <path
          d="M15.0039 30.0037C12.2425 30.0037 10.0039 27.706 10.0039 24.9445C7.17701 24.5402 5.00391 22.109 5.00391 19.1703C5.00391 16.6757 6.56977 14.5468 8.77221 13.713C8.49269 13.0893 8.33724 12.3979 8.33724 11.6702C8.33724 8.90883 10.5758 6.67025 13.3372 6.67025C13.9877 6.67025 14.6091 6.79445 15.179 7.0204C15.7569 4.8977 17.6982 3.33691 20.004 3.33691C22.3097 3.33691 24.251 4.8977 24.8288 7.0204C25.3988 6.79445 26.0202 6.67025 26.6707 6.67025C29.432 6.67025 31.6707 8.90883 31.6707 11.6702C31.6707 12.3979 31.5152 13.0893 31.2357 13.713C33.438 14.5468 35.004 16.6757 35.004 19.1703C35.004 22.1092 32.8307 24.5403 30.0035 24.9445C30.0035 27.706 27.7653 30.0037 25.004 30.0037"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
        <path
          d="M20 24.9997L24.1667 20.833"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
        <path
          d="M20.0007 21.6667L15.834 17.5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
        <path
          d="M16.666 36.667H23.3327"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#F97316"
        />
      </svg>
    ),
  },
];

interface WhatGuidesOurHeartsSectionProps {
  id?: string;
  className?: string;
}

export function WhatGuidesOurHeartsSection({
  id = "what-guides-our-hearts",
  className = "",
}: WhatGuidesOurHeartsSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24 lg:pb-32 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* ─── Section Heading (Left Aligned) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 lg:mb-12"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.2",
            }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight"
          >
            What Guides Our Hearts
          </h2>
        </motion.div>

        {/* ─── 6 Cards Grid (3 cols x 2 rows) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mb-10 sm:mb-12">
          {guideItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-start gap-3 p-6 flex-1 self-stretch rounded-[12px] border border-[#F4D8A5] shadow-xs hover:border-[#F97316] transition-all duration-300"
            >
              {/* Icon */}
              <div>{item.icon}</div>

              {/* Title (Exact Figma Specs: Helvetica 18px/24px #121010 700) */}
              <h3
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: "#121010",
                  lineHeight: "24px",
                }}
                className="text-[18px] font-bold tracking-tight"
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#555555] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── Bottom CTA Buttons (Left Aligned) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3.5 sm:gap-4"
        >
          <FigmaButton to="/how-we-serve" variant="primary" size="md">
            Step Into Our Hallway
          </FigmaButton>

          <FigmaButton to="/how-we-serve#overview" variant="outline" size="md">
            Discover How We Serve
          </FigmaButton>
        </motion.div>
      </div>
    </section>
  );
}

export default WhatGuidesOurHeartsSection;
