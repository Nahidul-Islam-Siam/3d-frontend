import React from "react";
import { motion } from "framer-motion";

interface TakeAMomentSectionProps {
  id?: string;
  className?: string;
}

interface MomentCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function TakeAMomentSection({
  id = "take-a-moment",
  className = "",
}: TakeAMomentSectionProps) {
  const cards: MomentCard[] = [
    {
      title: "Breathe With Intention",
      description:
        "Breathe in gently for four seconds. Breathe out slowly for six seconds. Repeat a few times at a pace that feels comfortable.",
      icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M9.07574 23.7918C9.34786 23.2828 9.80662 22.9107 10.3711 22.8088C10.9356 22.707 11.4911 22.8962 11.917 23.2793M18.7267 28.795C18.1823 29.813 17.2648 30.5573 16.1359 30.761C15.0069 30.9647 13.8959 30.5863 13.0442 29.8202M17.5993 22.2542C17.8715 21.7452 18.3303 21.3728 18.8948 21.271C19.4592 21.1692 20.0148 21.3585 20.4407 21.7415M21.7835 11.9037C19.8658 13.7138 16.9523 15.1533 13.5519 15.7668C10.1514 16.3803 6.93242 16.0472 4.52532 15.0173C4.37127 14.9514 4.20534 14.9289 4.04447 14.9579C3.57019 15.0435 3.25911 15.5388 3.34966 16.0642L4.91279 25.1345C6.07852 31.8988 11.7449 35.1472 14.3732 36.3093C15.2441 36.6945 16.2036 36.7437 17.1378 36.5752C18.0722 36.4065 18.9573 36.0245 19.6468 35.358C21.7283 33.346 25.967 28.3108 24.8013 21.5463L23.2382 12.4761C23.1477 11.9507 22.6898 11.5941 22.2155 11.6797C22.0547 11.7087 21.9062 11.7879 21.7835 11.9037Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M23.8595 28.333C24.4653 28.3327 25.065 28.2242 25.6273 27.9753C28.2558 26.8132 33.9222 23.5648 35.0878 16.8005L36.651 7.7302C36.7415 7.2048 36.4305 6.7095 35.9562 6.62394C35.7953 6.59492 35.6293 6.61742 35.4753 6.68332C33.0682 7.71317 29.8493 8.04634 26.4488 7.43285C23.0483 6.81935 20.1348 5.37984 18.2172 3.56975C18.0945 3.45392 17.946 3.3747 17.7852 3.34569C17.3108 3.26012 16.853 3.61667 16.7625 4.14209L15.1993 13.2124C15.0623 14.0074 15 14.7786 15 15.5237" strokeWidth="1.5" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Find Your Ground",
      description:
        "Look around and notice five things you can see, four things you can feel, three things you can hear, two things you can smell, and one thing you can taste.",
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M25.3428 17.8632C22.9918 16.0017 18.334 11.746 18.334 7.91631C18.334 5.38502 20.0883 3.33301 22.5007 3.33301C23.7507 3.33301 25.0007 3.77417 26.6673 5.53887C28.334 3.77417 29.584 3.33301 30.834 3.33301C33.2463 3.33301 35.0007 5.38502 35.0007 7.91631C35.0007 11.746 30.3428 16.0017 27.9918 17.8632C27.2007 18.4897 26.134 18.4897 25.3428 17.8632Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M3.33398 31.6663V21.6663C3.33398 20.8913 3.33398 20.5038 3.41917 20.186C3.65033 19.3232 4.3242 18.6493 5.18693 18.4182C5.50485 18.333 5.89233 18.333 6.66732 18.333C7.4423 18.333 7.82978 18.333 8.1477 18.4182C9.01043 18.6493 9.6843 19.3232 9.91547 20.186C10.0007 20.5038 10.0007 20.8913 10.0007 21.6663V31.6663C10.0007 32.4413 10.0007 32.8288 9.91547 33.1467C9.6843 34.0095 9.01043 34.6833 8.1477 34.9145C7.82978 34.9997 7.4423 34.9997 6.66732 34.9997C5.89233 34.9997 5.50485 34.9997 5.18693 34.9145C4.3242 34.6833 3.65033 34.0095 3.41917 33.1467C3.33398 32.8288 3.33398 32.4413 3.33398 31.6663Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M10 20H12.9474C14.3017 20 15.6418 20.275 16.8867 20.8085L24.7623 24.1838C25.9177 24.679 26.6667 25.815 26.6667 27.0718C26.6667 28.2288 25.7288 29.1667 24.5718 29.1667H23.4977C22.2882 29.1667 21.0897 28.9358 19.9667 28.4867L17.5 27.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M23.3333 29.167H34.2915C35.6033 29.167 36.6667 30.2303 36.6667 31.5422C36.6667 32.6025 35.9637 33.5345 34.944 33.8258L26.2418 36.3122C25.418 36.5475 24.5653 36.667 23.7085 36.667C22.9062 36.667 22.1075 36.5623 21.3323 36.3557L10 33.3337" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Give Yourself Permission to Pause",
      description:
        "Relax your shoulders. Unclench your hands. Take a sip of water. Step away from the noise for a moment.",
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M32.7827 24.449C35.0173 21.6052 36.6673 18.448 36.6673 15.3244C36.6673 10.543 33.1585 6.66699 28.334 6.66699C25.834 6.66699 23.334 7.50033 20.0007 10.8337C16.6673 7.50033 14.1673 6.66699 11.6673 6.66699C6.84275 6.66699 3.33398 10.543 3.33398 15.3244C3.33398 23.778 15.4197 32.479 18.4732 34.5423C18.9242 34.8472 19.4563 35.0003 20.0007 35.0003C20.545 35.0003 21.0772 34.8472 21.5282 34.5423C21.7035 34.4238 21.9088 34.2835 22.1398 34.1223C23.8 32.9652 23.9317 30.598 22.5007 29.167" strokeWidth="2.5" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M30.8333 18.333L32.4833 19.983C33.6647 21.1643 33.9138 22.9913 32.8893 24.311C31.6463 25.912 29.272 25.9383 27.8387 24.505L27.5 24.1663" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M27.5 24.167L27.8237 24.4907C29.2818 25.9488 29.1833 28.4357 27.6388 29.8022C26.1988 31.0762 24.1608 30.8278 22.8013 29.4683L22.5 29.167" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M20.001 10.833L15.4176 15.4163C14.267 16.5669 14.267 18.4323 15.4176 19.583C16.5682 20.7337 18.4337 20.7337 19.5843 19.583L22.501 16.6663C23.4097 15.7576 23.8642 15.3032 24.3543 15.0603C25.2868 14.5982 26.3818 14.5982 27.3143 15.0603C27.8043 15.3031 28.2585 15.7573 29.1666 16.6653L29.1677 16.6663L31.6677 19.1663" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Reach Out",
      description:
        'Sometimes the most meaningful thing you can do is tell someone you trust, "I could use someone to talk to."',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M32.7827 24.449C35.0173 21.6052 36.6673 18.448 36.6673 15.3244C36.6673 10.543 33.1585 6.66699 28.334 6.66699C25.834 6.66699 23.334 7.50033 20.0007 10.8337C16.6673 7.50033 14.1673 6.66699 11.6673 6.66699C6.84275 6.66699 3.33398 10.543 3.33398 15.3244C3.33398 23.778 15.4197 32.479 18.4732 34.5423C18.9242 34.8472 19.4563 35.0003 20.0007 35.0003C20.545 35.0003 21.0772 34.8472 21.5282 34.5423C21.7035 34.4238 21.9088 34.2835 22.1398 34.1223C23.8 32.9652 23.9317 30.598 22.5007 29.167" strokeWidth="2.5" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M30.8333 18.333L32.4833 19.983C33.6647 21.1643 33.9138 22.9913 32.8893 24.311C31.6463 25.912 29.272 25.9383 27.8387 24.505L27.5 24.1663" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M27.5 24.167L27.8237 24.4907C29.2818 25.9488 29.1833 28.4357 27.6388 29.8022C26.1988 31.0762 24.1608 30.8278 22.8013 29.4683L22.5 29.167" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M20.001 10.833L15.4176 15.4163C14.267 16.5669 14.267 18.4323 15.4176 19.583C16.5682 20.7337 18.4337 20.7337 19.5843 19.583L22.501 16.6663C23.4097 15.7576 23.8642 15.3032 24.3543 15.0603C25.2868 14.5982 26.3818 14.5982 27.3143 15.0603C27.8043 15.3031 28.2585 15.7573 29.1666 16.6653L29.1677 16.6663L31.6677 19.1663" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
  ];

  return (
    <section
      id={id}
      className={`relative w-full  pt-14 sm:pt-18 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* ─── Top Heading & Intro ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.15",
            }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight mb-5"
          >
            Take a Moment. This
            <br />
            One Is for You.
          </h2>

          <div className="max-w-2xl space-y-3">
            <p className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#444444] leading-relaxed">
              Life moves quickly. Between responsibilities, expectations, and
              everything happening around us, we sometimes forget to check in
              with ourselves. So before you continue exploring, we&apos;d like
              to offer you something.
            </p>
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="italic text-sm sm:text-base text-[#121010]"
            >
              A moment to simply be.
            </p>
          </div>
        </motion.div>

        {/* ─── Subtitle: Feeling Overwhelmed? ─── */}
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#121010",
          }}
          className="text-xl sm:text-2xl font-semibold tracking-tight mb-6 sm:mb-8"
        >
          Feeling Overwhelmed?
        </motion.h3>

        {/* ─── 4 Mindfulness Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                borderRadius: "12px",
                borderColor: "#F4D8A5",
              }}
              className=" border rounded-[12px] p-6 sm:p-7 flex flex-col items-center text-center hover:border-[#F97316]/50 hover:bg-[#FAF4E6] transition-all duration-300 shadow-sm"
            >
              {/* Centered Orange Icon */}
              <div className="flex justify-center items-center mb-4 text-[#F97316]">
                {card.icon}
              </div>

              {/* Card Title */}
              <h4
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: "#121010",
                  lineHeight: "24px",
                }}
                className="text-[17px] sm:text-[18px] font-bold mb-2.5"
              >
                {card.title}
              </h4>

              {/* Card Description */}
              <p className="font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#555555] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── Bottom Note ─── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-xs sm:text-[13px] sm:text-sm text-[#444444] mt-8 sm:mt-10"
        >
          You don&apos;t have to carry everything alone.
        </motion.p>
      </div>
    </section>
  );
}
