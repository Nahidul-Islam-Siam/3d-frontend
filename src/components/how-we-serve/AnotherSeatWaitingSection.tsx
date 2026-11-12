import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';
import FigmaButton from '@/components/common/FigmaButton';
import rightLeaf from '@/assets/icons/Group-2.png';

export interface AnotherSeatWaitingSectionProps {
  id?: string;
  className?: string;
}

const partnerPills = [
  'Churches',
  'Nonprofits',
  'Local Bakeries & Farms',
  'Community Volunteers',
  'Civic Leaders',
];

export default function AnotherSeatWaitingSection({
  id = 'another-seat-waiting',
  className = '',
}: AnotherSeatWaitingSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-14 sm:pt-20 lg:pt-36 pb-14 sm:pb-20 lg:pb-36 px-4 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      {/* ─── Wave / Artistic Background (another-seat-waiting-bg.png) ─── */}
      <div
        className="absolute inset-0 w-full h-[850px] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/another-seat-waiting-bg.png"
          alt=""
          className="w-full h-full object-fill object-center"
        />
      </div>

      {/* ─── Mid-Right Decorative Leaf Flourish (Group-2.png) ─── */}
      <img
        src={rightLeaf}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute top-[320px] sm:top-[300px] lg:top-[270px] -right-4 sm:right-0 w-36 sm:w-48 lg:w-56 opacity-85 pointer-events-none select-none z-10"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* ─── Top Row: Section Headline & Right Narrative ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-between mb-16 lg:mb-20">
          {/* Left Column: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#272624',
                lineHeight: 'normal',
              }}
              className="text-3xl sm:text-4xl lg:text-[48px] font-semibold tracking-tight max-w-xl"
            >
              There Is Always Another
              <br />
              Seat Waiting.
            </h2>
          </motion.div>

          {/* Right Column: Narrative Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center pt-2"
          >
            <p
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: '#746343',
                lineHeight: '26px',
              }}
              className="text-[15px] sm:text-[17px] lg:text-[18px] font-normal max-w-md text-left lg:text-right"
            >
              Whether you would like to prepare meals, serve alongside our volunteers, donate
              food, or partner with us in expanding our outreach, there is a place for you at the
              table.
            </p>
          </motion.div>
        </div>

        {/* ─── 3 White Action Cards (Staggered Layout + Rich Hover Interaction) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start mb-24 sm:mb-28 lg:mb-36 max-w-5xl mx-auto">
          {/* ─── Card 1: Volunteer at the Table (Down) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-0 md:mt-10 lg:mt-14"
          >
            <Link
              to="/suicide-awareness-showdown#volunteer"
              className="group flex flex-col justify-between bg-white rounded-[22px] p-6 sm:p-8 min-h-[290px] sm:min-h-[310px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.12)] border border-[#F2EDE0] hover:border-[#F97316]/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div>
                {/* Icon 1: Volunteer / Two Figures with Star */}
                <div className="w-10 h-10 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                  >
                    <path
                      d="M32.4988 13.75C35.4903 13.75 37.9154 16.1751 37.9154 19.1667C37.9154 21.2265 36.7648 23.0163 35.0719 23.9323C35.9804 24.5235 36.7248 25.3397 37.2236 26.3102C37.6061 27.0547 37.7666 27.8603 37.8421 28.7777C37.9164 29.6805 37.9154 30.7995 37.9154 32.1892V36.6667C37.9154 37.357 37.3558 37.9167 36.6654 37.9167C35.9749 37.9167 35.4154 37.357 35.4154 36.6667V32.1892C35.4154 30.758 35.4141 29.7592 35.3503 28.9827C35.2876 28.2212 35.1704 27.7838 35.0003 27.4528C34.6424 26.7563 34.0756 26.1897 33.3793 25.8317C33.0481 25.6615 32.6108 25.5445 31.8493 25.4818C31.0728 25.4178 30.0741 25.4167 28.6429 25.4167C27.9609 25.4167 27.4358 25.4237 26.9241 25.3125C26.5049 25.2213 26.1006 25.0717 25.7229 24.8682C25.2621 24.6197 24.8673 24.2722 24.3493 23.8282L20.5309 20.555C20.4268 20.4658 20.2938 20.4167 20.1566 20.4167C19.8393 20.4168 19.5823 20.674 19.5821 20.9912V21.1898C19.5821 21.3165 19.6113 21.4188 19.6519 21.4942C20.5096 23.0755 22.2171 25.5543 24.5006 27.6417C25.3033 28.3752 25.9453 28.9602 26.4179 29.4433C26.8781 29.9138 27.2888 30.3953 27.5264 30.9342C27.7511 31.4442 27.8364 31.9785 27.8763 32.544C27.9154 33.0997 27.9154 33.7833 27.9154 34.6077V36.6667C27.9154 37.357 27.3558 37.9167 26.6654 37.9167C25.9749 37.9167 25.4154 37.357 25.4154 36.6667V34.6077C25.4154 33.7475 25.4144 33.167 25.3828 32.7197C25.3519 32.2827 25.2963 32.074 25.2379 31.9417C25.1921 31.838 25.0546 31.6247 24.6309 31.1913C24.2188 30.7702 23.6379 30.2398 22.8128 29.4857C20.2909 27.1805 18.4203 24.4693 17.4531 22.6855C17.1948 22.209 17.0821 21.6905 17.0821 21.1898V20.9912C17.0823 19.2933 18.4586 17.9168 20.1566 17.9167C20.8906 17.9167 21.6013 18.1795 22.1586 18.6572L25.9769 21.9303C26.5758 22.4437 26.7398 22.5762 26.9094 22.6677C27.0811 22.7602 27.2658 22.828 27.4564 22.8695C27.6408 22.9095 27.8469 22.9148 28.5958 22.915C27.6606 21.9417 27.0821 20.623 27.0821 19.1667C27.0821 16.1751 29.5071 13.75 32.4988 13.75ZM7.4987 13.75C10.4902 13.75 12.9154 16.1751 12.9154 19.1667C12.9154 20.6227 12.3363 21.94 11.4017 22.9133C12.1506 22.913 12.3566 22.9062 12.541 22.8662C12.7315 22.8248 12.9163 22.757 13.0879 22.6643C13.1607 22.625 13.2475 22.5683 13.3923 22.4545C13.9347 22.028 14.7216 22.1222 15.1484 22.6643C15.575 23.2068 15.4807 23.9937 14.9385 24.4205C14.7265 24.5873 14.5159 24.7347 14.2744 24.8648C13.8969 25.0685 13.4923 25.218 13.0732 25.3092C12.5617 25.4205 12.0364 25.415 11.3545 25.415C9.9234 25.415 8.9246 25.4147 8.1481 25.4785C7.38682 25.5412 6.94923 25.6585 6.61817 25.8285C5.92165 26.1863 5.355 26.7547 4.99707 27.4512C4.82702 27.7822 4.7098 28.2198 4.64713 28.9812C4.58327 29.7575 4.58203 30.7552 4.58203 32.1858V36.665C4.58167 37.355 4.02213 37.915 3.33203 37.915C2.64188 37.915 2.08238 37.3552 2.08203 36.665V32.1858C2.08203 30.7967 2.08102 29.6787 2.15527 28.776C2.23078 27.8587 2.39128 27.053 2.77375 26.3087C3.27212 25.3388 4.01497 24.522 4.9222 23.9307C3.23115 23.0142 2.08203 21.2252 2.08203 19.1667C2.08203 16.1751 4.50715 13.75 7.4987 13.75ZM15.8044 27.3518C16.3048 26.8768 17.0964 26.8973 17.5719 27.3975C18.0473 27.8978 18.0264 28.6895 17.5264 29.165C17.4139 29.272 17.2999 29.3785 17.1846 29.484C16.3595 30.2382 15.7786 30.7685 15.3665 31.1898C14.9427 31.6232 14.8052 31.8365 14.7594 31.9402C14.7012 32.0723 14.6455 32.281 14.6146 32.7182C14.583 33.1653 14.582 33.7462 14.582 34.6062V36.665C14.5817 37.355 14.0221 37.915 13.332 37.915C12.6419 37.915 12.0824 37.3552 12.082 36.665V34.6062C12.082 33.7818 12.0819 33.098 12.1211 32.5423C12.161 31.977 12.2465 31.4423 12.471 30.9327C12.7086 30.3938 13.1194 29.912 13.5794 29.4417C14.0522 28.9585 14.694 28.3722 15.4967 27.6383C15.6001 27.5438 15.7032 27.448 15.8044 27.3518ZM7.4987 16.25C5.88787 16.25 4.58203 17.5558 4.58203 19.1667C4.58203 20.7775 5.88787 22.0833 7.4987 22.0833C9.10952 22.0833 10.4154 20.7775 10.4154 19.1667C10.4154 17.5558 9.10952 16.25 7.4987 16.25ZM32.4988 16.25C30.8879 16.25 29.5821 17.5558 29.5821 19.1667C29.5821 20.7775 30.8879 22.0833 32.4988 22.0833C34.1096 22.0833 35.4154 20.7775 35.4154 19.1667C35.4154 17.5558 34.1096 16.25 32.4988 16.25ZM19.9988 2.08334C20.5368 2.08334 21.0151 2.42741 21.1853 2.93784L21.9079 5.10743C22.1153 5.72906 22.6029 6.21676 23.2246 6.42416L25.3943 7.14683C25.9046 7.31696 26.2488 7.79531 26.2488 8.33334C26.2488 8.87138 25.9046 9.34973 25.3943 9.51986L23.2246 10.2425C22.6029 10.4499 22.1153 10.9376 21.9079 11.5593L21.1853 13.7288C21.0151 14.2393 20.5368 14.5833 19.9988 14.5833C19.4606 14.5833 18.9823 14.2393 18.8121 13.7288L18.0894 11.5593C17.8821 10.9376 17.3944 10.4499 16.7728 10.2425L14.6032 9.51986C14.0928 9.34973 13.7487 8.87138 13.7487 8.33334C13.7487 7.79531 14.0928 7.31696 14.6032 7.14683L16.7728 6.42416C17.3944 6.21676 17.8821 5.72906 18.0894 5.10743L18.8121 2.93784L18.8903 2.75554C19.1029 2.34729 19.5276 2.08334 19.9988 2.08334Z"
                      fill="#F97316"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl sm:text-[22px] font-semibold text-[#E06D1A] mb-3 leading-snug group-hover:text-[#F97316] transition-colors"
                >
                  Volunteer at the Table
                </h3>

                {/* Description */}
                <p
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  className="text-[13px] sm:text-[14px] text-[#746343] font-normal leading-relaxed mb-6"
                >
                  Prepare meals, welcome guests at the threshold, brew morning coffee, or sit
                  down and share a conversation.
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#E06D1A] group-hover:text-[#F97316] transition-colors">
                  Volunteer With Us
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ─── Card 2: Sponsor a Community Meal (Up / Elevated) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-0"
          >
            <Link
              to="/contact#donate"
              className="group flex flex-col justify-between bg-white rounded-[22px] p-6 sm:p-8 min-h-[290px] sm:min-h-[310px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.12)] border border-[#F2EDE0] hover:border-[#F97316]/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div>
                {/* Icon 2: Sponsor / Meal Feast Table */}
                <div className="w-10 h-10 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                  >
                    <path
                      d="M12.1638 20.4H6.23214C5.67881 20.4 5.17381 20.305 4.73047 20.1183L4.72214 20.115C4.71214 20.1117 4.70214 20.1067 4.69381 20.1017C3.33047 19.4767 2.66381 18.6467 2.38047 18.1917C1.95381 17.545 1.97714 16.7 2.44214 16.0733C3.88547 14.0967 7.00047 12.915 9.18214 12.915H9.19881C11.3805 12.915 14.4955 14.0967 15.9388 16.0733C16.3905 16.6833 16.4271 17.5233 16.0305 18.17C16.0271 18.1767 16.0221 18.1833 16.0171 18.19L16.0121 18.1983C15.6521 18.75 14.9555 19.5283 13.6788 20.105L13.6721 20.1083L13.6638 20.1117C13.6588 20.1133 13.6538 20.115 13.6488 20.1183C13.2055 20.305 12.7055 20.4 12.1638 20.4ZM26.3471 35.9683C26.3421 35.965 26.3371 35.9633 26.3321 35.9617L26.3238 35.9567L26.3171 35.955C25.3271 35.5083 24.5471 34.8733 23.9988 34.07C23.9871 34.0533 23.9771 34.0383 23.9671 34.0217C23.5705 33.3767 23.6071 32.535 24.0588 31.925C25.5005 29.9467 28.6171 28.7667 30.7988 28.7667C32.9805 28.7667 36.1155 29.95 37.5421 31.93C38.0121 32.5667 38.0388 33.415 37.6105 34.055C37.3188 34.5083 36.6371 35.3417 35.3055 35.9533C35.2938 35.9583 35.2805 35.965 35.2688 35.97C34.8255 36.1567 34.3205 36.2517 33.7671 36.2517L33.7655 36.25H27.8321C27.2905 36.25 26.7905 36.155 26.3471 35.9683ZM19.9638 34.6C14.8205 34.6 10.7588 34.6 8.94214 32.7617C7.11547 30.9333 7.11547 29.0917 7.11547 24.1667C7.11547 23.7333 7.33881 23.33 7.70714 23.1033C8.07714 22.875 8.53714 22.855 8.92381 23.05L12.2405 24.7167C12.8571 25.0267 13.1071 25.7783 12.7971 26.395C12.4855 27.0117 11.7338 27.26 11.1171 26.95L9.62047 26.1967C9.65214 29.235 9.82214 30.1083 10.7138 30.9983C11.8005 32.0983 15.9488 32.0983 19.9621 32.0983H19.9638C20.6521 32.0983 21.2138 32.6583 21.2138 33.3483C21.2138 34.0383 20.6521 34.6 19.9638 34.6ZM30.1871 16.95L26.8705 15.2833C26.2538 14.9733 26.0055 14.2217 26.3155 13.605C26.6255 12.9883 27.3771 12.74 27.9938 13.05L29.4921 13.8033C29.4605 10.7783 29.2888 9.90833 28.3988 9.01833C27.3105 7.91833 23.1621 7.91833 19.1488 7.91833C18.4588 7.91833 17.8988 7.35833 17.8988 6.66833C17.8988 5.97833 18.4588 5.41833 19.1488 5.41833C24.2921 5.41833 28.3538 5.41833 30.1705 7.25667C31.9988 9.085 31.9988 10.9233 31.9988 15.835C31.9988 16.2683 31.7738 16.6717 31.4055 16.8983C31.2055 17.0217 30.9771 17.085 30.7488 17.085V17.0833C30.5571 17.0833 30.3638 17.04 30.1871 16.95ZM27.0171 23.3333C27.0171 21.265 28.6921 19.5833 30.7505 19.5833C32.8088 19.5833 34.4838 21.265 34.4838 23.3333C34.4838 25.4017 32.8088 27.0833 30.7505 27.0833C28.6921 27.0833 27.0171 25.4017 27.0171 23.3333ZM5.46381 7.5C5.46381 5.43167 7.13881 3.75 9.19714 3.75C11.2555 3.75 12.9305 5.43167 12.9305 7.5C12.9305 9.56833 11.2555 11.25 9.19714 11.25C7.13881 11.25 5.46381 9.56833 5.46381 7.5ZM5.71547 17.82C5.84881 17.8733 6.02214 17.9 6.23214 17.9H12.1655C12.3638 17.9 12.5371 17.8717 12.6688 17.82C13.1021 17.6217 13.4055 17.4017 13.6155 17.1967C12.5755 16.1567 10.5471 15.4167 9.19881 15.4167H9.18214C7.83714 15.4167 5.81047 16.155 4.77047 17.1933C4.96047 17.3783 5.26047 17.6083 5.71547 17.82ZM33.7655 33.75C33.9755 33.75 34.1488 33.7233 34.2821 33.6717C34.7205 33.4667 35.0205 33.235 35.2171 33.045C34.1888 32.0067 32.1555 31.2667 30.7988 31.2667C29.4421 31.2667 27.4271 32.005 26.3855 33.0433C26.6371 33.2883 26.9538 33.4983 27.3288 33.67C27.4605 33.7233 27.6338 33.75 27.8321 33.75H33.7655ZM29.5171 23.3333C29.5171 24.035 30.0588 24.5833 30.7505 24.5833C31.4421 24.5833 31.9838 24.0233 31.9838 23.3333C31.9838 22.6433 31.4305 22.0833 30.7505 22.0833C30.0588 22.0833 29.5171 22.6317 29.5171 23.3333ZM7.96381 7.5C7.96381 8.19 8.51714 8.75 9.19714 8.75C9.87714 8.75 10.4305 8.19 10.4305 7.5C10.4305 6.81 9.87714 6.25 9.19714 6.25C8.51714 6.25 7.96381 6.81 7.96381 7.5Z"
                      fill="#F97316"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl sm:text-[22px] font-semibold text-[#E06D1A] mb-3 leading-snug group-hover:text-[#F97316] transition-colors"
                >
                  Sponsor a Community Meal
                </h3>

                {/* Description */}
                <p
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  className="text-[13px] sm:text-[14px] text-[#746343] font-normal leading-relaxed mb-6"
                >
                  Provide the funds for an entire morning gathering, local farm ingredients, and
                  artisan bread for 120 neighbors.
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#E06D1A] group-hover:text-[#F97316] transition-colors">
                  Give Hope / Donate
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ─── Card 3: Partner With Us (Down) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-0 md:mt-10 lg:mt-14"
          >
            <Link
              to="/contact#partner"
              className="group flex flex-col justify-between bg-white rounded-[22px] p-6 sm:p-8 min-h-[290px] sm:min-h-[310px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.12)] border border-[#F2EDE0] hover:border-[#F97316]/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div>
                {/* Icon 3: Partnership / Handshake */}
                <div className="w-10 h-10 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <HeartHandshake
                    className="w-10 h-10 text-[#F97316]"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl sm:text-[22px] font-semibold text-[#E06D1A] mb-3 leading-snug group-hover:text-[#F97316] transition-colors"
                >
                  Partner With Us
                </h3>

                {/* Description */}
                <p
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  className="text-[13px] sm:text-[14px] text-[#746343] font-normal leading-relaxed mb-6"
                >
                  Bring your church, local bakery, culinary team, or neighborhood organization
                  into the collective coalition.
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#E06D1A] group-hover:text-[#F97316] transition-colors">
                  Become a Community Partner
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ─── Bottom CTA Banner: No Single Organization Heals A City Alone ─── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto rounded-[32px] sm:rounded-[40px] px-4 sm:px-10 lg:px-16 pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14 lg:pb-16 shadow-[0_24px_64px_rgba(249,115,22,0.18)] overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, #FD7646 0%, #FA7545 40%, #F57242 70%, #EA6635 100%)',
          }}
        >
          {/* Subtle diffused radiant white glow at bottom-center matching Figma */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 85%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Title */}
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-white text-center leading-[1.2] tracking-tight mb-4 sm:mb-5 max-w-2xl"
            >
              No Single Organization Heals
              <br />
              A City Alone
            </h3>

            {/* Subtitle */}
            <p
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="text-xs sm:text-[14px] text-white/95 font-normal text-center leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10"
            >
              We believe lasting change happens when churches, nonprofits, businesses,
              volunteers, and community partners come together with one shared purpose: loving
              people well.
            </p>

            {/* Partner Pills Row with '+' separators */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto mb-10 sm:mb-12">
              {partnerPills.map((pill, idx) => (
                <React.Fragment key={pill}>
                  <span className="px-3.5 sm:px-4 py-1.5 rounded-full border border-white/60 text-white text-[11.5px] sm:text-[12.5px] font-medium tracking-wide bg-white/10 backdrop-blur-sm shadow-sm select-none hover:bg-white/20 transition-colors">
                    {pill}
                  </span>
                  {idx < partnerPills.length - 1 && (
                    <span className="text-white/70 text-xs sm:text-sm font-light select-none">
                      +
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Navigation Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto">
              <FigmaButton
                to="/#doors"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
              >
                Return To Hallway Of Hope
              </FigmaButton>

              <FigmaButton
                to="/movement"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
              >
                Next Door
              </FigmaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
