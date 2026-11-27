'use client';

import React, { useState } from 'react';
import LecturerControl from '@/components/LecturerControl';
import GradingControl from '@/components/GradingControl';
import { MetricCard } from '@/components/common/MetricCard';
import { UAT_SIGNALS_DATA, UAT_COHORT_DATA, UATSignal } from '@/lib/uat-live-data';

interface LecturerDashboardProps {
  view: string;
  toast: (msg: string, tone?: string) => void;
  onOpenForm4: () => void;
}

export function LecturerDashboard({
  view,
  toast,
  onOpenForm4
}: LecturerDashboardProps) {
  const [signals, setSignals] = useState<UATSignal[]>(UAT_SIGNALS_DATA);

  if (view === 'marking') {
    return <GradingControl />;
  }

  const handleSignalAction = async (id: string, action: 'acknowledged' | 'resolved') => {
    setSignals(prev => prev.map(s => s.id === id ? { ...s, status: action } : s));
    const item = signals.find(s => s.id === id);
    try {
      await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'change_signal',
          input: {
            actorId: 'lecturer-naledi',
            actorRole: 'lecturer',
            learnerId: item?.learnerId || 'lrn-thando',
            signalId: id,
            status: action,
            note: 'Reviewed in Lecturer Signal Governance portal against diagnostic evidence.'
          }
        })
      });
    } catch {}

    toast(`Signal ${id} ${action} by Lecturer Naledi Dube.`, 'success');
  };

  if (view === 'signals') {
    const openSignals = signals.filter(s => s.status !== 'resolved');

    return (
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43', background: '#caec6b', padding: '3px 8px', borderRadius: '4px' }}>
                SETA AUDIT COMPLIANCE & SIGNAL GOVERNANCE
              </span>
              <span style={{ fontSize: '12px', color: '#556965', fontWeight: 600 }}>
                {openSignals.length} Active Formative Warnings Requiring Human Review
              </span>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
              Attributed Formative Signal Governance
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
          {signals.map((sig) => {
            const isResolved = sig.status === 'resolved';
            const isAck = sig.status === 'acknowledged';

            return (
              <div
                key={sig.id}
                style={{
                  background: isResolved ? '#f9fbf9' : '#ffffff',
                  border: '1px solid #e1e8e5',
                  borderLeft: `5px solid ${sig.severity === 'urgent' ? '#c53929' : sig.severity === 'support' ? '#db8a44' : '#2b627f'}`,
                  borderRadius: '10px',
                  padding: '18px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: isResolved ? 0.65 : 1,
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ maxWidth: '800px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '14px', color: '#16282e' }}>{sig.learnerName}</strong>
                    <span style={{
                      background: sig.severity === 'urgent' ? '#fde8e8' : sig.severity === 'support' ? '#fff3e8' : '#eef5f8',
                      color: sig.severity === 'urgent' ? '#c53929' : sig.severity === 'support' ? '#b05d15' : '#2b627f',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase'
                    }}>
                      {sig.severity}
                    </span>
                    <span style={{ fontSize: '11px', color: '#738782' }}>
                      Topic: {sig.topicCode.replaceAll('_', ' ')} · ID: {sig.id}
                    </span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#334b46', fontWeight: 600 }}>
                    {sig.message}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#738782' }}>
                    Status: <strong style={{ textTransform: 'capitalize' }}>{sig.status}</strong> · Telemetry source: Formative diagnostic checkpoint
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isResolved && (
                    <>
                      <button
                        onClick={() => handleSignalAction(sig.id, 'acknowledged')}
                        disabled={isAck}
                        style={{
                          background: isAck ? '#e5ede8' : '#e8f5ee',
                          color: '#124d43',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 14px',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: isAck ? 'default' : 'pointer'
                        }}
                      >
                        {isAck ? 'Acknowledged' : 'Acknowledge'}
                      </button>
                      <button
                        onClick={() => handleSignalAction(sig.id, 'resolved')}
                        style={{
                          background: '#124d43',
                          color: '#caec6b',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 14px',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        Resolve Signal
                      </button>
                    </>
                  )}
                  {isResolved && (
                    <span style={{ color: '#2a9d68', fontSize: '12px', fontWeight: 800 }}>
                      ✓ Signal Resolved
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const avgReadiness = Math.round(UAT_COHORT_DATA.reduce((acc, l) => acc + l.overallReadiness, 0) / UAT_COHORT_DATA.length);
  const openSignalCount = signals.filter(s => s.status !== 'resolved').length;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Executive Cohort Health Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <MetricCard
          label="Active Multi-Campus Cohorts"
          value={`${UAT_COHORT_DATA.length} TVET Learners`}
          subtext="Metro South TVET (Soweto & Alex) + Highlands Tech (Pretoria)."
          badge="Live Roster"
          status="secure"
        />
        <MetricCard
          label="Cohort Average Readiness"
          value={`${avgReadiness}%`}
          subtext="Composite score across P01 & PSM-TEST practical diagnostic labs."
          badge="Developing"
          status="developing"
        />
        <MetricCard
          label="Active Pedagogical Signals"
          value={`${openSignalCount} Flagged`}
          subtext="Cognitive gap events requiring targeted retrieval assignment."
          badge="Action Required"
          status={openSignalCount > 0 ? "risk" : "secure"}
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
