import type { ReactNode } from 'react';
import './meta-ant.css';

export type FocusHeroTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type FocusHeroLiveMode = 'off' | 'polite' | 'assertive';
export interface FocusHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  summary: ReactNode;
  value?: ReactNode;
  tone?: FocusHeroTone;
  status?: ReactNode;
  consequence?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
  live?: FocusHeroLiveMode;
  className?: string;
}

/**
 * @deprecated Compatibility adapter only. Prefer the task-specific page template.
 * Keeps v1 props, but removes the Card/tinted-banner/oversized-hero defaults.
 * Existing DOM selectors may need migration; this is not pixel compatibility.
 */
export function FocusHero({
  eyebrow, title, summary, value, tone = 'neutral', status, consequence,
  metadata, actions, live = 'off', className,
}: FocusHeroProps) {
  return (
    <section
      className={['meta-ant-scope', 'meta-focus-hero', className].filter(Boolean).join(' ')}
      data-tone={tone}
      aria-live={live === 'off' ? undefined : live}
    >
      <div className="meta-focus-hero__layout">
        <div className="meta-focus-hero__content">
          {eyebrow != null || status != null ? (
            <div className="meta-focus-hero__eyebrow">{status}{eyebrow}</div>
          ) : null}
          {value != null ? <div className="meta-focus-hero__value">{value}</div> : null}
          <h2 className="meta-focus-hero__title">{title}</h2>
          <div className="meta-focus-hero__summary">{summary}</div>
          {consequence != null ? <div>{consequence}</div> : null}
          {metadata != null ? <div className="ops-muted">{metadata}</div> : null}
        </div>
        {actions != null ? <div className="meta-focus-hero__actions">{actions}</div> : null}
      </div>
    </section>
  );
}

export default FocusHero;
