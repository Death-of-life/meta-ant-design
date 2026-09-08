import { useId, type ReactNode } from 'react';
import { Button } from 'antd';
import './meta-ant.css';

export type TaskState = 'pending' | 'running' | 'succeeded' | 'blocked' | 'failed' | 'cancelled';

export interface TaskAction {
  /** A specific operation verb; authorization is the caller's responsibility. */
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  /** A visible explanation, not a tooltip on an unfocusable disabled button. */
  disabledReason?: string;
}

interface SharedProps {
  title: string;
  state: TaskState;
  /** Exact business label, e.g. stage success, not inferred request completion. */
  stateLabel: string;
  detail?: ReactNode;
  metadata?: ReactNode;
}

export type TaskSummaryProps = SharedProps & (
  | { mode: 'current'; primaryAction?: TaskAction; snapshotLabel?: never; returnToCurrent?: never }
  | { mode: 'history'; snapshotLabel: string; returnToCurrent: () => void; primaryAction?: never }
  | { mode: 'completed'; primaryAction?: never; snapshotLabel?: never; returnToCurrent?: never }
);

/**
 * Compact task conclusion. History and completed variants never render mutations.
 * Does not fetch data, authorize requests, or infer verification/acceptance state.
 */
export function TaskSummary(props: TaskSummaryProps) {
  const titleId = useId();
  const reasonId = useId();
  const action = props.mode === 'current' ? props.primaryAction : undefined;

  return (
    <section className="ops-task" aria-labelledby={titleId} data-mode={props.mode}>
      {props.mode === 'history' ? (
        <div className="ops-history">
          <span>历史记录 · 只读 · {props.snapshotLabel}</span>
          <Button onClick={props.returnToCurrent}>返回当前阶段</Button>
        </div>
      ) : null}
      <div className="ops-task__body">
        <div className="ops-task__content">
          <div className="ops-task__title-row">
            <h2 id={titleId}>{props.title}</h2>
            <span className="ops-status" data-state={props.state}>{props.stateLabel}</span>
          </div>
          {props.detail != null ? <div className="ops-task__detail">{props.detail}</div> : null}
          {props.metadata != null ? <div className="ops-muted">{props.metadata}</div> : null}
        </div>
        {action ? (
          <div className="ops-task__action">
            <Button
              type="primary"
              onClick={action.onClick}
              loading={action.loading}
              disabled={action.disabled}
              aria-describedby={action.disabled && action.disabledReason ? reasonId : undefined}
            >
              {action.label}
            </Button>
            {action.disabled && action.disabledReason ? (
              <p id={reasonId} className="ops-muted">{action.disabledReason}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
