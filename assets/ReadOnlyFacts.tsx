import type { ReactNode } from 'react';
import './meta-ant.css';

export interface ReadOnlyFact {
  key: string;
  label: string;
  /** Format boolean/date/unit values in the business layer; zero is preserved. */
  value: ReactNode;
  fullWidth?: boolean;
  code?: boolean;
}

export interface ReadOnlyFactsProps {
  label: string;
  items: ReadOnlyFact[];
}

/** Render readable evidence, not disabled controls; preserve long IDs and zero. */
export function ReadOnlyFacts({ label, items }: ReadOnlyFactsProps) {
  return (
    <dl className="ops-facts" aria-label={label}>
      {items.map((item) => (
        <div key={item.key} className="ops-facts__item" data-full-width={item.fullWidth || undefined}>
          <dt>{item.label}</dt>
          <dd className={item.code ? 'ops-code' : undefined}>{item.value ?? '未提供'}</dd>
        </div>
      ))}
    </dl>
  );
}
