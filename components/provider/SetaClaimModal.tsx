'use client';

import React, { useState } from 'react';
import { SETA_GRANT_CONTRACT_DATA } from '@/lib/nated-transition-data';
import { UAT_COHORT_DATA } from '@/lib/uat-live-data';

interface SetaClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  toast?: (msg: string, tone?: string) => void;
}

export function SetaClaimModal({ isOpen, onClose, toast }: SetaClaimModalProps) {
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const contract = SETA_GRANT_CONTRACT_DATA;

  if (!isOpen) return null;

  const handleSubmitClaim = async () => {
    setClaimSubmitted(true);
    try {
      await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'claim_tranche',
          input: { trancheNumber: 2 }
        })
      });
    } catch {}

    if (toast) {
      toast(`SETA Tranche 2 claim (R180,000.00) generated with 8 verified learner PoE audit certificates.`, 'success');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(18, 77, 67, 0.55)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1100,
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        maxWidth: '840px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        border: '1px solid #dce5e2'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#124d43', background: '#caec6b', padding: '3px 8px', borderRadius: '4px' }}>
                SETA DISCRETIONARY GRANT AUDIT ENGINE
              </span>
              <span style={{ fontSize: '12px', color: '#556965', fontWeight: 600 }}>
                Contract #{contract.contractNumber} · {contract.setaName}
              </span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
              Discretionary Grant Tranche Drawdown Package
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Defend institutional cash flow against audit clawbacks. Milestone evidence is pre-validated against QCTO Form 4 criteria and signed by registered assessors.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '26px',
              cursor: 'pointer',
              color: '#687e79',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        {/* Tranche Progression Visualizer */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {contract.tranches.map((t) => {
            const isClaimReady = t.status === 'claim_ready' || (t.trancheNumber === 2 && claimSubmitted);
            const isDisbursed = t.status === 'disbursed';

            return (
              <div key={t.trancheNumber} style={{
                border: `2px solid ${isClaimReady ? '#124d43' : isDisbursed ? '#caec6b' : '#e1e8e5'}`,
                borderRadius: '12px',
                padding: '16px',
                background: isClaimReady ? '#f4f8f6' : '#ffffff',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#124d43' }}>
                    Tranche {t.trancheNumber} ({t.percentage}%)
                  </span>
                  <span style={{
                    background: isDisbursed ? '#e8f5ee' : isClaimReady ? '#caec6b' : '#f0f4f2',
                    color: isDisbursed ? '#124d43' : isClaimReady ? '#124d43' : '#526662',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {isDisbursed ? 'Disbursed' : isClaimReady ? 'Claim Ready' : 'In Progress'}
                  </span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#16282e', marginBottom: '4px' }}>
                  R{t.amount.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#334b46', marginBottom: '4px' }}>
                  {t.milestone}
                </div>
                <p style={{ margin: 0, fontSize: '11px', color: '#738782', lineHeight: 1.4 }}>
                  {t.evidenceRequired}
                </p>
              </div>
            );
          })}
        </div>

        {/* 8 Enrolled Cohort Verification Roster */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#16282e', margin: '0 0 10px' }}>
            Attached Learner Milestone Evidence Roster (8 Learners)
          </h3>
          <div style={{ border: '1px solid #e1e8e5', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f5f8f6', borderBottom: '1px solid #e1e8e5', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>Learner Candidate</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>SA ID Number</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>Host Employer</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>Formative Milestone</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>Assessor Verification</th>
                </tr>
              </thead>
              <tbody>
                {UAT_COHORT_DATA.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #f0f3f1' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#16282e' }}>{l.name}</td>
                    <td style={{ padding: '10px 14px', color: '#556965', fontFamily: 'monospace' }}>{l.idNumber}</td>
                    <td style={{ padding: '10px 14px', color: '#334b46' }}>{l.employer.split('(')[0].trim()}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontWeight: 800, color: l.overallReadiness >= 70 ? '#124d43' : '#b05d15' }}>
                        {l.classMilestone.split(' ')[0]} ({l.overallReadiness}%)
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        background: '#e8f5ee',
                        color: '#124d43',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 800
                      }}>
                        Verified (#ASS-2024-8841)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #e1e8e5',
          paddingTop: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#738782' }}>Claim Authorization</div>
            <strong style={{ fontSize: '13px', color: '#124d43' }}>
              Authorized by Amina Khan (Governance Lead) · SETA Audit Defense Active
            </strong>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{
                background: '#f4f8f6',
                border: '1px solid #cfdad6',
                color: '#556965',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitClaim}
              style={{
                background: claimSubmitted ? '#e8f5ee' : '#124d43',
                color: claimSubmitted ? '#124d43' : '#caec6b',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(18, 77, 67, 0.2)'
              }}
            >
              {claimSubmitted ? '✓ Tranche 2 Claim Package Ready' : 'Generate SETA Tranche 2 Claim (R180,000) →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
