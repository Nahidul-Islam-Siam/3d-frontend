import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartHandshake, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Send, 
  Users, 
  Mic, 
  Award, 
  Heart, 
  Phone
} from 'lucide-react';
import Seo from '@/components/Seo';
import auditionBanner from '@/assets/welcome/audition_banner.png';
import movementService from '@/lib/api/services/movement.service';

type TabType = 'volunteer' | 'audition' | 'sponsor' | 'donate';

const SQUARE_DONATION_URL = 'https://square.link/u/D9O5AJW0';

export default function SuicideAwarenessShowdownPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('audition');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string>('');

  // Sync deep link hash or ?tab= query to active tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramTab = params.get('tab') || location.hash.replace('#', '');
    if (
      paramTab === 'volunteer' ||
      paramTab === 'audition' ||
      paramTab === 'sponsor' ||
      paramTab === 'donate'
    ) {
      setActiveTab(paramTab);
      const formsEl = document.getElementById('forms-section');
      if (formsEl) {
        setTimeout(() => formsEl.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  }, [location.hash, location.search]);

  // Form States
  const [volunteerData, setVolunteerData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'event-operations',
    availability: 'weekends',
    message: '',
  });

  const [auditionData, setAuditionData] = useState({
    name: '',
    email: '',
    phone: '',
    ageGroup: '18-29',
    talentType: 'acting' as 'acting' | 'singing' | 'dance' | 'spoken-word' | 'instrumental',
    mediaLink: '',
    experience: '',
    confirmRehearsals: true,
  });

  const [sponsorData, setSponsorData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    tier: 'gold' as 'presenting' | 'platinum' | 'gold' | 'community' | 'custom',
    notes: '',
  });

  const [donateData, setDonateData] = useState({
    amount: '100',
    customAmount: '',
    donorName: '',
    email: '',
    dedication: '',
  });

  const extractError = (err: unknown): string => {
    if (err && typeof err === 'object' && 'response' in err) {
      const resp = (err as { response?: { data?: { message?: string } } }).response;
      if (resp?.data?.message) return resp.data.message;
    }
    if (err instanceof Error && err.message) return err.message;
    return 'Unable to submit right now. Please try again.';
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await movementService.applyVolunteer({
        full_name: volunteerData.name,
        email: volunteerData.email,
        phone: volunteerData.phone,
        interests: [volunteerData.role, 'Suicide Awareness Showdown'],
        availability: volunteerData.availability,
        bio: volunteerData.message,
      });
      setSubmittedMessage('Thank you for volunteering! Our production team will contact you shortly with schedules and orientation details.');
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(extractError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuditionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await movementService.applyAudition(auditionData);
      setSubmittedMessage('Your audition registration has been received! Our casting director will review your details and reach out with audition time slots.');
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(extractError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await movementService.applySponsor({
        ...sponsorData,
        program: 'Suicide Awareness Showdown',
      });
      setSubmittedMessage('Thank you for your sponsorship interest! Our partnership director will reach out within 24 hours with package details and invoicing.');
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(extractError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const finalAmount = donateData.customAmount || donateData.amount;
    window.open(SQUARE_DONATION_URL, '_blank', 'noopener,noreferrer');
    setSubmittedMessage(`Thank you! Our secure Square checkout opened for your $${finalAmount} gift powering Suicide Awareness Showdown.`);
    setIsSubmitted(true);
  };

  return (
    <>
      <Seo
        title="Suicide Awareness Showdown — Live Achieve Believe"
        description="Where Are You Now? Letters to Etcetera. A transformative theatrical production using storytelling, theatre, music, and dance to break the silence and save lives."
      />

      <div className="w-full min-h-screen bg-[#12071C] text-stone-100 selection:bg-[#F97316] selection:text-white pt-24 pb-20 overflow-hidden">
        {/* Ambient Stage Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.25)_0%,_rgba(139,92,246,0.18)_45%,_transparent_75%)] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.18)_0%,_transparent_70%)] blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
          {/* ─── 1. HERO BANNER & INTRO ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-xs font-semibold uppercase tracking-widest">
                <HeartHandshake className="w-4 h-4" /> Door 3: Stories That Save Lives
              </span>

              <h1
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]"
              >
                Suicide Awareness Showdown
              </h1>

              <p className="font-serif text-xl sm:text-2xl text-amber-200/90 italic">
                &ldquo;Where Are You Now? Letters to Etcetera&rdquo;
              </p>

              <div className="space-y-4 text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Sometimes hope begins with one conversation.</strong> Behind every smile is a story we may not know. Sometimes the most important words are the ones someone hasn&apos;t yet found the courage to say.
                </p>
                <p className="text-stone-400">
                  Through Suicide Awareness Showdown and other creative experiences, LAB uses storytelling, theatre, music, and dance to encourage meaningful conversations about mental health, emotional struggles, human connection, and hope.
                </p>
              </div>

              {/* Quick Event Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <Calendar className="w-5 h-5 text-[#F97316] shrink-0" />
                  <div>
                    <p className="text-xs text-stone-400 font-medium">Performance Schedule</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">Fall Production 2026</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-[#F97316] shrink-0" />
                  <div>
                    <p className="text-xs text-stone-400 font-medium">Mainstage Venue</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">Tampa Bay Regional Theatre</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-purple-500/30 group">
                <img
                  src={auditionBanner}
                  alt="Suicide Awareness Showdown Event Banner"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* ─── 2. CRISIS LIFELINE BANNER ─── */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-900/40 via-black/40 to-purple-900/40 border border-purple-500/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#F97316]" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-white">Need immediate support or someone to talk to?</h4>
                <p className="text-xs text-stone-300">The 988 Suicide & Crisis Lifeline is free, confidential, and available 24/7.</p>
              </div>
            </div>
            <a
              href="tel:988"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all shrink-0"
            >
              Call or Text 988
            </a>
          </div>

          {/* ─── 3. TABBED PARTICIPATION FORMS (Volunteer, Audition, Sponsor, Donate) ─── */}
          <div id="forms-section" className="rounded-3xl bg-[#1B0B2B]/90 border border-purple-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#F97316]">
                Take Part In The Movement
              </span>
              <h2
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-3xl sm:text-4xl font-normal text-white"
              >
                How You Can Get Involved
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-sans">
                Every story matters. Every life has value. Choose how you want to stand beside us.
              </p>
            </div>

            {/* Tabs Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-black/40 border border-white/10 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => { setActiveTab('audition'); setIsSubmitted(false); setSubmitError(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'audition'
                    ? 'bg-[#F97316] text-white shadow-lg'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Audition</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('volunteer'); setIsSubmitted(false); setSubmitError(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'volunteer'
                    ? 'bg-[#F97316] text-white shadow-lg'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Volunteer</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('sponsor'); setIsSubmitted(false); setSubmitError(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'sponsor'
                    ? 'bg-[#F97316] text-white shadow-lg'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Sponsor</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('donate'); setIsSubmitted(false); setSubmitError(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'donate'
                    ? 'bg-[#F97316] text-white shadow-lg'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Donate</span>
              </button>
            </div>

            {/* Error Alert */}
            {submitError && (
              <div className="max-w-xl mx-auto p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-center flex items-center justify-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-xs sm:text-sm font-medium">{submitError}</p>
              </div>
            )}

            {/* Success Submission Alert */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-xl mx-auto p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-center flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-xs sm:text-sm font-medium">{submittedMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── TAB 1: AUDITION FORM ─── */}
            {activeTab === 'audition' && !isSubmitted && (
              <form onSubmit={handleAuditionSubmit} className="max-w-2xl mx-auto space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Performer Full Name *</label>
                    <input
                      type="text"
                      required
                      value={auditionData.name}
                      onChange={(e) => setAuditionData({ ...auditionData, name: e.target.value })}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={auditionData.email}
                      onChange={(e) => setAuditionData({ ...auditionData, email: e.target.value })}
                      placeholder="performer@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={auditionData.phone}
                      onChange={(e) => setAuditionData({ ...auditionData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Talent Discipline *</label>
                    <select
                      value={auditionData.talentType}
                      onChange={(e) =>
                        setAuditionData({
                          ...auditionData,
                          talentType: e.target.value as typeof auditionData.talentType,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-[#F97316] focus:outline-none"
                    >
                      <option value="acting">Acting / Monologue</option>
                      <option value="singing">Vocal / Singing</option>
                      <option value="dance">Contemporary / Lyrical Dance</option>
                      <option value="spoken-word">Spoken Word / Poetry</option>
                      <option value="instrumental">Musical Instrument</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Audition Video / Reel Link (YouTube, Drive, Vimeo)</label>
                  <input
                    type="url"
                    value={auditionData.mediaLink}
                    onChange={(e) => setAuditionData({ ...auditionData, mediaLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Past Stage Experience / Personal Statement</label>
                  <textarea
                    rows={3}
                    value={auditionData.experience}
                    onChange={(e) => setAuditionData({ ...auditionData, experience: e.target.value })}
                    placeholder="Share why this production matters to you and any relevant experience..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="rehearsals"
                    checked={auditionData.confirmRehearsals}
                    onChange={(e) => setAuditionData({ ...auditionData, confirmRehearsals: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#F97316] focus:ring-[#F97316]"
                  />
                  <label htmlFor="rehearsals" className="text-xs text-stone-300 select-none">
                    I confirm my availability for weekend rehearsals leading up to show dates.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-60 text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#F97316]/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Audition Registration'}</span>
                </button>
              </form>
            )}

            {/* ─── TAB 2: VOLUNTEER FORM ─── */}
            {activeTab === 'volunteer' && !isSubmitted && (
              <form onSubmit={handleVolunteerSubmit} className="max-w-2xl mx-auto space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={volunteerData.name}
                      onChange={(e) => setVolunteerData({ ...volunteerData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={volunteerData.email}
                      onChange={(e) => setVolunteerData({ ...volunteerData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={volunteerData.phone}
                      onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Preferred Role *</label>
                    <select
                      value={volunteerData.role}
                      onChange={(e) => setVolunteerData({ ...volunteerData, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-[#F97316] focus:outline-none"
                    >
                      <option value="event-operations">Event Operations & Setup</option>
                      <option value="ushers-hospitality">Guest Reception & Ushering</option>
                      <option value="stage-backstage">Backstage Crew & Props</option>
                      <option value="mental-health-booth">Resource Table & Information</option>
                      <option value="marketing">Social Media & Outreach</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Note / Availability</label>
                  <textarea
                    rows={3}
                    value={volunteerData.message}
                    onChange={(e) => setVolunteerData({ ...volunteerData, message: e.target.value })}
                    placeholder="Tell us about your background or specific dates you can help..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-60 text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#F97316]/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Join As Event Volunteer'}</span>
                </button>
              </form>
            )}

            {/* ─── TAB 3: SPONSOR FORM ─── */}
            {activeTab === 'sponsor' && !isSubmitted && (
              <form onSubmit={handleSponsorSubmit} className="max-w-2xl mx-auto space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={sponsorData.organizationName}
                      onChange={(e) => setSponsorData({ ...sponsorData, organizationName: e.target.value })}
                      placeholder="Acme Health Inc."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      value={sponsorData.contactName}
                      onChange={(e) => setSponsorData({ ...sponsorData, contactName: e.target.value })}
                      placeholder="Alex Taylor"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={sponsorData.email}
                      onChange={(e) => setSponsorData({ ...sponsorData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={sponsorData.phone}
                      onChange={(e) => setSponsorData({ ...sponsorData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Sponsorship Tier *</label>
                  <select
                    value={sponsorData.tier}
                    onChange={(e) =>
                      setSponsorData({
                        ...sponsorData,
                        tier: e.target.value as typeof sponsorData.tier,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-[#F97316] focus:outline-none"
                  >
                    <option value="presenting">Presenting Title Partner ($10,000)</option>
                    <option value="platinum">Platinum Stage Sponsor ($5,000)</option>
                    <option value="gold">Gold Community Sponsor ($2,500)</option>
                    <option value="community">Community Supporter ($1,000)</option>
                    <option value="custom">Custom Partnership / In-Kind</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Partnership Vision & Notes</label>
                  <textarea
                    rows={3}
                    value={sponsorData.notes}
                    onChange={(e) => setSponsorData({ ...sponsorData, notes: e.target.value })}
                    placeholder="Tell us about your organization's mission and how you'd like to collaborate..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-60 text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#F97316]/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Sponsorship Inquiry'}</span>
                </button>
              </form>
            )}

            {/* ─── TAB 4: DONATE FORM ─── */}
            {activeTab === 'donate' && !isSubmitted && (
              <form onSubmit={handleDonateSubmit} className="max-w-2xl mx-auto space-y-5 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Choose Donation Amount</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {['25', '50', '100', '250', '500'].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDonateData({ ...donateData, amount: val, customAmount: '' })}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          donateData.amount === val && !donateData.customAmount
                            ? 'bg-[#F97316] border-[#F97316] text-white shadow-lg'
                            : 'bg-black/40 border-white/15 text-stone-300 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Or Enter Custom Amount ($ USD)</label>
                  <input
                    type="number"
                    min="5"
                    step="1"
                    value={donateData.customAmount}
                    onChange={(e) => setDonateData({ ...donateData, customAmount: e.target.value })}
                    placeholder="Enter custom amount..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Your Name (or Anonymous)</label>
                    <input
                      type="text"
                      value={donateData.donorName}
                      onChange={(e) => setDonateData({ ...donateData, donorName: e.target.value })}
                      placeholder="e.g. John or Anonymous"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Email For Receipt (Optional)</label>
                    <input
                      type="email"
                      value={donateData.email}
                      onChange={(e) => setDonateData({ ...donateData, email: e.target.value })}
                      placeholder="donor@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Optional Dedication / In Memory Of</label>
                  <input
                    type="text"
                    value={donateData.dedication}
                    onChange={(e) => setDonateData({ ...donateData, dedication: e.target.value })}
                    placeholder="e.g. In loving memory of David..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-sm focus:border-[#F97316] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#F97316]/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Complete Secure Donation (${donateData.customAmount || donateData.amount})</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
