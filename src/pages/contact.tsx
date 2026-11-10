import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, HeartHandshake, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import movementService, { InquiryCreatePayload } from '@/lib/api/services/movement.service';

type InquiryCategory = NonNullable<InquiryCreatePayload['category']>;

const categoryOptions: Array<{ value: InquiryCategory; label: string; defaultSubject: string }> = [
  { value: 'general', label: 'General Inquiry', defaultSubject: 'General Question' },
  { value: 'housing-partnership', label: 'Veteran Housing Partnership', defaultSubject: 'Explore a Housing Partnership' },
  { value: 'mental-health-partner', label: 'Mental Health & Showdown Collaboration', defaultSubject: 'Mental Health / Showdown Partner' },
  { value: 'community-partner', label: 'Community Organization / Church / School', defaultSubject: 'Community Partnership' },
];

export default function Contact() {
  const location = useLocation();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: 'general' as InquiryCategory,
    subject: 'General Question',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    const matched = categoryOptions.find((c) => c.value === subjectParam);
    if (matched) {
      setFormState((prev) => ({
        ...prev,
        category: matched.value,
        subject: matched.defaultSubject,
      }));
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await movementService.submitInquiry(formState);
      setIsSubmitted(true);
    } catch (err) {
      const respMsg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setErrorMessage(respMsg || 'Unable to send message right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Connect With Us — Live Achieve Believe"
        description="Reach out to Live Achieve Believe for community partnerships, veteran housing collaborations, volunteer opportunities, and support."
      />

      <div className="min-h-screen bg-[#FAF4E6] text-[#2C261E] pt-28 pb-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#EA580C] text-xs font-semibold uppercase tracking-widest">
              <HeartHandshake className="w-3.5 h-3.5" /> Live Achieve Believe
            </span>
            <h1
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-[#18181B] tracking-tight"
            >
              Every Door Opens Because Someone Matters
            </h1>
            <p className="text-base text-[#6E6259] max-w-2xl mx-auto">
              Whether you want to partner with us, offer housing support for veterans, organize an essentials drive, or ask a question, we would love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#e7d8bc]"
            >
              <h2
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-bold text-[#18181B] mb-6"
              >
                Send Us a Message
              </h2>

              {errorMessage && (
                <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#18181B]">
                    Message Received
                  </h3>
                  <p className="text-sm text-[#6E6259] max-w-md mx-auto">
                    Thank you for reaching out to Live Achieve Believe. Our community team will follow up with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState((prev) => ({ ...prev, message: '' }));
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-1.5">
                        First Name *
                      </label>
                      <Input
                        required
                        value={formState.firstName}
                        onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                        placeholder="First name"
                        className="bg-[#FAF4E6]/50 border-[#e0cfaf]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-1.5">
                        Last Name
                      </label>
                      <Input
                        value={formState.lastName}
                        onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                        placeholder="Last name"
                        className="bg-[#FAF4E6]/50 border-[#e0cfaf]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-1.5">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="you@example.com"
                        className="bg-[#FAF4E6]/50 border-[#e0cfaf]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-1.5">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="bg-[#FAF4E6]/50 border-[#e0cfaf]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-1.5">
                      Inquiry Type *
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) => {
                        const val = e.target.value as InquiryCategory;
                        const matched = categoryOptions.find((c) => c.value === val);
                        setFormState({
                          ...formState,
                          category: val,
                          subject: matched?.defaultSubject || formState.subject,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-md border border-[#e0cfaf] bg-[#FAF4E6]/50 text-sm text-[#2C261E] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    >
                      {categoryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-1.5">
                      Subject
                    </label>
                    <Input
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="How can we connect?"
                      className="bg-[#FAF4E6]/50 border-[#e0cfaf]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-1.5">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us how you would like to serve, partner, or connect..."
                      className="min-h-[140px] bg-[#FAF4E6]/50 border-[#e0cfaf]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-60 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Organization Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#1B140E] text-stone-200 rounded-3xl p-8 shadow-xl space-y-6">
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-2xl font-bold text-white"
                >
                  Live Achieve Believe
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Think Higher. Feel Deeper. Act with Purpose. We serve alongside Bread of Refuge, Family Promise of Hillsborough County, LEADS Youth Development, and community partners.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Email</p>
                      <p className="text-sm text-white">info@liveachievebelieve.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Region</p>
                      <p className="text-sm text-white">Hillsborough County & Tampa Bay, FL</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  <Link
                    to="/suicide-awareness-showdown"
                    className="px-4 py-2 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Showdown Forms
                  </Link>
                  <Link
                    to="/donate"
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Give Hope
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
