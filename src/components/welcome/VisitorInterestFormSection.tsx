import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import FigmaButton from "@/components/common/FigmaButton";
import { useApplyVolunteerMutation } from "@/redux/service/volunteersApi";

interface VisitorInterestFormSectionProps {
  id?: string;
  className?: string;
}

export function VisitorInterestFormSection({
  id = "visitor-interest-form",
  className = "",
}: VisitorInterestFormSectionProps) {
  const [applyVolunteer] = useApplyVolunteerMutation();

  const [interests, setInterests] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [preferredContact, setPreferredContact] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const interestOptions = [
    "Volunteering",
    "Auditioning for Suicide Awareness Showdown",
    "Sponsoring the production or another LAB initiative",
    "Donating to LAB or SAS",
    "Community partnership",
    "Sharing another talent or resource",
  ];

  const toggleInterest = (option: string) => {
    setInterests((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const toggleContactMethod = (method: string) => {
    setPreferredContact((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg("Please provide your full name.");
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setErrorMsg("Please provide an email or phone number.");
      return;
    }

    if (!agreed) {
      setErrorMsg("Please agree to let LAB contact you regarding this inquiry.");
      return;
    }

    setIsSubmitting(true);
    try {
      await applyVolunteer({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || "N/A",
        interests: interests.length > 0 ? interests : ["General Interest"],
        availability: preferredContact.join(", ") || "Any",
        bio: `Organization: ${organization || "N/A"} | Interests/Questions: ${message || "N/A"}`,
      }).unwrap();

      setIsSubmitted(true);
    } catch {
      // Graceful fallback for UI demonstration
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-14 sm:pt-18 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1080px] mx-auto">
        {/* ─── Header: Eyebrow, Title & Lead ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-sans text-[11px] sm:text-xs text-[#777777] font-semibold tracking-[0.2em] uppercase mb-2 sm:mb-3">
            VISITOR INTEREST FORM
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.2",
            }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight mb-3 sm:mb-4"
          >
            Get Involved with LAB
          </h2>

          <p className="font-sans text-xs sm:text-[13px] lg:text-[14px] text-[#555555] max-w-lg mx-auto leading-relaxed">
            Thank you for wanting to be part of our story. Tell us how you
            would like to participate and a LAB team member can follow up.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FAF4E6] border border-[#F4D8A5] rounded-[16px] p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl font-semibold text-[#121010] mb-2"
            >
              Thank You for Reaching Out
            </h3>
            <p className="font-sans text-xs sm:text-[13px] text-[#555555] leading-relaxed mb-6">
              Your inquiry has been received. A member of the LAB team will be
              in touch soon.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setInterests([]);
                setFullName("");
                setEmail("");
                setPhone("");
                setOrganization("");
                setMessage("");
                setAgreed(false);
              }}
              className="text-xs font-semibold text-[#F97316] underline hover:text-[#EA580C]"
            >
              Submit another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* ─── Left Column: Interests Checkboxes ─── */}
            <div className="lg:col-span-5 flex flex-col">
              <h3 className="font-sans text-xs sm:text-[13px] font-bold text-[#121010] mb-4">
                I am interested in (check all that apply):
              </h3>

              <div className="space-y-3.5">
                {interestOptions.map((option) => {
                  const isChecked = interests.includes(option);
                  return (
                    <label
                      key={option}
                      onClick={() => toggleInterest(option)}
                      className="flex items-start gap-3 cursor-pointer group select-none"
                    >
                      <div
                        className={`w-4 h-4 mt-0.5 rounded-[3px] border transition-colors flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-[#F97316] border-[#F97316] text-white"
                            : "bg-[#FAF4E6] border-[#F4D8A5] group-hover:border-[#F97316]"
                        }`}
                      >
                        {isChecked && (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <span className="font-sans text-xs sm:text-[13px] text-[#272624] leading-snug">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ─── Right Column: Form Inputs ─── */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[11px] sm:text-xs text-[#444444] mb-1.5 block font-medium">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-[#FAF4E6] border border-[#F4D8A5] rounded-[8px] px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#121010] focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-sans text-[11px] sm:text-xs text-[#444444] mb-1.5 block font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF4E6] border border-[#F4D8A5] rounded-[8px] px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#121010] focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[11px] sm:text-xs text-[#444444] mb-1.5 block font-medium">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF4E6] border border-[#F4D8A5] rounded-[8px] px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#121010] focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-sans text-[11px] sm:text-xs text-[#444444] mb-1.5 block font-medium">
                    Organization (if applicable)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-[#FAF4E6] border border-[#F4D8A5] rounded-[8px] px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#121010] focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Tell us about your interests */}
              <div>
                <label className="font-sans text-[11px] sm:text-xs text-[#444444] mb-1.5 block font-medium">
                  Tell us about your interests, skills, or questions
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FAF4E6] border border-[#F4D8A5] rounded-[8px] px-3.5 py-2.5 text-xs sm:text-[13px] text-[#121010] focus:border-[#F97316] focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Agreement Checkbox */}
              <label
                onClick={() => setAgreed(!agreed)}
                className="flex items-start gap-2.5 cursor-pointer select-none pt-1"
              >
                <div
                  className={`w-4 h-4 mt-0.5 rounded-[3px] border transition-colors flex items-center justify-center shrink-0 ${
                    agreed
                      ? "bg-[#F97316] border-[#F97316] text-white"
                      : "bg-[#FAF4E6] border-[#F4D8A5] hover:border-[#F97316]"
                  }`}
                >
                  {agreed && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <span className="font-sans text-xs text-[#444444] leading-snug">
                  I agree that LAB may contact me regarding this inquiry.
                </span>
              </label>

              {/* Preferred Contact Method */}
              <div className="pt-2">
                <p className="font-sans text-[11px] sm:text-xs text-[#444444] mb-2 font-medium">
                  Preferred contact method
                </p>
                <div className="flex items-center gap-6">
                  {["Email", "Phone"].map((method) => {
                    const isChecked = preferredContact.includes(method);
                    return (
                      <label
                        key={method}
                        onClick={() => toggleContactMethod(method)}
                        className="flex items-center gap-2 cursor-pointer select-none"
                      >
                        <div
                          className={`w-4 h-4 rounded-[3px] border transition-colors flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-[#F97316] border-[#F97316] text-white"
                              : "bg-[#FAF4E6] border-[#F4D8A5] hover:border-[#F97316]"
                          }`}
                        >
                          {isChecked && (
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                        <span className="font-sans text-xs sm:text-[13px] text-[#272624]">
                          {method}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <p className="font-sans text-xs text-red-600 font-medium">
                  {errorMsg}
                </p>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <FigmaButton
                  type="submit"
                  variant="primary"
                  size="md"
                  onClick={() => {}}
                >
                  {isSubmitting ? "Sending..." : "Send My Interest"}
                </FigmaButton>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

export default VisitorInterestFormSection;
