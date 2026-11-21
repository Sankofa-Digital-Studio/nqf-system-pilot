'use client';

import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';

interface AssessorDashboardProps {
  view: string;
  state: any;
  toast: (msg: string, tone?: string) => void;
  onOpenForm4: () => void;
}

export function AssessorDashboard({
  view,
  state,
  toast,
  onOpenForm4
}: AssessorDashboardProps) {
  const [activeTab, setActiveTab] = React.useState<string>('queue');

  const candidates = [
    { id: 'lrn-thando', name: 'Thando Mokoena', artifact: 'P01 Diagnostic Job Card', score: '75% Met', status: 'Pending Assessor Stamp' },
    { id: 'lrn-lerato', name: 'Lerato Ndlovu', artifact: 'P01 Diagnostic Job Card', score: '62% Developing', status: 'Evidence Returned' },
    { id: 'lrn-sipho', name: 'Sipho Mahlangu', artifact: 'F01 Summative Pre-Qualifier', score: '54% Gap', status: 'Remediation Active' },
    { id: 'lrn-boitumelo', name: 'Boitumelo Maseko', artifact: 'P01 Diagnostic Job Card', score: '88% Secure', status: 'Assessor Approved' }
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Assessor Executive Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <MetricCard
          label="Verification Queue"
          value="4 Submissions"
          subtext="Attributable evidence packages awaiting registered assessor review."
          badge="Ready"
          status="developing"
        />
        <MetricCard
          label="SETA Audit Compliance"
          value="96.2%"
          subtext="Adherence to authentic, current, valid and sufficient evidence rules."
          badge="Compliant"
          status="secure"
        />
        <MetricCard
          label="Moderation Sample Size"
          value="25% Target"
          subtext="Pre-configured sample quota for internal moderator sampling."
          badge="Sample Met"
          status="secure"
        />
        <MetricCard
          label="Avg Decision Turnaround"
          value="1.4 Days"
          subtext="Assessor feedback timeline within QCTO standard operating norms."
          badge="Optimal"
          status="neutral"
        />
      </section>

      {/* Main Evidence Review Panel */}
      <div style={{ background: '#ffffff', border: '1px solid #dce5e2', borderRadius: '16px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43' }}>
              REGISTERED OCCUPATIONAL ASSESSOR (PETER JACOBS)
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
              Portfolio of Evidence (PoE) Verification Queue
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Independent assessment judgment. In QCTO occupational programmes, the Assessor acts independently from the formative Lecturer.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
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
              Verify Form 4 Criteria →
            </button>
          </div>
        </div>

        {/* Evidence Table */}
        <div style={{ border: '1px solid #e1e8e5', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f5f8f6', borderBottom: '1px solid #e1e8e5', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Learner Candidate</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Portfolio Artifact</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Provisional Score</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Audit Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((cand) => (
                <tr key={cand.id} style={{ borderBottom: '1px solid #f0f3f1' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#16282e' }}>
                    {cand.name}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#556965' }}>
                    {cand.artifact}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    {cand.score}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: cand.status.includes('Approved') ? '#e8f5ee' : cand.status.includes('Returned') ? '#fff3e8' : '#eef5f8',
                      color: cand.status.includes('Approved') ? '#124d43' : cand.status.includes('Returned') ? '#b05d15' : '#2b627f',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {cand.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => toast(`Evidence for ${cand.name} stamped and logged to cryptographic audit trail.`, 'success')}
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
                      Audit & Stamp
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
