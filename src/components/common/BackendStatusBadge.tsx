import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, AlertTriangle, RefreshCw, X } from 'lucide-react';
import { checkBackendHealth } from '../../services/enquiryService';

export const BackendStatusBadge: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [details, setDetails] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [localLeadsCount, setLocalLeadsCount] = useState(0);

  const checkStatus = async () => {
    setStatus('checking');
    const result = await checkBackendHealth();
    if (result.online) {
      setStatus('connected');
      setDetails(result.message);
    } else {
      setStatus('disconnected');
      setDetails(result.message);
    }

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('jwp_offline_enquiries');
        const parsed = raw ? JSON.parse(raw) : [];
        setLocalLeadsCount(parsed.length);
      } catch {
        setLocalLeadsCount(0);
      }
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      {/* Small subtle status pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso/90 hover:bg-espresso text-ivory text-[10px] tracking-wider uppercase border border-gold/30 shadow-luxury transition-all backdrop-blur-sm"
        title="Click to check Backend & Architecture status"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            status === 'connected'
              ? 'bg-emerald-400 animate-pulse'
              : status === 'disconnected'
              ? 'bg-amber-400'
              : 'bg-gold animate-spin'
          }`}
        />
        <span className="font-medium text-ivory/90">
          {status === 'connected' ? 'Backend Live' : 'Backend Standby'}
        </span>
      </button>

      {/* Expanded Status Dialog */}
      {isOpen && (
        <div className="absolute bottom-10 left-0 w-80 bg-ivory rounded-md border border-gold/50 shadow-2xl p-4 text-espresso text-xs animate-fade-in space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gold/20">
            <div className="flex items-center gap-1.5 font-bold font-serif text-sm">
              <Database size={14} className="text-gold-dark" />
              <span>System & Lead Architecture</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-espresso/60 hover:text-espresso"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              {status === 'connected' ? (
                <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold text-espresso">
                  {status === 'connected'
                    ? 'Express Backend API Online (Port 5000)'
                    : 'Backend API Not Detected'}
                </p>
                <p className="text-[11px] text-espresso/70 mt-0.5">{details}</p>
              </div>
            </div>

            <div className="p-2.5 rounded bg-white/80 border border-gold/20 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-espresso/70">Offline Staged Enquiries:</span>
                <span className="font-mono font-bold text-espresso">{localLeadsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/70">WhatsApp Failover:</span>
                <span className="font-medium text-emerald-700">Active (+91 95516 12563)</span>
              </div>
            </div>

            <p className="text-[10px] text-espresso/60 leading-relaxed">
              When the local Express server is running (`npm run server`), submissions are validated and recorded into `server/data/enquiries.json`. When offline, visitors receive an explicit status and instant WhatsApp dispatch.
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={checkStatus}
              className="flex items-center gap-1 text-[11px] text-gold-dark hover:text-espresso font-semibold"
            >
              <RefreshCw size={12} className={status === 'checking' ? 'animate-spin' : ''} />
              <span>Re-check Connection</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('jwp_enquiry_dismissed_at');
                localStorage.removeItem('jwp_enquiry_submitted');
                window.location.reload();
              }}
              className="text-[10px] text-espresso/50 hover:text-espresso underline"
            >
              Reset Popup Cooldown
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

