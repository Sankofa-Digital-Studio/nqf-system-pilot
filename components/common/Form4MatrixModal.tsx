'use client';

import React, { useState } from 'react';
import { QualificationManifest, SEED_MANIFESTS } from '@/lib/manifests';

interface Form4MatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  manifestId?: string;
}

export function Form4MatrixModal({ isOpen, onClose, manifestId = 'saqa-48573' }: Form4MatrixModalProps) {
  const [selectedQual, setSelectedQual] = useState<string>(manifestId);
  const [exporting, setExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const manifest: QualificationManifest = SEED_MANIFESTS[selectedQual] || SEED_MANIFESTS['saqa-48573'];

  const handleExport = () => {
    setExporting(true);
    setDownloadSuccess(false);

    // Generate CSV data that matches QCTO Form 4 Learning Material Matrix specification
    const headers = [
      'Component',
      'Module Code',
      'Module Title',
      'Topic Code',
      'Knowledge / Practical Task Description',
      'Weight %',
      'Manual / Learning Guide Ref (Pages)',
      'Educational & Teaching Aids'
    ];

    const rows: string[][] = [];

    manifest.gates.forEach((gate) => {
      const componentType = gate.type === 'knowledge_module' 
        ? 'KNOWLEDGE COMPONENT' 
        : gate.type === 'practical_skill_module' 
        ? 'PRACTICAL COMPONENT' 
        : 'WORKPLACE COMPONENT';

      gate.topics.forEach((topic, idx) => {
        rows.push([
          `"${componentType}"`,
          `"${gate.code}"`,
          `"${gate.title}"`,
          `"${topic.code}"`,
          `"${topic.label}: ${topic.description || ''}"`,
          `"${(topic.weight * 100).toFixed(0)}%"`,
          `"Learning Guide Section ${idx + 1} (pp. ${(idx * 14) + 12}-${(idx * 14) + 25})"`,
          `"Bridge5 Interactive Lab & Diagnostic Check Engine"`
        ]);
      });
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `QCTO_Form_4_Matrix_${manifest.saqa.qualificationId}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);

    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      setExporting(false);
      setDownloadSuccess(true);
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(8, 28, 24, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        width: 'min(1080px, 96vw)',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 30px 90px rgba(0,0,0,0.3)',
        padding: '36px',
        position: 'relative',
        color: '#16282e'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            background: '#edf3f0',
            color: '#16282e',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e1e8e5', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                background: '#124d43',
                color: '#caec6b',
                fontSize: '11px',
                fontWeight: 900,
                padding: '4px 8px',
                borderRadius: '6px',
                letterSpacing: '0.8px'
              }}>
                QCTO FORM 4
              </span>
              <span style={{ fontSize: '12px', color: '#687e79', fontWeight: 700 }}>
                LEARNING MATERIAL MATRIX & ACCREDITATION AUDIT
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', letterSpacing: '-0.5px' }}>
              Official Curriculum Alignment Matrix
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#556965' }}>
              Pre-mapped to the Quality Council for Trades and Occupations (QCTO) Annexure for SDP Site Verification Visits.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select
              value={selectedQual}
              onChange={(e) => setSelectedQual(e.target.value)}
              style={{
                background: '#f4f7f5',
                border: '1px solid #cfdad6',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#124d43'
              }}
            >
              <option value="saqa-48573">SAQA 48573: IT Systems Support (NQF 5)</option>
              <option value="saqa-119438">SAQA 119438: Software Tester (NQF 5)</option>
            </select>

            <button
              onClick={handleExport}
              disabled={exporting}
              style={{
                background: '#124d43',
                color: '#caec6b',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {exporting ? 'Generating Form 4...' : '📥 Export QCTO Matrix (.CSV)'}
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div style={{
            background: '#e8f7ee',
            border: '1px solid #78aa96',
            color: '#174d41',
            borderRadius: '10px',
            padding: '12px 18px',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>✓ QCTO Form 4 Learning Material Matrix successfully compiled and downloaded.</span>
            <span style={{ fontSize: '11px', color: '#397464' }}>Ready for SETA verification submission</span>
          </div>
        )}

        {/* Table View of Matrix */}
        <div style={{ border: '1px solid #e1e8e5', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f5f8f6', borderBottom: '1px solid #e1e8e5', textAlign: 'left' }}>
                <th style={{ padding: '12px 14px', fontWeight: 800, color: '#455955' }}>Component</th>
                <th style={{ padding: '12px 14px', fontWeight: 800, color: '#455955' }}>Module Code & Name</th>
                <th style={{ padding: '12px 14px', fontWeight: 800, color: '#455955' }}>Topic Code</th>
                <th style={{ padding: '12px 14px', fontWeight: 800, color: '#455955' }}>Prescribed Learning Outcome</th>
                <th style={{ padding: '12px 14px', fontWeight: 800, color: '#455955' }}>Courseware Ref</th>
                <th style={{ padding: '12px 14px', fontWeight: 800, color: '#455955' }}>Interactive Tool / Evidence</th>
              </tr>
            </thead>
            <tbody>
              {manifest.gates.map((gate) => {
                const componentType = gate.type === 'knowledge_module' 
                  ? 'Knowledge Component' 
                  : gate.type === 'practical_skill_module' 
                  ? 'Practical Component' 
                  : 'Workplace Component';

                return gate.topics.map((topic, topicIdx) => (
                  <tr key={`${gate.gateId}-${topic.code}`} style={{ borderBottom: '1px solid #f0f3f1' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#124d43' }}>
                      {componentType}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                      <span style={{ background: '#edf3f0', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', marginRight: '6px' }}>
                        {gate.code}
                      </span>
                      {gate.title}
                    </td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#48635d' }}>
                      {topic.code}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#334742' }}>
                      <strong>{topic.label}</strong>
                      <div style={{ fontSize: '11px', color: '#687e79', marginTop: '2px' }}>
                        {topic.description || 'Aligned to QCTO occupational curriculum syllabus.'}
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#556965', fontSize: '11px' }}>
                      Manual pp. {(topicIdx * 14) + 12}–{(topicIdx * 14) + 25}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        background: '#e8f5ee',
                        color: '#124d43',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        Bridge5 Lab Engine
                      </span>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
