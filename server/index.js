import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
}

app.use(cors());
app.use(express.json());

// Server-side validation helpers
const INDIAN_PHONE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;

function validateEnquiry(body) {
  const errors = [];
  const { fullName, mobileNumber, eventType } = body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters.');
  }

  if (!mobileNumber || typeof mobileNumber !== 'string') {
    errors.push('Mobile number is required.');
  } else {
    const cleanNumber = mobileNumber.replace(/[\s\-]/g, '');
    if (!INDIAN_PHONE_REGEX.test(cleanNumber)) {
      errors.push('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210).');
    }
  }

  if (eventType && typeof eventType !== 'string') {
    errors.push('Event type must be a valid text string.');
  }

  return errors;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Joyous Wedding Planet Enquiry API',
    location: 'Chennai, Tamil Nadu',
    timestamp: new Date().toISOString()
  });
});

// Enquiries list endpoint
app.get('/api/enquiries', (req, res) => {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    const enquiries = JSON.parse(rawData || '[]');
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    console.error('Error reading enquiries:', err);
    res.status(500).json({ success: false, message: 'Could not read enquiries database.' });
  }
});

// Enquiries submission endpoint
app.post('/api/enquiries', (req, res) => {
  try {
    const errors = validateEnquiry(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(' '),
        errors
      });
    }

    const { fullName, mobileNumber, eventType, notes, eventDate, sourcePage } = req.body;

    const enquiryRecord = {
      id: `JWP-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`,
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      eventType: eventType ? eventType.trim() : 'Wedding',
      notes: notes ? notes.trim() : '',
      eventDate: eventDate || '',
      submissionTimestamp: new Date().toISOString(),
      sourcePage: sourcePage || 'homepage_modal',
      status: 'new' // 'new' | 'contacted' | 'confirmed' | 'archived'
    };

    // Persist to file
    let enquiries = [];
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        enquiries = JSON.parse(raw || '[]');
      } catch (parseErr) {
        enquiries = [];
      }
    }

    enquiries.unshift(enquiryRecord);
    fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');

    console.log(`[Joyous Wedding Planet] New enquiry registered: ${enquiryRecord.id} from ${enquiryRecord.fullName} (${enquiryRecord.mobileNumber})`);

    return res.status(201).json({
      success: true,
      enquiryId: enquiryRecord.id,
      message: 'Your enquiry has been successfully received. Our wedding planning team in Chennai will contact you shortly.',
      data: enquiryRecord
    });
  } catch (err) {
    console.error('Error handling enquiry submission:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while recording your enquiry. Please contact us directly via WhatsApp or phone.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`✨ Joyous Wedding Planet backend running on http://localhost:${PORT}`);
});

