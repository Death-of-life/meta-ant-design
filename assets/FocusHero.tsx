import type { ReactNode } from 'react';
import { Card, Typography } from 'antd';

import './meta-ant.css';

const { Paragraph, Title } = Typography;

export type FocusHeroTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export type FocusHeroLiveMode = 'off' | 'polite' | 'assertive';

export interface FocusHeroProps {
  /** Short contextual label above the lead, such as environment or category. */
  eyebrow?: ReactNode;
  /** The primary conclusion or state. */
  title: ReactNode;
  /** A concise explanation of why the state matters. */
  summary: ReactNode;
  /** Optional dominant metric. Use only when one value drives the decision. */
  value?: ReactNode;
  /** Semantic state. Neutral is appropriate for identity or normal outcomes. */
  tone?: FocusHeroTone;
  /** Explicit text/icon status paired with the tone. */
  status?: ReactNode;
  /** Affected scope, business consequence, or recommended next step. */
  consequence?: ReactNode;
  /** Owner, baseline, timestamp, source, or other low-priority context. */
  metadata?: ReactNode;
  /** One primary action plus, at most, a low-emphasis secondary action. */
  actions?: ReactNode;
  /** Live-region behavior for state changes. Do not announce frequent metrics. */
  live?: FocusHeroLiveMode;
  /** Optional additional class name from the consuming project. */
  className?: string;
}

/**
 * Renders the single dominant visual anchor for an enterprise page.
 *
 * Keep this component rare: one per page, and only when the page has a real
 * state, decision, outcome, identity, or task that must be understood first.
 */
export function FocusHero({
  eyebrow,
  title,
  summary,
  value,
  tone = 'neutral',
  status,
  consequence,
  metadata,
  actions,
  live = 'off',
  className,
}: FocusHeroProps) {
  const hasEyebrow = eyebrow !== null && eyebrow !== undefined;
  const hasStatus = status !== null && status !== undefined;
  const hasValue = value !== null && value !== undefined;
  const hasConsequence = consequence !== null && consequence !== undefined;
  const hasMetadata = metadata !== null && metadata !== undefined;
  const hasActions = actions !== null && actions !== undefined;
  const classes = ['meta-ant-scope', 'meta-focus-hero', className]
    .filter(Boolean)
    .join(' ');
  const ariaLive = live === 'off' ? undefined : live;

  return (
    <Card
      variant="borderless"
      className={classes}
      data-tone={tone}
      aria-live={ariaLive}
    >
      <div className="meta-focus-hero__layout">
        <div className="meta-focus-hero__content">
          {(hasEyebrow || hasStatus) && (
            <div className="meta-focus-hero__eyebrow">
              {status}
              {eyebrow}
            </div>
          )}
          {hasValue && <div className="meta-focus-hero__value">{value}</div>}
          <Title level={2} className="meta-focus-hero__title">
            {title}
          </Title>
          <Paragraph className="meta-focus-hero__summary">
            {summary}
          </Paragraph>
          {hasConsequence && (
            <Paragraph className="meta-focus-hero__consequence">
              {consequence}
            </Paragraph>
          )}
          {hasMetadata && (
            <Paragraph className="meta-focus-hero__metadata">
              {metadata}
            </Paragraph>
          )}
        </div>
        {hasActions && (
          <div className="meta-focus-hero__actions">{actions}</div>
        )}
      </div>
    </Card>
  );
}

export default FocusHero;
