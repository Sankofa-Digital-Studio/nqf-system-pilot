'use client';

import React, { useState } from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { UAT_COHORT_DATA } from '@/lib/uat-live-data';
import { NatedTransitionMatrix } from './NatedTransitionMatrix';
import { SetaClaimModal } from './SetaClaimModal';
import { WorkplaceLogbookModal } from '@/components/common/WorkplaceLogbookModal';

interface ProviderDashboardProps {
  view: string;
  state: any;
  onOpenInvestor: () => void;
  onOpenForm4: () => void;
  toast?: (msg: string, tone?: string) => void;
}

export function ProviderDashboard({
  view,
  state,
  onOpenInvestor,
  onOpenForm4,
  toast
}: ProviderDashboardProps) {
  const [activeTab, setActiveTab] = useState<'cockpit' | 'nated_crosswalk' | 'logbooks'>('cockpit');
  const [selectedCampus, setSelectedCampus] = useState<'all' | 'metro' | 'highlands'>('all');
  const [setaClaimOpen, setSetaClaimOpen] = useState(false);
  const [logbookModalOpen, setLogbookModalOpen] = useState(false);
  const [selectedLogbookLearner, setSelectedLogbookLearner] = useState('lrn-thando');

  const metroLearners = UAT_COHORT_DATA.filter(l => l.cohortId === 'cohort-01');
  const highlandsLearners = UAT_COHORT_DATA.filter(l => l.cohortId === 'cohort-02');

  const displayedLearners = selectedCampus === 'all'
    ? UAT_COHORT_DATA
    : selectedCampus === 'metro'
    ? metroLearners
    : highlandsLearners;

  const totalLogbookHours = displayedLearners.reduce((acc, l) => acc + l.logbookHours, 0);
  const avgReadiness = Math.round(displayedLearners.reduce((acc, l) => acc + l.overallReadiness, 0) / displayedLearners.length);

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

      {/* Primary Role Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '2px solid #e1e8e5',
        paddingBottom: '2px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('cockpit')}
          style={{
            background: activeTab === 'cockpit' ? '#124d43' : '#f4f8f6',
            color: activeTab === 'cockpit' ? '#caec6b' : '#334b46',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '12px 22px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          Institutional Compliance & Grant Cockpit
        </button>

        <button
          onClick={() => setActiveTab('nated_crosswalk')}
          style={{
            background: activeTab === 'nated_crosswalk' ? '#124d43' : '#f4f8f6',
            color: activeTab === 'nated_crosswalk' ? '#caec6b' : '#334b46',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '12px 22px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>NATED-to-QCTO Articulation Matrix</span>
          <span style={{
            background: '#b05d15',
            color: '#ffffff',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 900
          }}>
            Gazette 50742
          </span>
        </button>

        <button
          onClick={() => setActiveTab('logbooks')}
          style={{
            background: activeTab === 'logbooks' ? '#124d43' : '#f4f8f6',
            color: activeTab === 'logbooks' ? '#caec6b' : '#334b46',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '12px 22px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          Host Employer Logbook Matrix (8 Partners)
        </button>
      </div>

      {/* TAB 1: COCKPIT */}
      {activeTab === 'cockpit' && (
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
                onClick={() => setSetaClaimOpen(true)}
                style={{
                  background: '#124d43',
                  color: '#caec6b',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(18, 77, 67, 0.2)'
                }}
              >
                Claim SETA Tranche 2 (R180k) ★
              </button>
              <button
                onClick={onOpenInvestor}
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
                Seed Round Model (R300k)
              </button>
            </div>
          </div>

          {/* SETA Grant Drawdown Milestone Bar */}
          <div style={{ background: '#f8faf9', border: '1px solid #e1e8e5', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#16282e' }}>
                MICT SETA Discretionary Grant Drawdown Schedule (Learnership Contract #LP-2026-7782)
              </strong>
              <button
                onClick={() => setSetaClaimOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#124d43',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Inspect Full Claim Package →
              </button>
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
                  Highlands Tech (3)
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
                    <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Action</th>
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
                        <button
                          onClick={() => {
                            setSelectedLogbookLearner(learner.id);
                            setLogbookModalOpen(true);
                          }}
                          style={{
                            background: '#f4f8f6',
                            color: '#124d43',
                            border: '1px solid #cfdad6',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          View Logbook →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NATED CROSSWALK MATRIX */}
      {activeTab === 'nated_crosswalk' && (
        <NatedTransitionMatrix onOpenForm4={onOpenForm4} toast={toast} />
      )}

      {/* TAB 3: WORKPLACE LOGBOOK DIRECTORY */}
      {activeTab === 'logbooks' && (
        <div style={{ background: '#ffffff', border: '1px solid #dce5e2', borderRadius: '16px', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43' }}>QCTO WEM COMPLIANCE</span>
              <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
                Corporate Host Employer Workplace Directories
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
                Work experience modules (WEM) verified across 8 accredited corporate host employers.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedLogbookLearner('lrn-thando');
                setLogbookModalOpen(true);
              }}
              style={{
                background: '#124d43',
                color: '#caec6b',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Open Active Logbook Inspector →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { name: 'Datatec Solutions', learners: 1, mentor: 'Sipho Zulu', hours: 140, status: 'Active (70%)' },
              { name: 'BCX Africa Support', learners: 1, mentor: 'Kagiso Molefe', hours: 115, status: 'Active (58%)' },
              { name: 'Dimension Data Hub', learners: 1, mentor: 'David Botha', hours: 90, status: 'Revision Active' },
              { name: 'Vodacom Network Operations', learners: 1, mentor: 'Precious Nkosi', hours: 180, status: 'Approved (90%)' },
              { name: 'Altron Digital Services', learners: 1, mentor: 'Tshepo Sithole', hours: 125, status: 'Active (62%)' },
              { name: 'Standard Bank CIB Tech Labs', learners: 1, mentor: 'Johan v.d. Merwe', hours: 160, status: 'Approved (80%)' },
              { name: 'Entelect Software', learners: 1, mentor: 'Mark Davies', hours: 75, status: 'In Progress (38%)' },
              { name: 'First National Bank Core IT', learners: 1, mentor: 'Zanele Ndlovu', hours: 175, status: 'Moderated (88%)' }
            ].map(partner => (
              <div key={partner.name} style={{ border: '1px solid #e1e8e5', borderRadius: '10px', padding: '16px', background: '#fbfcfb' }}>
                <strong style={{ fontSize: '14px', color: '#16282e', display: 'block', marginBottom: '4px' }}>
                  {partner.name}
                </strong>
                <div style={{ fontSize: '12px', color: '#556965', marginBottom: '8px' }}>
                  Designated Mentor: <strong>{partner.mentor}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#738782', marginBottom: '4px' }}>
                  <span>Logged Hours</span>
                  <strong style={{ color: '#124d43' }}>{partner.hours} / 200 hrs</strong>
                </div>
                <div style={{ width: '100%', height: '5px', background: '#e1e8e5', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${(partner.hours / 200) * 100}%`, height: '100%', background: '#124d43' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seta Claim Modal */}
      <SetaClaimModal
        isOpen={setaClaimOpen}
        onClose={() => setSetaClaimOpen(false)}
        toast={toast}
      />

      {/* Workplace Logbook Modal */}
      <WorkplaceLogbookModal
        isOpen={logbookModalOpen}
        onClose={() => setLogbookModalOpen(false)}
        initialLearnerId={selectedLogbookLearner}
        toast={toast}
      />

    </div>
  );
}
