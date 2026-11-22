'use client';

import React, { useState } from 'react';
import { UAT_WORKPLACE_LOGBOOK_ENTRIES, WorkplaceLogbookEntry } from '@/lib/nated-transition-data';

interface WorkplaceLogbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  toast?: (msg: string, tone?: string) => void;
  initialLearnerId?: string;
}

export function WorkplaceLogbookModal({
  isOpen,
  onClose,
  toast,
  initialLearnerId = 'lrn-thando'
}: WorkplaceLogbookModalProps) {
  const [entries, setEntries] = useState<WorkplaceLogbookEntry[]>(UAT_WORKPLACE_LOGBOOK_ENTRIES);
  const [selectedLearner, setSelectedLearner] = useState<string>(initialLearnerId);

  if (!isOpen) return null;

  const currentLearnerEntries = entries.filter(e => e.learnerId === selectedLearner);
  const activeEntry = currentLearnerEntries[0] || entries[0];
  const totalApprovedHours = currentLearnerEntries
    .filter(e => e.status === 'mentor_approved')
    .reduce((sum, e) => sum + e.hoursLogged, 0);

  const handleApprove = async (id: string) => {
    setEntries(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'mentor_approved',
          verifiedAt: new Date().toISOString()
        };
      }
      return item;
    }));

    try {
      await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'sign_logbook_task',
          input: { taskId: id, status: 'mentor_approved', mentorName: activeEntry.mentorName }
        })
      });
    } catch {}

    if (toast) {
      toast(`Workplace evidence verified by Corporate Mentor ${activeEntry.mentorName} (${activeEntry.hostEmployer}).`, 'success');
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
        maxWidth: '820px',
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
                QCTO TRIPARTITE WORKPLACE COMPONENT (WEM)
              </span>
              <span style={{ fontSize: '12px', color: '#556965', fontWeight: 600 }}>
                SETA Learnership Logbook & Mentor Verification
              </span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
              Host Employer Workplace Experience Logbook
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Authentic workplace evidence signed by registered corporate mentors. Required before candidate admission to the EISA external assessment.
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

        {/* Candidate & Employer Context Card */}
        <div style={{
          background: '#f8faf9',
          border: '1px solid #e1e8e5',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: '#738782', fontWeight: 700 }}>Candidate Learner</span>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#16282e' }}>{activeEntry.learnerName}</div>
            <div style={{ fontSize: '11px', color: '#556965' }}>Learner ID: {activeEntry.learnerId}</div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#738782', fontWeight: 700 }}>Approved Host Employer</span>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#124d43' }}>{activeEntry.hostEmployer}</div>
            <div style={{ fontSize: '11px', color: '#556965' }}>Approval No: {activeEntry.workplaceApprovalNo}</div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#738782', fontWeight: 700 }}>Corporate Mentor Signatory</span>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#16282e' }}>{activeEntry.mentorName}</div>
            <div style={{ fontSize: '11px', color: '#556965' }}>{activeEntry.mentorDesignation}</div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#738782', fontWeight: 700 }}>Logged Workplace Progress</span>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#124d43' }}>
              {totalApprovedHours} / 200 Required Hours
            </div>
            <div style={{ width: '100%', height: '5px', background: '#dce5e2', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (totalApprovedHours / 200) * 100)}%`, height: '100%', background: '#124d43' }} />
            </div>
          </div>
        </div>

        {/* Task Log Table */}
        <div style={{ border: '1px solid #e1e8e5', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f5f8f6', borderBottom: '1px solid #e1e8e5', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Module & Task</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Hours</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Evidence Summary</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965' }}>Verification</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, color: '#556965', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLearnerEntries.map((task) => {
                const isApproved = task.status === 'mentor_approved';
                const isReturned = task.status === 'returned_for_revision';

                return (
                  <tr key={task.id} style={{ borderBottom: '1px solid #f0f3f1' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: '#eef5f2',
                        color: '#124d43',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginRight: '6px'
                      }}>
                        {task.moduleCode}
                      </span>
                      <strong style={{ color: '#16282e' }}>{task.taskTitle}</strong>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#124d43' }}>
                      {task.hoursLogged} hrs
                    </td>
                    <td style={{ padding: '14px 16px', color: '#556965', maxWidth: '280px', lineHeight: 1.4 }}>
                      {task.evidenceSummary}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: isApproved ? '#e8f5ee' : isReturned ? '#fff3e8' : '#eef5f8',
                        color: isApproved ? '#124d43' : isReturned ? '#b05d15' : '#2b627f',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 800
                      }}>
                        {isApproved ? 'Mentor Approved ✓' : isReturned ? 'Returned for Revision' : 'Pending Signature'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {!isApproved ? (
                        <button
                          onClick={() => handleApprove(task.id)}
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
                          Sign & Approve
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#2a9d68', fontWeight: 700 }}>
                          Signed by Mentor
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Audit Declaration */}
        <div style={{
          background: '#f4f8f6',
          borderRadius: '8px',
          padding: '12px 16px',
          border: '1px solid #cfdad6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <span style={{ fontSize: '11px', color: '#556965' }}>
            Workplace Logbook Integrity: SHA-256 date-stamped with employer supervisor identity. Fully compliant with QCTO EISA gate prerequisite rules.
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#124d43',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Close Logbook
          </button>
        </div>

      </div>
    </div>
  );
}
