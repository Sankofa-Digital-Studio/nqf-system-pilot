'use client';

import React from 'react';
import { LearnerState } from '@/types/pilot';
import { MetricCard } from '@/components/common/MetricCard';
import OverviewAccordion from '@/components/OverviewAccordion';
import UnderstandingCheck from '@/components/UnderstandingCheck';
import LessonPractice from '@/components/LessonPractice';

interface LearnerDashboardProps {
  state: LearnerState;
  setState: React.Dispatch<React.SetStateAction<LearnerState>>;
  route: (view: string) => void;
  toast: (msg: string, tone?: string) => void;
  onOpenForm4: () => void;
}

export function LearnerDashboard({
  state,
  setState,
  route,
  toast,
  onOpenForm4
}: LearnerDashboardProps) {
  const [topicOpen, setTopicOpen] = React.useState<boolean>(false);
  const [activePanel, setActivePanel] = React.useState<string>('pathway');

  const readinessPercent = (state.labComplete ? 35 : 10) +
    (state.cognitiveComplete ? 25 : 0) +
    (state.formalSubmitted ? 30 : 0) + 10;

  const nextAction = !state.labComplete ? {
    view: 'lab',
    stage: 'PRACTICAL EVIDENCE · P01',
    label: 'Launch Diagnostic Lab',
    copy: 'Work through the isolated no-display incident safely and submit an auditable job card for lecturer review.',
    meta: 'Est. 20–25 minutes · Prerequisite for reasoning gate'
  } : !state.cognitiveComplete ? {
    view: 'cognitive',
    stage: 'REASONING CHECK · C01',
    label: 'Take Diagnostic Reasoning Check',
    copy: 'Demonstrate hypothesis testing and evidence isolation. The system will identify any concept gaps requiring targeted retrieval.',
    meta: '5 high-impact questions · Formative evaluation'
  } : state.cognitiveScore < 60 ? {
    view: 'cognitive',
    stage: 'TARGETED RETRIEVAL REQUIRED',
    label: 'Complete Concept Gap Exercises',
    copy: 'Your class module pace is preserved. Complete the remediation traces below threshold to unlock formal assessment.',
    meta: 'Lecturer-visible signal · Self-paced retry'
  } : !state.formalSubmitted ? {
    view: 'formal',
    stage: 'FORMAL INTEGRATED TEST · F01',
    label: 'Begin Formal Integrated Assessment',
    copy: 'Your practical and cognitive milestones are verified. Complete the controlled test to generate portfolio evidence.',
    meta: '30 minutes timed · Summative internal check'
  } : {
    view: 'evidence',
    stage: 'PORTFOLIO VERIFIED',
    label: 'View Evidence & Assessor Sign-Off',
    copy: 'Your diagnostic evidence, lecturer feedback, and test attempts are securely logged in the audit trail.',
    meta: 'QCTO portfolio of evidence ready'
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Welcome & Executive Command Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #124d43 0%, #0d342e 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 8px 30px rgba(18, 77, 67, 0.15)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                background: '#caec6b',
                color: '#124d43',
                fontSize: '11px',
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '0.8px'
              }}>
                NQF LEVEL 5 · SAQA 48573
              </span>
              <span style={{ color: '#a6beb9', fontSize: '13px' }}>
                Cohort 01 · Milestone P01 (Hardware Fault Isolation)
              </span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', letterSpacing: '-0.5px' }}>
              Welcome back, Thando Mokoena
            </h1>
            <p style={{ margin: 0, fontSize: '15px', color: '#c5d8d3', maxWidth: '640px', lineHeight: 1.5 }}>
              Build verifiable, auditable occupational evidence. Every observation, diagnostic hypothesis, and safe test feeds directly into your QCTO Portfolio of Evidence.
            </p>
          </div>

          <div style={{
            background: '#ffffff14',
            border: '1px solid #ffffff29',
            borderRadius: '12px',
            padding: '16px 20px',
            textAlign: 'right',
            minWidth: '180px'
          }}>
            <div style={{ fontSize: '12px', color: '#caec6b', fontWeight: 700, textTransform: 'uppercase' }}>
              Internal Readiness
            </div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff', letterSpacing: '-1px' }}>
              {readinessPercent}%
            </div>
            <div style={{ fontSize: '11px', color: '#a6beb9' }}>
              Auditable Formative Progress
            </div>
          </div>
        </div>

        {/* Dynamic Next Action Card */}
        <div style={{
          marginTop: '28px',
          background: '#ffffff',
          color: '#16282e',
          borderRadius: '14px',
          padding: '22px 26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'grid', gap: '4px', maxWidth: '720px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43', letterSpacing: '0.6px' }}>
              {nextAction.stage}
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '2px 0', color: '#16282e' }}>
              {nextAction.label}
            </h3>
            <p style={{ fontSize: '13px', color: '#556965', margin: 0, lineHeight: 1.5 }}>
              {nextAction.copy}
            </p>
            <span style={{ fontSize: '12px', color: '#8aa6a0', fontStyle: 'italic', marginTop: '2px' }}>
              {nextAction.meta}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => route(nextAction.view)}
              style={{
                background: '#caec6b',
                color: '#124d43',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(202, 236, 107, 0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              {nextAction.label} →
            </button>
          </div>
        </div>
      </section>

      {/* 4 Executive Metric Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <MetricCard
          label="Practice Lab Evidence"
          value={state.labComplete ? "1 / 1 Met" : "In Progress"}
          subtext="Auditable job card with safety and diagnostic isolation steps."
          badge={state.labComplete ? "Verified" : "Pending"}
          status={state.labComplete ? "secure" : "developing"}
        />
        <MetricCard
          label="Diagnostic Reasoning"
          value={state.cognitiveComplete ? `${state.cognitiveScore}%` : "Not Attempted"}
          subtext="CBT-informed separation of observed symptoms vs inference."
          badge={state.cognitiveComplete && state.cognitiveScore >= 60 ? "Secure" : "Formative"}
          status={state.cognitiveComplete && state.cognitiveScore >= 60 ? "secure" : "developing"}
        />
        <MetricCard
          label="Formal Assessment Gate"
          value={state.formalSubmitted ? `${state.formalScore}%` : (state.cognitiveComplete && state.cognitiveScore >= 60 ? "Unlocked" : "Gate Blocked")}
          subtext="Controlled 25-minute integrated systems-support evaluation."
          badge={state.formalSubmitted ? "Submitted" : (state.cognitiveScore >= 60 ? "Eligible" : "Prerequisites Open")}
          status={state.formalSubmitted ? "secure" : (state.cognitiveScore >= 60 ? "neutral" : "risk")}
        />
        <MetricCard
          label="SETA Audit Signals"
          value={`${state.signals.length} Active`}
          subtext="Attributed warnings visible to lecturer for pedagogical intervention."
          badge={state.signals.length > 0 ? "Review Needed" : "Clean Audit"}
          status={state.signals.length > 0 ? "developing" : "secure"}
        />
      </section>

      {/* Structured Progression Accordions */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <OverviewAccordion
          title="Module 1: Hardware Fault Isolation & Safety Controls"
          summary="Applied 18-minute interactive foundation (Power, POST, display signal paths)"
          open={activePanel === 'today'}
          onToggle={() => setActivePanel(activePanel === 'today' ? '' : 'today')}
        >
          <div style={{ padding: '20px', background: '#ffffff', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43' }}>P01 FOUNDATION LAB</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '4px 0' }}>1.1 Safe Diagnostic Sequence</h3>
              </div>
              <button
                onClick={onOpenForm4}
                style={{
                  background: '#f4f8f6',
                  border: '1px solid #cfdad6',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#124d43'
                }}
              >
                Inspect QCTO Form 4 Mapping →
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#556965', lineHeight: 1.6 }}>
              A certified technician protects personnel and hardware, tests one variable at a time, and maintains verifiable evidence rather than guessing part replacements.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button
                onClick={() => setTopicOpen(true)}
                style={{
                  background: '#124d43',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Open 18-Minute Lesson & Lab →
              </button>
            </div>
          </div>
        </OverviewAccordion>

        <OverviewAccordion
          title="Evidence-Led Qualification Pathway"
          summary="Track mandatory practical, cognitive and summative milestones"
          open={activePanel === 'pathway'}
          onToggle={() => setActivePanel(activePanel === 'pathway' ? '' : 'pathway')}
        >
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px' }}>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                border: '1px solid #e1e8e5',
                borderRadius: '10px',
                background: state.labComplete ? '#f2f8f5' : '#ffffff'
              }}>
                <div>
                  <span style={{ background: '#124d43', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, marginRight: '8px' }}>
                    P01
                  </span>
                  <strong style={{ fontSize: '14px' }}>Practical Diagnostic Lab: No-Display Incident</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#687e79' }}>
                    Follow signal path, apply ESD controls, and record a testable decision on the live job card.
                  </p>
                </div>
                <button
                  onClick={() => route('lab')}
                  style={{
                    background: state.labComplete ? '#e8f5ee' : '#124d43',
                    color: state.labComplete ? '#124d43' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {state.labComplete ? 'Review Job Card' : 'Launch Lab →'}
                </button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                border: '1px solid #e1e8e5',
                borderRadius: '10px',
                background: state.cognitiveComplete ? '#f2f8f5' : '#ffffff'
              }}>
                <div>
                  <span style={{ background: '#5284a1', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, marginRight: '8px' }}>
                    C01
                  </span>
                  <strong style={{ fontSize: '14px' }}>Diagnostic Reasoning Check</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#687e79' }}>
                    Verify cognitive isolation methods. Unlocks targeted retrieval activities if gaps are detected.
                  </p>
                </div>
                <button
                  onClick={() => route('cognitive')}
                  disabled={!state.labComplete}
                  style={{
                    background: state.cognitiveComplete ? '#e8f5ee' : (!state.labComplete ? '#edf3f0' : '#124d43'),
                    color: state.cognitiveComplete ? '#124d43' : (!state.labComplete ? '#a6beb9' : '#ffffff'),
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: state.labComplete ? 'pointer' : 'not-allowed'
                  }}
                >
                  {state.cognitiveComplete ? `${state.cognitiveScore}% Completed` : 'Take Check →'}
                </button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                border: '1px solid #e1e8e5',
                borderRadius: '10px',
                background: state.formalSubmitted ? '#f2f8f5' : '#ffffff'
              }}>
                <div>
                  <span style={{ background: '#db8a44', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, marginRight: '8px' }}>
                    F01
                  </span>
                  <strong style={{ fontSize: '14px' }}>Formal Integrated Systems-Support Test</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#687e79' }}>
                    Summative internal qualification checkpoint. Pre-qualifier for final EISA registration.
                  </p>
                </div>
                <button
                  onClick={() => route('formal')}
                  disabled={!state.cognitiveComplete || state.cognitiveScore < 60}
                  style={{
                    background: state.formalSubmitted ? '#e8f5ee' : (!state.cognitiveComplete || state.cognitiveScore < 60 ? '#edf3f0' : '#124d43'),
                    color: state.formalSubmitted ? '#124d43' : (!state.cognitiveComplete || state.cognitiveScore < 60 ? '#a6beb9' : '#ffffff'),
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: (state.cognitiveComplete && state.cognitiveScore >= 60) ? 'pointer' : 'not-allowed'
                  }}
                >
                  {state.formalSubmitted ? `${state.formalScore}% Logged` : 'Start Formal Test →'}
                </button>
              </div>
            </div>
          </div>
        </OverviewAccordion>

        <OverviewAccordion
          title="Interactive Educational Understanding Check"
          summary="CBT-informed reflection with real-time lecturer notification"
          open={activePanel === 'understanding'}
          onToggle={() => setActivePanel(activePanel === 'understanding' ? '' : 'understanding')}
        >
          <UnderstandingCheck />
        </OverviewAccordion>
      </section>

      {/* Interactive Lesson Modal */}
      {topicOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8, 28, 24, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: 'min(980px, 96vw)',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button
              onClick={() => setTopicOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                border: 'none',
                background: '#edf3f0',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43' }}>
              P01 · PRACTICAL FOUNDATION · 18 MINUTES
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '8px 0 16px' }}>
              Hardware Fault Isolation & Diagnostic Sequencing
            </h2>
            <LessonPractice onSaved={() => setTopicOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
