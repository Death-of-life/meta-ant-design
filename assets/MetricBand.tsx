import type { CSSProperties, ReactNode } from 'react';
import { Statistic, theme } from 'antd';

import './meta-ant.css';

export type MetricTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export type MetricBandColumns = 1 | 2 | 3 | 4;

export interface MetricBandItem {
  /** Stable key for React and test selectors. */
  key: string;
  /** Short metric label. */
  label: ReactNode;
  /** Exact value passed to Ant Statistic. */
  value: string | number;
  /** Optional unit or denominator. */
  suffix?: ReactNode;
  /** Optional leading icon or currency symbol. */
  prefix?: ReactNode;
  /** Change versus a named baseline, such as "+12% vs 7d". */
  delta?: ReactNode;
  /** Baseline, time range, source, or interpretation. */
  note?: ReactNode;
  /** Semantic meaning of the metric, not merely direction. */
  tone?: MetricTone;
  /** Visually promote at most one item in a normal band. */
  emphasized?: boolean;
  /** Decimal precision for numeric values. */
  precision?: number;
}

export interface MetricBandProps {
  /** Two to six related metrics. */
  items: MetricBandItem[];
  /** Maximum desktop columns; responsive CSS reduces this automatically. */
  columns?: MetricBandColumns;
  /** Accessible name describing the metric group. */
  ariaLabel: string;
  /** Optional additional class name from the consuming project. */
  className?: string;
}

/**
 * Groups related metrics into one coherent surface instead of equal-card soup.
 */
export function MetricBand({
  items,
  columns = 4,
  ariaLabel,
  className,
}: MetricBandProps) {
  const { token } = theme.useToken();
  const effectiveColumns = Math.min(
    columns,
    Math.max(items.length, 1),
  ) as MetricBandColumns;
  const classes = ['meta-ant-scope', 'meta-metric-band', className]
    .filter(Boolean)
    .join(' ');
  const tokenBridge = {
    '--meta-surface': token.colorBgContainer,
    '--meta-text': token.colorText,
    '--meta-text-secondary': token.colorTextSecondary,
    '--meta-text-tertiary': token.colorTextTertiary,
    '--meta-divider': token.colorBorderSecondary,
    '--meta-primary-soft': token.colorPrimaryBg,
    '--meta-info': token.colorInfo,
    '--meta-success': token.colorSuccess,
    '--meta-warning': token.colorWarning,
    '--meta-danger': token.colorError,
    '--meta-radius': `${token.borderRadiusLG}px`,
    '--meta-shadow': token.boxShadowTertiary,
  } as CSSProperties;

  return (
    <section
      className={classes}
      data-columns={effectiveColumns}
      aria-label={ariaLabel}
      style={tokenBridge}
    >
      {items.map((item) => (
        <div
          key={item.key}
          className="meta-metric-band__item"
          data-tone={item.tone ?? 'neutral'}
          data-emphasized={item.emphasized ? 'true' : 'false'}
        >
          <div className="meta-metric-band__label">{item.label}</div>
          <Statistic
            value={item.value}
            prefix={item.prefix}
            suffix={item.suffix}
            precision={item.precision}
          />
          {item.delta !== null && item.delta !== undefined && (
            <div className="meta-metric-band__delta">{item.delta}</div>
          )}
          {item.note !== null && item.note !== undefined && (
            <div className="meta-metric-band__note">{item.note}</div>
          )}
        </div>
      ))}
    </section>
  );
}

export default MetricBand;
