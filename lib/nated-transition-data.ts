/**
 * NATED Report 191 to QCTO Occupational Qualifications Transition Engine
 * Grounded in Government Gazette No. 50742 & Gazette No. 49518 (DHET / QCTO directives).
 */

export interface NatedSubject {
  code: string;
  name: string;
  nLevel: 'N4' | 'N5' | 'N6';
  credits: number;
  syllabusCategory: 'Computer Practice' | 'Information Processing' | 'Engineering' | 'Business Management';
}

export interface QctoTargetQualification {
  saqaId: string;
  title: string;
  nqfLevel: number;
  credits: number;
  curriculumCode: string;
  knowledgeModules: number;
  practicalModules: number;
  workplaceModules: number;
  eisaEligible: boolean;
}

export interface TransitionCrosswalkMapping {
  id: string;
  natedSubjectCode: string;
  natedSubjectName: string;
  natedLevel: string;
  targetSaqaId: string;
  targetQualificationTitle: string;
  rplRecognitionPercentage: number;
  theoryExemptions: string[];
  missingPracticalModules: {
    code: string;
    title: string;
    credits: number;
    hours: number;
    deliveryMode: 'lab' | 'simulation';
  }[];
  missingWorkplaceModules: {
    code: string;
    title: string;
    requiredHours: number;
    logbookMilestone: string;
  }[];
  gazetteNotice: string;
  teachOutDeadline: string;
  urgency: 'critical' | 'urgent' | 'moderate';
}

export interface WorkplaceLogbookEntry {
  id: string;
  learnerId: string;
  learnerName: string;
  hostEmployer: string;
  mentorName: string;
  mentorDesignation: string;
  workplaceApprovalNo: string;
  moduleCode: string;
  taskTitle: string;
  hoursLogged: number;
  status: 'logged' | 'mentor_approved' | 'returned_for_revision';
  evidenceSummary: string;
  verifiedAt?: string;
}

export interface SetaGrantTrancheContract {
  contractNumber: string;
  setaName: string;
  programmeType: 'Learnership' | 'Apprenticeship' | 'Skills Programme';
  totalGrantValue: number;
  disbursedValue: number;
  claimableValue: number;
  tranches: {
    trancheNumber: number;
    milestone: string;
    amount: number;
    percentage: number;
    status: 'disbursed' | 'claim_ready' | 'in_progress';
    evidenceRequired: string;
    auditVerificationStatus: string;
  }[];
}

export const NATED_SUBJECTS_CATALOG: NatedSubject[] = [
  { code: 'CP-N4', name: 'Computer Practice N4', nLevel: 'N4', credits: 20, syllabusCategory: 'Computer Practice' },
  { code: 'CP-N5', name: 'Computer Practice N5', nLevel: 'N5', credits: 20, syllabusCategory: 'Computer Practice' },
  { code: 'CP-N6', name: 'Computer Practice N6', nLevel: 'N6', credits: 20, syllabusCategory: 'Computer Practice' },
  { code: 'IP-N4', name: 'Information Processing N4', nLevel: 'N4', credits: 20, syllabusCategory: 'Information Processing' },
  { code: 'IP-N5', name: 'Information Processing N5', nLevel: 'N5', credits: 20, syllabusCategory: 'Information Processing' },
  { code: 'IP-N6', name: 'Information Processing N6', nLevel: 'N6', credits: 20, syllabusCategory: 'Information Processing' },
  { code: 'EL-N4', name: 'Electrotechnics N4', nLevel: 'N4', credits: 20, syllabusCategory: 'Engineering' },
  { code: 'IE-N4', name: 'Industrial Electronics N4', nLevel: 'N4', credits: 20, syllabusCategory: 'Engineering' }
];

export const TRANSITION_CROSSWALK_DATA: TransitionCrosswalkMapping[] = [
  {
    id: 'xwalk-01',
    natedSubjectCode: 'CP-N4/N5',
    natedSubjectName: 'Computer Practice N4 & N5 (Hardware, OS & Office)',
    natedLevel: 'N4–N5',
    targetSaqaId: '48573',
    targetQualificationTitle: 'National Certificate: IT Systems Support (NQF Level 5)',
    rplRecognitionPercentage: 68,
    theoryExemptions: [
      'KM-01: Foundational Computer Architecture & Components (100% matched)',
      'KM-02: Operating System Principles & Driver Management (85% matched)',
      'KM-05: Customer Communication and Support SLAs (90% matched)'
    ],
    missingPracticalModules: [
      {
        code: 'P01',
        title: 'Hardware Fault Isolation & Least-Invasive Diagnostic Lab',
        credits: 12,
        hours: 40,
        deliveryMode: 'lab'
      },
      {
        code: 'P02',
        title: 'Network Interface & TCP/IP Diagnostic Verification',
        credits: 10,
        hours: 30,
        deliveryMode: 'simulation'
      }
    ],
    missingWorkplaceModules: [
      {
        code: 'WEM-01',
        title: 'Participate in Live Enterprise Desktop & Workstation Support',
        requiredHours: 120,
        logbookMilestone: 'Host Employer Supervisor Job Cards'
      },
      {
        code: 'WEM-02',
        title: 'Apply Electrostatic Discharge (ESD) and Workshop HSE Procedures',
        requiredHours: 80,
        logbookMilestone: 'Health & Safety Audit Register'
      }
    ],
    gazetteNotice: 'Gazette No. 50742 (Ministerial Teach-Out Extension Notice)',
    teachOutDeadline: '30 June 2027',
    urgency: 'critical'
  },
  {
    id: 'xwalk-02',
    natedSubjectCode: 'IP-N4/N5/N6',
    natedSubjectName: 'Information Processing N4–N6 & Logic Processing',
    natedLevel: 'N4–N6',
    targetSaqaId: '119438',
    targetQualificationTitle: 'Occupational Certificate: Software Tester (NQF Level 5)',
    rplRecognitionPercentage: 62,
    theoryExemptions: [
      'KM-01: Software Specification & Requirement Analysis (80% matched)',
      'KM-02: Data Processing & Structured Information Flows (75% matched)'
    ],
    missingPracticalModules: [
      {
        code: 'PSM-TEST',
        title: 'Develop Test Scenarios & Automated Python/Postman Test Suites',
        credits: 16,
        hours: 50,
        deliveryMode: 'lab'
      },
      {
        code: 'PSM-DEFECT',
        title: 'Defect Logging, Boundary Value Analysis & Traceability Matrices',
        credits: 12,
        hours: 35,
        deliveryMode: 'simulation'
      }
    ],
    missingWorkplaceModules: [
      {
        code: 'WEM-TEST-01',
        title: 'Execute Quality Assurance Cycles within Production Agile Teams',
        requiredHours: 140,
        logbookMilestone: 'Jira/Sprint Test Execution Sign-off'
      },
      {
        code: 'WEM-TEST-02',
        title: 'Conduct API Regression & Security Boundary Verifications',
        requiredHours: 60,
        logbookMilestone: 'CI/CD Pipeline Test Summary'
      }
    ],
    gazetteNotice: 'Gazette No. 50742 (Ministerial Teach-Out Extension Notice)',
    teachOutDeadline: '30 June 2027',
    urgency: 'urgent'
  },
  {
    id: 'xwalk-03',
    natedSubjectCode: 'EL-N4 / IE-N4',
    natedSubjectName: 'Electrotechnics & Industrial Electronics N4',
    natedLevel: 'N4',
    targetSaqaId: '101408',
    targetQualificationTitle: 'Occupational Certificate: Computer Technician (NQF Level 5)',
    rplRecognitionPercentage: 74,
    theoryExemptions: [
      'KM-ELEC: Electrical Power Principles & Power Supply Rails (100% matched)',
      'KM-LOGIC: Digital Logic, Bus Architectures & Signal Paths (90% matched)'
    ],
    missingPracticalModules: [
      {
        code: 'PM-CHASSIS',
        title: 'Component-Level Diagnostic Testing with Multimeter & Oscilloscope',
        credits: 14,
        hours: 45,
        deliveryMode: 'lab'
      }
    ],
    missingWorkplaceModules: [
      {
        code: 'WEM-TECH-01',
        title: 'Perform Hardware RMA & Field Service Repairs under Supervision',
        requiredHours: 150,
        logbookMilestone: 'Workstation RMA Diagnostic Report'
      }
    ],
    gazetteNotice: 'Gazette No. 49518 & 50742 (Phased Teach-Out Window)',
    teachOutDeadline: '31 December 2026',
    urgency: 'critical'
  }
];

export const SETA_GRANT_CONTRACT_DATA: SetaGrantTrancheContract = {
  contractNumber: 'MICT-DG-2026-8812',
  setaName: 'MICT SETA (Media, Information and Communication Technologies SETA)',
  programmeType: 'Learnership',
  totalGrantValue: 450000,
  disbursedValue: 150000,
  claimableValue: 180000,
  tranches: [
    {
      trancheNumber: 1,
      milestone: 'Learner Onboarding & SETA LMIS Enrolment',
      amount: 150000,
      percentage: 33.3,
      status: 'disbursed',
      evidenceRequired: 'Verified ID copies, employment contracts, and SETA biometric registrations.',
      auditVerificationStatus: '100% Verified & Disbursed'
    },
    {
      trancheNumber: 2,
      milestone: 'Formative Milestone Verification (Knowledge + Practical Labs)',
      amount: 180000,
      percentage: 40.0,
      status: 'claim_ready',
      evidenceRequired: 'Attributed formative job cards, 4-criterion rubrics, and independent assessor stamps.',
      auditVerificationStatus: 'Verified by Assessor Peter Jacobs (#ASS-2024-8841) · Claim Package Ready'
    },
    {
      trancheNumber: 3,
      milestone: 'Workplace Logbook Completion & EISA Admission Readiness',
      amount: 120000,
      percentage: 26.7,
      status: 'in_progress',
      evidenceRequired: 'Authenticated host employer logbooks (minimum 200 hours) with mentor signatures.',
      auditVerificationStatus: '74% Average Logbook Progress Recorded Across 8 Host Employers'
    }
  ]
};

export const UAT_WORKPLACE_LOGBOOK_ENTRIES: WorkplaceLogbookEntry[] = [
  {
    id: 'wbl-01',
    learnerId: 'lrn-thando',
    learnerName: 'Thando Mokoena',
    hostEmployer: 'Datatec Solutions (Host Employer)',
    mentorName: 'Sipho Zulu',
    mentorDesignation: 'Lead Field Systems Engineer',
    workplaceApprovalNo: 'WP-DATATEC-2024-09',
    moduleCode: 'WEM-01',
    taskTitle: 'Customer Workstation Display Path & Video Fault Isolation',
    hoursLogged: 35,
    status: 'mentor_approved',
    evidenceSummary: 'Learner verified HDMI cable integrity, inspected POST beep sequence, and logged serial numbers.',
    verifiedAt: '2026-11-20T16:30:00Z'
  },
  {
    id: 'wbl-02',
    learnerId: 'lrn-thando',
    learnerName: 'Thando Mokoena',
    hostEmployer: 'Datatec Solutions (Host Employer)',
    mentorName: 'Sipho Zulu',
    mentorDesignation: 'Lead Field Systems Engineer',
    workplaceApprovalNo: 'WP-DATATEC-2024-09',
    moduleCode: 'WEM-02',
    taskTitle: 'Hardware Lab ESD Grounding Mat Verification and Chassis Isolation',
    hoursLogged: 25,
    status: 'mentor_approved',
    evidenceSummary: 'Learner tested anti-static wrist strap resistance with multimeter before handling server motherboards.',
    verifiedAt: '2026-11-21T11:00:00Z'
  },
  {
    id: 'wbl-03',
    learnerId: 'lrn-lerato',
    learnerName: 'Lerato Ndlovu',
    hostEmployer: 'BCX Africa Support Services',
    mentorName: 'Kagiso Molefe',
    mentorDesignation: 'Service Desk Operations Manager',
    workplaceApprovalNo: 'WP-BCX-2025-14',
    moduleCode: 'WEM-01',
    taskTitle: 'Ticket Escalation and Hardware Diagnostic Triage',
    hoursLogged: 40,
    status: 'mentor_approved',
    evidenceSummary: 'Triage and logging of 18 desktop restart incidents following corporate power outages.',
    verifiedAt: '2026-11-19T15:45:00Z'
  },
  {
    id: 'wbl-04',
    learnerId: 'lrn-sipho',
    learnerName: 'Sipho Mahlangu',
    hostEmployer: 'Dimension Data Hub',
    mentorName: 'David Botha',
    mentorDesignation: 'Senior Infrastructure Specialist',
    workplaceApprovalNo: 'WP-DIDATA-2024-71',
    moduleCode: 'WEM-02',
    taskTitle: 'Server Rack Safety Protocol and Mains Isolation Check',
    hoursLogged: 30,
    status: 'returned_for_revision',
    evidenceSummary: 'Mentor returned job card: safety boundary checklist lacked dual-technician sign-off.',
    verifiedAt: '2026-11-18T14:20:00Z'
  },
  {
    id: 'wbl-05',
    learnerId: 'lrn-boitumelo',
    learnerName: 'Boitumelo Maseko',
    hostEmployer: 'Vodacom Network Operations',
    mentorName: 'Precious Nkosi',
    mentorDesignation: 'NOC Lead Engineer',
    workplaceApprovalNo: 'WP-VODA-2024-33',
    moduleCode: 'WEM-01',
    taskTitle: 'Core Network Terminal Hardware Diagnostics & RAM Integrity Testing',
    hoursLogged: 55,
    status: 'mentor_approved',
    evidenceSummary: 'MemTest86 memory diagnostic cycle executed across 6 production monitoring consoles.',
    verifiedAt: '2026-11-21T17:15:00Z'
  },
  {
    id: 'wbl-06',
    learnerId: 'lrn-nomvula',
    learnerName: 'Nomvula Sithole',
    hostEmployer: 'Standard Bank CIB Tech Labs',
    mentorName: 'Johan van der Merwe',
    mentorDesignation: 'QA Chapter Lead',
    workplaceApprovalNo: 'WP-SB-CIB-2025-02',
    moduleCode: 'WEM-TEST-01',
    taskTitle: 'Automated Regression Suite Execution in Production Stage Environment',
    hoursLogged: 45,
    status: 'mentor_approved',
    evidenceSummary: 'Pytest suite executed on financial trade gateway; 4 boundary defects documented in Jira.',
    verifiedAt: '2026-11-22T08:30:00Z'
  }
];
