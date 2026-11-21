export type Role = 'learner' | 'lecturer' | 'assessor' | 'provider';

export interface User {
  role: Role;
  name: string;
  email: string;
  password: string;
  initials: string;
  avatarBg?: string;
}

export interface LearnerState {
  labStep: number;
  labComplete: boolean;
  cognitiveScore: number;
  cognitiveComplete: boolean;
  cognitiveGaps: number[];
  remediationComplete: number[];
  formalSubmitted: boolean;
  formalScore: number;
  formalAnswers: Record<number, string>;
  feedback: string;
  signals: string[];
}

export interface MetricCardData {
  label: string;
  value: string | number;
  subtext: string;
  status: 'secure' | 'developing' | 'risk' | 'neutral';
}
