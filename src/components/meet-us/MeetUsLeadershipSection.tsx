import { motion } from 'framer-motion';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';

interface LeaderData {
  id: string;
  name: string;
  role: string;
  tagline: string;
  initials: string;
  bio: string[];
  quote: string;
  quoteAuthor: string;
  layout: 'card-left' | 'card-right';
}

const leaders: LeaderData[] = [
  {
    id: 'celeste-hudson',
    name: 'Celeste Hudson',
    role: 'Founder | Live Achieve Believe, Inc.',
    tagline: 'A Heart for People. A Life of Purpose.',
    initials: 'CH',
    layout: 'card-left',
    bio: [
      'Celeste Hudson has traveled many roads, from foreign missionary service to Wall Street, where she worked as a broker, to establishing her own commodities brokerage firm and building three business ventures, including Live Achieve Believe, Inc.',
      'Yet her greatest accomplishment cannot be measured by professional success. It is found in her unwavering belief in the value of people.',
      'Celeste’s life has been shaped by faith, resilience, courage, and an enduring willingness to grow. She understands that strength is not born from perfection, but often from the imperfections, challenges, and unexpected turns that teach us humility, deepen our compassion, and strengthen our foundation.',
      'Through LAB, Celeste brings together her entrepreneurial spirit and her heart for humanity, encouraging people to look beyond circumstances, embrace possibilities, and turn compassion into meaningful action. She continues to approach life as a journey of discovery, believing that growth is not simply about how far we travel, but how deeply we come to understand what truly matters.',
    ],
    quote:
      '“We shall not cease from exploration\nAnd the end of all our exploring\nWill be to arrive where we started\nAnd know the place for the first time.”',
    quoteAuthor: '— T. S. Eliot, Little Gidding',
  },
  {
    id: 'aniah-danielle',
    name: 'Aniah Danielle',
    role: 'Chief Operating Officer | Live Achieve Believe, Inc.',
    tagline: 'A Heart for Healing. A Passion for Empowerment.',
    initials: 'AD',
    layout: 'card-right',
    bio: [
      'Aniah Danielle believes that true success begins with a healthy mind, a strong foundation, and the confidence to embrace life’s possibilities.',
      'Her passion for mental-health advocacy grew from a deeply personal experience: the loss of a close friend to suicide during her senior year of high school. That experience strengthened her commitment to helping others navigate challenges with compassion, resilience, and hope.',
      'Currently pursuing a degree in Clinical Psychology, Aniah brings both curiosity and purpose to her work. As an educator of young children and a facilitator with the LEADS youth-development program, she is dedicated to creating environments where children feel safe, valued, encouraged, and empowered to grow.',
      'Her experiences advocating for children and families navigating complex legal and mental-health systems have deepened her understanding of patience, empathy, and meaningful support. As a wife, educator, student, and nonprofit leader, she strives to encourage others to discover their strengths and pursue their goals with emotional wellness, resilience, and confidence.',
    ],
    quote:
      '“My mission in life is not merely to survive but to thrive; and to do so with some passion, some compassion, some humor and some style.”',
    quoteAuthor: '— Maya Angelou',
  },
  {
    id: 'uzziah-townsley',
    name: 'Uzziah Townsley',
    role: 'Director of Operations | Live Achieve Believe, Inc.',
    tagline: 'Building Possibilities. Creating Pathways.',
    initials: 'UT',
    layout: 'card-left',
    bio: [
      'Uzziah Townsley believes that building a better future requires more than vision. It takes determination, practical experience, and a genuine desire to make a difference in the lives of others.',
      'With aspirations of pursuing a degree in Mechanical Engineering at the University of South Florida, Uzziah is actively preparing for the next chapter of his educational journey. Through apprenticeships with construction companies, he has gained hands-on exposure to different aspects of engineering, strengthening his technical interests and appreciation for how things work.',
      'As Director of Operations for Live Achieve Believe, Inc., Uzziah has supported fundraising initiatives, prepared and served meals to people experiencing homelessness, and contributed to the organization’s creative work. During LAB’s first Suicide Awareness Showdown, he ran stage operations while working directly with the stage manager.',
      'He approaches challenges with curiosity, determination, and a willingness to learn by doing. For Uzziah, engineering and humanitarian service are complementary expressions of the same purpose: creating solutions that improve lives and making sure those solutions serve the people who need them.',
    ],
    quote:
      '“The mechanical engineer builds the bridge, the humanitarian ensures that everyone can safely cross it, my job is to do both.”',
    quoteAuthor: '— Uzziah Townsley',
  },
];

export function MeetUsLeadershipSection({
  id = 'meet-us-leadership',
  className = '',
}: {
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      {/* ─── Top Section Header ─── */}
      <div className="w-full max-w-4xl mx-auto text-center mb-16 sm:mb-20 lg:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-[13px] font-sans font-medium text-[#746343] block mb-3"
        >
          Meet Us
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#18181B] leading-[1.16] tracking-tight mb-4 sm:mb-5"
        >
          The People Behind Live Achieve
          <br />
          Believe, Inc.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-[#746343] font-sans font-normal leading-relaxed max-w-2xl mx-auto"
        >
          Different experiences. Different strengths. One shared belief: People Matter.
        </motion.p>
      </div>

      {/* ─── Leadership Profiles Stack ─── */}
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
        {leaders.map((leader, index) => {
          const isCardLeft = leader.layout === 'card-left';

          return (
            <div key={leader.id}>
              {/* Leader Item Grid */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
                {/* Decorative Side Leaves on Row */}
                <img
                  src={leftLeaf}
                  alt=""
                  aria-hidden="true"
                  className="absolute -left-6 sm:-left-10 bottom-6 sm:bottom-10 w-24 sm:w-32 lg:w-36 opacity-75 pointer-events-none select-none z-0"
                />
                <img
                  src={rightLeaf}
                  alt=""
                  aria-hidden="true"
                  className="absolute -right-6 sm:-right-10 bottom-6 sm:bottom-10 w-24 sm:w-32 lg:w-36 opacity-75 pointer-events-none select-none z-0"
                />

                {/* ─── Monogram Card Column ─── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-5 flex justify-center items-center relative z-10 ${
                    isCardLeft ? 'order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  {/* Warm Cream Outer Container with Rounded Corners */}
                  <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] aspect-square rounded-[28px] sm:rounded-[36px] bg-[#F7EBD2]/80 border border-[#E9DAC0] p-6 sm:p-8 flex items-center justify-center shadow-[0_12px_36px_rgba(44,36,29,0.06)] hover:shadow-[0_16px_44px_rgba(249,115,22,0.12)] transition-all duration-300">
                    {/* Orange Square with White Serif Monogram */}
                    <div className="w-full h-full rounded-[22px] sm:rounded-[26px] bg-[#F97316] flex items-center justify-center shadow-[0_8px_24px_rgba(249,115,22,0.32)]">
                      <span
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-white tracking-tight select-none"
                      >
                        {leader.initials}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ─── Narrative Biography Column ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-7 flex flex-col justify-center text-left relative z-10 ${
                    isCardLeft ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  {/* Name */}
                  <h2
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#18181B] tracking-tight leading-tight mb-2"
                  >
                    {leader.name}
                  </h2>

                  {/* Title / Role */}
                  <p className="font-sans text-xs sm:text-[13px] text-[#746343] font-medium mb-4 sm:mb-5">
                    {leader.role}
                  </p>

                  {/* Tagline / Subtitle */}
                  <p
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="italic text-sm sm:text-base font-semibold text-[#272624] mb-3.5"
                  >
                    {leader.tagline}
                  </p>

                  {/* Narrative Paragraphs */}
                  <div className="space-y-3 font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#272624] leading-relaxed mb-6 sm:mb-8">
                    {leader.bio.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Inspirational Quote Card */}
                  <div className="pt-2">
                    <p
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="italic text-xs sm:text-[13.5px] text-[#272624] leading-relaxed whitespace-pre-line"
                    >
                      {leader.quote}
                    </p>
                    <span className="font-sans text-[11.5px] text-[#746343] mt-2 block">
                      {leader.quoteAuthor}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Subtle Divider Line Between Leaders */}
              {index < leaders.length - 1 && (
                <div className="w-full border-t border-[#DFCCA7]/60 mt-16 sm:mt-20 lg:mt-24" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MeetUsLeadershipSection;
