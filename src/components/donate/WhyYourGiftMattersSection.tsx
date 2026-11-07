import { useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import Coin3DCanvas from './Coin3DCanvas';
import story1 from '@/assets/donate/story-1-living-room.png';
import story2 from '@/assets/donate/story-2-woodworking.png';
import story3 from '@/assets/donate/story-3-robotics.png';
import './coin-scrollytelling.css';

const stories = [
  {
    title: 'Creating spaces where people feel welcomed and seen.',
    narrative: 'Isolation is the quietest crisis of our neighborhoods. Your gifts sustain open, unpoliced living rooms where unhoused neighbors, single parents, and young creatives gather without judgment or prerequisites.',
    image: story1, alt: 'Neighbors gathered together in a welcoming community living room', side: 'Heads',
  },
  {
    title: 'Coming alongside people when they need someone to believe in them.',
    narrative: 'Mentorship is consistency. Your generosity helps mentors walk shoulder to shoulder with people through craft, trades, and the work of rebuilding their lives.',
    image: story2, alt: 'A woodworking mentor and apprentice working together in a workshop', side: 'The edge',
  },
  {
    title: 'Helping make the next chapter possible.',
    narrative: 'Tools, apprenticeships, studio time, and licensing funds. When a community member determines their pathway forward, your gift ensures that poverty of capital does not extinguish courage.',
    image: story3, alt: 'Young people building a robotics project together', side: 'Tails',
  },
];

const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (callback: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const getMotionPreference = () => window.matchMedia(motionQuery).matches;

/** Overlapping ranges provide a true scroll-scrubbed dissolve, including in reverse. */
function useStoryOpacity(progress: MotionValue<number>, index: number) {
  const ranges = [[0, 0.28, 0.38, 1], [0.28, 0.38, 0.61, 0.71], [0, 0.61, 0.71, 1]];
  const values = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1]];
  return useTransform(progress, ranges[index], values[index]);
}

function StoryLayer({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const opacity = useStoryOpacity(progress, index);
  const y = useTransform(opacity, [0, 1], [18, 0]);
  return <motion.article style={{ opacity, y }} className="gift-story-layer" aria-hidden="true">
    <p className="gift-story-side">{stories[index].side}</p>
    <h3>{stories[index].title}</h3>
    <p className="gift-narrative">{stories[index].narrative}</p>
  </motion.article>;
}

function PreviewLayer({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const opacity = useStoryOpacity(progress, index);
  return <motion.img style={{ opacity }} src={stories[index].image} alt="" aria-hidden="true" decoding="async" />;
}

function Step({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const opacity = useStoryOpacity(progress, index);
  return <motion.span style={{ opacity }} className="gift-step">[ {index + 1} / 3 ]</motion.span>;
}

export default function WhyYourGiftMattersSection() {
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotionPreference, () => true);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothed = useSpring(scrollYProgress, { stiffness: 95, damping: 28, restDelta: 0.0001 });
  const staticProgress = useMotionValue(0);
  const progress = reducedMotion ? staticProgress : smoothed;
  useEffect(() => {
    progressRef.current = progress.get();
    return progress.on('change', value => { progressRef.current = value; });
  }, [progress]);

  return (
    <section ref={containerRef} className={`gift-scroll ${reducedMotion ? 'gift-scroll-reduced' : ''}`} aria-labelledby="gift-title">
      <div className="gift-stage">
        <header className="gift-header">
          <h2 id="gift-title">WHY YOUR GIFT<br />MATTERS</h2>
          <p>Your generosity helps create moments of hope, belonging, and new beginnings. Here is what happens when we show up.</p>
        </header>

        <div className="gift-main">
          <div className="gift-coin-wrap">
            <div className="gift-coin-halo" aria-hidden="true" />
            {!reducedMotion && <Coin3DCanvas progressRef={progressRef} className="gift-coin" />}
          </div>
          <div className="gift-stories">
            {stories.map((story, index) => <StoryLayer key={story.side} index={index} progress={progress} />)}
          </div>
        </div>

        <footer className="gift-media-bar" aria-hidden="true">
          <div className="gift-category">STORIES OF HOPE<span>One gift. A lasting impact.</span></div>
          <div className="gift-timeline">
            <div className="gift-step-wrap">{stories.map((story, index) => <Step key={story.side} index={index} progress={progress} />)}</div>
            <div className="gift-track"><motion.div style={{ scaleX: progress }} /></div>
            <span className="gift-scroll-hint">Scroll to discover</span>
          </div>
          <div className="gift-preview">{stories.map((story, index) => <PreviewLayer key={story.side} index={index} progress={progress} />)}</div>
        </footer>
      </div>

      {/* All three narratives remain available without announcing every scroll tick. */}
      <div className={reducedMotion ? 'gift-static-stories' : 'sr-only'}>
        {stories.map(story => <article key={story.side}>
          <img src={story.image} alt={story.alt} loading="lazy" />
          <div><h3>{story.title}</h3><p>{story.narrative}</p></div>
        </article>)}
      </div>
    </section>
  );
}
