import { TaskSummary } from '../assets/TaskSummary';

const go = () => undefined;
const current = <TaskSummary mode="current" title="交付" state="pending" stateLabel="待确认" primaryAction={{ label: '确认', onClick: go }} />;
const history = <TaskSummary mode="history" title="审批" state="succeeded" stateLabel="当时已通过" snapshotLabel="示例快照" returnToCurrent={go} />;
const completed = <TaskSummary mode="completed" title="完成" state="succeeded" stateLabel="已验收" />;
// @ts-expect-error History must not accept a mutation action.
const invalidHistory = <TaskSummary mode="history" title="审批" state="succeeded" stateLabel="通过" snapshotLabel="示例" returnToCurrent={go} primaryAction={{ label: '执行', onClick: go }} />;
// @ts-expect-error Completed mode must not accept a mutation action.
const invalidCompleted = <TaskSummary mode="completed" title="完成" state="succeeded" stateLabel="完成" primaryAction={{ label: '执行', onClick: go }} />;
void [current, history, completed, invalidHistory, invalidCompleted];
