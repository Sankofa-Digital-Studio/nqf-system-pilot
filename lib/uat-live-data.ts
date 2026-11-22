import { QualificationManifest } from '@/lib/manifests';

export interface UATLearner {
  id: string;
  name: string;
  idNumber: string;
  cohortId: string;
  campus: string;
  qualificationId: string;
  classMilestone: string;
  overallReadiness: number;
  activeSignals: number;
  activeInterventions: number;
  formalGate: 'blocked' | 'released' | 'resubmission';
  avatarInitials: string;
  employer: string;
  logbookHours: number;
  poeStatus: 'in_progress' | 'submitted' | 'assessor_approved' | 'moderated';
  lastActivity: string;
}

export interface UATIntervention {
  id: string;
  learnerId: string;
  learnerName: string;
  topicCode: string;
  topicName: string;
  severity: 'observe' | 'support' | 'urgent';
  activity: string;
  reason: string;
  dueAt: string;
  status: 'assigned' | 'in_progress' | 'awaiting_recheck' | 'closed';
  lecturerName: string;
}

export interface UATSignal {
  id: string;
  learnerId: string;
  learnerName: string;
  topicCode: string;
  severity: 'observe' | 'support' | 'urgent';
  code: string;
  message: string;
  status: 'open' | 'acknowledged' | 'resolved';
  createdAt: string;
}

export interface UATEvidenceArtifact {
  id: string;
  learnerId: string;
  learnerName: string;
  qualificationTitle: string;
  moduleCode: string;
  artifactTitle: string;
  provisionalScore: number;
  criteriaMet: number;
  totalCriteria: number;
  lecturerFeedback: string;
  assessorDecision: 'draft' | 'released' | 'return';
  assessorStampStatus: 'pending' | 'verified_authentic' | 'returned_for_evidence';
  moderationSampled: boolean;
  timestamp: string;
}

export const UAT_COHORT_DATA: UATLearner[] = [
  {
    id: 'lrn-thando',
    name: 'Thando Mokoena',
    idNumber: '0204155829081',
    cohortId: 'cohort-01',
    campus: 'Metro South TVET - Soweto Campus',
    qualificationId: '48573',
    classMilestone: 'P01 Hardware fault isolation',
    overallReadiness: 72,
    activeSignals: 1,
    activeInterventions: 1,
    formalGate: 'released',
    avatarInitials: 'TM',
    employer: 'Datatec Solutions (Host Employer)',
    logbookHours: 140,
    poeStatus: 'submitted',
    lastActivity: '12 mins ago'
  },
  {
    id: 'lrn-lerato',
    name: 'Lerato Ndlovu',
    idNumber: '0112040928087',
    cohortId: 'cohort-01',
    campus: 'Metro South TVET - Soweto Campus',
    qualificationId: '48573',
    classMilestone: 'P01 Hardware fault isolation',
    overallReadiness: 58,
    activeSignals: 2,
    activeInterventions: 2,
    formalGate: 'resubmission',
    avatarInitials: 'LN',
    employer: 'BCX Africa Support Services',
    logbookHours: 115,
    poeStatus: 'in_progress',
    lastActivity: '45 mins ago'
  },
  {
    id: 'lrn-sipho',
    name: 'Sipho Mahlangu',
    idNumber: '0308225019084',
    cohortId: 'cohort-01',
    campus: 'Metro South TVET - Alexandra Campus',
    qualificationId: '48573',
    classMilestone: 'P01 Hardware fault isolation',
    overallReadiness: 44,
    activeSignals: 3,
    activeInterventions: 2,
    formalGate: 'blocked',
    avatarInitials: 'SM',
    employer: 'Dimension Data Hub',
    logbookHours: 90,
    poeStatus: 'in_progress',
    lastActivity: '3 hours ago'
  },
  {
    id: 'lrn-boitumelo',
    name: 'Boitumelo Maseko',
    idNumber: '0106180874083',
    cohortId: 'cohort-01',
    campus: 'Metro South TVET - Soweto Campus',
    qualificationId: '48573',
    classMilestone: 'P01 Hardware fault isolation',
    overallReadiness: 91,
    activeSignals: 0,
    activeInterventions: 0,
    formalGate: 'released',
    avatarInitials: 'BM',
    employer: 'Vodacom Network Operations',
    logbookHours: 180,
    poeStatus: 'assessor_approved',
    lastActivity: 'Yesterday'
  },
  {
    id: 'lrn-kgothatso',
    name: 'Kgothatso Dlamini',
    idNumber: '0209115123089',
    cohortId: 'cohort-02',
    campus: 'Highlands Tech Institute - Pretoria',
    qualificationId: '119438',
    classMilestone: 'PSM-TEST Test and Debug Source Code',
    overallReadiness: 65,
    activeSignals: 1,
    activeInterventions: 1,
    formalGate: 'released',
    avatarInitials: 'KD',
    employer: 'Altron Digital Services',
    logbookHours: 125,
    poeStatus: 'submitted',
    lastActivity: '5 hours ago'
  },
  {
    id: 'lrn-nomvula',
    name: 'Nomvula Sithole',
    idNumber: '0303150244085',
    cohortId: 'cohort-02',
    campus: 'Highlands Tech Institute - Pretoria',
    qualificationId: '119438',
    classMilestone: 'PSM-TEST Test and Debug Source Code',
    overallReadiness: 84,
    activeSignals: 0,
    activeInterventions: 0,
    formalGate: 'released',
    avatarInitials: 'NS',
    employer: 'Standard Bank CIB Tech Labs',
    logbookHours: 160,
    poeStatus: 'assessor_approved',
    lastActivity: '2 hours ago'
  },
  {
    id: 'lrn-ayanda',
    name: 'Ayanda Khumalo',
    idNumber: '0207305912086',
    cohortId: 'cohort-02',
    campus: 'Highlands Tech Institute - Centurion',
    qualificationId: '119438',
    classMilestone: 'KM-SE Software Engineering Principles',
    overallReadiness: 49,
    activeSignals: 2,
    activeInterventions: 1,
    formalGate: 'blocked',
    avatarInitials: 'AK',
    employer: 'Entelect Software',
    logbookHours: 75,
    poeStatus: 'in_progress',
    lastActivity: '1 day ago'
  },
  {
    id: 'lrn-zanele',
    name: 'Zanele Radebe',
    idNumber: '0101190412080',
    cohortId: 'cohort-01',
    campus: 'Metro South TVET - Soweto Campus',
    qualificationId: '48573',
    classMilestone: 'P01 Hardware fault isolation',
    overallReadiness: 87,
    activeSignals: 0,
    activeInterventions: 0,
    formalGate: 'released',
    avatarInitials: 'ZR',
    employer: 'First National Bank Core IT',
    logbookHours: 175,
    poeStatus: 'moderated',
    lastActivity: '30 mins ago'
  }
];

export const UAT_INTERVENTIONS_DATA: UATIntervention[] = [
  {
    id: 'int-001',
    learnerId: 'lrn-lerato',
    learnerName: 'Lerato Ndlovu',
    topicCode: 'fault_isolation',
    topicName: 'Fault isolation method',
    severity: 'support',
    activity: 'Complete the worked no-display decision trace and explain POST signal verification.',
    reason: 'Understanding check shows skipping least-invasive cable test directly to component swap.',
    dueAt: '2026-11-28T15:00:00Z',
    status: 'in_progress',
    lecturerName: 'Naledi Dube'
  },
  {
    id: 'int-002',
    learnerId: 'lrn-sipho',
    learnerName: 'Sipho Mahlangu',
    topicCode: 'safety',
    topicName: 'ESD and electrical safety',
    severity: 'urgent',
    activity: 'Retake chassis safety protocol PBQ with live PSU high-voltage boundary rules.',
    reason: 'Formative quiz failed mandatory mains electrical isolation boundary check.',
    dueAt: '2026-11-25T12:00:00Z',
    status: 'assigned',
    lecturerName: 'Naledi Dube'
  },
  {
    id: 'int-003',
    learnerId: 'lrn-ayanda',
    learnerName: 'Ayanda Khumalo',
    topicCode: 'test_design',
    topicName: 'Test Case Design Techniques',
    severity: 'support',
    activity: 'Draft boundary value analysis partitions for input range 1-100 with zero edge case.',
    reason: 'Software tester test suite missed 3 off-by-one boundary failure conditions.',
    dueAt: '2026-11-29T16:00:00Z',
    status: 'assigned',
    lecturerName: 'Naledi Dube'
  },
  {
    id: 'int-004',
    learnerId: 'lrn-thando',
    learnerName: 'Thando Mokoena',
    topicCode: 'evidence_reasoning',
    topicName: 'Evidence-based reasoning',
    severity: 'observe',
    activity: 'Annotate exact observed beep code and amber LED state on the live technician job card.',
    reason: 'Job card originally stated "does not work" rather than empirical diagnostic finding.',
    dueAt: '2026-11-26T17:00:00Z',
    status: 'awaiting_recheck',
    lecturerName: 'Naledi Dube'
  }
];

export const UAT_EVIDENCE_PORTFOLIO: UATEvidenceArtifact[] = [
  {
    id: 'ev-01',
    learnerId: 'lrn-thando',
    learnerName: 'Thando Mokoena',
    qualificationTitle: 'SAQA 48573: Systems Support',
    moduleCode: 'P01',
    artifactTitle: 'Practical Job Card: Workstation Display Fault Isolation',
    provisionalScore: 78,
    criteriaMet: 3,
    totalCriteria: 4,
    lecturerFeedback: 'Good safe sequence. Ensure known-good HDMI cable model serial is logged.',
    assessorDecision: 'draft',
    assessorStampStatus: 'pending',
    moderationSampled: true,
    timestamp: '2026-11-22T09:14:00Z'
  },
  {
    id: 'ev-02',
    learnerId: 'lrn-boitumelo',
    learnerName: 'Boitumelo Maseko',
    qualificationTitle: 'SAQA 48573: Systems Support',
    moduleCode: 'P01',
    artifactTitle: 'Practical Job Card: RAM & POST Signal Diagnostic Sequence',
    provisionalScore: 92,
    criteriaMet: 4,
    totalCriteria: 4,
    lecturerFeedback: 'Exemplary evidence documentation. Clear observation vs inference distinction.',
    assessorDecision: 'released',
    assessorStampStatus: 'verified_authentic',
    moderationSampled: false,
    timestamp: '2026-11-21T14:30:00Z'
  },
  {
    id: 'ev-03',
    learnerId: 'lrn-lerato',
    learnerName: 'Lerato Ndlovu',
    qualificationTitle: 'SAQA 48573: Systems Support',
    moduleCode: 'P01',
    artifactTitle: 'Practical Job Card: Power & Voltage Fault Elimination',
    provisionalScore: 62,
    criteriaMet: 2,
    totalCriteria: 4,
    lecturerFeedback: 'Returned: Diagnostic step skipped display input selection. Resubmission required.',
    assessorDecision: 'return',
    assessorStampStatus: 'returned_for_evidence',
    moderationSampled: false,
    timestamp: '2026-11-20T11:45:00Z'
  },
  {
    id: 'ev-04',
    learnerId: 'lrn-nomvula',
    learnerName: 'Nomvula Sithole',
    qualificationTitle: 'SAQA 119438: Software Tester',
    moduleCode: 'PSM-TEST',
    artifactTitle: 'Coded Test Suite: Pytest Automated Unit & Boundary Verification',
    provisionalScore: 89,
    criteriaMet: 4,
    totalCriteria: 4,
    lecturerFeedback: 'Coverage exceeds 88%. Test assertions effectively catch all boundary edge cases.',
    assessorDecision: 'released',
    assessorStampStatus: 'verified_authentic',
    moderationSampled: true,
    timestamp: '2026-11-22T08:20:00Z'
  },
  {
    id: 'ev-05',
    learnerId: 'lrn-kgothatso',
    learnerName: 'Kgothatso Dlamini',
    qualificationTitle: 'SAQA 119438: Software Tester',
    moduleCode: 'PSM-TEST',
    artifactTitle: 'API Test Collection: Postman Mock Integration Suite',
    provisionalScore: 71,
    criteriaMet: 3,
    totalCriteria: 4,
    lecturerFeedback: 'API endpoints correctly tested. Add assertions for 401 Unauthorized responses.',
    assessorDecision: 'draft',
    assessorStampStatus: 'pending',
    moderationSampled: false,
    timestamp: '2026-11-21T16:10:00Z'
  },
  {
    id: 'ev-06',
    learnerId: 'lrn-zanele',
    learnerName: 'Zanele Radebe',
    qualificationTitle: 'SAQA 48573: Systems Support',
    moduleCode: 'F01',
    artifactTitle: 'Formal Integrated Assessment: Systems Support Pre-Qualifier',
    provisionalScore: 88,
    criteriaMet: 4,
    totalCriteria: 4,
    lecturerFeedback: 'Summative internal threshold satisfied. Approved for EISA qualifier entry.',
    assessorDecision: 'released',
    assessorStampStatus: 'verified_authentic',
    moderationSampled: true,
    timestamp: '2026-11-19T13:00:00Z'
  }
];

export const UAT_SIGNALS_DATA: UATSignal[] = [
  {
    id: 'sig-01',
    learnerId: 'lrn-thando',
    learnerName: 'Thando Mokoena',
    topicCode: 'evidence_reasoning',
    severity: 'observe',
    code: 'understanding_gap',
    message: 'Evidence reasoning note: Job card omitted initial diagnostic LED flash pattern.',
    status: 'open',
    createdAt: '2026-11-22T08:15:00Z'
  },
  {
    id: 'sig-02',
    learnerId: 'lrn-lerato',
    learnerName: 'Lerato Ndlovu',
    topicCode: 'fault_isolation',
    severity: 'support',
    code: 'skipping_sequence',
    message: 'Fault isolation sequence skipped cable continuity and proceeded directly to component swap.',
    status: 'open',
    createdAt: '2026-11-21T10:30:00Z'
  },
  {
    id: 'sig-03',
    learnerId: 'lrn-lerato',
    learnerName: 'Lerato Ndlovu',
    topicCode: 'safety',
    severity: 'observe',
    code: 'esd_strap_verification',
    message: 'Workstation safety checklist lacked recorded verification of anti-static mat grounding.',
    status: 'open',
    createdAt: '2026-11-20T14:10:00Z'
  },
  {
    id: 'sig-04',
    learnerId: 'lrn-sipho',
    learnerName: 'Sipho Mahlangu',
    topicCode: 'safety',
    severity: 'urgent',
    code: 'mains_voltage_hazard',
    message: 'Chassis disassembly quiz attempted internal PSU service without isolating mains power.',
    status: 'open',
    createdAt: '2026-11-21T09:00:00Z'
  },
  {
    id: 'sig-05',
    learnerId: 'lrn-sipho',
    learnerName: 'Sipho Mahlangu',
    topicCode: 'networking',
    severity: 'support',
    code: 'apipa_misdiagnosis',
    message: 'Failed to recognize 169.254.x.x as DHCP failure; diagnosed as physical NIC hardware defect.',
    status: 'open',
    createdAt: '2026-11-20T16:20:00Z'
  },
  {
    id: 'sig-06',
    learnerId: 'lrn-sipho',
    learnerName: 'Sipho Mahlangu',
    topicCode: 'fault_isolation',
    severity: 'support',
    code: 'unverified_assumptions',
    message: 'Diagnostic reasoning test confused symptom observation with component failure hypothesis.',
    status: 'open',
    createdAt: '2026-11-19T11:40:00Z'
  },
  {
    id: 'sig-07',
    learnerId: 'lrn-kgothatso',
    learnerName: 'Kgothatso Dlamini',
    topicCode: 'networking',
    severity: 'support',
    code: 'api_test_assertion',
    message: 'API test collection missed HTTP status assertions on token expiration edge cases.',
    status: 'open',
    createdAt: '2026-11-22T07:45:00Z'
  },
  {
    id: 'sig-08',
    learnerId: 'lrn-ayanda',
    learnerName: 'Ayanda Khumalo',
    topicCode: 'fault_isolation',
    severity: 'urgent',
    code: 'boundary_omission',
    message: 'Boundary Value Analysis test suite failed to test off-by-one indices and empty array bounds.',
    status: 'open',
    createdAt: '2026-11-21T13:15:00Z'
  },
  {
    id: 'sig-09',
    learnerId: 'lrn-ayanda',
    learnerName: 'Ayanda Khumalo',
    topicCode: 'escalation',
    severity: 'observe',
    code: 'defect_severity_classification',
    message: 'Critical security crash classified as minor cosmetic bug in defect tracking matrix.',
    status: 'open',
    createdAt: '2026-11-20T12:00:00Z'
  }
];

export function getUATLearners(cohortId?: string): UATLearner[] {
  if (!cohortId) return UAT_COHORT_DATA;
  return UAT_COHORT_DATA.filter(l => l.cohortId === cohortId);
}

export function getUATLearner(learnerId: string): UATLearner | undefined {
  return UAT_COHORT_DATA.find(l => l.id === learnerId) || UAT_COHORT_DATA[0];
}

export function getUATLearnerState(learnerId = 'lrn-thando') {
  const learner = getUATLearner(learnerId) || UAT_COHORT_DATA[0];
  const signals = UAT_SIGNALS_DATA.filter(s => s.learnerId === learner.id && s.status !== 'resolved');
  const gradeArtifact = UAT_EVIDENCE_PORTFOLIO.find(e => e.learnerId === learner.id);

  return {
    learnerId: learner.id,
    name: learner.name,
    overallReadiness: learner.overallReadiness,
    formalGateStatus: learner.formalGate,
    p01Grade: gradeArtifact ? {
      provisionalScore: gradeArtifact.provisionalScore,
      decision: gradeArtifact.assessorDecision,
      feedback: gradeArtifact.lecturerFeedback
    } : null,
    activeSignals: signals.map(s => s.message)
  };
}

export function getUATLearnerControl(learnerId: string) {
  const learner = getUATLearner(learnerId) || UAT_COHORT_DATA[0];
  const signals = UAT_SIGNALS_DATA.filter(s => s.learnerId === learner.id);
  const interventions = UAT_INTERVENTIONS_DATA.filter(i => i.learnerId === learner.id);
  const evidence = UAT_EVIDENCE_PORTFOLIO.filter(e => e.learnerId === learner.id);

  // Compute realistic topic masteries
  const high = learner.overallReadiness >= 75;
  const medium = learner.overallReadiness >= 60;

  const mastery = [
    {
      topicCode: 'fault_isolation',
      score: high ? 86 : medium ? 68 : 45,
      attempts: 2,
      weaknessLevel: high ? 'secure' : medium ? 'developing' : 'high',
      lastEvidence: 'Job card practical P01'
    },
    {
      topicCode: 'evidence_reasoning',
      score: high ? 92 : medium ? 72 : 52,
      attempts: 2,
      weaknessLevel: high ? 'secure' : medium ? 'developing' : 'high',
      lastEvidence: 'Cognitive reasoning trace'
    },
    {
      topicCode: 'safety',
      score: learner.id === 'lrn-sipho' ? 44 : 95,
      attempts: learner.id === 'lrn-sipho' ? 2 : 1,
      weaknessLevel: learner.id === 'lrn-sipho' ? 'high' : 'secure',
      lastEvidence: 'Chassis isolation procedure'
    },
    {
      topicCode: 'networking',
      score: high ? 88 : medium ? 65 : 42,
      attempts: 2,
      weaknessLevel: high ? 'secure' : medium ? 'developing' : 'high',
      lastEvidence: 'TCP/IP and API diagnostic test'
    },
    {
      topicCode: 'escalation',
      score: high ? 90 : 80,
      attempts: 1,
      weaknessLevel: 'secure',
      lastEvidence: 'SLA escalation matrix review'
    }
  ];

  const audit = [
    {
      id: `evt-${learner.id}-1`,
      actorId: 'lecturer-naledi',
      actorRole: 'lecturer',
      eventType: 'milestone_evaluation',
      summary: `Provisional milestone review conducted for ${learner.name}.`,
      createdAt: '2026-11-22T09:30:00Z'
    },
    {
      id: `evt-${learner.id}-2`,
      actorId: 'assessor-peter',
      actorRole: 'assessor',
      eventType: 'poe_authenticity_check',
      summary: `Host employer workplace logbook verified (${learner.employer}).`,
      createdAt: '2026-11-21T14:15:00Z'
    },
    {
      id: `evt-${learner.id}-3`,
      actorId: 'system',
      actorRole: 'system',
      eventType: 'gate_audit',
      summary: `Formal gate evaluation recorded: ${learner.formalGate.toUpperCase()}.`,
      createdAt: '2026-11-20T11:00:00Z'
    }
  ];

  return {
    learner: {
      id: learner.id,
      name: learner.name,
      status: learner.formalGate === 'released' ? 'on-pace' : learner.formalGate === 'resubmission' ? 'remediation' : 'risk',
      classMilestone: learner.classMilestone,
      overallReadiness: learner.overallReadiness,
      activeSignals: signals.filter(s => s.status !== 'resolved').length,
      activeInterventions: interventions.filter(i => i.status !== 'closed').length,
      formalGate: learner.formalGate,
      campus: learner.campus,
      employer: learner.employer,
      logbookHours: learner.logbookHours,
      poeStatus: learner.poeStatus
    },
    mastery,
    signals,
    interventions,
    gates: [
      {
        artifactCode: 'F01',
        status: learner.formalGate,
        reason: learner.formalGate === 'released'
          ? 'Formative requirements and safety gates cleared.'
          : learner.formalGate === 'resubmission'
          ? 'Evidence incomplete on diagnostic trace; resubmission required.'
          : 'Support signals active. Mandatory lecturer review required.',
        updatedBy: 'lecturer-naledi',
        updatedAt: '2026-11-22T10:00:00Z'
      }
    ],
    grades: evidence.map(e => ({
      artifactCode: e.moduleCode,
      rubricJson: JSON.stringify({ score: e.provisionalScore, criteriaMet: e.criteriaMet }),
      provisionalScore: e.provisionalScore,
      decision: e.assessorDecision,
      feedback: e.lecturerFeedback,
      resubmissionRequired: e.assessorDecision === 'return' ? 1 : 0,
      assessorStatus: e.assessorStampStatus,
      updatedAt: e.timestamp
    })),
    audit,
    classDirection: learner.classMilestone
  };
}

