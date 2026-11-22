'use client';

import React, { useState } from 'react';
import {
  TRANSITION_CROSSWALK_DATA,
  NATED_SUBJECTS_CATALOG,
  TransitionCrosswalkMapping
} from '@/lib/nated-transition-data';

interface NatedTransitionMatrixProps {
  onOpenForm4: () => void;
  toast?: (msg: string, tone?: string) => void;
}

export function NatedTransitionMatrix({ onOpenForm4, toast }: NatedTransitionMatrixProps) {
  const [selectedMappingId, setSelectedMappingId] = useState<string>(TRANSITION_CROSSWALK_DATA[0].id);
  const [rplSimulated, setRplSimulated] = useState<boolean>(false);

  const selectedMapping = TRANSITION_CROSSWALK_DATA.find(m => m.id === selectedMappingId) || TRANSITION_CROSSWALK_DATA[0];

  const handleSimulateRpl = () => {
    setRplSimulated(true);
    if (toast) {
      toast(`Simulated Recognition of Prior Learning (RPL) articulation for ${selectedMapping.natedSubjectCode}: ${selectedMapping.rplRecognitionPercentage}% of theoretical credits recognized.`, 'success');
    }
    setTimeout(() => setRplSimulated(false), 4500);
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #dce5e2',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Header & Gazette Directive Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: '#b05d15',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 900,
              padding: '3px 8px',
              borderRadius: '4px',
              letterSpacing: '0.6px'
            }}>
              GOVERNMENT GAZETTE NO. 50742 DIRECTIVE
            </span>
            <span style={{ fontSize: '12px', color: '#556965', fontWeight: 600 }}>
              Mandatory NATED Report 191 to QCTO Occupational Sub-Framework (OQSF) Migration
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', color: '#16282e' }}>
            NATED-to-Occupational Articulation & Gap Bridge Engine
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#556965', maxWidth: '820px', lineHeight: 1.5 }}>
            Automate curriculum crosswalking from legacy N4–N6 subjects to accredited QCTO Occupational Qualifications.
            Determine Recognition of Prior Learning (RPL) theory credits, identify missing Practical (PSM) and Workplace (WEM) modules, and protect institution accreditation before teach-out cut-offs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onOpenForm4}
            style={{
              background: '#124d43',
              color: '#caec6b',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(18,77,67,0.2)'
            }}
          >
            Open Aligned Form 4 Matrix →
          </button>
        </div>
      </div>

      {/* Subject Selection Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '20px',
        borderBottom: '1px solid #e5ebe8'
      }}>
        {TRANSITION_CROSSWALK_DATA.map((item) => {
          const isActive = item.id === selectedMappingId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedMappingId(item.id)}
              style={{
                background: isActive ? '#124d43' : '#f4f8f6',
                color: isActive ? '#ffffff' : '#334b46',
                border: '1px solid',
                borderColor: isActive ? '#124d43' : '#cfdad6',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{item.natedSubjectCode}</span>
              <span style={{
                background: isActive ? '#caec6b' : '#e2eae6',
                color: '#124d43',
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 900
              }}>
                → SAQA {item.targetSaqaId}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Mapping Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left Column: Legacy vs Occupational Target */}
        <div style={{ border: '1px solid #e1e8e5', borderRadius: '12px', padding: '20px', background: '#fbfcfb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#b05d15', textTransform: 'uppercase' }}>
              Legacy Offering (Phasing Out)
            </span>
            <span style={{ background: '#fde8e8', color: '#c53929', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
              Teach-out: {selectedMapping.teachOutDeadline}
            </span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#16282e', margin: '0 0 6px' }}>
            {selectedMapping.natedSubjectName}
          </h3>
          <p style={{ fontSize: '12px', color: '#556965', margin: '0 0 16px' }}>
            Report 191 Curriculum · Level {selectedMapping.natedLevel} · Theory-heavy classroom delivery.
          </p>

          <div style={{ borderTop: '1px dashed #dce5e2', paddingTop: '14px', marginTop: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#124d43', textTransform: 'uppercase' }}>
              Mandated Replacement Qualification
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#124d43', margin: '4px 0 2px' }}>
              {selectedMapping.targetQualificationTitle}
            </h4>
            <div style={{ fontSize: '12px', color: '#556965' }}>
              SAQA ID: <strong>{selectedMapping.targetSaqaId}</strong> · QCTO Tripartite Occupational Model
            </div>
          </div>

          {/* RPL Gauge */}
          <div style={{ marginTop: '20px', background: '#ffffff', border: '1px solid #e1e8e5', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#16282e' }}>
                Recognition of Prior Learning (RPL) Credit Overlap
              </span>
              <strong style={{ fontSize: '16px', color: '#124d43' }}>
                {selectedMapping.rplRecognitionPercentage}%
              </strong>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#eef5f2', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${selectedMapping.rplRecognitionPercentage}%`, height: '100%', background: '#124d43' }} />
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#738782' }}>
              Learners holding NATED N4–N6 transcripts bypass {selectedMapping.rplRecognitionPercentage}% of theoretical knowledge exams.
            </p>
          </div>

          <div style={{ marginTop: '16px' }}>
            <button
              onClick={handleSimulateRpl}
              style={{
                width: '100%',
                background: rplSimulated ? '#e8f5ee' : '#ffffff',
                border: '1px solid #124d43',
                color: '#124d43',
                borderRadius: '8px',
                padding: '9px 14px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {rplSimulated ? '✓ Articulation Credit Verified' : 'Simulate Learner Articulation Certificate →'}
            </button>
          </div>
        </div>

        {/* Right Column: Required Gap Bridge Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Missing Practical Modules */}
          <div style={{ border: '1px solid #e1e8e5', borderRadius: '12px', padding: '18px', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ background: '#caec6b', color: '#124d43', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>
                CRITICAL GAP 1
              </span>
              <strong style={{ fontSize: '14px', color: '#16282e' }}>
                Missing Practical Skill Modules (PSM)
              </strong>
            </div>
            <p style={{ fontSize: '12px', color: '#556965', margin: '0 0 10px', lineHeight: 1.4 }}>
              Required practical simulated lab hours not present in legacy Report 191 syllabus:
            </p>

            <div style={{ display: 'grid', gap: '8px' }}>
              {selectedMapping.missingPracticalModules.map(pm => (
                <div key={pm.code} style={{ background: '#f8faf9', border: '1px solid #e5ebe8', borderRadius: '6px', padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '12px', color: '#124d43' }}>
                      {pm.code}: {pm.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#738782', fontWeight: 600 }}>
                      {pm.hours} hrs ({pm.credits} credits)
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#2b627f', background: '#eef5f8', padding: '2px 6px', borderRadius: '3px', marginTop: '4px', display: 'inline-block' }}>
                    Bridge5 Simulated Diagnostic Lab
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Workplace Modules */}
          <div style={{ border: '1px solid #e1e8e5', borderRadius: '12px', padding: '18px', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ background: '#caec6b', color: '#124d43', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>
                CRITICAL GAP 2
              </span>
              <strong style={{ fontSize: '14px', color: '#16282e' }}>
                Mandatory Workplace Modules (WEM) & Logbook
              </strong>
            </div>
            <p style={{ fontSize: '12px', color: '#556965', margin: '0 0 10px', lineHeight: 1.4 }}>
              Without authenticated host employer logbook sign-offs, learners cannot register for the EISA qualifier:
            </p>

            <div style={{ display: 'grid', gap: '8px' }}>
              {selectedMapping.missingWorkplaceModules.map(wm => (
                <div key={wm.code} style={{ background: '#f8faf9', border: '1px solid #e5ebe8', borderRadius: '6px', padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '12px', color: '#16282e' }}>
                      {wm.code}: {wm.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#124d43', fontWeight: 800 }}>
                      {wm.requiredHours} required hrs
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#556965', marginTop: '2px' }}>
                    Milestone: <em>{wm.logbookMilestone}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Compliance Callout */}
      <div style={{
        background: 'linear-gradient(135deg, #124d43 0%, #0d342e 100%)',
        borderRadius: '12px',
        padding: '18px 24px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div>
          <strong style={{ fontSize: '14px', color: '#caec6b' }}>
            Bridge5 Transition Guarantee:
          </strong>
          <span style={{ fontSize: '13px', color: '#e0ece9', marginLeft: '6px' }}>
            Zero learner stranding. Pre-mapped syllabus annexures and 1-click Form 4 generation protect your institution during QCTO quality assurance site visits.
          </span>
        </div>

        <button
          onClick={onOpenForm4}
          style={{
            background: '#caec6b',
            color: '#124d43',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 900,
            cursor: 'pointer'
          }}
        >
          View Full QCTO Form 4 →
        </button>
      </div>
    </div>
  );
}
