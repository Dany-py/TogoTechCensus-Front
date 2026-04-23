import type { ChangeEvent, FocusEvent, MouseEvent } from 'react';
import { Form, useActionData, useNavigation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../ui/Spinner';

// ─── Types ─────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  description: string;
  categories: string;
  type: string;
  needs: string;
  public: string;
  technologies: string;
  foundedAt: string;
  author: string;
  email: string;
  address: string;
  github: string;
  website: string;
  twitter: string;
  linkedin: string;
}

interface StepConfig {
  id: number;
  label: string;
  icon: React.ReactNode;
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

interface MultiStepSubmissionProps {
  id?: number,
  onSuccess?: () => void;
}

// ─── Icons ─────────────────────────────────────────────────────────────────
const icons: Record<string, React.ReactNode> = {
  team:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  links:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  check:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  back:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  leaf:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
};

// ─── Field ─────────────────────────────────────────────────────────────────
const Field = ({ label, required = false, children }: FieldProps): React.JSX.Element => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '11.5px', fontWeight: '700', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--muted)' }}>
      {required && <span style={{ color: 'var(--accent)', marginRight: '4px' }}>*</span>}
      {label}
    </label>
    {children}
  </div>
);

// ─── Styles ────────────────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  background: 'var(--input-bg)',
  border: '1.5px solid var(--border)',
  borderRadius: '10px',
  padding: '11px 15px',
  fontSize: '14px',
  color: 'var(--text)',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

// ─── Steps ─────────────────────────────────────────────────────────────────
const STEPS: StepConfig[] = [
  { id: 0, label: 'Project',  icon: icons.rocket },
  { id: 1, label: 'Team',     icon: icons.team   },
  { id: 2, label: 'Links',    icon: icons.links  },
  { id: 3, label: 'Review',   icon: icons.check  },
];

const STEP_TITLES: string[] = [
  'Project Information',
  'Team & Contact',
  'Links & Social Media',
  'Review & Submit',
];

interface CategorieProps {
  code: string,
  name: string
}

const CATEGORIES: Array<CategorieProps> = [
    { code: 'fintech-financial', name: 'FinTech & Financial Services' },
    { code: 'health-healthtech', name: 'Health & HealthTech' },
    { code: 'logistics-transport', name: 'Logistics & Transport' },
    { code: 'agritech', name: 'AgriTech' },
    { code: 'edtech-training', name: 'EdTech & Training' },
    { code: 'b2b-services', name: 'B2B Services' },
    { code: 'marketplace-e-commerce', name: 'Marketplace & E-commerce' },
    { code: 'social-impact-greentech', name: 'Social Impact & GreenTech' },
    { code: 'events-culture', name: 'Events & Culture' },
    { code: 'employment-hr', name: 'Employment and HR ' },
    { code: 'gaming', name: 'Gaming' },
    { code: 'devsecops-security', name: 'DevSecOps & Security' },
    { code: 'mobile-apps', name: 'Mobile Apps' },
    { code: 'web-developpement', name: 'Web Development' },
    { code: 'artificial-intelligence', name: 'Artificial Intelligence' },
    { code: 'sdk-cli-libraries', name: 'SDK, CLI & Libraries' },
    { code: 'api-microservices', name: 'APIs & Microservices' },
    { code: 'community-learning', name: 'Community & Learning' },
    { code: 'mathematics-science', name: 'Mathematics & Science' },
    { code: 'ressources-documentation', name: 'Resources & Documentation' },
    { code: 'hubs-incubators-communities', name: 'Hubs, Incubators & Communities' },
    { code: 'others', name: 'Others' },
]

const TYPES: string[] = ['Startup', 'Open Source', 'Side Project', 'Enterprise', 'Accelerator', 'Organisation', 'Community', 'Incubator', 'Hub'];

// ─── Main Component ────────────────────────────────────────────────────────
export default function MultiStepSubmission({ id, onSuccess }: MultiStepSubmissionProps): React.JSX.Element {
  const data       = useActionData() as { success?: boolean; error?: string } | null;
  const navigation = useNavigation();
  const navigate   = useNavigate();
  const isLoading  = navigation.state !== 'idle';

  const [projectId, setProjectId] = useState<number>();
  const [update,    setUpdate]    = useState<boolean>(false)
  const [step,      setStep]      = useState<number>(0);
  const [visited,   setVisited]   = useState<Set<number>>(new Set([0]));
  const [direction, setDirection] = useState<number>(1);
  const [animating, setAnimating] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: '', description: '', categories: '', type: '', needs: '',
    public: '', technologies: '', foundedAt: '',
    author: '', email: '', address: '',
    github: '', website: '', twitter: '', linkedin: '',
  });

  useEffect(() => {
    if(id) {
      setProjectId(id)
      setUpdate(true)
    }
  }, [id])

  useEffect(() => {
    if (data?.success) {
      onSuccess?.();
      setTimeout(() => navigate('/dashboard'), 300);
    }
  }, [data?.success]);

  const go = (next: number): void => {
    if (animating) return;
    setDirection(next > step ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setVisited((v) => new Set([...v, next]));
      setAnimating(false);
    }, 220);
  };

  const setField = (key: keyof FormState, value: string): void =>
    setForm((f) => ({ ...f, [key]: value }));

  const fh = {
    onFocus: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      e.target.style.borderColor = 'var(--accent)';
      e.target.style.boxShadow   = '0 0 0 3px rgba(40,167,69,0.13)';
      e.target.style.background  = '#fff';
    },
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      e.target.style.borderColor = 'var(--border)';
      e.target.style.boxShadow   = 'none';
      e.target.style.background  = 'var(--input-bg)';
    },
  };

  const inp = (
    name: keyof FormState,
    placeholder: string,
    type: string = 'text',
    required: boolean = false,
  ): React.JSX.Element => (
    <Field label={name.replace(/([A-Z])/g, ' $1')} required={required}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setField(name, e.target.value)}
        style={inputBase}
        {...fh}
      />
    </Field>
  );

  const pillStyle = (selected: boolean, shade: string = 'accent'): React.CSSProperties => ({
    padding: '7px 15px',
    borderRadius: '100px',
    fontSize: '13px',
    cursor: 'pointer',
    border: `1.5px solid ${selected ? `var(--${shade})` : 'var(--border)'}`,
    background:  selected ? `var(--${shade})` : 'transparent',
    color:       selected ? 'white'           : 'var(--muted)',
    fontWeight:  selected ? '600' : '400',
    boxShadow:   selected ? '0 2px 10px rgba(40,167,69,0.25)' : 'none',
    transition: 'all 0.18s',
    fontFamily: 'inherit',
  });

  const reviewRow = (label: string, value: string): React.JSX.Element | null =>
    value ? (
      <div style={{ display: 'flex', gap: '14px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
        <span style={{ width: '130px', flexShrink: 0, fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '1px' }}>
          {label}
        </span>
        <span style={{ fontSize: '14px', color: 'var(--text)', wordBreak: 'break-word' }}>{value}</span>
      </div>
    ) : null;

  // ── Panels ────────────────────────────────────────────────────────────────
  const panels: React.JSX.Element[] = [

    // Step 0 – Project Info
    <div key="0" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Field label="Project Name" required>
        <input
          name="name" placeholder="My awesome project" required
          value={form.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setField('name', e.target.value)}
          style={inputBase} {...fh}
        />
      </Field>
      <Field label="Description" required>
        <textarea
          name="description"
          placeholder="Describe your project and why it matters..."
          required
          value={form.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('description', e.target.value)}
          style={{ ...inputBase, minHeight: '94px', resize: 'vertical', lineHeight: '1.65' }}
          {...fh}
        />
      </Field>
      <Field label="Category" required>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {CATEGORIES.map((c) => (
            <button key={c.code} type="button" onClick={() => setField('categories', c.code)} style={pillStyle(form.categories === c.code)}>
              {c.name}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Type" required>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TYPES.map((t) => (
            <button key={t} type="button" onClick={() => setField('type', t)} style={pillStyle(form.type === t, 'accent-dark')}>
              {t}
            </button>
          ))}
        </div>
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field label="Needs" required>
          <input
            name="needs" placeholder="Designer, developer..." required
            value={form.needs}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setField('needs', e.target.value)}
            style={inputBase} {...fh}
          />
        </Field>
        <Field label="Founded At" required>
          <input
            type="date" name="foundedAt"
            value={form.foundedAt}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setField('foundedAt', e.target.value)}
            style={{ ...inputBase, colorScheme: 'light' } as React.CSSProperties}
            {...fh}
          />
        </Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {inp('public',       'Students, general public')}
        <Field label="Technologies" required>
          <input
            name="technologies" placeholder='React, Python, Postgres'
            type="text"
            value={form.technologies}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setField('technologies', e.target.value)}
            style={{ ...inputBase, colorScheme: 'light' } as React.CSSProperties}
          />
        </Field>
      </div>
    </div>,

    // Step 1 – Team
    <div key="1" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Field label="Authors">
        <input
          name="author" placeholder="John Doe, Jane Smith"
          value={form.author}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setField('author', e.target.value)}
          style={inputBase} {...fh}
        />
      </Field>
      {inp('email',   'contact@myproject.com', 'email')}
      {inp('address', '12 Peace Street, Lomé')}
    </div>,

    // Step 2 – Links
    <div key="2" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {inp('website',  'https://myproject.com', 'url')}
      {inp('github',   'https://github.com/user/repo')}
      {inp('twitter',  'https://x.com/handle')}
      {inp('linkedin', 'https://linkedin.com/in/profile')}
    </div>,

    // Step 3 – Review
    <div key="3" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px', lineHeight: '1.6' }}>
        Please check your information before submitting your project.
      </p>
      <div style={{ background: 'var(--surface2)', borderRadius: '14px', padding: '4px 18px', border: '1.5px solid var(--border)' }}>
        {reviewRow('Project',      form.name)}
        {reviewRow('Description',  form.description)}
        {reviewRow('Category',     form.categories)}
        {reviewRow('Type',         form.type)}
        {reviewRow('Needs',        form.needs)}
        {reviewRow('Audiences',    form.public)}
        {reviewRow('Technologies', form.technologies)}
        {reviewRow('Founded At',   form.foundedAt)}
        {reviewRow('Authors',      form.author)}
        {reviewRow('Email',        form.email)}
        {reviewRow('Address',      form.address)}
        {reviewRow('Website',      form.website)}
        {reviewRow('GitHub',       form.github)}
        {reviewRow('X / Twitter',  form.twitter)}
        {reviewRow('LinkedIn',     form.linkedin)}
      </div>
    </div>,
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,500;0,600;1,500;1,600&display=swap');
        :root {
          --bg:          #f2f8f4;
          --surface:     #ffffff;
          --surface2:    #eef7f1;
          --border:      #c8e6d0;
          --text:        #173320;
          --muted:       #5f8a6b;
          --accent:      #28A745;
          --accent-dark: #1e7e34;
          --accent-pale: rgba(40,167,69,0.09);
          --input-bg:    #f6fbf7;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(calc(var(--dir,1)*34px)); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder, textarea::placeholder { color: #a3c4ac; }
        input[type=month]::-webkit-calendar-picker-indicator { filter: invert(0.4) sepia(1) saturate(3) hue-rotate(85deg); cursor: pointer; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      `}</style>

      <Form method="post">

        {/* Hidden fields — always present in the DOM for submission */}
        {(Object.entries(form) as [keyof FormState, string][]).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        {
          update ? (
              <>
                <input type='hidden' name='intent' value='project-update'/>
                <input type='hidden' name='ident' value={projectId} />
              </>) : (
          <input type="hidden" name="intent" value="project-submission" />
          )
        }
        <div style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '32px 16px', position: 'relative', overflow: 'hidden',
        }}>

          {/* Background blobs */}
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-140px', right: '-140px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(40,167,69,0.10) 0%, transparent 65%)' }} />
            <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(40,167,69,0.07) 0%, transparent 65%)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(40,167,69,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          </div>

          <div style={{ width: '100%', maxWidth: '660px', animation: 'fadeUp 0.5s ease both', position: 'relative' }}>

            {/* ── Header ──────────────────────────────────────────────── */}
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'var(--accent-pale)', border: '1.5px solid rgba(40,167,69,0.2)', borderRadius: '100px', padding: '6px 18px', marginBottom: '18px' }}>
                <span style={{ width: '14px', height: '14px', color: 'var(--accent)', flexShrink: 0 }}>{icons.leaf}</span>
                <span style={{ fontSize: '11px', color: 'var(--accent-dark)', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {update ? 'Project Update' : 'Project Submission'}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '600', color: 'var(--text)', lineHeight: '1.25', marginBottom: '10px' }}>
                Share your project<br/>
                <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>with the world</span>
              </h1>
            </div>

            {/* ── Step indicators ─────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '26px' }}>
              {STEPS.map((s: StepConfig, i: number) => {
                const done   = visited.has(s.id) && step !== s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => visited.has(s.id) && go(s.id)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: visited.has(s.id) ? 'pointer' : 'default', padding: '0 10px' }}
                    >
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
                        background: active ? 'var(--accent)' : done ? 'var(--accent-pale)' : 'white',
                        border: `2px solid ${active ? 'var(--accent)' : done ? 'var(--accent)' : 'var(--border)'}`,
                        boxShadow: active ? '0 4px 18px rgba(40,167,69,0.32)' : done ? '0 2px 8px rgba(40,167,69,0.1)' : '0 2px 6px rgba(0,0,0,0.05)',
                      }}>
                        <span style={{ width: '17px', height: '17px', color: active ? 'white' : done ? 'var(--accent)' : 'var(--muted)' }}>
                          {done ? icons.check : s.icon}
                        </span>
                      </div>
                      <span style={{ fontSize: '10.5px', fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase', color: active ? 'var(--text)' : done ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.3s' }}>
                        {s.label}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div style={{
                        width: '52px', height: '2px', borderRadius: '1px', transition: 'background 0.4s', marginBottom: '22px',
                        background: visited.has(s.id + 1) ? 'linear-gradient(90deg, var(--accent), rgba(40,167,69,0.35))' : 'var(--border)',
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Card ────────────────────────────────────────────────── */}
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(40,167,69,0.10), 0 2px 8px rgba(0,0,0,0.05)' }}>

              {/* Card header */}
              <div style={{ padding: '22px 30px 18px', borderBottom: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', gap: '14px', background: 'linear-gradient(to right, var(--surface2), var(--surface))' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 12px rgba(40,167,69,0.28)' }}>
                  <span style={{ width: '18px', height: '18px', color: 'white' }}>{STEPS[step].icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Step {step + 1} / {STEPS.length}
                  </div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: '17px', fontWeight: '600', color: 'var(--text)' }}>
                    {STEP_TITLES[step]}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {STEPS.map((_: StepConfig, i: number) => (
                    <div key={i} style={{
                      height: '7px', borderRadius: '4px', transition: 'all 0.35s',
                      width: i === step ? '22px' : '7px',
                      background: i === step ? 'var(--accent)' : i < step ? 'rgba(40,167,69,0.32)' : 'var(--border)',
                    }} />
                  ))}
                </div>
              </div>

              {/* Form area */}
              <div style={{ padding: '26px 30px', maxHeight: '460px', overflowY: 'auto' }}>
                <div style={{ ['--dir' as string]: direction, animation: animating ? 'none' : 'slideIn 0.28s ease both' }}>
                  {panels[step]}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '18px 30px', borderTop: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to right, var(--surface2), var(--surface))' }}>

                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  disabled={step === 0}
                  style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'white', border: '1.5px solid var(--border)', borderRadius: '11px', padding: '9px 20px', fontSize: '13.5px', fontWeight: '600', color: step === 0 ? '#c0dcc8' : 'var(--muted)', cursor: step === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
                  onMouseOver={(e: MouseEvent<HTMLButtonElement>) => step !== 0 && Object.assign(e.currentTarget.style, { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-pale)' })}
                  onMouseOut={(e: MouseEvent<HTMLButtonElement>)  => step !== 0 && Object.assign(e.currentTarget.style, { borderColor: 'var(--border)', color: 'var(--muted)',  background: 'white' })}
                >
                  <span style={{ width: '15px', height: '15px' }}>{icons.back}</span> Back
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => go(step + 1)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', border: 'none', borderRadius: '11px', padding: '10px 26px', fontSize: '13.5px', fontWeight: '700', color: 'white', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(40,167,69,0.32)', transition: 'all 0.2s' }}
                    onMouseOver={(e: MouseEvent<HTMLButtonElement>) => Object.assign(e.currentTarget.style, { background: 'var(--accent-dark)', transform: 'translateY(-1px)', boxShadow: '0 6px 22px rgba(40,167,69,0.42)' })}
                    onMouseOut={(e: MouseEvent<HTMLButtonElement>)  => Object.assign(e.currentTarget.style, { background: 'var(--accent)',       transform: 'translateY(0)',   boxShadow: '0 4px 16px rgba(40,167,69,0.32)' })}
                  >
                    Continue <span style={{ width: '15px', height: '15px' }}>{icons.arrow}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--accent-dark)', border: 'none', borderRadius: '11px', padding: '10px 26px', fontSize: '13.5px', fontWeight: '700', color: 'white', cursor: isLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(30,126,52,0.38)', transition: 'all 0.2s', opacity: isLoading ? 0.8 : 1 }}
                    onMouseOver={(e: MouseEvent<HTMLButtonElement>) => !isLoading && Object.assign(e.currentTarget.style, { transform: 'translateY(-1px)', boxShadow: '0 7px 24px rgba(30,126,52,0.48)' })}
                    onMouseOut={(e: MouseEvent<HTMLButtonElement>)  => Object.assign(e.currentTarget.style, { transform: 'translateY(0)',   boxShadow: '0 4px 16px rgba(30,126,52,0.38)' })}
                  >
                    {isLoading
                      ? <><Spinner color="#ffc107" size="small"/> Sending...</>
                      : <><span style={{ width: '15px', height: '15px' }}>{icons.check}</span> Submit Project</>
                    }
                  </button>
                )}
              </div>
            </div>

            {/* Error */}
            {data?.error && (
              <div style={{ marginTop: '14px', padding: '12px 16px', background: 'rgba(220,53,69,0.07)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: '12px', color: '#c82333', fontSize: '13.5px', textAlign: 'center', fontWeight: '500' }}>
                {data.error}
              </div>
            )}
          </div>
        </div>
      </Form>
    </>
  );
}