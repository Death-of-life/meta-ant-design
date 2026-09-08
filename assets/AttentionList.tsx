import { useId, type ReactNode } from 'react';
import { Button, Empty, Spin } from 'antd';
import './meta-ant.css';

export type AttentionSeverity = 'critical' | 'high' | 'medium' | 'low';
export interface AttentionItem {
  id: string;
  severity: AttentionSeverity;
  title: ReactNode;
  description: ReactNode;
  scope?: ReactNode;
  observedAt?: ReactNode;
  href?: string;
  actionLabel?: ReactNode;
}
export interface AttentionListProps {
  items: AttentionItem[];
  title?: ReactNode;
  loading?: boolean;
  maxItems?: number;
  onOpen?: (item: AttentionItem) => void;
  emptyDescription?: ReactNode;
  className?: string;
}
const labels: Record<AttentionSeverity, string> = { critical: '严重', high: '高', medium: '中', low: '低' };

/** Present a supplied exception queue; no automatic health/safety conclusion. */
export function AttentionList({
  items, title = '需要关注', loading = false, maxItems, onOpen,
  emptyDescription = '没有可展示的记录', className,
}: AttentionListProps) {
  const titleId = useId();
  const limit = maxItems == null || !Number.isFinite(maxItems) ? items.length : Math.max(0, Math.floor(maxItems));
  const visible = items.slice(0, limit);
  return (
    <section
      className={['meta-ant-scope', 'meta-attention-list', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
      aria-busy={loading}
    >
      <h2 id={titleId}>{title}</h2>
      <Spin spinning={loading}>
        {visible.length ? (
          <ul>
            {visible.map((item) => (
              <li key={item.id} className="meta-attention-list__row">
                <span className="meta-attention-list__severity" data-severity={item.severity}>{labels[item.severity]}</span>
                <div className="meta-attention-list__content">
                  <strong>{item.title}</strong>
                  <div>{item.description}</div>
                  <div className="ops-muted">{item.scope}{item.scope && item.observedAt ? ' · ' : null}{item.observedAt}</div>
                </div>
                {item.href ? (
                  <Button type="link" href={item.href}>{item.actionLabel ?? '查看详情'}</Button>
                ) : onOpen ? (
                  <Button type="link" onClick={() => onOpen(item)}>{item.actionLabel ?? '查看详情'}</Button>
                ) : null}
              </li>
            ))}
          </ul>
        ) : loading ? <div className="ops-loading-placeholder">正在读取记录</div> : (
          <Empty description={emptyDescription} />
        )}
      </Spin>
    </section>
  );
}
export default AttentionList;
