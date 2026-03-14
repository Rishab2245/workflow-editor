import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodes/nodeConfigs';

export const PipelineToolbar = () => {
  return (
    <section className="toolbar">
      <div className="toolbar__heading">
        <span className="toolbar__eyebrow">Nodes</span>
        <h2>Node library</h2>
        <p>Drag any node into the canvas to build a workflow.</p>
      </div>

      <div className="toolbar__grid">
        {toolbarNodes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            description={node.description}
          />
        ))}
      </div>
    </section>
  );
};
