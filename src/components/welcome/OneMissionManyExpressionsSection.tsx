import React from "react";
import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";

interface ExpressionItem {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface OneMissionManyExpressionsSectionProps {
  id?: string;
  className?: string;
}

export function OneMissionManyExpressionsSection({
  id = "one-mission-many-expressions",
  className = "",
}: OneMissionManyExpressionsSectionProps) {
  const row1Items: ExpressionItem[] = [
    {
      title: "A Place at the Table",
      subtitle: "Sometimes hope begins with a meal.",
      icon:(
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M34.9993 28.3337C30.397 28.3337 26.666 24.6027 26.666 20.0003C26.666 15.398 30.397 11.667 34.9993 11.667" strokeWidth="2.5" strokeLinecap="round" stroke="#F97316"/>
  <path d="M35 35C26.7157 35 20 28.2843 20 20C20 11.7157 26.7157 5 35 5" strokeWidth="2.5" strokeLinecap="round" stroke="#F97316"/>
  <path d="M10 5V13.3333M10 35V18.3333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M5.83398 13.333H14.1673" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M15 5V12.2537C15 20.36 5 20.3598 5 12.2534V5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Strong Foundations",
      subtitle: "Sometimes hope begins with guidance.",
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M20.0007 36.667L16.6673 26.667H3.33398L6.66732 36.667H20.0007ZM20.0007 36.667H26.6673" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M19.9993 21.667V20.8337C19.9993 17.691 19.9993 16.1196 19.023 15.1433C18.0467 14.167 16.4754 14.167 13.3327 14.167C10.19 14.167 8.61863 14.167 7.64233 15.1433C6.66602 16.1196 6.66602 17.691 6.66602 20.8337V21.667" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M31.6667 21.6663C31.6667 23.5073 30.1743 24.9997 28.3333 24.9997C26.4923 24.9997 25 23.5073 25 21.6663C25 19.8253 26.4923 18.333 28.3333 18.333C30.1743 18.333 31.6667 19.8253 31.6667 21.6663Z" strokeWidth="2.5" stroke="#F97316"/>
  <path d="M16.6667 6.66634C16.6667 8.50729 15.1743 9.99967 13.3333 9.99967C11.4924 9.99967 10 8.50729 10 6.66634C10 4.82539 11.4924 3.33301 13.3333 3.33301C15.1743 3.33301 16.6667 4.82539 16.6667 6.66634Z" strokeWidth="2.5" stroke="#F97316"/>
  <path d="M23.334 29.167H33.334C35.175 29.167 36.6673 30.6593 36.6673 32.5003V33.3337C36.6673 35.1747 35.175 36.667 33.334 36.667H31.6673" strokeWidth="2.5" strokeLinecap="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Stories That Save Lives",
      subtitle: "Sometimes hope begins with one conversation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M3.33398 17.5003C3.33398 16.2157 3.35642 14.9616 3.39913 13.7508C3.53868 9.79504 3.60847 7.81714 5.21743 6.19608C6.8264 4.57501 8.86015 4.48799 12.9277 4.31398C15.1593 4.21849 17.5355 4.16699 20.0007 4.16699C22.4658 4.16699 24.842 4.21849 27.0736 4.31398C31.1411 4.48799 33.175 4.57501 34.7838 6.19608C36.3928 7.81714 36.4626 9.79504 36.6021 13.7508C36.6448 14.9616 36.6673 16.2157 36.6673 17.5003C36.6673 18.785 36.6448 20.039 36.6021 21.2498C36.4626 25.2057 36.3928 27.1835 34.7838 28.8047C33.175 30.4257 31.1412 30.5127 27.0735 30.6867C25.8503 30.739 24.5837 30.7782 23.2828 30.8028C22.0477 30.8262 21.43 30.838 20.8873 31.0447C20.3446 31.2513 19.8881 31.6428 18.9748 32.4258L15.3424 35.5407C15.1219 35.7297 14.841 35.8337 14.5505 35.8337C13.8786 35.8337 13.334 35.289 13.334 34.6172V30.7035C13.198 30.698 13.0626 30.6925 12.9276 30.6867C8.86013 30.5127 6.8264 30.4257 5.21743 28.8045C3.60847 27.1835 3.53868 25.2057 3.39913 21.2498C3.35642 20.039 3.33398 18.785 3.33398 17.5003Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M20.2088 17.4997H20.0005M13.541 17.4997H13.3327M26.8743 17.4997H26.666M20.4172 17.4997C20.4172 17.7298 20.2307 17.9163 20.0005 17.9163C19.7705 17.9163 19.5838 17.7298 19.5838 17.4997C19.5838 17.2695 19.7705 17.083 20.0005 17.083C20.2307 17.083 20.4172 17.2695 20.4172 17.4997ZM13.7493 17.4997C13.7493 17.7298 13.5628 17.9163 13.3327 17.9163C13.1026 17.9163 12.916 17.7298 12.916 17.4997C12.916 17.2695 13.1026 17.083 13.3327 17.083C13.5628 17.083 13.7493 17.2695 13.7493 17.4997ZM27.0827 17.4997C27.0827 17.7298 26.8962 17.9163 26.666 17.9163C26.4358 17.9163 26.2493 17.7298 26.2493 17.4997C26.2493 17.2695 26.4358 17.083 26.666 17.083C26.8962 17.083 27.0827 17.2695 27.0827 17.4997Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Welcome Home",
      subtitle: "Sometimes hope begins with a key.",
      icon:(
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M22.4993 22.5003C25.2067 23.6607 26.5605 24.2408 27.9253 24.0588C28.0793 24.0382 28.2323 24.0105 28.3838 23.9757C29.7257 23.6675 30.7898 22.6495 32.918 20.6135L32.9185 20.613L33.1683 20.374C34.7822 18.7602 35.5892 17.9532 35.7852 16.306C35.9812 14.6589 35.5605 13.9706 34.7192 12.5941C33.9718 11.3711 32.9282 9.97688 31.4755 8.52421C30.0228 7.07153 28.6285 6.0279 27.4055 5.28046L27.4053 5.28036C26.0289 4.43916 25.3408 4.01857 23.6937 4.21451C22.0465 4.41048 21.2395 5.21745 19.6257 6.83138L19.3867 7.08105L19.386 7.0817C17.3503 9.20983 16.3323 10.274 16.0241 11.616C15.9894 11.7673 15.9617 11.9202 15.9411 12.074C15.7591 13.439 16.3392 14.7928 17.4997 17.5003" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M17.4993 17.498L4.16602 30.8325V35.8325H9.16602V32.4992H12.4993V29.1659H15.8327L22.4993 22.4992" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M28.3327 11.667L26.666 13.3337" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
  ];

  const row2Items: ExpressionItem[] = [
    {
      title: "A New Beginning",
      subtitle: "Sometimes hope begins with the little things.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M33.321 34.9997C30.2805 30.9515 25.4398 28.333 19.9876 28.333C14.5354 28.333 9.6947 30.9515 6.6543 34.9997" strokeWidth="2.5" strokeLinecap="round" stroke="#F97316"/>
  <path d="M27.4863 12.5L25.8788 14.1074L25.8788 14.1075C24.8851 15.1011 24.3883 15.598 23.9493 16.1148C21.6917 18.7733 20.3248 22.0732 20.0413 25.5495C19.9863 26.2255 19.9863 26.928 19.9863 28.3333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M31.6536 15.7427C31.9244 15.5579 32.1819 15.3453 32.4223 15.105C35.5639 11.9632 34.9356 5.0513 34.9356 5.0513C34.9356 5.0513 28.0236 4.42293 24.8819 7.56473C22.7998 9.64691 22.7998 13.0228 24.8819 15.105" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M12.4863 12.5L14.0938 14.1074C15.0874 15.1011 15.5843 15.5979 16.0232 16.1148C18.281 18.7733 19.6478 22.0732 19.9312 25.5495C19.9863 26.2255 19.9863 26.928 19.9863 28.3333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M15.0914 15.105C13.0092 17.1872 9.63326 17.1872 7.55105 15.105C4.40927 11.9632 5.03762 5.0513 5.03762 5.0513C5.03762 5.0513 11.9496 4.42293 15.0914 7.56473C15.3317 7.80501 15.5442 8.06255 15.7291 8.33333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Serve Beside Us",
      subtitle: "Sometimes hope begins with someone who says yes.",
      icon:(
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M21.6673 18.3337C21.6673 14.6518 18.6825 11.667 15.0007 11.667C11.3188 11.667 8.33398 14.6518 8.33398 18.3337C8.33398 22.0155 11.3188 25.0003 15.0007 25.0003C18.6825 25.0003 21.6673 22.0155 21.6673 18.3337Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M18.3983 12.5962C18.3558 12.2924 18.334 11.9821 18.334 11.6667C18.334 7.98477 21.3188 5 25.0007 5C28.6825 5 31.6673 7.98477 31.6673 11.6667C31.6673 15.3486 28.6825 18.3333 25.0007 18.3333C23.7597 18.3333 22.598 17.9943 21.603 17.4038" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M25 35C25 29.4772 20.5228 25 15 25C9.47715 25 5 29.4772 5 35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M35 28.333C35 22.8102 30.5228 18.333 25 18.333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
    {
      title: "Your Story",
      subtitle: "Every story has the power to change another.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M13.3338 8.30273H10.0007C6.85795 8.30273 5.2866 8.30273 4.3103 9.27903C3.33398 10.2554 3.33398 11.8271 3.33398 14.9705V26.4693C3.33398 28.9688 3.33398 30.2185 3.96983 31.0943C4.17583 31.3781 4.42532 31.6275 4.70907 31.8335C5.58497 32.4695 6.83408 32.4695 9.33233 32.4695H14.9182C17.389 32.4695 19.5162 34.2133 20.0007 36.6361V11.6361C19.5127 10.9853 19.2687 10.66 19.0023 10.3794C17.9273 9.24713 16.4891 8.52803 14.9383 8.34747C14.5541 8.30273 14.1474 8.30273 13.3338 8.30273Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M20 11.6361V36.6361C20.4845 34.2133 22.6118 32.4695 25.0825 32.4695H30.6683C33.1665 32.4695 34.4157 32.4695 35.2915 31.8335C35.5753 31.6275 35.8248 31.3781 36.0308 31.0943C36.6667 30.2185 36.6667 28.9688 36.6667 26.4693V12.4703C36.6667 11.6953 36.6667 11.3078 36.6027 10.9858C36.3397 9.66347 35.306 8.6298 33.9837 8.36678C33.6617 8.30273 33.2745 8.30273 32.5 8.30273" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round" stroke="#F97316"/>
  <path d="M20 12.4674C20 12.4674 21.2842 5.40485 28.3608 3.6782C29.715 3.3478 30.3922 3.1826 31.0293 3.68307C31.6667 4.18355 31.6667 5.0004 31.6667 6.63412V24.1342V24.1342C31.6667 25.5819 31.6667 26.3057 31.3108 26.7588C30.9548 27.212 30.0902 27.423 28.3608 27.8448C21.2842 29.5715 20 36.6342 20 36.6342" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F97316"/>
</svg>
      ),
    },
  ];

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* ─── Header: Eyebrow, Heading & Story Lead ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-sans text-[11px] sm:text-xs text-[#777777] font-semibold tracking-[0.2em] uppercase mb-3">
            THERE&apos;S MORE TO OUR STORY
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.2",
            }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight mb-3 sm:mb-4"
          >
            One Mission. Many Expressions.
          </h2>

          <p className="font-sans text-xs sm:text-[13px] lg:text-[14px] text-[#555555] max-w-xl mx-auto">
            The heart of LAB can be found in the people we serve and the
            relationships we build.
          </p>
        </motion.div>

        {/* ─── Expressions Grid ─── */}
        <div className="space-y-6 sm:space-y-8">
          {/* Row 1: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {row1Items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col"
              >
                {/* Orange Divider Bar */}
                <div className="w-full h-[2px] bg-[#FDBA74] mb-3.5" />

                <div className="flex items-start gap-3">
                  <div className="text-[#F97316] shrink-0 mt-0.5">
                    {item.icon}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        color: "#121010",
                      }}
                      className="text-[14px] sm:text-[15px] font-bold leading-snug mb-1"
                    >
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[12.5px] text-[#555555] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2: 3 columns centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[940px] mx-auto gap-6 sm:gap-8">
            {row2Items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: (idx + 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col"
              >
                {/* Orange Divider Bar */}
                <div className="w-full h-[2px] bg-[#FDBA74] mb-3.5" />

                <div className="flex items-start gap-3">
                  <div className="text-[#F97316] shrink-0 mt-0.5">
                    {item.icon}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        color: "#121010",
                      }}
                      className="text-[14px] sm:text-[15px] font-bold leading-snug mb-1"
                    >
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[12.5px] text-[#555555] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Bottom Actions ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-12 sm:mt-16"
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

export default OneMissionManyExpressionsSection;
