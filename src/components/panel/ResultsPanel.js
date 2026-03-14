'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

const MOCK_RESULT = {
  location: {
    name: 'Victoria Island',
    subtext: 'Eti-Osa LGA, Lagos',
  },
  risks: {
    flood: { score: 'high', peak_season: 'June – September' },
    heat: { score: 'medium', peak_season: 'February – April' },
    rainfall: { score: 'low', peak_season: 'May – July' },
  },
  explanation:
    'Victoria Island is highly vulnerable to coastal flooding due to its low elevation and proximity to the Atlantic Ocean. Urban density and limited drainage infrastructure exacerbate risk during peak monsoon seasons.',
};

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

export default function ResultsPanel({ isOpen, location, onClose }) {
  const result = MOCK_RESULT;
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
        overflowY: 'auto',
        borderRadius: '16px 16px 0 0',
        overflow: 'hidden',
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
        overflowY: 'auto',
        overflow: 'hidden',
      };

  return (
    <div style={panelStyles}>

      {/* Mobile drag handle */}
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
              {location?.name || result.location.name}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
              {location?.subtext || result.location.subtext}
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-1 p-1.5 rounded-lg transition-colors flex-shrink-0"
            // style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <svg className="w-5 h-5" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* White body */}
      <div style={{ padding: '24px', overflowY: 'auto' }}>

        {/* Risk cards */}
        <div style={{ marginBottom: '24px' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#0D9488' }}>
            Risk Assessment
          </p>
          <div className="flex flex-col gap-3">
            {Object.entries(result.risks).map(([type, data]) => (
              <RiskCard key={type} type={type} data={data} />
            ))}
          </div>
        </div>

        {/* AI explanation */}
        <div style={{ marginBottom: '24px' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#0D9488' }}>
            Climate Insight
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {result.explanation}
          </p>
        </div>

        {/* Attribution */}
        <p className="text-xs text-slate-400 border-t border-gray-100 pt-4">
          Data sourced from NASA SRTM, NASA POWER, and USGS Landsat.
        </p>

      </div>
    </div>
  );
}