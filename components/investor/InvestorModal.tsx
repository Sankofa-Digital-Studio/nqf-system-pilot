'use client';

import React, { useState } from 'react';

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvestorModal({ isOpen, onClose }: InvestorModalProps) {
  const [learnerCount, setLearnerCount] = useState<number>(650);
  const [feePerLearner, setFeePerLearner] = useState<number>(75);

  if (!isOpen) return null;

  const monthlyRevenue = learnerCount * feePerLearner;
  const annualRevenue = monthlyRevenue * 12;

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
        width: 'min(920px, 96vw)',
        maxHeight: '90vh',
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

        {/* Modal Header */}
        <div style={{ borderBottom: '1px solid #e1e8e5', paddingBottom: '20px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              background: '#124d43',
              color: '#caec6b',
              fontSize: '11px',
              fontWeight: 900,
              padding: '4px 10px',
              borderRadius: '999px',
              letterSpacing: '0.8px'
            }}>
              INVESTOR SEED MEMO · R300,000 ROUND
            </span>
            <span style={{ fontSize: '13px', color: '#687e79' }}>Bridge5 QCTO Evidence & Compliance OS</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '6px 0', letterSpacing: '-0.5px' }}>
            The Operating System for South Africa's Occupational Qualifications
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#556965', lineHeight: 1.6 }}>
            Over 1,200 accredited Skills Development Providers (SDPs) and 50 TVET colleges face severe accreditation and grant-risk penalties as legacy unit standards sunset. Bridge5 automates QCTO Form 4 mapping, modular evidence tracking, and SETA audit readiness.
          </p>
        </div>

        {/* Three Pillar Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#f5f8f6', border: '1px solid #dce5e2', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#124d43', textTransform: 'uppercase' }}>1. Massive Market Pain</div>
            <h4 style={{ fontSize: '16px', margin: '8px 0', fontWeight: 800 }}>Sunset of Legacy SAQA</h4>
            <p style={{ fontSize: '12px', color: '#556965', margin: 0, lineHeight: 1.5 }}>
              All legacy qualifications expire by June 2026. Providers cannot transition to QCTO 3-part models without software infrastructure.
            </p>
          </div>

          <div style={{ background: '#f5f8f6', border: '1px solid #dce5e2', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#124d43', textTransform: 'uppercase' }}>2. High Customer LTV</div>
            <h4 style={{ fontSize: '16px', margin: '8px 0', fontWeight: 800 }}>Multi-Year Learnerships</h4>
            <p style={{ fontSize: '12px', color: '#556965', margin: 0, lineHeight: 1.5 }}>
              Occupational qualifications run for 12–24 months. Contracted cohorts guarantee predictable, sticky SaaS revenue per seat.
            </p>
          </div>

          <div style={{ background: '#f5f8f6', border: '1px solid #dce5e2', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#124d43', textTransform: 'uppercase' }}>3. Defensible Moat</div>
            <h4 style={{ fontSize: '16px', margin: '8px 0', fontWeight: 800 }}>Form 4 & EISA Alignment</h4>
            <p style={{ fontSize: '12px', color: '#556965', margin: 0, lineHeight: 1.5 }}>
              Proprietary manifest ingestion engine generates exact QCTO regulatory submissions and audit-proof Portfolios of Evidence (PoEs).
            </p>
          </div>
        </div>

        {/* Live Interactive Unit Economics Calculator */}
        <div style={{
          background: '#124d43',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '24px 28px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <span style={{ color: '#caec6b', fontSize: '11px', fontWeight: 900, letterSpacing: '0.8px' }}>
                LIVE FINANCIAL PROJECTION MODEL
              </span>
              <h3 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>
                SaaS Revenue Calculator
              </h3>
            </div>
            <span style={{ background: '#ffffff18', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: '#d8e8e4' }}>
              Targeting R300,000 Angel Seed Ticket
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Active Funded Learners</span>
                  <strong style={{ color: '#caec6b' }}>{learnerCount} learners</strong>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={learnerCount}
                  onChange={(e) => setLearnerCount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#caec6b', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Monthly SaaS Fee / Learner</span>
                  <strong style={{ color: '#caec6b' }}>R{feePerLearner} / month</strong>
                </div>
                <input
                  type="range"
                  min="45"
                  max="150"
                  step="5"
                  value={feePerLearner}
                  onChange={(e) => setFeePerLearner(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#caec6b', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{
              background: '#0a352e',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #1f6356',
              display: 'grid',
              gap: '12px'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: '#8fb8af', textTransform: 'uppercase', fontWeight: 700 }}>Projected Monthly Recurring Revenue (MRR)</span>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#caec6b', letterSpacing: '-0.5px' }}>
                  R{monthlyRevenue.toLocaleString('en-ZA')}
                </div>
              </div>
              <div style={{ borderTop: '1px solid #1f6356', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: '#8fb8af', textTransform: 'uppercase', fontWeight: 700 }}>Annualized Run-Rate (ARR)</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                  R{annualRevenue.toLocaleString('en-ZA')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seed Budget Allocation Table */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 14px' }}>R300,000 Seed Capital Use of Funds</h4>
          <div style={{ border: '1px solid #e1e8e5', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f5f8f6', borderBottom: '1px solid #e1e8e5', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>Category</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>Allocation</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, color: '#556965' }}>Deliverable / Milestone</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f0f3f1' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Product & Mobile PWA</td>
                  <td style={{ padding: '12px 14px', color: '#124d43', fontWeight: 800 }}>R120,000 (40%)</td>
                  <td style={{ padding: '12px 14px', color: '#556965' }}>Offline-first logbook app for on-site workplace mentors + automated PoE generator</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0f3f1' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Partner TVET Cohort Onboarding</td>
                  <td style={{ padding: '12px 14px', color: '#124d43', fontWeight: 800 }}>R105,000 (35%)</td>
                  <td style={{ padding: '12px 14px', color: '#556965' }}>Deploy 2 pilot cohorts (100 learners total on SAQA 48573 & 119438) with live SETA verification</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0f3f1' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>SETA / QCTO Regulatory Advisory</td>
                  <td style={{ padding: '12px 14px', color: '#124d43', fontWeight: 800 }}>R45,000 (15%)</td>
                  <td style={{ padding: '12px 14px', color: '#556965' }}>MICT SETA accreditation audit verification & Form 4 compliance legal sign-off</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 14px', fontWeight: 700 }}>Cloud & Security Buffer</td>
                  <td style={{ padding: '12px 14px', color: '#124d43', fontWeight: 800 }}>R30,000 (10%)</td>
                  <td style={{ padding: '12px 14px', color: '#556965' }}>Vercel enterprise edge, Cloudflare D1 high-availability replication, and backups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid #cfdad6',
              background: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close Deck
          </button>
          <a
            href="mailto:invest@bridge5.demo?subject=Bridge5%20Seed%20Investment%20Enquiry"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#124d43',
              color: '#caec6b',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Request Full Seed Term Sheet →
          </a>
        </div>
      </div>
    </div>
  );
}
