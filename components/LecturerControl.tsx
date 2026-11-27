'use client';
import { FormEvent, useCallback, useEffect, useState, useMemo } from 'react';

type Learner = {
  id: string;
  name: string;
  overallReadiness: number;
  activeSignals: number;
  activeInterventions: number;
  formalGate: string;
  classMilestone: string;
  campus?: string;
  employer?: string;
  logbookHours?: number;
  poeStatus?: string;
};

type Profile = {
  learner: Learner;
  mastery: Array<{ topicCode: string; score: number; attempts: number; weaknessLevel: string }>;
  signals: Array<{ id: string; topicCode: string; severity: string; message: string; status: string }>;
  interventions: Array<{ id: string; topicCode: string; activity: string; reason: string; dueAt: string; severity: string; status: string; classMilestone: string }>;
  gates: Array<{ artifactCode: string; status: string; reason: string }>;
  audit: Array<{ id: string; eventType: string; summary: string; createdAt: string }>;
  classDirection: string;
};

const actor = { actorId: 'lecturer-naledi', actorRole: 'lecturer' } as const;
const labels: Record<string, string> = {
  fault_isolation: 'Fault isolation',
  evidence_reasoning: 'Evidence reasoning',
  safety: 'Safety',
  networking: 'Networking',
  escalation: 'Escalation'
};

export default function LecturerControl({ focus = 'cohort' }: { focus?: 'cohort' | 'interventions' }) {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [selected, setSelected] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [campusFilter, setCampusFilter] = useState<'all' | 'metro' | 'highlands'>('all');

  const [topic, setTopic] = useState('fault_isolation');
  const [activity, setActivity] = useState('Complete the worked no-display example and explain each evidence decision.');
  const [reason, setReason] = useState('Understanding check shows a gap between observation and inference.');
  const [severity, setSeverity] = useState('support');
  const [dueAt, setDueAt] = useState('2026-11-28');

  const loadCohort = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('/api/pilot?resource=lecturer_cohort', { signal });
      const data = await response.json() as { learners?: Learner[]; message?: string };
      if (!response.ok) throw new Error(data.message || 'Cohort unavailable.');
      if (signal?.aborted) return;
      setLearners(data.learners || []);
      setSelected(current => current || data.learners?.[0]?.id || '');
    } catch (error) {
      if (!signal?.aborted) setMessage(error instanceof Error ? error.message : 'Cohort load error');
    }
  }, []);

  const loadProfile = useCallback(async (id: string, signal?: AbortSignal) => {
    if (!id) return;
    try {
      const response = await fetch(`/api/pilot?resource=learner_control&learnerId=${encodeURIComponent(id)}`, { signal });
      const data = await response.json() as Profile & { message?: string };
      if (!response.ok) throw new Error(data.message || 'Learner record unavailable.');
      if (!signal?.aborted) setProfile(data);
    } catch (error) {
      if (!signal?.aborted) setMessage(error instanceof Error ? error.message : 'Learner profile load error');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const start = setTimeout(() => void loadCohort(controller.signal), 0);
    return () => { clearTimeout(start); controller.abort(); };
  }, [loadCohort]);

  useEffect(() => {
    const controller = new AbortController();
    const start = setTimeout(() => void loadProfile(selected, controller.signal), 0);
    return () => { clearTimeout(start); controller.abort(); };
  }, [selected, loadProfile]);

  const displayedLearners = useMemo(() => {
    if (campusFilter === 'all') return learners;
    if (campusFilter === 'metro') return learners.filter(l => (l.campus || '').includes('Metro South'));
    return learners.filter(l => (l.campus || '').includes('Highlands'));
  }, [learners, campusFilter]);

  async function act(action: string, input: Record<string, unknown>) {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action, input: { ...actor, ...input } })
      });
      const data = await response.json() as { errors?: string[]; details?: string; message?: string };
      if (!response.ok) throw new Error(data.errors?.join(' ') || data.details || data.message);
      setMessage('Control saved and added to the learner audit trail.');
      await Promise.all([loadCohort(), loadProfile(selected)]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Control could not be saved.');
    } finally {
      setBusy(false);
    }
  }

  function assign(event: FormEvent) {
    event.preventDefault();
    act('assign_intervention', {
      learnerId: selected,
      topicCode: topic,
      activity,
      reason,
      severity,
      dueAt: new Date(`${dueAt}T15:00:00`).toISOString()
    });
  }

  const nextStatus = (status: string) =>
    status === 'assigned' ? 'in_progress' : status === 'in_progress' ? 'awaiting_recheck' : status === 'awaiting_recheck' ? 'closed' : '';

  return (
    <div className="body lecturer-control">
      <div className="control-title">
        <div>
          <p className="kicker">LIVE TVET COHORTS · LECTURER-CONTROLLED</p>
          <h2>{focus === 'interventions' ? 'Interventions and warnings' : 'Cohort learning control'}</h2>
          <p>Signals suggest where to look. Lecturer Naledi Dube reviews, assigns, releases, and closes support.</p>
        </div>
        <span>
          <b>Class direction</b>
          {profile?.classDirection || 'P01 Hardware fault isolation'}
          <small>Extra help cannot replace this milestone.</small>
        </span>
      </div>

      {/* Campus Selector Strip */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#556965' }}>Campus Filter:</span>
        <button
          type="button"
          onClick={() => setCampusFilter('all')}
          style={{
            background: campusFilter === 'all' ? '#124d43' : '#ffffff',
            color: campusFilter === 'all' ? '#caec6b' : '#334b46',
            border: '1px solid #cfdad6',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          All TVET Campuses ({learners.length})
        </button>
        <button
          type="button"
          onClick={() => setCampusFilter('metro')}
          style={{
            background: campusFilter === 'metro' ? '#124d43' : '#ffffff',
            color: campusFilter === 'metro' ? '#caec6b' : '#334b46',
            border: '1px solid #cfdad6',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Metro South TVET (5)
        </button>
        <button
          type="button"
          onClick={() => setCampusFilter('highlands')}
          style={{
            background: campusFilter === 'highlands' ? '#124d43' : '#ffffff',
            color: campusFilter === 'highlands' ? '#caec6b' : '#334b46',
            border: '1px solid #cfdad6',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Highlands Tech (3)
        </button>
      </div>

      <div className="control-layout">
        <section className="panel cohort-list">
          <table>
            <thead>
              <tr>
                <th>Learner</th>
                <th>Ready</th>
                <th>Signals</th>
                <th>Support</th>
                <th>Gate</th>
              </tr>
            </thead>
            <tbody>
              {displayedLearners.map(learner => (
                <tr
                  className={selected === learner.id ? 'selected' : ''}
                  key={learner.id}
                  onClick={() => setSelected(learner.id)}
                >
                  <td>
                    <button style={{ textAlign: 'left' }}>
                      <span style={{ display: 'block', fontWeight: 800 }}>{learner.name}</span>
                      {learner.employer && (
                        <small style={{ display: 'block', fontSize: '10px', color: '#738782' }}>
                          {learner.employer.split('(')[0].trim()}
                        </small>
                      )}
                    </button>
                  </td>
                  <td>{learner.overallReadiness}%</td>
                  <td>
                    <i className={learner.activeSignals ? 'risk' : ''}>{learner.activeSignals}</i>
                  </td>
                  <td>{learner.activeInterventions}</td>
                  <td>
                    <b className={'gate ' + learner.formalGate}>{learner.formalGate}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {profile && (
          <section className="control-detail">
            <div className="learner-heading">
              <div>
                <p className="kicker">INDIVIDUAL SUPPORT RECORD</p>
                <h2>{profile.learner.name}</h2>
                {profile.learner.campus && (
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#556965' }}>
                    {profile.learner.campus} · {profile.learner.employer} · Logbook: {profile.learner.logbookHours || 140} hrs
                  </p>
                )}
              </div>
              <b>
                {profile.learner.overallReadiness}%<small>readiness</small>
              </b>
            </div>

            <div className="mastery-strip">
              {profile.mastery.map(item => (
                <div key={item.topicCode}>
                  <span>{labels[item.topicCode] || item.topicCode}</span>
                  <b>{item.attempts ? `${item.score}%` : 'Unmeasured'}</b>
                  <i className={item.weaknessLevel}>{item.weaknessLevel}</i>
                </div>
              ))}
            </div>

            <section className="control-block">
              <div className="block-title">
                <h3>Warnings requiring review</h3>
                <small>Automation cannot resolve these.</small>
              </div>
              {profile.signals.length ? (
                profile.signals.map(signal => (
                  <article className="warning-row" key={signal.id}>
                    <i className={signal.severity}>!</i>
                    <span>
                      <b>{signal.message}</b>
                      <small>
                        {signal.status} · {labels[signal.topicCode] || signal.topicCode}
                      </small>
                    </span>
                    {signal.status !== 'resolved' && (
                      <div>
                        <button
                          disabled={busy || signal.status === 'acknowledged'}
                          onClick={() =>
                            act('change_signal', {
                              learnerId: selected,
                              signalId: signal.id,
                              status: 'acknowledged',
                              note: 'Reviewed against learner evidence and class context.'
                            })
                          }
                        >
                          Acknowledge
                        </button>
                        <button
                          disabled={busy}
                          onClick={() =>
                            act('change_signal', {
                              learnerId: selected,
                              signalId: signal.id,
                              status: 'resolved',
                              note: 'Evidence reviewed and the warning is no longer active.'
                            })
                          }
                        >
                          Resolve
                        </button>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <p className="empty-state">No persisted warnings. Formative checks are currently within threshold.</p>
              )}
            </section>

            <section className="control-block">
              <div className="block-title">
                <h3>Extra-help pathway</h3>
                <small>Always subordinate to core occupational milestone.</small>
              </div>
              {profile.interventions.map(item => (
                <article className="intervention-row" key={item.id}>
                  <span>
                    <b>{item.activity}</b>
                    <small>
                      {labels[item.topicCode]} · due {new Date(item.dueAt).toLocaleDateString()} · {item.status}
                    </small>
                    <em>{item.classMilestone}</em>
                  </span>
                  {nextStatus(item.status) && (
                    <button
                      disabled={busy}
                      onClick={() =>
                        act('change_intervention', {
                          learnerId: selected,
                          interventionId: item.id,
                          status: nextStatus(item.status),
                          closureEvidence:
                            nextStatus(item.status) === 'closed'
                              ? 'Understanding recheck reached the required threshold and evidence was reviewed.'
                              : undefined
                        })
                      }
                    >
                      {nextStatus(item.status).replaceAll('_', ' ')}
                    </button>
                  )}
                </article>
              ))}

              <form className="intervention-form" onSubmit={assign}>
                <label>
                  Weakness
                  <select value={topic} onChange={event => setTopic(event.target.value)}>
                    {Object.entries(labels).map(([value, label]) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Severity
                  <select value={severity} onChange={event => setSeverity(event.target.value)}>
                    <option>observe</option>
                    <option>support</option>
                    <option>urgent</option>
                  </select>
                </label>
                <label>
                  Due date
                  <input type="date" value={dueAt} onChange={event => setDueAt(event.target.value)} required />
                </label>
                <label className="wide">
                  Extra-help activity
                  <textarea value={activity} onChange={event => setActivity(event.target.value)} required />
                </label>
                <label className="wide">
                  Observed reason
                  <textarea value={reason} onChange={event => setReason(event.target.value)} required />
                </label>
                <button className="action primary" disabled={busy}>
                  Assign extra help
                </button>
              </form>
            </section>

            <section className="gate-control">
              <div>
                <b>Formal-test gate</b>
                <span>{profile.gates.find(g => g.artifactCode === 'F01')?.status || 'blocked'}</span>
              </div>
              <button
                disabled={busy}
                onClick={() =>
                  act('set_gate', {
                    learnerId: selected,
                    artifactCode: 'F01',
                    status: 'blocked',
                    reason: 'Evidence or understanding requires lecturer follow-up.'
                  })
                }
              >
                Block
              </button>
              <button
                disabled={busy}
                onClick={() =>
                  act('set_gate', {
                    learnerId: selected,
                    artifactCode: 'F01',
                    status: 'released',
                    reason: 'Required evidence reviewed and active support warnings resolved.'
                  })
                }
              >
                Release
              </button>
            </section>

            {message && <p className="control-message">{message}</p>}

            <details className="audit-details">
              <summary>View attributed audit history ({profile.audit.length} events)</summary>
              {profile.audit.map(event => (
                <p key={event.id}>
                  <time>{new Date(event.createdAt).toLocaleString()}</time>
                  <b>{event.eventType}</b>
                  <span>{event.summary}</span>
                </p>
              ))}
            </details>
          </section>
        )}
      </div>
    </div>
  );
}
