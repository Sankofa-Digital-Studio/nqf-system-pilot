'use client';

import React from 'react';
import LecturerControl from '@/components/LecturerControl';
import GradingControl from '@/components/GradingControl';
import { MetricCard } from '@/components/common/MetricCard';

interface LecturerDashboardProps {
  view: string;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  toast: (msg: string, tone?: string) => void;
  onOpenForm4: () => void;
}

export function LecturerDashboard({
  view,
  state,
  setState,
  toast,
  onOpenForm4
}: LecturerDashboardProps) {
  if (view === 'marking') {
    return <GradingControl />;
  }

  if (view === 'signals') {
    return (
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43', letterSpacing: '0.6px' }}>
              SETA AUDIT COMPLIANCE & OBSERVABLE BEHAVIOUR
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '6px 0', color: '#16282e' }}>
              Formative Signal Governance
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Observable learning events flagged for lecturer action. In an accredited occupational programme, AI or automation cannot replace lecturer review.
            </p>
          </div>
          <button
            onClick={onOpenForm4}
            style={{
              background: '#f4f8f6',
              border: '1px solid #cfdad6',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              color: '#124d43'
            }}
          >
            Inspect Form 4 Mapping →
          </button>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {state.signals.map((sig: string, idx: number) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e1e8e5',
                borderLeft: '4px solid #db8a44',
                borderRadius: '10px',
                padding: '18px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong style={{ fontSize: '14px', color: '#16282e' }}>{sig}</strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#687e79' }}>
                  Source: Formative cognitive check telemetry · Requires attributable human intervention.
                </p>
              </div>
              <button
                onClick={() => toast('Signal acknowledged by Lecturer Naledi Dube.', 'success')}
                style={{
                  background: '#e8f5ee',
                  color: '#124d43',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Acknowledge Review
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Executive Cohort Health Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <MetricCard
          label="Active Cohort"
          value="4 Learners"
          subtext="Cohort 01 (TVET Metro South) enrolled on SAQA 48573."
          badge="In Progress"
          status="secure"
        />
        <MetricCard
          label="Cohort Average Readiness"
          value="61.5%"
          subtext="Composite score across P01 hardware diagnostic labs."
          badge="Developing"
          status="developing"
        />
        <MetricCard
          label="Active Warnings & Signals"
          value="3 Flagged"
          subtext="Cognitive gap events requiring targeted retrieval assignment."
          badge="Action Required"
          status="risk"
        />
        <MetricCard
          label="Form 4 Curriculum Coverage"
          value="100% Mapped"
          subtext="Knowledge and practical tasks pre-aligned to QCTO matrix."
          badge="Accredited"
          status="secure"
        />
      </section>

      {/* Main Lecturer Control Component */}
      <LecturerControl focus={view === 'interventions' ? 'interventions' : 'cohort'} />
    </div>
  );
}
