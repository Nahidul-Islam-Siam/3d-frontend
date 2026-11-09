import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Footprints, Heart, Key, Home, Sparkles } from 'lucide-react';
import Seo from '@/components/Seo';
import WelcomeHomeHero from '@/components/how-we-serve/welcome-home/WelcomeHomeHero';
import WelcomeHomeTitleStage from '@/components/how-we-serve/welcome-home/WelcomeHomeTitleStage';
import HopeBeginsWithKeySection from '@/components/how-we-serve/welcome-home/HopeBeginsWithKeySection';
import JourneyHomeSection from '@/components/how-we-serve/welcome-home/JourneyHomeSection';
import ServingCommunityTogetherSection from '@/components/how-we-serve/ServingCommunityTogetherSection';

import housePhoto1 from '@/assets/how-we-serve/welcome-home/image.png';
import housePhoto2 from '@/assets/how-we-serve/welcome-home/image copy 2.png';
import housePhoto3 from '@/assets/how-we-serve/welcome-home/image copy 3.png';

export default function WelcomeHomePage() {
  const titleStageRef = useRef<HTMLDivElement | null>(null);

  const handleScrollClick = () => {
    titleStageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const feelings = [
    { title: "Appreciated", icon: Heart, desc: "Recognizing sacrifice that often went unseen" },
    { title: "Honored", icon: Shield, desc: "Dignified respect with zero staged pity" },
    { title: "Safe", icon: Key, desc: "A private sanctuary behind a locked front door" },
    { title: "Hopeful", icon: Sparkles, desc: "A clean pantry and peaceful place to sleep" },
    { title: "Home", icon: Home, desc: "Not just four walls, but a real community" },
  ];

  return (
    <>
      <Seo 
        title="Welcome Home — Live Achieve Believe" 
        description="Sometimes hope begins with a key. Honoring our veterans and families with fully furnished housing, essential moving assistance, and dignified community support." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white">
        {/* ─── 1. FULLSCREEN PORCH VIDEO HERO (Matches User Screenshot 1:1) ─── */}
        <WelcomeHomeHero onScrollClick={handleScrollClick} />

        {/* ─── 2. THEATRICAL TITLE STAGE (Matches User Screenshot 1:1) ─── */}
        <div ref={titleStageRef}>
          <WelcomeHomeTitleStage />
        </div>

        {/* ─── 3. SOMETIMES HOPE BEGINS WITH A KEY (Matches User Screenshot 1:1) ─── */}
        <HopeBeginsWithKeySection />

        {/* ─── 4. THE JOURNEY HOME (Matches User Screenshot 1:1) ─── */}
        <JourneyHomeSection />

        {/* ─── 3. CORE NARRATIVE: HONOR & RESTORATION ─── */}
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c89d5c]/15 border border-[#c89d5c]/30 text-[#8f6629] text-xs font-semibold uppercase tracking-widest">
                <Key className="w-3.5 h-3.5" /> Door 4: Welcome Home
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1c140d]">
                Honor. Restoration. New Beginnings.
              </h2>

              <p className="text-base sm:text-lg text-[#554637] font-serif leading-relaxed">
                A home is more than four walls and a roof. It is where healing has room to take root. Where birthdays are celebrated, coffee is shared, and tomorrow begins to feel possible.
              </p>

              <p className="text-sm sm:text-base text-[#6f5e4e] leading-relaxed">
                When a veteran transitions back to civilian life, the hardest obstacle is often finding a safe, furnished, and stable foundation. We don&apos;t just hand over keys to an empty apartment—we furnish the home completely, stock the pantry, and wrap every hero in a compassionate community.
              </p>
            </div>

            {/* Photo Collage of Real Homes Furnished */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src={housePhoto1} 
                  alt="Fully furnished veteran home" 
                  className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-lg border border-[#e4d7c0]" 
                />
                <img 
                  src={housePhoto2} 
                  alt="Community moving assistance" 
                  className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-lg border border-[#e4d7c0]" 
                />
              </div>
              <div className="pt-8">
                <img 
                  src={housePhoto3} 
                  alt="Warm prepared sanctuary" 
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-lg border border-[#e4d7c0]" 
                />
              </div>
            </div>
          </div>

          {/* ─── 3. 5 CORE FEELINGS WE CULTIVATE ─── */}
          <div className="rounded-3xl bg-[#1c130d] text-stone-200 p-8 sm:p-14 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest font-bold text-[#dfb978]">
                Dignity & Care
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white mt-2">
                What We Hope Every Veteran Feels
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-3 font-serif italic">
                From the moment the key turns in the lock, the atmosphere of respect speaks louder than words.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {feelings.map((f) => {
                const IconComponent = f.icon;
                return (
                  <div
                    key={f.title}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:border-[#dfb978]/40 transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#dfb978]/15 text-[#dfb978] flex items-center justify-center mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      {f.title}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── 4. HANDWRITTEN WELCOME NOTE CARD ─── */}
          <div className="rounded-3xl bg-[#F4EBD9] border-2 border-[#DBCAB0] p-8 sm:p-14 text-[#2b1f17] shadow-xl max-w-3xl mx-auto relative font-serif">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#8f6629] block mb-3 font-sans">
              Placed on Every Kitchen Counter Upon Move-In
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif mb-4 text-[#1a120b]">
              Dear Hero, Welcome Home.
            </h3>
            <p className="text-sm sm:text-base leading-relaxed mb-4 text-[#443324]">
              The bed is made. The refrigerator is stocked. The keys in your hand are a testament to your endurance. You fought for our country&apos;s peace; now it is our deepest privilege to offer you a sanctuary of peace in return.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-6 text-[#443324]">
              Whenever you walk through this front door, remember: you are not forgotten. You are respected. You are home.
            </p>
            <p className="text-xs font-sans uppercase tracking-widest text-[#8f6629] font-bold">
              — With humble gratitude, your Live Achieve Believe Family
            </p>
          </div>
        </div>

        {/* ─── 5. COMMUNITY PARTNERS & NETWORK ─── */}
        <ServingCommunityTogetherSection id="community-partners" />

        {/* ─── 6. CALL TO ACTION & RETURN TO HALLWAY ─── */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
          <p className="font-serif text-xl sm:text-2xl text-[#8f6629] italic font-medium">
            &ldquo;A key opens a house. Honor, gratitude, and community help make it a home.&rdquo;
          </p>

          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c140d]">
            Help Us Welcome The Next Hero Home
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/movement"
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#140d08] bg-[#dfb978] hover:bg-[#c89d5c] transition-all shadow-md"
            >
              Become a Housing Partner
            </Link>
            <Link
              to="/donate"
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#1c140d] hover:bg-black transition-all shadow-md"
            >
              Furnish a Veteran&apos;s Room
            </Link>
            <Link
              to="/how-we-serve"
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#554637] border border-[#c89d5c]/40 hover:bg-[#c89d5c]/10 transition-all flex items-center gap-2"
            >
              <Footprints className="w-4 h-4" />
              <span>Return to Hallway</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

