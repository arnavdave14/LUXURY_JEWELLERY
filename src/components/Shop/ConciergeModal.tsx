import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Video, CheckCircle2, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ConciergeModal: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, addToast } = useShop();
  const [salon, setSalon] = useState('Place Vendôme, Paris');
  const [appointmentType, setAppointmentType] = useState<'in_person' | 'virtual'>('in_person');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    addToast('APPOINTMENT RESERVED', 'Our private salon concierge will contact you with confirmation.', 'success');
  };

  const resetForm = () => {
    setSubmitted(false);
    setIsConciergeOpen(false);
  };

  return (
    <AnimatePresence>
      {isConciergeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-aubergine/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-porcelain rounded-2xl max-w-xl w-full p-6 md:p-10 border border-champagne shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <button
              onClick={() => setIsConciergeOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-aubergine hover:text-porcelain transition-all"
              aria-label="Close concierge"
            >
              <X size={16} />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-lime/20 text-aubergine flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-rose uppercase">
                    CONFIRMATION REGISTERED
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-aubergine">
                    Private Salon Reserved
                  </h3>
                  <p className="text-xs font-serif text-muted max-w-sm mx-auto">
                    We look forward to welcoming you to {salon}. A personalized digital itinerary and direct concierge hotline have been sent to {email}.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-8 py-3 rounded-full bg-aubergine text-porcelain text-xs font-mono tracking-widest uppercase hover:bg-rose transition-colors"
                >
                  CLOSE DIALOGUE
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-rose uppercase font-bold flex items-center gap-1.5">
                    <Sparkles size={12} /> PRIVATE MAISON CONCIERGE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display text-aubergine">
                    Schedule a Private Viewing
                  </h2>
                  <p className="text-xs font-serif text-muted">
                    Experience our high-jewellery masterpieces in person at our historic salons or via high-definition private digital broadcast.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Format Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAppointmentType('in_person')}
                      className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors ${
                        appointmentType === 'in_person'
                          ? 'border-aubergine bg-pearl text-aubergine font-bold'
                          : 'border-border text-muted hover:border-aubergine/50'
                      }`}
                    >
                      <MapPin size={16} className="text-rose shrink-0" />
                      <div className="text-xs font-mono uppercase">
                        <span>Private Salon</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAppointmentType('virtual')}
                      className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors ${
                        appointmentType === 'virtual'
                          ? 'border-aubergine bg-pearl text-aubergine font-bold'
                          : 'border-border text-muted hover:border-aubergine/50'
                      }`}
                    >
                      <Video size={16} className="text-sage shrink-0" />
                      <div className="text-xs font-mono uppercase">
                        <span>Live 8K Video</span>
                      </div>
                    </button>
                  </div>

                  {/* Salon Location */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-aubergine mb-1">
                      CHOOSE ATELIER LOCATION:
                    </label>
                    <select
                      value={salon}
                      onChange={(e) => setSalon(e.target.value)}
                      className="w-full p-3 bg-pearl border border-border rounded-lg text-xs font-mono text-aubergine focus:outline-none focus:border-aubergine"
                    >
                      <option value="Place Vendôme, Paris">Place Vendôme, Paris (Flagship)</option>
                      <option value="City Palace Pavilion, Jaipur">City Palace Pavilion, Jaipur</option>
                      <option value="Via Monte Napoleone, Milano">Via Monte Napoleone, Milano</option>
                      <option value="Madison Avenue Salon, New York">Madison Avenue Salon, New York</option>
                    </select>
                  </div>

                  {/* Client Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-aubergine mb-1">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Lady / Lord / Mx..."
                        className="w-full p-3 bg-pearl border border-border rounded-lg text-xs font-mono text-aubergine focus:outline-none focus:border-aubergine"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-aubergine mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patron@domain.com"
                        className="w-full p-3 bg-pearl border border-border rounded-lg text-xs font-mono text-aubergine focus:outline-none focus:border-aubergine"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-aubergine mb-1">
                      DIRECT TELEPHONE / WHATSAPP
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+33 / +91 / +1..."
                      className="w-full p-3 bg-pearl border border-border rounded-lg text-xs font-mono text-aubergine focus:outline-none focus:border-aubergine"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-aubergine mb-1">
                      SPECIAL GEMOLOGICAL INTERESTS / NOTES
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Requesting private showing of Aurelia Solitaire and 4.82ct Columbian Emeralds..."
                      className="w-full p-3 bg-pearl border border-border rounded-lg text-xs font-mono text-aubergine focus:outline-none focus:border-aubergine"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-aubergine text-porcelain text-xs font-mono tracking-[0.2em] font-bold uppercase hover:bg-rose transition-colors duration-300 shadow-md"
                  >
                    REQUEST PRIVATE SALON AUDIENCE
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
