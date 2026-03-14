import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { PromptNode } from './nodes/promptNode';
import { FileNode } from './nodes/fileNode';
import { ConditionNode } from './nodes/conditionNode';
import { ApiNode } from './nodes/apiNode';
import { TransformNode } from './nodes/transformNode';
import { createNodeData } from './nodes/nodeConfigs';
import { NodeEditorModal } from './nodeEditorModal';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  prompt: PromptNode,
  file: FileNode,
  condition: ConditionNode,
  api: ApiNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  openNodeEditor: state.openNodeEditor,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    openNodeEditor,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const rawPayload = event?.dataTransfer?.getData('application/reactflow');

      if (!rawPayload) {
        return;
      }

      const appData = JSON.parse(rawPayload);
      const type = appData?.nodeType;

      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data: createNodeData(type, nodeID),
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <section className="canvas-shell">
      <div className="canvas-shell__header">
        <div>
          <span className="toolbar__eyebrow">Canvas</span>
          <h2>Workflow canvas</h2>
        </div>
      </div>

      <div ref={reactFlowWrapper} className="canvas-shell__flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={(_, node) => openNodeEditor(node.id)}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          fitView
          connectionLineType="smoothstep"
        >
          <Background color="rgba(255,255,255,0.18)" gap={gridSize} />
          <Controls />
        </ReactFlow>
        {!nodes.length ? (
          <div className="canvas-shell__empty-state">
            <div className="canvas-shell__empty-card">
              <span className="canvas-shell__empty-icon">+</span>
              <strong>Start your workflow</strong>
              <p>Drag a node from the library into the canvas, then click it to configure its settings.</p>
            </div>
          </div>
        ) : null}
        <NodeEditorModal />
      </div>
    </section>
  );
};
