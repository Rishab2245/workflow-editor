import { iconMap } from './nodes/icons';

export const DraggableNode = ({ type, label, description }) => {
  const Icon = iconMap[type];

  const onDragStart = (event, nodeType) => {
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="toolbar-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
      draggable
    >
      <span className="toolbar-node__pill">{label}</span>
      <div className="toolbar-node__head">
        <span className="toolbar-node__icon">{Icon ? <Icon /> : null}</span>
        <strong className="toolbar-node__title">{label} Node</strong>
      </div>
      <code className="toolbar-node__type">{type}</code>
      <span className="toolbar-node__description">{description}</span>
    </div>
  );
};
