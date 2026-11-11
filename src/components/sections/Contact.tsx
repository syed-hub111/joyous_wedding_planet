import React, { useState } from 'react';
import { Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import {
  validateFullName,
  validateIndianMobile,
  submitEnquiry,
  getWhatsAppUrl,
  getWhatsAppLeadUrl,
  BUSINESS_PHONE,
  BUSINESS_ADDRESS,
} from '../../services/enquiryService';
import { EventType } from '../../types';

export const Contact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [eventType, setEventType] = useState<EventType | string>('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');

  const [touched, setTouched] = useState<{ fullName?: boolean; mobileNumber?: boolean }>({});
  const [errors, setErrors] = useState<{ fullName?: string; mobileNumber?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    status: 'idle' | 'success' | 'unconnected' | 'error';
    message: string;
    enquiryId?: string;
  }>({ status: 'idle', message: '' });

  const eventOptions: EventType[] = [
    'Wedding',
    'Engagement',
    'Reception',
    'Birthday / Special Event',
    'Corporate Event',
    'Other',
  ];

  const validate = () => {
    const nameCheck = validateFullName(fullName);
    const phoneCheck = validateIndianMobile(mobileNumber);

    const errs: { fullName?: string; mobileNumber?: string } = {};
    if (!nameCheck.isValid) errs.fullName = nameCheck.message;
    if (!phoneCheck.isValid) errs.mobileNumber = phoneCheck.message;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, mobileNumber: true });

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult({ status: 'idle', message: '' });

    try {
      const res = await submitEnquiry({
        fullName,
        mobileNumber,
        eventType,
        eventDate,
        notes,
        sourcePage: 'contact_section_form',
      });

      if (res.success) {
        setSubmitResult({
          status: 'success',
          message: res.message,
          enquiryId: res.enquiryId,
        });
      } else if (!res.backendConnected) {
        setSubmitResult({
          status: 'unconnected',
          message: res.message,
        });
      } else {
        setSubmitResult({
          status: 'error',
          message: res.message,
        });
      }
    } catch {
      setSubmitResult({
        status: 'error',
        message: 'Could not connect to service. Please reach out via WhatsApp or phone.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectLeadUrl = getWhatsAppLeadUrl({
    fullName,
    mobileNumber,
    eventType,
    eventDate,
    notes,
  });

  const whatsappGeneralUrl = getWhatsAppUrl();

  return (
    <section id="contact" className="py-24 sm:py-32 bg-ivory text-espresso relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-beige/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -ml-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-gold-dark mb-3">
                <span className="h-[1px] w-6 bg-gold" />
                <span className="text-[11px] uppercase font-semibold tracking-[0.26em]">
                  GET IN TOUCH
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-espresso leading-[1.12]">
                Let's Create Something Unforgettable.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-espresso/80 leading-relaxed font-light">
                Tell us about your celebration. Our team would love to understand your vision and help you plan the perfect occasion.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              {/* Phone Card */}
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\s+/g, '')}`}
                className="group flex items-start gap-4 p-5 rounded-sm bg-white border border-gold/30 shadow-luxury hover:border-gold hover:shadow-luxury-lg transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center text-gold-dark flex-shrink-0 transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark block">
                    Direct Phone Consultation
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-espresso group-hover:text-gold-dark transition-colors">
                    {BUSINESS_PHONE}
                  </span>
                  <p className="text-xs text-espresso/60 mt-0.5">
                    Monday to Sunday: 9:00 AM – 9:00 PM
                  </p>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-start gap-4 p-5 rounded-sm bg-white border border-gold/30 shadow-luxury">
                <div className="w-12 h-12 rounded-full bg-beige/60 flex items-center justify-center text-espresso flex-shrink-0">
                  <MapPin size={20} className="text-gold-dark" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark block">
                    Our Location
                  </span>
                  <span className="font-serif text-lg font-bold text-espresso block">
                    {BUSINESS_ADDRESS}
                  </span>
                  <p className="text-xs text-espresso/60 mt-0.5">
                    Private consultations available by appointment in Chennai.
                  </p>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-sm bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366]/20 transition-all text-espresso"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={22} className="text-[#25D366]" />
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase block text-espresso">
                      Instant WhatsApp Chat
                    </span>
                    <span className="text-xs text-espresso/70">
                      Connect directly with our planning lead
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#128C7E] group-hover:translate-x-1 transition-transform">
                  Chat Now →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Full Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-gold/40 p-6 sm:p-10 shadow-luxury-lg">
            <div className="border-b border-gold/20 pb-5 mb-6">
              <span className="text-[10px] font-bold tracking-[0.24em] text-gold-dark uppercase block">
                RESERVE A CONSULTATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mt-1">
                Tell Us About Your Celebration
              </h3>
            </div>

            {submitResult.status === 'success' ? (
              <div className="py-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-espresso">
                  Enquiry Successfully Sent!
                </h4>
                <p className="text-sm text-espresso/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-espresso">{fullName}</strong>. Our wedding planner in Chennai has received your details and will call you at{' '}
                  <strong className="text-espresso">{mobileNumber}</strong> shortly.
                </p>
                {submitResult.enquiryId && (
                  <p className="text-xs font-mono bg-beige/50 py-1.5 px-3 rounded inline-block text-espresso">
                    Reference: {submitResult.enquiryId}
                  </p>
                )}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitResult({ status: 'idle', message: '' });
                      setFullName('');
                      setMobileNumber('');
                      setNotes('');
                    }}
                  >
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : submitResult.status === 'unconnected' ? (
              <div className="py-4 space-y-4 animate-fade-in">
                <div className="p-4 rounded bg-amber-50 border border-amber-300 text-amber-900 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Backend Service Notice
                      </h4>
                      <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                        The live backend database is currently not connected. As required by our system standards, we do not provide a fake confirmation. Your details are intact below — send them directly via WhatsApp!
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappDirectLeadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3.5 px-4 rounded text-xs font-bold tracking-widest uppercase shadow transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>Forward Details via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmitResult({ status: 'idle', message: '' })}
                  className="w-full text-center text-xs text-espresso/60 hover:text-espresso py-1 underline"
                >
                  Edit Information
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-espresso/70 mb-1"
                    >
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Deepika Krishnan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={() => setTouched((p) => ({ ...p, fullName: true }))}
                      className={`w-full px-3.5 py-2.5 bg-ivory border rounded text-sm text-espresso focus:outline-none focus:ring-2 ${
                        touched.fullName && errors.fullName
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-gold/40 focus:border-gold focus:ring-gold/20'
                      }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-espresso/70 mb-1"
                    >
                      Mobile Number <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-espresso/60 border-r border-gold/30 pr-2">
                        +91
                      </span>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, mobileNumber: true }))}
                        className={`w-full pl-16 pr-3.5 py-2.5 bg-ivory border rounded text-sm text-espresso focus:outline-none focus:ring-2 ${
                          touched.mobileNumber && errors.mobileNumber
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-gold/40 focus:border-gold focus:ring-gold/20'
                        }`}
                      />
                    </div>
                    {touched.mobileNumber && errors.mobileNumber && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.mobileNumber}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Event Type */}
                  <div>
                    <label
                      htmlFor="contact-event-type"
                      className="block text-xs font-bold uppercase tracking-wider text-espresso/70 mb-1"
                    >
                      What are you planning?
                    </label>
                    <select
                      id="contact-event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-ivory border border-gold/40 rounded text-sm text-espresso focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 cursor-pointer"
                    >
                      {eventOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label
                      htmlFor="contact-date"
                      className="block text-xs font-bold uppercase tracking-wider text-espresso/70 mb-1"
                    >
                      Approximate Date / Month
                    </label>
                    <input
                      id="contact-date"
                      type="text"
                      placeholder="e.g. Nov 2026 or Muhurtham dates"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-ivory border border-gold/40 rounded text-sm text-espresso focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    htmlFor="contact-notes"
                    className="block text-xs font-bold uppercase tracking-wider text-espresso/70 mb-1"
                  >
                    Vision & Requirements <span className="text-espresso/50 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    placeholder="Tell us about the venue, expected guest count, or specific decor styles you desire..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-ivory border border-gold/40 rounded text-sm text-espresso focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gold"
                    fullWidth
                    size="lg"
                    loading={isSubmitting}
                    icon={<Send size={16} />}
                  >
                    Send Consultation Request
                  </Button>
                </div>

                <p className="text-[11px] text-center text-espresso/60 pt-1">
                  Your privacy is sacred to us. Your contact details will only be used to discuss your celebration.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
