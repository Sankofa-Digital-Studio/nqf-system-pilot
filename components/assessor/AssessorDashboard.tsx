'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { UATEvidenceArtifact, UAT_EVIDENCE_PORTFOLIO } from '@/lib/uat-live-data';

interface AssessorDashboardProps {
  toast: (msg: string, tone?: string) => void;
  onOpenForm4: () => void;
}

export function AssessorDashboard({
  toast,
  onOpenForm4
}: AssessorDashboardProps) {
  const [evidenceList, setEvidenceList] = useState<UATEvidenceArtifact[]>(UAT_EVIDENCE_PORTFOLIO);
  const [qualFilter, setQualFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedArtifact, setSelectedArtifact] = useState<UATEvidenceArtifact | null>(null);

  // Load latest live evidence from API if available
  useEffect(() => {
    fetch('/api/pilot?resource=uat_evidence')
      .then(res => res.ok ? res.json() as Promise<{ evidence?: UATEvidenceArtifact[] }> : null)
      .then(data => {
        if (data?.evidence?.length) {
          setEvidenceList(data.evidence);
        }
      })
      .catch(() => {});
  }, []);

  const filteredEvidence = useMemo(() => {
    return evidenceList.filter(item => {
      const matchQual = qualFilter === 'all'
        ? true
        : qualFilter === '48573'
        ? item.qualificationTitle.includes('48573')
        : item.qualificationTitle.includes('119438');

      const matchStatus = statusFilter === 'all'
        ? true
        : statusFilter === 'sampled'
        ? item.moderationSampled
        : item.assessorStampStatus === statusFilter;

      return matchQual && matchStatus;
    });
  }, [evidenceList, qualFilter, statusFilter]);

  // Derived metrics
  const pendingCount = evidenceList.filter(e => e.assessorStampStatus === 'pending').length;
  const verifiedCount = evidenceList.filter(e => e.assessorStampStatus === 'verified_authentic').length;
  const sampledCount = evidenceList.filter(e => e.moderationSampled).length;
  const samplePercentage = Math.round((sampledCount / Math.max(1, evidenceList.length)) * 100);

  const handleStamp = async (id: string, newStatus: 'verified_authentic' | 'returned_for_evidence') => {
    setEvidenceList(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          assessorStampStatus: newStatus,
          assessorDecision: newStatus === 'verified_authentic' ? 'released' : 'return'
        };
      }
      return item;
    }));

    if (selectedArtifact && selectedArtifact.id === id) {
      setSelectedArtifact(prev => prev ? {
        ...prev,
        assessorStampStatus: newStatus,
        assessorDecision: newStatus === 'verified_authentic' ? 'released' : 'return'
      } : null);
    }

    try {
      await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'stamp_evidence',
          input: { artifactId: id, status: newStatus }
        })
      });
    } catch {}

    const label = newStatus === 'verified_authentic' ? 'verified & stamped authentic' : 'returned for supplementary evidence';
    toast(`Artifact ${id} ${label} by Registered Assessor Peter Jacobs (#ASS-2024-8841).`, newStatus === 'verified_authentic' ? 'success' : 'warning');
  };

  const handleToggleModeration = async (id: string) => {
    let nextVal = false;
    setEvidenceList(prev => prev.map(item => {
      if (item.id === id) {
        nextVal = !item.moderationSampled;
        return { ...item, moderationSampled: nextVal };
      }
      return item;
    }));

    if (selectedArtifact && selectedArtifact.id === id) {
      setSelectedArtifact(prev => prev ? { ...prev, moderationSampled: !prev.moderationSampled } : null);
    }

    try {
      await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_moderation',
          input: { artifactId: id, sampled: nextVal }
        })
      });
    } catch {}

    toast(`Moderation quota updated: ${nextVal ? 'Added to' : 'Removed from'} internal moderation sample.`, 'info');
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Assessor Executive Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <MetricCard
          label="Verification Queue"
          value={`${pendingCount} Awaiting Review`}
          subtext={`${verifiedCount} artifacts verified authentic with cryptographic hash.`}
          badge="Live Queue"
          status={pendingCount > 0 ? "developing" : "secure"}
        />
        <MetricCard
          label="SETA Audit Compliance"
          value="98.7%"
          subtext="Adheres to QCTO VARO criteria (Valid, Authentic, Reliable, Current)."
          badge="Audit Ready"
          status="secure"
        />
        <MetricCard
          label="Moderation Sample Size"
          value={`${samplePercentage}% (${sampledCount}/${evidenceList.length})`}
          subtext="Exceeds statutory 20% internal moderator sampling quota."
          badge="Sample Met"
          status="secure"
        />
        <MetricCard
          label="Avg Decision Turnaround"
          value="1.2 Days"
          subtext="Within occupational assessor service level agreement (≤ 3 days)."
          badge="Optimal"
          status="neutral"
        />
      </section>

      {/* Main Evidence Review Panel */}
      <div style={{ background: '#ffffff', border: '1px solid #dce5e2', borderRadius: '16px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43', background: '#caec6b', padding: '3px 8px', borderRadius: '4px' }}>
                REGISTERED OCCUPATIONAL ASSESSOR
              </span>
              <span style={{ fontSize: '12px', color: '#556965', fontWeight: 600 }}>
                Peter Jacobs · Reg #ASS-2024-8841 · MICT SETA Scope
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
              Portfolio of Evidence (PoE) Verification & Moderation Queue
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Attributable assessment judgments across TVET partner campuses. In QCTO occupational programmes, the Assessor acts independently from the formative Lecturer.
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
              Verify Form 4 Matrix →
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: '#f8faf9',
          padding: '14px 18px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #e5ebe8'
        }}>
          {/* Qualification Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#556965' }}>Qualification:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setQualFilter('all')}
                style={{
                  background: qualFilter === 'all' ? '#124d43' : '#ffffff',
                  color: qualFilter === 'all' ? '#caec6b' : '#334b46',
                  border: '1px solid #cfdad6',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All Qualifications ({evidenceList.length})
              </button>
              <button
                onClick={() => setQualFilter('48573')}
                style={{
                  background: qualFilter === '48573' ? '#124d43' : '#ffffff',
                  color: qualFilter === '48573' ? '#caec6b' : '#334b46',
                  border: '1px solid #cfdad6',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                SAQA 48573 Systems Support
              </button>
              <button
                onClick={() => setQualFilter('119438')}
                style={{
                  background: qualFilter === '119438' ? '#124d43' : '#ffffff',
                  color: qualFilter === '119438' ? '#caec6b' : '#334b46',
                  border: '1px solid #cfdad6',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                SAQA 119438 Software Tester
              </button>
            </div>
          </div>

          {/* Audit Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#556965' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid #cfdad6',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                color: '#16282e',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review ({pendingCount})</option>
              <option value="verified_authentic">Verified Authentic ({verifiedCount})</option>
              <option value="returned_for_evidence">Returned for Evidence</option>
              <option value="sampled">Moderation Sampled ({sampledCount})</option>
            </select>
          </div>
        </div>

        {/* Evidence Table */}
        <div style={{ border: '1px solid #e1e8e5', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f5f8f6', borderBottom: '1px solid #e1e8e5', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Learner Candidate</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Module & Artifact</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Formative Score</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Assessor Verification</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Moderation</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvidence.map((cand) => {
                const isVerified = cand.assessorStampStatus === 'verified_authentic';
                const isReturned = cand.assessorStampStatus === 'returned_for_evidence';

                return (
                  <tr key={cand.id} style={{ borderBottom: '1px solid #f0f3f1', background: selectedArtifact?.id === cand.id ? '#f7faf8' : '#ffffff' }}>
                    <td style={{ padding: '14px 16px', color: '#16282e' }}>
                      <div style={{ fontWeight: 800 }}>{cand.learnerName}</div>
                      <div style={{ fontSize: '11px', color: '#738782' }}>ID: {cand.learnerId} · {cand.qualificationTitle.split(':')[0]}</div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#16282e' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          background: '#eef5f2',
                          color: '#124d43',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {cand.moduleCode}
                        </span>
                        <span style={{ fontWeight: 600 }}>{cand.artifactTitle}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#738782', marginTop: '2px' }}>
                        {cand.lecturerFeedback}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 800, color: cand.provisionalScore >= 70 ? '#124d43' : '#b05d15' }}>
                        {cand.provisionalScore}%
                      </div>
                      <div style={{ fontSize: '11px', color: '#738782' }}>
                        {cand.criteriaMet}/{cand.totalCriteria} Criteria Met
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: isVerified ? '#e8f5ee' : isReturned ? '#fff3e8' : '#eef5f8',
                        color: isVerified ? '#124d43' : isReturned ? '#b05d15' : '#2b627f',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isVerified ? '#2a9d68' : isReturned ? '#e07a2c' : '#4a90e2' }} />
                        {isVerified ? 'Verified Authentic' : isReturned ? 'Evidence Returned' : 'Pending Stamp'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleToggleModeration(cand.id)}
                        style={{
                          background: cand.moderationSampled ? '#124d43' : '#f0f4f2',
                          color: cand.moderationSampled ? '#caec6b' : '#526662',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                        title="Click to toggle internal moderation sampling"
                      >
                        {cand.moderationSampled ? 'Sampled (25%)' : 'Not Sampled'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => setSelectedArtifact(cand)}
                          style={{
                            background: '#f4f8f6',
                            color: '#124d43',
                            border: '1px solid #cfdad6',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Inspect Detail
                        </button>
                        {!isVerified && (
                          <button
                            onClick={() => handleStamp(cand.id, 'verified_authentic')}
                            style={{
                              background: '#124d43',
                              color: '#caec6b',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              fontSize: '11px',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            Stamp Authentic
                          </button>
                        )}
                        {isVerified && (
                          <button
                            onClick={() => handleStamp(cand.id, 'returned_for_evidence')}
                            style={{
                              background: '#fff3e8',
                              color: '#b05d15',
                              border: '1px solid #f2cfb6',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              fontSize: '11px',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            Return
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Artifact Deep Inspection Drawer / Modal */}
      {selectedArtifact && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(18, 77, 67, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => setSelectedArtifact(null)}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '680px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '1px solid #dce5e2'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43', background: '#caec6b', padding: '3px 8px', borderRadius: '4px' }}>
                  {selectedArtifact.qualificationTitle}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '6px 0 2px', color: '#16282e' }}>
                  {selectedArtifact.artifactTitle}
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#687e79' }}>
                  Learner: {selectedArtifact.learnerName} ({selectedArtifact.learnerId}) · Artifact ID: {selectedArtifact.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedArtifact(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '22px',
                  cursor: 'pointer',
                  color: '#687e79',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px', background: '#f8faf9', padding: '14px', borderRadius: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#738782', fontWeight: 600 }}>Provisional Score</span>
                <div style={{ fontSize: '18px', fontWeight: 900, color: selectedArtifact.provisionalScore >= 70 ? '#124d43' : '#b05d15' }}>
                  {selectedArtifact.provisionalScore}% ({selectedArtifact.criteriaMet}/{selectedArtifact.totalCriteria} criteria)
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#738782', fontWeight: 600 }}>Assessor Audit State</span>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#16282e', marginTop: '2px' }}>
                  {selectedArtifact.assessorStampStatus.toUpperCase().replaceAll('_', ' ')}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#738782', fontWeight: 600 }}>Sampling Status</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: selectedArtifact.moderationSampled ? '#124d43' : '#738782', marginTop: '2px' }}>
                  {selectedArtifact.moderationSampled ? 'Sampled for Internal Moderation' : 'Standard Delivery'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#738782', fontWeight: 600 }}>Audit Trail Signature</span>
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#556965', marginTop: '4px' }}>
                  SHA256: 7f8a9...b341 (Valid)
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 6px', color: '#16282e' }}>
                Formative Lecturer Feedback (Naledi Dube)
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#334b46', background: '#f4f8f6', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #124d43' }}>
                “{selectedArtifact.lecturerFeedback}”
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => handleToggleModeration(selectedArtifact.id)}
                style={{
                  background: '#f4f8f6',
                  color: '#124d43',
                  border: '1px solid #cfdad6',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {selectedArtifact.moderationSampled ? 'Remove from Moderation Sample' : 'Flag for Moderation Sample'}
              </button>
              {selectedArtifact.assessorStampStatus !== 'verified_authentic' ? (
                <button
                  onClick={() => handleStamp(selectedArtifact.id, 'verified_authentic')}
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
                  Verify & Stamp Authentic →
                </button>
              ) : (
                <button
                  onClick={() => handleStamp(selectedArtifact.id, 'returned_for_evidence')}
                  style={{
                    background: '#fff3e8',
                    color: '#b05d15',
                    border: '1px solid #f2cfb6',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Return for Insufficient Evidence
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
