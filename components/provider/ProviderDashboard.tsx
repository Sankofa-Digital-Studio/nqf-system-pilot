'use client';

import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';

interface ProviderDashboardProps {
  view: string;
  state: any;
  onOpenInvestor: () => void;
  onOpenForm4: () => void;
}

export function ProviderDashboard({
  view,
  state,
  onOpenInvestor,
  onOpenForm4
}: ProviderDashboardProps) {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Provider Executive Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <MetricCard
          label="Accredited Programmes"
          value="2 Active"
          subtext="SAQA 48573 (Systems Support) & SAQA 119438 (Software Tester)."
          badge="QCTO Aligned"
          status="secure"
        />
        <MetricCard
          label="Total Cohort Enrollment"
          value="45 Learners"
          subtext="Active learners across 2 partner campuses under learnership grants."
          badge="Funded"
          status="secure"
        />
        <MetricCard
          label="Grant Drawdown Readiness"
          value="R450,000"
          subtext="Available SETA tranche claimable upon verified milestone completion."
          badge="Tranche 2 Ready"
          status="developing"
        />
        <MetricCard
          label="SETA Audit Score"
          value="98.4%"
          subtext="Full regulatory compliance on Form 4 and PoE evidence integrity."
          badge="Exemplary"
          status="secure"
        />
      </section>

      {/* Main Governance & Action Console */}
      <div style={{ background: '#ffffff', border: '1px solid #dce5e2', borderRadius: '16px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43' }}>
              EXECUTIVE PROVIDER GOVERNANCE · AMINA KHAN (GOVERNANCE LEAD)
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
              Institutional Compliance & Grant Drawdown Cockpit
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Monitor institutional delivery health, eliminate audit clawback risks, and export SETA verification packages with one click.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onOpenForm4}
              style={{
                background: '#f4f8f6',
                border: '1px solid #cfdad6',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                color: '#124d43'
              }}
            >
              Export QCTO Form 4 Matrix →
            </button>
            <button
              onClick={onOpenInvestor}
              style={{
                background: '#124d43',
                color: '#caec6b',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Seed Round Model (R300k) →
            </button>
          </div>
        </div>

        {/* Compliance Status Checks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          <div style={{ border: '1px solid #e1e8e5', borderRadius: '12px', padding: '20px', background: '#fbfcfb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '15px' }}>Form 4 Learning Guides</strong>
              <span style={{ background: '#e8f5ee', color: '#124d43', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                Verified
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#556965', lineHeight: 1.5, margin: 0 }}>
              All 5 knowledge modules and 1 practical module have verifiable page-level references mapped to QCTO syllabus annexures.
            </p>
          </div>

          <div style={{ border: '1px solid #e1e8e5', borderRadius: '12px', padding: '20px', background: '#fbfcfb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '15px' }}>Attributable Assessor Sign-Off</strong>
              <span style={{ background: '#e8f5ee', color: '#124d43', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                Independent
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#556965', lineHeight: 1.5, margin: 0 }}>
              Role separation enforced: Lecturers provide formative scoring and support, while registered Assessors validate final PoE artifacts.
            </p>
          </div>

          <div style={{ border: '1px solid #e1e8e5', borderRadius: '12px', padding: '20px', background: '#fbfcfb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '15px' }}>Workplace Logbook Integrity</strong>
              <span style={{ background: '#eef5f8', color: '#2b627f', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                Structured
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#556965', lineHeight: 1.5, margin: 0 }}>
              Logbook modules track mentor evidence and date-stamped activity reports, preparing learners for External Integrated Summative Assessment (EISA).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
