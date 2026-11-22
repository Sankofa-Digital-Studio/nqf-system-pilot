import {NextResponse} from 'next/server';
import {getLearnerState,listCohort,recordUnderstandingCheck,syncLearnerProgress,type CheckInput} from '@/lib/pilot-db';
import {assignIntervention,changeIntervention,changeSignal,getLearnerControl,listLecturerCohort,saveGrade,setGate} from '@/lib/lecturer-control';
import {UAT_COHORT_DATA, UAT_INTERVENTIONS_DATA, UAT_EVIDENCE_PORTFOLIO, UAT_SIGNALS_DATA} from '@/lib/uat-live-data';

const manifest={mode:'stakeholder-pilot',persistence:'D1 SQLite for synthetic operational records',qualificationClaim:'readiness-model-only',classDirection:'P01 Hardware fault isolation',personalisationRule:'Extra-help activities support but never replace or reorder the class programme.',governingRoute:'Verify registered qualification and provider scope with SAQA/QCTO before delivery.',implementedSlices:['multi-learner records','topic mastery','validated understanding checks','weakness signals','lecturer interventions','warning transitions','gate control','grading and recheck closure','audit events','assessor portfolio verification','cross-campus UAT datasets'],securityBoundary:'Private site access; internal role attribution remains simulated until server-side identity and RBAC are added.'};
function problem(message:string,status=400,details?:unknown){return NextResponse.json({ok:false,message,details},{status})}

export async function GET(request:Request){
  const url=new URL(request.url),resource=url.searchParams.get('resource');
  try{
    if(resource==='cohort')return NextResponse.json({ok:true,...await listCohort(url.searchParams.get('cohortId')||'cohort-01')});
    if(resource==='lecturer_cohort')return NextResponse.json({ok:true,...await listLecturerCohort()});
    if(resource==='learner_control')return NextResponse.json({ok:true,...await getLearnerControl(url.searchParams.get('learnerId')||'')});
    if(resource==='learner_state')return NextResponse.json({ok:true,...await getLearnerState(url.searchParams.get('learnerId')||'lrn-thando')});
    if(resource==='uat_cohort')return NextResponse.json({ok:true,cohort:UAT_COHORT_DATA});
    if(resource==='uat_evidence')return NextResponse.json({ok:true,evidence:UAT_EVIDENCE_PORTFOLIO});
    if(resource==='uat_interventions')return NextResponse.json({ok:true,interventions:UAT_INTERVENTIONS_DATA});
    if(resource==='uat_signals')return NextResponse.json({ok:true,signals:UAT_SIGNALS_DATA});
    return NextResponse.json({ok:true,manifest});
  }catch(error){return problem('Operational store is unavailable.',503,error instanceof Error?error.message:'Unknown storage error')}
}

export async function POST(request:Request){
  let payload:Record<string,unknown>;try{payload=await request.json()}catch{return problem('Request body must be valid JSON.')}
  try{
    let result:Record<string,unknown>;
    switch(payload.action){
      case 'sync_learner_progress':result=await syncLearnerProgress(payload.input as never);break;
      case 'record_understanding_check':result=await recordUnderstandingCheck(payload.check as CheckInput);break;
      case 'assign_intervention':result=await assignIntervention(payload.input as never);break;
      case 'change_signal':result=await changeSignal(payload.input as never);break;
      case 'change_intervention':result=await changeIntervention(payload.input as never);break;
      case 'set_gate':result=await setGate(payload.input as never);break;
      case 'save_grade':result=await saveGrade(payload.input as never);break;
      case 'stamp_evidence': {
        const input = (payload.input || {}) as { artifactId: string; status: 'verified_authentic' | 'returned_for_evidence'; note?: string };
        const found = UAT_EVIDENCE_PORTFOLIO.find(e => e.id === input.artifactId);
        if (found) {
          found.assessorStampStatus = input.status;
          found.assessorDecision = input.status === 'verified_authentic' ? 'released' : 'return';
        }
        result = { accepted: true, artifactId: input.artifactId, status: input.status };
        break;
      }
      case 'toggle_moderation': {
        const input = (payload.input || {}) as { artifactId: string; sampled: boolean };
        const found = UAT_EVIDENCE_PORTFOLIO.find(e => e.id === input.artifactId);
        if (found) {
          found.moderationSampled = input.sampled;
        }
        result = { accepted: true, artifactId: input.artifactId, sampled: input.sampled };
        break;
      }
      default:return problem('Unsupported action.');
    }
    return NextResponse.json({ok:result.accepted,...result},{status:result.accepted?201:422});
  }catch(error){return problem('Control action could not be completed.',422,error instanceof Error?error.message:'Unknown control error')}
}
