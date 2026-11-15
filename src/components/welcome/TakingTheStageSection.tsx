import React from "react";
import { motion } from "framer-motion";
import showdownPoster from "@/assets/welcome/showdown-poster.png";
import FigmaButton from "@/components/common/FigmaButton";

export interface RoleItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  colClass?: string;
}

export interface TakingTheStageSectionProps {
  id?: string;
  className?: string;
}

export default function TakingTheStageSection({
  id = "taking-the-stage",
  className = "",
}: TakingTheStageSectionProps) {
  const roles: RoleItem[] = [
    {
      title: "AUDITION",
      description: "Bring your talent, creativity, and passion to the stage.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-6 h-6">
          <path d="M9.07574 23.7918C9.34786 23.2828 9.80662 22.9107 10.3711 22.8088C10.9356 22.707 11.4911 22.8962 11.917 23.2793M18.7267 28.795C18.1823 29.813 17.2648 30.5573 16.1359 30.761C15.0069 30.9647 13.8959 30.5863 13.0442 29.8202M17.5993 22.2542C17.8715 21.7452 18.3303 21.3728 18.8948 21.271C19.4592 21.1692 20.0148 21.3585 20.4407 21.7415M21.7835 11.9037C19.8658 13.7138 16.9523 15.1533 13.5519 15.7668C10.1514 16.3803 6.93242 16.0472 4.52532 15.0173C4.37127 14.9514 4.20534 14.9289 4.04447 14.9579C3.57019 15.0435 3.25911 15.5388 3.34966 16.0642L4.91279 25.1345C6.07852 31.8988 11.7449 35.1472 14.3732 36.3093C15.2441 36.6945 16.2036 36.7437 17.1378 36.5752C18.0722 36.4065 18.9573 36.0245 19.6468 35.358C21.7283 33.346 25.967 28.3108 24.8013 21.5463L23.2382 12.4761C23.1477 11.9507 22.6898 11.5941 22.2155 11.6797C22.0547 11.7087 21.9062 11.7879 21.7835 11.9037Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M23.8595 28.333C24.4653 28.3327 25.065 28.2242 25.6273 27.9753C28.2558 26.8132 33.9222 23.5648 35.0878 16.8005L36.651 7.7302C36.7415 7.2048 36.4305 6.7095 35.9562 6.62394C35.7953 6.59492 35.6293 6.61742 35.4753 6.68332C33.0682 7.71317 29.8493 8.04634 26.4488 7.43285C23.0483 6.81935 20.1348 5.37984 18.2172 3.56975C18.0945 3.45392 17.946 3.3747 17.7852 3.34569C17.3108 3.26012 16.853 3.61667 16.7625 4.14209L15.1993 13.2124C15.0623 14.0074 15 14.7786 15 15.5237" strokeWidth="1.5" strokeLinejoin="round" stroke="#F97316"/>
        </svg>
      ),
    },
    {
      title: "VOLUNTEER",
      description:
        "Help bring the production to life through hospitality, production support, outreach, and behind-the-scenes opportunities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-6 h-6">
          <path d="M25.3428 17.8632C22.9918 16.0017 18.334 11.746 18.334 7.91631C18.334 5.38502 20.0883 3.33301 22.5007 3.33301C23.7507 3.33301 25.0007 3.77417 26.6673 5.53887C28.334 3.77417 29.584 3.33301 30.834 3.33301C33.2463 3.33301 35.0007 5.38502 35.0007 7.91631C35.0007 11.746 30.3428 16.0017 27.9918 17.8632C27.2007 18.4897 26.134 18.4897 25.3428 17.8632Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M3.33398 31.6663V21.6663C3.33398 20.8913 3.33398 20.5038 3.41917 20.186C3.65033 19.3232 4.3242 18.6493 5.18693 18.4182C5.50485 18.333 5.89233 18.333 6.66732 18.333C7.4423 18.333 7.82978 18.333 8.1477 18.4182C9.01043 18.6493 9.6843 19.3232 9.91547 20.186C10.0007 20.5038 10.0007 20.8913 10.0007 21.6663V31.6663C10.0007 32.4413 10.0007 32.8288 9.91547 33.1467C9.6843 34.0095 9.01043 34.6833 8.1477 34.9145C7.82978 34.9997 7.4423 34.9997 6.66732 34.9997C5.89233 34.9997 5.50485 34.9997 5.18693 34.9145C4.3242 34.6833 3.65033 34.0095 3.41917 33.1467C3.33398 32.8288 3.33398 32.4413 3.33398 31.6663Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M10 20H12.9474C14.3017 20 15.6418 20.275 16.8867 20.8085L24.7623 24.1838C25.9177 24.679 26.6667 25.815 26.6667 27.0718C26.6667 28.2288 25.7288 29.1667 24.5718 29.1667H23.4977C22.2882 29.1667 21.0897 28.9358 19.9667 28.4867L17.5 27.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M23.3333 29.167H34.2915C35.6033 29.167 36.6667 30.2303 36.6667 31.5422C36.6667 32.6025 35.9637 33.5345 34.944 33.8258L26.2418 36.3122C25.418 36.5475 24.5653 36.667 23.7085 36.667C22.9062 36.667 22.1075 36.5623 21.3323 36.3557L10 33.3337" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
        </svg>
      ),
    },
    {
      title: "BECOME A SPONSOR",
      description:
        "Help make this meaningful theatrical experience possible through financial or in-kind support.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-6 h-6">
          <path d="M32.7827 24.449C35.0173 21.6052 36.6673 18.448 36.6673 15.3244C36.6673 10.543 33.1585 6.66699 28.334 6.66699C25.834 6.66699 23.334 7.50033 20.0007 10.8337C16.6673 7.50033 14.1673 6.66699 11.6673 6.66699C6.84275 6.66699 3.33398 10.543 3.33398 15.3244C3.33398 23.778 15.4197 32.479 18.4732 34.5423C18.9242 34.8472 19.4563 35.0003 20.0007 35.0003C20.545 35.0003 21.0772 34.8472 21.5282 34.5423C21.7035 34.4238 21.9088 34.2835 22.1398 34.1223C23.8 32.9652 23.9317 30.598 22.5007 29.167" strokeWidth="2.5" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M30.8333 18.333L32.4833 19.983C33.6647 21.1643 33.9138 22.9913 32.8893 24.311C31.6463 25.912 29.272 25.9383 27.8387 24.505L27.5 24.1663" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M27.5 24.167L27.8237 24.4907C29.2818 25.9488 29.1833 28.4357 27.6388 29.8022C26.1988 31.0762 24.1608 30.8278 22.8013 29.4683L22.5 29.167" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M20.001 10.833L15.4176 15.4163C14.267 16.5669 14.267 18.4323 15.4176 19.583C16.5682 20.7337 18.4337 20.7337 19.5843 19.583L22.501 16.6663C23.4097 15.7576 23.8642 15.3032 24.3543 15.0603C25.2868 14.5982 26.3818 14.5982 27.3143 15.0603C27.8043 15.3031 28.2585 15.7573 29.1666 16.6653L29.1677 16.6663L31.6677 19.1663" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
        </svg>
      ),
    },
    {
      title: "PARTNER WITH US",
      description:
        "Join the conversation as a community organization, mental-health professional, educator, or advocate.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-6 h-6">
          <path d="M22.5007 20.4914L27.5007 25.5211L27.5007 25.5212L28.334 26.3594C29.2545 27.2854 30.7468 27.2854 31.6673 26.3594C32.5878 25.4334 32.5878 23.9323 31.6673 23.0063L21.6673 12.9468H20.0007L17.9437 15.016C16.7427 16.2242 14.8306 16.3307 13.5043 15.2634L13.5042 15.2633C13.1454 14.9746 12.966 14.8302 12.8488 14.6812C12.4142 14.1287 12.3729 13.363 12.7456 12.767C12.8461 12.6063 13.0089 12.4434 13.3346 12.1177L13.3346 12.1177L14.6064 10.8459L14.6066 10.8458C16.0516 9.40073 16.7742 8.67818 17.693 8.29759C18.6118 7.91699 19.9292 7.91699 21.9728 7.91699C23.4757 7.91699 24.2272 7.91699 24.9357 8.13153C25.6443 8.34608 27.0708 9.29704 28.3211 10.1307C29.1548 10.6864 29.5716 10.9643 30.044 11.1073C30.5163 11.2503 31.0173 11.2503 32.0191 11.2503H36.6673M27.5007 25.5212C28.4212 26.4472 28.4211 27.9485 27.5007 28.8743C26.5802 29.8003 25.0878 29.8003 24.1673 28.8743L22.5008 27.198M16.6673 28.0359L19.1673 30.5509C20.0878 31.4768 21.5802 31.4768 22.5007 30.5509C23.4211 29.625 23.4212 28.1238 22.5008 27.198L22.5007 27.1978L19.1673 23.8644M3.33398 24.5836H3.86555C5.24745 24.5836 5.93842 24.5836 6.5579 24.8439C7.17738 25.1044 7.6609 25.5979 8.62793 26.5851L13.334 31.3893C14.2545 32.3151 15.7469 32.3151 16.6673 31.3893C17.5878 30.4633 17.5878 28.9619 16.6673 28.0359L15.834 27.1978" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M36.6667 24.583H32.5" strokeWidth="2.5" strokeLinecap="round" stroke="#F97316"/>
          <path d="M14.1673 11.25H3.33398" strokeWidth="2.5" strokeLinecap="round" stroke="#F97316"/>
        </svg>
      ),
      colClass: "lg:col-start-2 lg:col-span-2",
    },
    {
      title: "MAKE A DONATION",
      description:
        "Support the production and LAB's mission of creating opportunities for connection, awareness, and hope.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-6 h-6">
          <path d="M3.33398 20.0003V30.0003C3.33398 30.7753 3.33398 31.1628 3.41917 31.4807C3.65033 32.3435 4.3242 33.0173 5.18693 33.2485C5.50485 33.3337 5.89233 33.3337 6.66732 33.3337C7.4423 33.3337 7.82978 33.3337 8.1477 33.2485C9.01043 33.0173 9.6843 32.3435 9.91547 31.4807C10.0007 31.1628 10.0007 30.7753 10.0007 30.0003V20.0003C10.0007 19.2253 10.0007 18.8378 9.91547 18.52C9.6843 17.6572 9.01043 16.9833 8.1477 16.7522C7.82978 16.667 7.4423 16.667 6.66732 16.667C5.89233 16.667 5.50485 16.667 5.18693 16.7522C4.3242 16.9833 3.65033 17.6572 3.41917 18.52C3.33398 18.8378 3.33398 19.2253 3.33398 20.0003Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M10 18.333H12.9474C14.3017 18.333 15.6418 18.608 16.8867 19.1415L24.7623 22.5168C25.9177 23.012 26.6667 24.148 26.6667 25.4048C26.6667 26.5618 25.7288 27.4997 24.5718 27.4997H23.4977C22.2882 27.4997 21.0897 27.2688 19.9667 26.8197L17.5 25.833" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M23.3333 27.5H34.2915C35.6033 27.5 36.6667 28.5633 36.6667 29.8752C36.6667 30.9355 35.9637 31.8675 34.944 32.1588L26.2418 34.6452C25.418 34.8805 24.5653 35 23.7085 35C22.9062 35 22.1075 34.8953 21.3323 34.6887L10 31.6667" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
          <path d="M36.6673 11.6667C36.6673 15.3486 33.6825 18.3333 30.0007 18.3333C26.3188 18.3333 23.334 15.3486 23.334 11.6667C23.334 7.98477 26.3188 5 30.0007 5C33.6825 5 36.6673 7.98477 36.6673 11.6667Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
        </svg>
      ),
      colClass: "lg:col-span-2",
    },
  ];

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* ─── Top Split: Narrative Left & Showdown Poster Right ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start mb-16 sm:mb-20 lg:mb-24">
          {/* Left Column: Heading & Story Copy */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-start"
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#272624",
                lineHeight: "1.18",
              }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight mb-4 sm:mb-5"
            >
              Something Extraordinary Is
              <br />
              Taking the Stage
            </h2>

            {/* Orange Production Subtitle */}
            <p className="font-sans text-xs sm:text-[13px] text-[#F97316] font-medium mb-3">
              Suicide Awareness Showdown: Where Are You Now? Letters to Etcetera
            </p>

            {/* Intro Hook Line */}
            <p className="font-sans text-xs sm:text-[13px] text-[#272624] font-medium mb-3">
              Putting Words to Silent Screams.
            </p>

            {/* 3 Reflection Questions */}
            <div className="space-y-1 font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#444444] leading-[1.7] mb-5">
              <p>What if the person who seems to have everything together is silently struggling?</p>
              <p>What if the person everyone overlooks has a story that deserves to be heard?</p>
              <p>And what if one conversation could change the way we see each other?</p>
            </div>

            {/* Main Narrative Paragraphs */}
            <div className="space-y-3.5 font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#444444] leading-[1.75]">
              <p>
                Through powerful storytelling, music, dance, unexpected laughter, and moments of reflection, Where Are You Now? Letters to Etcetera invites audiences into a theatrical experience about life, relationships, hidden struggles, and the extraordinary importance of human connection.
              </p>
              <p>
                This isn&apos;t simply a performance. It&apos;s a conversation we hope will continue long after the curtain closes.
              </p>
              <p>
                We are bringing together performers, creative professionals, volunteers, sponsors, community organizations, and people who believe every life has value. And we&apos;d love for you to be part of it.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Showdown Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] bg-[#100B09]">
              <img
                src={showdownPoster}
                alt="Showdown Suicide Awareness - Where Are You Now? Letters to Etcetera"
                className="w-full h-auto block object-cover select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>

        {/* ─── Bottom Section: "There's a Role for You in This Story" ─── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#272624",
            }}
            className="text-xl sm:text-2xl font-semibold tracking-tight mb-6 sm:mb-8"
          >
            There&apos;s a Role for You in This Story
          </motion.h3>

          {/* 5 Role Cards in 6-Column Centered Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            {roles.map((role, idx) => {
              const colSpanClass = role.colClass || "lg:col-span-2";
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`${colSpanClass} bg-[#FAF4E6] border border-[#F4D8A5] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between hover:border-[#F97316]/50 transition-colors shadow-sm`}
                >
                  <div>
                    {/* Orange Icon */}
                    <div className="mb-3 text-[#F97316]">
                      {role.icon}
                    </div>

                    {/* Role Title */}
                    <h4
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        color: "#121010",
                        lineHeight: "24px",
                      }}
                      className="text-[18px] font-bold uppercase mb-2"
                    >
                      {role.title}
                    </h4>

                    {/* Role Description */}
                    <p className="font-sans text-xs sm:text-[12.5px] text-[#121010] leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-10 sm:mt-12"
          >
            <FigmaButton to="/suicide-awareness-showdown" variant="primary" size="md">
              Explore The Production
            </FigmaButton>

            <FigmaButton to="/movement" variant="outline" size="md">
              Get Involved
            </FigmaButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
