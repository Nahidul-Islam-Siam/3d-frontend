import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, X, CheckCircle2, ExternalLink } from 'lucide-react';
import movementService from '@/lib/api/services/movement.service';
import type { EventItem } from '@/pages/admin/types';
import { usePublicEvents } from '@/lib/hooks/usePublicCms';

export interface PublicUpcomingEventsStripProps {
  compact?: boolean;
  className?: string;
}

export default function PublicUpcomingEventsStrip({
  compact = false,
  className = '',
}: PublicUpcomingEventsStripProps) {
  const { events, refresh } = usePublicEvents();
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [tickets, setTickets] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedMsg, setConfirmedMsg] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeEvent) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [activeEvent]);

  const openRsvpModal = (evt: EventItem) => {
    setErrorMsg(null);
    setConfirmedMsg(null);
    setTickets(1);
    setNotes('');
    setActiveEvent(evt);
  };

  const closeRsvpModal = () => {
    setActiveEvent(null);
    setErrorMsg(null);
    setConfirmedMsg(null);
  };

  const handleSubmitRsvp = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeEvent) return;

    if (!guestName.trim() || !guestEmail.trim()) {
      setErrorMsg('Please enter both your full name and a valid email address.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      await movementService.submitEventRsvp(activeEvent.id, {
        guest_name: guestName.trim(),
        guest_email: guestEmail.trim(),
        ...(guestPhone.trim() ? { guest_phone: guestPhone.trim() } : {}),
        tickets: Math.max(1, tickets),
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });
      setConfirmedMsg(`Your seat reservation (${tickets} seat${tickets > 1 ? 's' : ''}) for "${activeEvent.title}" is confirmed!`);
      await refresh(true);
    } catch (err: unknown) {
      const apiMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Unable to submit RSVP right now. Please try again.';
      setErrorMsg(apiMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <div className={`w-full space-y-5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-t border-white/15 pt-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FDBA74]">
            Live Community Gatherings
          </span>
          <h3
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-xl sm:text-2xl font-bold text-white mt-0.5"
          >
            Upcoming Events &amp; Seat Reservations
          </h3>
        </div>
        <span className="text-xs text-stone-300 font-sans">
          Updated live from the Live Achieve Believe calendar
        </span>
      </div>

      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-5`}>
        {events.map((evt) => {
          const remaining = Math.max(0, (evt.capacity || 0) - (evt.rsvps_count || 0));
          const isFull = remaining === 0;

          return (
            <article
              key={evt.id}
              className="rounded-2xl bg-[#1A0B28]/90 border border-purple-500/25 overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#F97316]/50 transition-colors"
            >
              <div>
                {evt.image_url && (
                  <div className="w-full h-44 bg-black/50 overflow-hidden">
                    <img
                      src={evt.image_url}
                      alt={evt.title}
                      loading="lazy"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F97316]/20 text-[#FDBA74] border border-[#F97316]/40">
                      {evt.category || 'Community Gathering'}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        evt.status === 'Happening now'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                          : 'bg-white/10 text-stone-200 border border-white/15'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>

                  <h4
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg font-bold text-white leading-snug"
                  >
                    {evt.title}
                  </h4>

                  <div className="space-y-1.5 text-xs text-stone-300 font-sans">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#FDBA74] shrink-0" aria-hidden="true" />
                      <span>{evt.event_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#FDBA74] shrink-0" aria-hidden="true" />
                      <span>{evt.start_time} – {evt.end_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FDBA74] shrink-0" aria-hidden="true" />
                      <span>{evt.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#FDBA74]" aria-hidden="true" />
                        <span>{isFull ? 'Full capacity reached' : `${remaining} of ${evt.capacity} seats left`}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-white">
                        <Ticket className="w-3.5 h-3.5 text-[#FDBA74]" aria-hidden="true" />
                        {evt.ticket_type === 'Paid Ticket' && evt.price ? `$${evt.price}` : evt.ticket_type || 'Free RSVP'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={isFull}
                  onClick={() => openRsvpModal(evt)}
                  aria-label={`Reserve a seat for ${evt.title}`}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isFull
                      ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                      : 'bg-[#C2410C] hover:bg-[#9A3412] text-white shadow-lg'
                  }`}
                >
                  {isFull ? 'Sold Out' : 'RSVP / Reserve Seat'}
                </button>
                {evt.registration_url && (
                  <a
                    href={evt.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`External registration link for ${evt.title}`}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Native <dialog> RSVP Modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby="rsvp-dialog-title"
        onCancel={(e) => {
          e.preventDefault();
          closeRsvpModal();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeRsvpModal();
        }}
        className="backdrop:bg-black/80 backdrop:backdrop-blur-sm bg-transparent p-0 max-w-lg w-[92vw] m-auto rounded-2xl border-0 overflow-visible"
      >
        {activeEvent && (
          <div className="rounded-2xl bg-[#1D0E2B] border border-purple-400/35 text-white p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#FDBA74] font-semibold">
                  Community Event RSVP
                </p>
                <h3
                  id="rsvp-dialog-title"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl font-bold text-white mt-0.5"
                >
                  {activeEvent.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  {activeEvent.event_date} · {activeEvent.start_time} · {activeEvent.location}
                </p>
              </div>
              <button
                type="button"
                onClick={closeRsvpModal}
                aria-label="Close RSVP dialog"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {confirmedMsg ? (
              <div className="rounded-xl bg-emerald-950/60 border border-emerald-500/40 p-5 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" aria-hidden="true" />
                <p className="text-sm font-medium text-emerald-100">{confirmedMsg}</p>
                <button
                  type="button"
                  onClick={closeRsvpModal}
                  className="px-5 py-2 rounded-full bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRsvp} className="space-y-4">
                {errorMsg && (
                  <div role="alert" className="rounded-lg bg-red-950/70 border border-red-400/40 px-3.5 py-2.5 text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label htmlFor="rsvp-guest-name" className="block text-xs font-semibold text-stone-200 mb-1">
                    Full Name <span className="text-[#FDBA74]">*</span>
                  </label>
                  <input
                    id="rsvp-guest-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Jordan Taylor"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/20 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="rsvp-guest-email" className="block text-xs font-semibold text-stone-200 mb-1">
                      Email Address <span className="text-[#FDBA74]">*</span>
                    </label>
                    <input
                      id="rsvp-guest-email"
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/20 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#F97316]"
                    />
                  </div>
                  <div>
                    <label htmlFor="rsvp-guest-phone" className="block text-xs font-semibold text-stone-200 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="rsvp-guest-phone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/20 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#F97316]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="rsvp-tickets" className="block text-xs font-semibold text-stone-200 mb-1">
                    Number of Seats
                  </label>
                  <input
                    id="rsvp-tickets"
                    type="number"
                    min={1}
                    max={Math.max(1, (activeEvent.capacity || 10) - (activeEvent.rsvps_count || 0))}
                    value={tickets}
                    onChange={(e) => setTickets(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/20 text-sm text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-notes" className="block text-xs font-semibold text-stone-200 mb-1">
                    Notes / Accessibility Requests
                  </label>
                  <textarea
                    id="rsvp-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional dietary or seating notes..."
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/20 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={closeRsvpModal}
                    className="px-4 py-2 rounded-full border border-white/25 text-xs font-semibold text-stone-200 hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-full bg-[#C2410C] hover:bg-[#9A3412] disabled:opacity-60 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    {submitting ? 'Reserving...' : 'Confirm Seat'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}

