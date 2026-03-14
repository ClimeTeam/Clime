'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

const RISK_CONFIG = {
  high: {
    label: 'HIGH',
    cardClass: 'bg-red-50 border-red-100',
    iconClass: 'text-red-500',
    badgeClass: 'bg-red-100 text-red-600',
  },
  medium: {
    label: 'MEDIUM',
    cardClass: 'bg-amber-50 border-amber-100',
    iconClass: 'text-amber-500',
    badgeClass: 'bg-amber-100 text-amber-600',
  },
  low: {
    label: 'LOW',
    cardClass: 'bg-green-50 border-green-100',
    iconClass: 'text-green-500',
    badgeClass: 'bg-green-100 text-green-600',
  },
};

const RISK_LABELS = {
  flood: 'Flood Risk',
  heat: 'Heat Stress Risk',
  rainfall: 'Rainfall Severity',
};

const RISK_ICONS = {
  flood: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  heat: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07l-.7.7M6.34 17.66l-.7.7m12.02 0l-.7-.7M6.34 6.34l-.7-.7M12 7a5 5 0 100 10A5 5 0 0012 7z" />
    </svg>
  ),
  rainfall: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
};

function RiskCard({ type, data }) {
  const config = RISK_CONFIG[data.score];

  return (
    <div className={`rounded-xl border p-4 ${config.cardClass}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={config.iconClass}>
            {RISK_ICONS[type]}
          </span>
          <span className="text-sm font-medium text-slate-800">
            {RISK_LABELS[type]}
          </span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.badgeClass}`}>
          {config.label}
        </span>
      </div>
      {data.peak_season && (
        <p className="text-xs text-slate-500 mt-2 ml-8">
          Peak intensity: {data.peak_season}
        </p>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="h-4 bg-slate-100 rounded w-32 mb-2" />
      <div className="h-20 bg-slate-100 rounded-xl" />
      <div className="h-20 bg-slate-100 rounded-xl" />
      <div className="h-20 bg-slate-100 rounded-xl" />
      <div className="h-4 bg-slate-100 rounded w-32 mt-4 mb-2" />
      <div className="h-16 bg-slate-100 rounded-xl" />
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  );
}

export default function ResultsPanel({ isOpen, location, riskData, isLoading, error, onClose }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const panelStyles = isMobile
    ? {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70%',
        backgroundColor: 'white',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000,
        overflowX: 'hidden',
        overflowY: 'auto',
        borderRadius: '16px 16px 0 0',
      }
    : {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: '380px',
        backgroundColor: 'white',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000,
        overflowX: 'hidden',
        overflowY: 'hidden',
      };

  return (
    <div style={panelStyles}>

      {isMobile && (
        <div className="flex justify-center pt-3 pb-1" style={{ backgroundColor: '#1C3A4A' }}>
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
        </div>
      )}

      {/* Dark teal header */}
      <div style={{ backgroundColor: '#1C3A4A', padding: '24px' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
              {location?.name || 'Loading...'}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
              {location?.subtext || ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-1 p-1.5 rounded-lg transition-colors flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <svg className="w-5 h-5" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ padding: '24px', overflowY: 'auto', height: 'calc(100% - 100px)' }}>

        {isLoading && <LoadingSkeleton />}

        {!isLoading && error && <ErrorState message={error} />}

        {!isLoading && !error && riskData && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#0D9488' }}>
                Risk Assessment
              </p>
              <div className="flex flex-col gap-3">
                {Object.entries(riskData.risks).map(([type, data]) => (
                  <RiskCard key={type} type={type} data={data} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#0D9488' }}>
                Climate Insight
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {riskData.explanation}
              </p>
            </div>

            <p className="text-xs text-slate-400 border-t border-gray-100 pt-4">
              Data sourced from NASA SRTM, NASA POWER, and USGS Landsat.
            </p>
          </>
        )}

        {!isLoading && !error && !riskData && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-slate-400">
              Select a location to see its climate risk profile.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}