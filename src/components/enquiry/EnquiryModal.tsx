import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Phone, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import {
  validateFullName,
  validateIndianMobile,
  submitEnquiry,
  getWhatsAppLeadUrl,
  BUSINESS_PHONE,
} from '../../services/enquiryService';
import { EventType } from '../../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceTrigger?: string;
  initialEventType?: EventType | string;
}

const EVENT_OPTIONS: EventType[] = [
  'Wedding',
  'Engagement',
  'Reception',
  'Birthday / Special Event',
  'Corporate Event',
  'Other',
];

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  sourceTrigger = 'automatic_popup',
  initialEventType = 'Wedding',
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [eventType, setEventType] = useState<EventType | string>(initialEventType);
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Validation & UI State
  const [touched, setTouched] = useState<{ fullName?: boolean; mobileNumber?: boolean }>({});
  const [errors, setErrors] = useState<{ fullName?: string; mobileNumber?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    status: 'idle' | 'success' | 'unconnected' | 'error';
    message: string;
    enquiryId?: string;
  }>({ status: 'idle', message: '' });

  // Update initialEventType if prop changes
  useEffect(() => {
    if (initialEventType) {
      setEventType(initialEventType);
    }
  }, [initialEventType]);

  // Validate on blur or change
  const validateForm = useCallback(() => {
    const nameCheck = validateFullName(fullName);
    const phoneCheck = validateIndianMobile(mobileNumber);

    const newErrors: { fullName?: string; mobileNumber?: string } = {};
    if (!nameCheck.isValid) newErrors.fullName = nameCheck.message;
    if (!phoneCheck.isValid) newErrors.mobileNumber = phoneCheck.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fullName, mobileNumber]);

  useEffect(() => {
    if (touched.fullName || touched.mobileNumber) {
      validateForm();
    }
  }, [fullName, mobileNumber, touched, validateForm]);

  // Handle Close & Dismissal (Sets 24hr cooldown if closed without submitting)
  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      const dismissTimestamp = Date.now().toString();
      localStorage.setItem('jwp_enquiry_dismissed_at', dismissTimestamp);
    }
    onClose();
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, mobileNumber: true });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult({ status: 'idle', message: '' });

    try {
      const response = await submitEnquiry({
        fullName,
        mobileNumber,
        eventType,
        eventDate,
        notes,
        sourcePage: sourceTrigger,
      });

      if (response.success) {
        setSubmissionResult({
          status: 'success',
          message: response.message,
          enquiryId: response.enquiryId,
        });
      } else if (!response.backendConnected) {
        // Explicitly inform user that backend is unconnected
        setSubmissionResult({
          status: 'unconnected',
          message: response.message,
        });
      } else {
        setSubmissionResult({
          status: 'error',
          message: response.message,
        });
      }
    } catch {
      setSubmissionResult({
        status: 'error',
        message: 'An unexpected connection error occurred. Please contact us directly via phone or WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const whatsappDirectUrl = getWhatsAppLeadUrl({
    fullName,
    mobileNumber,
    eventType,
    eventDate,
    notes,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-espresso/80 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={handleDismiss} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-ivory rounded-lg shadow-2xl border border-gold/40 p-6 sm:p-8 md:p-9 text-espresso z-10 transition-transform duration-300 transform scale-100 animate-fade-up max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close enquiry modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-espresso/60 hover:text-espresso hover:bg-gold/10 transition-all duration-200"
        >
          <X size={20} />
        </button>

        {/* Brand Ornament */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-[1px] w-6 bg-gold" />
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="h-[1px] w-6 bg-gold" />
        </div>

        {/* SUCCESS STATE */}
        {submissionResult.status === 'success' ? (
          <div className="text-center py-4 space-y-5 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
                ENQUIRY REGISTERED
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-espresso">
                Thank You, {fullName.split(' ')[0]}!
              </h3>
              <p className="text-sm text-espresso/80 mt-2 leading-relaxed">
                Your consultation request has been successfully recorded at our Chennai headquarters.
              </p>
            </div>

            {submissionResult.enquiryId && (
              <div className="bg-beige/50 border border-gold/30 rounded p-3 text-xs tracking-wider">
                <span className="text-espresso/70">Reference ID: </span>
                <span className="font-mono font-bold text-espresso">{submissionResult.enquiryId}</span>
              </div>
            )}

            <p className="text-xs text-espresso/70">
              Our wedding planning director will call you at{' '}
              <strong className="text-espresso">{mobileNumber}</strong> within a few hours.
            </p>

            <div className="pt-2 space-y-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 px-5 rounded font-medium text-xs tracking-widest uppercase shadow transition-all duration-200"
              >
                <MessageCircle size={16} />
                <span>Instant Connect on WhatsApp</span>
              </a>

              <Button variant="outline" fullWidth size="sm" onClick={onClose}>
                Return to Website
              </Button>
            </div>
          </div>
        ) : submissionResult.status === 'unconnected' ? (
          /* BACKEND NOT CONNECTED STATE (Prompt requirement) */
          <div className="py-2 space-y-4 animate-fade-in text-left">
            <div className="p-4 rounded-md bg-amber-50/80 border border-amber-300/80 text-amber-900 space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-amber-900">
                    Backend Service Notification
                  </h4>
                  <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                    The backend database endpoint is currently not connected (or offline). As required by our architecture guidelines, we will not pretend this submission was silently archived.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded border border-gold/30 text-xs space-y-1.5 text-espresso">
              <p className="font-semibold text-gold-dark uppercase tracking-wider text-[10px]">
                Your Prepared Enquiry Details:
              </p>
              <p><strong>Name:</strong> {fullName}</p>
              <p><strong>Mobile:</strong> {mobileNumber}</p>
              <p><strong>Event:</strong> {eventType}</p>
            </div>

            <p className="text-xs text-espresso/80">
              You can instantly forward these details directly to Joyous Wedding Planet via WhatsApp or Call:
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 px-4 rounded text-xs font-semibold tracking-wider uppercase transition-colors shadow"
              >
                <MessageCircle size={16} />
                <span>Send Enquiry via WhatsApp Now</span>
              </a>

              <a
                href={`tel:${BUSINESS_PHONE.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 bg-espresso hover:bg-espresso-light text-ivory py-3 px-4 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <Phone size={14} />
                <span>Call Us Direct: {BUSINESS_PHONE}</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmissionResult({ status: 'idle', message: '' })}
                className="w-full text-center text-xs text-espresso/60 hover:text-espresso py-1 underline"
              >
                Back to Edit Details
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD FORM INPUT STATE */
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-gold-dark uppercase block mb-1">
                LET'S PLAN SOMETHING BEAUTIFUL
              </span>
              <h2
                id="enquiry-modal-heading"
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-espresso tracking-tight"
              >
                Your Celebration Begins Here.
              </h2>
              <p className="text-xs sm:text-sm text-espresso/80 mt-2 max-w-sm mx-auto leading-relaxed">
                Share your details with us. Our wedding planning experts will connect with you to understand your requirements and help bring your celebration to life.
              </p>
            </div>

            {/* Error banner if general submission failed */}
            {submissionResult.status === 'error' && (
              <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{submissionResult.message}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Field 1: Full Name */}
              <div>
                <label
                  htmlFor="modal-full-name"
                  className="block text-xs font-semibold tracking-wider uppercase text-espresso/80 mb-1"
                >
                  Full Name <span className="text-gold">*</span>
                </label>
                <input
                  id="modal-full-name"
                  type="text"
                  required
                  placeholder="e.g. Ananya Sundaram"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
                  className={`w-full px-3.5 py-2.5 bg-white/90 border rounded text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 transition-all ${
                    touched.fullName && errors.fullName
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-gold/40 focus:border-gold focus:ring-gold/20'
                  }`}
                />
                {touched.fullName && errors.fullName && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Field 2: Mobile Number */}
              <div>
                <label
                  htmlFor="modal-mobile-number"
                  className="block text-xs font-semibold tracking-wider uppercase text-espresso/80 mb-1"
                >
                  Mobile Number <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-espresso/60 border-r border-gold/30 pr-2">
                    +91
                  </span>
                  <input
                    id="modal-mobile-number"
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, mobileNumber: true }))}
                    className={`w-full pl-16 pr-3.5 py-2.5 bg-white/90 border rounded text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 transition-all ${
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

              {/* Field 3: What are you planning? (Optional) */}
              <div>
                <label
                  htmlFor="modal-event-type"
                  className="block text-xs font-semibold tracking-wider uppercase text-espresso/80 mb-1"
                >
                  What are you planning? <span className="text-espresso/50 font-normal">(Optional)</span>
                </label>
                <select
                  id="modal-event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/90 border border-gold/40 rounded text-sm text-espresso focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all cursor-pointer"
                >
                  {EVENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Date & Notes Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="text-xs text-gold-dark font-medium hover:text-espresso flex items-center gap-1.5 transition-colors"
                >
                  <span>{showOptionalFields ? '− Hide additional details' : '+ Add event date & celebration notes'}</span>
                </button>

                {showOptionalFields && (
                  <div className="mt-2.5 space-y-2.5 p-3 rounded bg-beige/30 border border-gold/20 animate-fade-in">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                        Approximate Date / Month
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. November 2026 or Muhurtham day"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-gold/30 rounded text-xs text-espresso focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                        Notes or Venue Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Expected guests, preferred venue in Chennai, decor style..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-gold/30 rounded text-xs text-espresso focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2">
                <Button
                  type="submit"
                  variant="gold"
                  fullWidth
                  size="md"
                  loading={isSubmitting}
                  icon={<ArrowRight size={16} />}
                >
                  REQUEST A CALLBACK
                </Button>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2 text-center text-xs uppercase tracking-wider text-espresso/60 hover:text-espresso transition-colors duration-200"
                >
                  Maybe Later
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="text-center pt-1 border-t border-gold/20">
                <p className="text-[11px] text-espresso/60">
                  Your details will only be used to respond to your enquiry.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
