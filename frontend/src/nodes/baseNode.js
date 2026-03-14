import { Handle } from 'reactflow';

export const BaseNode = ({
  title,
  subtitle,
  accent,
  icon: Icon,
  handles = [],
  selected = false,
  badge,
  footer,
}) => {
  const nodeClassName = ['workflow-node', selected ? 'workflow-node--selected' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={nodeClassName} style={{ '--node-accent': accent }}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          className={`workflow-node__handle ${handle.className || ''}`.trim()}
          style={handle.style}
        />
      ))}

      <div className="workflow-node__icon-shell">
        <div className="workflow-node__icon">{Icon ? <Icon /> : null}</div>
        {badge ? <span className="workflow-node__badge">{badge}</span> : null}
      </div>

      <div className="workflow-node__content">
        <strong className="workflow-node__title">{title}</strong>
        {subtitle ? <span className="workflow-node__subtitle">{subtitle}</span> : null}
        {footer ? <span className="workflow-node__footer">{footer}</span> : null}
      </div>
    </div>
  );
};
