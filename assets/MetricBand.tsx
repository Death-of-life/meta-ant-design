import type { ReactNode } from 'react';
import { Statistic } from 'antd';
import './meta-ant.css';

export type MetricTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type MetricBandColumns = 1 | 2 | 3 | 4;
export interface MetricBandItem {
  key: string;
  label: ReactNode;
  value: string | number;
  suffix?: ReactNode;
  prefix?: ReactNode;
  delta?: ReactNode;
  note?: ReactNode;
  tone?: MetricTone;
  emphasized?: boolean;
  precision?: number;
}
export interface MetricBandProps {
  items: MetricBandItem[];
  columns?: MetricBandColumns;
  ariaLabel: string;
  className?: string;
}

/** Optional real metric group. Never fabricate counters to populate a page. */
export function MetricBand({ items, columns = 4, ariaLabel, className }: MetricBandProps) {
  if (items.length === 0) return null;
  const count = Math.min(columns, items.length);
  return (
    <section
      className={['meta-ant-scope', 'meta-metric-band', className].filter(Boolean).join(' ')}
      data-columns={count}
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <div key={item.key} className="meta-metric-band__item" data-tone={item.tone ?? 'neutral'}>
          <div className="meta-metric-band__label">{item.label}</div>
          <Statistic
            className={item.emphasized ? 'meta-metric-band__value is-emphasized' : 'meta-metric-band__value'}
            value={item.value}
            prefix={item.prefix}
            suffix={item.suffix}
            precision={item.precision}
          />
          {item.delta != null ? <div className="meta-metric-band__delta">{item.delta}</div> : null}
          {item.note != null ? <div className="ops-muted">{item.note}</div> : null}
        </div>
      ))}
    </section>
  );
}
export default MetricBand;
