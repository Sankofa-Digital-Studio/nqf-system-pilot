'use client';

import React, { useState } from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { UAT_COHORT_DATA } from '@/lib/uat-live-data';

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
  const [auditExported, setAuditExported] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<'all' | 'metro' | 'highlands'>('all');

  const metroLearners = UAT_COHORT_DATA.filter(l => l.cohortId === 'cohort-01');
  const highlandsLearners = UAT_COHORT_DATA.filter(l => l.cohortId === 'cohort-02');

  const displayedLearners = selectedCampus === 'all'
    ? UAT_COHORT_DATA
    : selectedCampus === 'metro'
    ? metroLearners
    : highlandsLearners;

  const totalLogbookHours = displayedLearners.reduce((acc, l) => acc + l.logbookHours, 0);
  const avgReadiness = Math.round(displayedLearners.reduce((acc, l) => acc + l.overallReadiness, 0) / displayedLearners.length);

  const handleExportAudit = () => {
    setAuditExported(true);
    setTimeout(() => setAuditExported(false), 5000);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Provider Executive Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <MetricCard
          label="Accredited Programmes"
          value="2 Qualifications"
          subtext="SAQA 48573 (Systems Support L5) & SAQA 119438 (Software Tester L5)."
          badge="QCTO Aligned"
          status="secure"
        />
        <MetricCard
          label="Total Cohort Enrollment"
          value={`${UAT_COHORT_DATA.length} TVET Learners`}
          subtext="Active learners across Soweto, Alexandra, Pretoria & Centurion."
          badge="Grant Funded"
          status="secure"
        />
        <MetricCard
          label="Grant Drawdown Readiness"
          value="R330,000 / R450,000"
          subtext="Tranche 1 Disbursed (R150k) + Tranche 2 Ready for Release (R180k)."
          badge="Tranche 2 Ready"
          status="developing"
        />
        <MetricCard
          label="SETA Audit Score"
          value="98.4%"
          subtext="Zero compliance findings. Full Form 4 and PoE evidence integrity."
          badge="Exemplary"
          status="secure"
        />
      </section>

      {/* Main Governance & Action Console */}
      <div style={{ background: '#ffffff', border: '1px solid #dce5e2', borderRadius: '16px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43', background: '#caec6b', padding: '3px 8px', borderRadius: '4px' }}>
                EXECUTIVE PROVIDER GOVERNANCE
              </span>
              <span style={{ fontSize: '12px', color: '#556965', fontWeight: 600 }}>
                Amina Khan · Quality & Governance Lead · Accredited Skills Development Provider
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
              Institutional Compliance & Grant Drawdown Cockpit
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Monitor institutional delivery health across partner TVET campuses, eliminate audit clawback risks, and export SETA verification packages with one click.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
              onClick={handleExportAudit}
              style={{
                background: auditExported ? '#e8f5ee' : '#ffffff',
                border: '1px solid #124d43',
                color: '#124d43',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {auditExported ? '✓ SETA Bundle Generated' : 'One-Click SETA Audit Export'}
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
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(18, 77, 67, 0.2)'
              }}
            >
              Seed Round Model (R300k) ★
            </button>
          </div>
        </div>

        {/* SETA Grant Drawdown Milestone Bar */}
        <div style={{ background: '#f8faf9', border: '1px solid #e1e8e5', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <strong style={{ fontSize: '14px', color: '#16282e' }}>
              MICT SETA Discretionary Grant Drawdown Schedule (Learnership Contract #LP-2026-7782)
            </strong>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#124d43' }}>
              R330,000 / R450,000 Drawdown Value Secure
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {/* Tranche 1 */}
            <div style={{ background: '#ffffff', border: '1px solid #dce5e2', borderRadius: '8px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#124d43' }}>Tranche 1: Induction & Enrolment</span>
                <span style={{ background: '#e8f5ee', color: '#124d43', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                  Disbursed
                </span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#16282e' }}>R150,000</div>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#738782' }}>
                All 8 learners verified on SETA Learner Management System (LMIS).
              </p>
            </div>

            {/* Tranche 2 */}
            <div style={{ background: '#ffffff', border: '2px solid #caec6b', borderRadius: '8px', padding: '14px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#124d43' }}>Tranche 2: Formative Milestones</span>
                <span style={{ background: '#caec6b', color: '#124d43', fontSize: '10px', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>
                  Claim Ready
                </span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#124d43' }}>R180,000</div>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#556965' }}>
                P01 & PSM-TEST practical assessments verified by Assessor Peter Jacobs.
              </p>
            </div>

            {/* Tranche 3 */}
            <div style={{ background: '#ffffff', border: '1px solid #dce5e2', borderRadius: '8px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#738782' }}>Tranche 3: Logbook & EISA</span>
                <span style={{ background: '#f0f4f2', color: '#526662', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                  In Progress (74%)
                </span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#738782' }}>R120,000</div>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#738782' }}>
                Host employer workplace mentor sign-off in progress across 8 employers.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Campus Cohort Audit Breakdown */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0, color: '#16282e' }}>
                Partner Campus & Host Employer Verification Matrix
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#556965' }}>
                Live cross-qualification status: Total logged workplace hours: {totalLogbookHours} hrs · Average readiness: {avgReadiness}%
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSelectedCampus('all')}
                style={{
                  background: selectedCampus === 'all' ? '#124d43' : '#f4f8f6',
                  color: selectedCampus === 'all' ? '#caec6b' : '#334b46',
                  border: '1px solid #cfdad6',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All Campuses (8)
              </button>
              <button
                onClick={() => setSelectedCampus('metro')}
                style={{
                  background: selectedCampus === 'metro' ? '#124d43' : '#f4f8f6',
                  color: selectedCampus === 'metro' ? '#caec6b' : '#334b46',
                  border: '1px solid #cfdad6',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Metro South TVET (5)
              </button>
              <button
                onClick={() => setSelectedCampus('highlands')}
                style={{
                  background: selectedCampus === 'highlands' ? '#124d43' : '#f4f8f6',
                  color: selectedCampus === 'highlands' ? '#caec6b' : '#334b46',
                  border: '1px solid #cfdad6',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Highlands Tech Institute (3)
              </button>
            </div>
          </div>

          <div style={{ border: '1px solid #e1e8e5', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f5f8f6', borderBottom: '1px solid #e1e8e5', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Learner & SA ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Campus & Cohort</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Host Employer Partner</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Logbook Hours</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Readiness</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>PoE Audit State</th>
                </tr>
              </thead>
              <tbody>
                {displayedLearners.map(learner => (
                  <tr key={learner.id} style={{ borderBottom: '1px solid #f0f3f1' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 800, color: '#16282e' }}>{learner.name}</div>
                      <div style={{ fontSize: '11px', color: '#738782' }}>ID: {learner.idNumber}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#334b46' }}>
                      <div style={{ fontWeight: 600 }}>{learner.campus}</div>
                      <div style={{ fontSize: '11px', color: '#738782' }}>SAQA {learner.qualificationId}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#16282e', fontWeight: 600 }}>
                      {learner.employer}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 800, color: '#124d43' }}>
                        {learner.logbookHours} / 200 hrs
                      </div>
                      <div style={{ width: '100px', height: '5px', background: '#e5ebe8', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${(learner.logbookHours / 200) * 100}%`, height: '100%', background: '#124d43' }} />
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontWeight: 800, color: learner.overallReadiness >= 70 ? '#124d43' : learner.overallReadiness >= 50 ? '#b05d15' : '#c53929' }}>
                        {learner.overallReadiness}%
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        background: learner.poeStatus === 'moderated' ? '#e8f5ee' : learner.poeStatus === 'assessor_approved' ? '#f0f9e8' : learner.poeStatus === 'submitted' ? '#eef5f8' : '#fff3e8',
                        color: learner.poeStatus === 'moderated' ? '#124d43' : learner.poeStatus === 'assessor_approved' ? '#2e6b12' : learner.poeStatus === 'submitted' ? '#2b627f' : '#b05d15',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 800
                      }}>
                        {learner.poeStatus === 'moderated' ? 'Moderated ✓' : learner.poeStatus === 'assessor_approved' ? 'Assessor Approved' : learner.poeStatus === 'submitted' ? 'Submitted' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                Structured (8 Employers)
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#556965', lineHeight: 1.5, margin: 0 }}>
              Logbook modules track mentor evidence and date-stamped activity reports across Datatec, BCX, Dimension Data, Vodacom, and Standard Bank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
