import type { ReactNode } from 'react';
import { Button, Empty, List, Typography } from 'antd';

import './meta-ant.css';

const { Text } = Typography;

export type AttentionSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface AttentionItem {
  /** Stable identifier used for rendering and callbacks. */
  id: string;
  /** Worst-first semantic severity. */
  severity: AttentionSeverity;
  /** Concise exception title. */
  title: ReactNode;
  /** Consequence, symptom, or reason this item requires attention. */
  description: ReactNode;
  /** Affected service, owner, environment, or object scope. */
  scope?: ReactNode;
  /** Human-readable observed or updated time. */
  observedAt?: ReactNode;
  /** Optional destination when the item opens through navigation. */
  href?: string;
  /** Optional action label; defaults to "查看详情". */
  actionLabel?: ReactNode;
}

export interface AttentionListProps {
  /** Items should already be ordered by consequence, then recency. */
  items: AttentionItem[];
  /** Section heading rendered in the List header. */
  title?: ReactNode;
  /** True while the queue is loading. */
  loading?: boolean;
  /** Maximum number of rows shown before a separate full view. */
  maxItems?: number;
  /** Click callback used when an item does not navigate with href. */
  onOpen?: (item: AttentionItem) => void;
  /** Empty-state description. */
  emptyDescription?: ReactNode;
  /** Optional additional class name from the consuming project. */
  className?: string;
}

const severityLabels: Record<AttentionSeverity, string> = {
  critical: '严重',
  high: '高',
  medium: '中',
  low: '低',
};

/**
 * Renders a dense, worst-first exception queue with one action per row.
 */
export function AttentionList({
  items,
  title = '需要关注',
  loading = false,
  maxItems,
  onOpen,
  emptyDescription = '当前没有需要处理的异常',
  className,
}: AttentionListProps) {
  const classes = ['meta-ant-scope', 'meta-attention-list', className]
    .filter(Boolean)
    .join(' ');
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <List
      className={classes}
      loading={loading}
      header={<Text strong>{title}</Text>}
      dataSource={visibleItems}
      locale={{ emptyText: <Empty description={emptyDescription} /> }}
      renderItem={(item) => {
        const action = item.href ? (
          <Button
            className="meta-attention-list__action"
            type="link"
            href={item.href}
          >
            {item.actionLabel ?? '查看详情'}
          </Button>
        ) : onOpen ? (
          <Button
            className="meta-attention-list__action"
            type="link"
            onClick={() => onOpen(item)}
          >
            {item.actionLabel ?? '查看详情'}
          </Button>
        ) : null;

        return (
          <List.Item>
            <div className="meta-attention-list__row">
              <span
                className="meta-attention-list__mark"
                data-severity={item.severity}
                aria-hidden="true"
              />
              <div className="meta-attention-list__content">
                <div className="meta-attention-list__title-row">
                  <span className="meta-attention-list__title">
                    {item.title}
                  </span>
                  <span className="meta-attention-list__severity">
                    {severityLabels[item.severity]}
                  </span>
                </div>
                <div className="meta-attention-list__description">
                  {item.description}
                </div>
                {(item.scope || item.observedAt) && (
                  <div className="meta-attention-list__metadata">
                    {item.scope && <span>{item.scope}</span>}
                    {item.observedAt && <span>{item.observedAt}</span>}
                  </div>
                )}
              </div>
              {action}
            </div>
          </List.Item>
        );
      }}
    />
  );
}

export default AttentionList;
