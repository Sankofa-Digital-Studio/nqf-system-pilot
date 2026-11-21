import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  badge?: string;
  status?: 'secure' | 'developing' | 'risk' | 'neutral';
  tooltip?: string;
}

export function MetricCard({
  label,
  value,
  subtext,
  badge,
  status = 'neutral',
  tooltip
}: MetricCardProps) {
  const statusColors = {
    secure: { border: '#124d43', badgeBg: '#e8f5ee', badgeColor: '#124d43' },
    developing: { border: '#db8a44', badgeBg: '#fff3e8', badgeColor: '#b05d15' },
    risk: { border: '#c95b4c', badgeBg: '#fdeeed', badgeColor: '#a62e1e' },
    neutral: { border: '#5284a1', badgeBg: '#eef5f8', badgeColor: '#2b627f' }
  };

  const currentTheme = statusColors[status];

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e1e8e5',
        borderTop: `4px solid ${currentTheme.border}`,
        borderRadius: '12px',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        boxShadow: '0 2px 8px rgba(18, 77, 67, 0.04)',
        position: 'relative'
      }}
      title={tooltip}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#687e79', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          {label}
        </span>
        {badge && (
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            background: currentTheme.badgeBg,
            color: currentTheme.badgeColor,
            padding: '2px 8px',
            borderRadius: '999px'
          }}>
            {badge}
          </span>
        )}
      </div>

      <div style={{ fontSize: '28px', fontWeight: 900, color: '#16282e', letterSpacing: '-0.5px', marginTop: '2px' }}>
        {value}
      </div>

      {subtext && (
        <p style={{ margin: 0, fontSize: '12px', color: '#687e79', lineHeight: 1.4 }}>
          {subtext}
        </p>
      )}
    </div>
  );
}
