import { EnquiryData, SubmissionResponse } from '../types';

export const BUSINESS_PHONE = '+91 95516 12563';
export const BUSINESS_PHONE_RAW = '919551612563';
export const BUSINESS_ADDRESS = 'Pattalam, Chennai, Tamil Nadu 600012, India';

const INDIAN_PHONE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;

export function validateIndianMobile(phone: string): { isValid: boolean; message?: string } {
  const clean = phone.replace(/[\s\-]/g, '');
  if (!clean) {
    return { isValid: false, message: 'Mobile number is required' };
  }
  if (!INDIAN_PHONE_REGEX.test(clean)) {
    return {
      isValid: false,
      message: 'Please enter a valid 10-digit Indian mobile number (e.g., 9876543210 or +91 9876543210)',
    };
  }
  return { isValid: true };
}

export function validateFullName(name: string): { isValid: boolean; message?: string } {
  const clean = name.trim();
  if (!clean) {
    return { isValid: false, message: 'Full name is required' };
  }
  if (clean.length < 2) {
    return { isValid: false, message: 'Please enter at least 2 characters for your name' };
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(clean)) {
    return { isValid: false, message: 'Name contains invalid characters' };
  }
  return { isValid: true };
}

/**
 * Generates the official click-to-chat WhatsApp link
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMessage =
    'Hello Joyous Wedding Planet! I visited your website and would like to enquire about your wedding and event-planning services. Could you please share more details?';
  const text = customMessage || defaultMessage;
  return `https://wa.me/${BUSINESS_PHONE_RAW}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp URL pre-populated with lead enquiry details
 */
export function getWhatsAppLeadUrl(data: {
  fullName: string;
  mobileNumber: string;
  eventType?: string;
  eventDate?: string;
  notes?: string;
}): string {
  const message = [
    `*Wedding & Event Enquiry — Joyous Wedding Planet*`,
    `----------------------------------------`,
    `*Name:* ${data.fullName}`,
    `*Phone:* ${data.mobileNumber}`,
    `*Event Type:* ${data.eventType || 'Wedding Celebration'}`,
    data.eventDate ? `*Approximate Date:* ${data.eventDate}` : null,
    data.notes ? `*Notes/Requirements:* ${data.notes}` : null,
    `----------------------------------------`,
    `I would love to discuss custom packages and availability for Chennai.`
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${BUSINESS_PHONE_RAW}?text=${encodeURIComponent(message)}`;
}

/**
 * Checks if the backend API service is available
 */
export async function checkBackendHealth(): Promise<{ online: boolean; message: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch('/api/health', {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return { online: true, message: 'Live Express/API backend connected' };
    }
    return { online: false, message: 'Backend returned non-200 status' };
  } catch {
    return { online: false, message: 'Backend service offline or unreachable' };
  }
}

/**
 * Submits enquiry to backend API with fallback reporting
 */
export async function submitEnquiry(
  payload: Omit<EnquiryData, 'timestamp' | 'status'>
): Promise<SubmissionResponse> {
  const submissionTimestamp = new Date().toISOString();
  const fullEnquiry: EnquiryData = {
    ...payload,
    timestamp: submissionTimestamp,
    status: 'new',
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullEnquiry),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const result = await response.json();

    if (response.ok && result.success) {
      // Remember successful submission in localStorage to avoid re-prompting modal
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwp_enquiry_submitted', 'true');
        localStorage.setItem('jwp_last_enquiry_id', result.enquiryId || '');
        localStorage.setItem('jwp_last_enquiry_date', submissionTimestamp);
      }

      return {
        success: true,
        enquiryId: result.enquiryId,
        message: result.message || 'Your enquiry has been successfully registered.',
        backendConnected: true,
        provider: 'local_api',
      };
    } else {
      return {
        success: false,
        message: result.message || 'Server rejected the enquiry. Please verify your details.',
        backendConnected: true,
        provider: 'local_api',
      };
    }
  } catch {
    // When the backend server is not running or unreachable:
    // Follow prompt requirement: "If no backend is configured, explicitly display that the enquiry service is not connected rather than pretending that the enquiry was successfully received."
    
    // Also save in localStorage as an offline queued draft so client lead isn't destroyed
    if (typeof window !== 'undefined') {
      try {
        const queuedRaw = localStorage.getItem('jwp_offline_enquiries');
        const queued: EnquiryData[] = queuedRaw ? JSON.parse(queuedRaw) : [];
        queued.push({
          ...fullEnquiry,
          id: `OFFLINE-${Date.now()}`
        });
        localStorage.setItem('jwp_offline_enquiries', JSON.stringify(queued));
      } catch (e) {
        console.warn('Could not cache offline enquiry', e);
      }
    }

    return {
      success: false,
      backendConnected: false,
      message: 'Notice: Backend enquiry service is not currently connected to a live database. Your request has been staged, and you can instantly dispatch it directly via WhatsApp to our team.',
      provider: 'unconnected',
    };
  }
}

