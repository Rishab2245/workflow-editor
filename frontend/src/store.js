import { create } from 'zustand';
import {
  MarkerType,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

const edgeOptions = {
  type: 'smoothstep',
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
};

const initialState = {
  nodeIDs: {},
  nodes: [],
  edges: [],
  activeNodeId: null,
  notification: null,
};

export const createPipelineStore = (set, get) => ({
  ...initialState,
  getNodeID: (type) => {
    const nextNodeIds = { ...get().nodeIDs };
    const currentCount = nextNodeIds[type] || 0;
    const nextCount = currentCount + 1;

    nextNodeIds[type] = nextCount;
    set({ nodeIDs: nextNodeIds });

    return `${type}-${nextCount}`;
  },
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  openNodeEditor: (nodeId) => {
    set({ activeNodeId: nodeId });
  },
  closeNodeEditor: () => {
    set({ activeNodeId: null });
  },
  showNotification: (notification) => {
    set({ notification });
  },
  clearNotification: () => {
    set({ notification: null });
  },
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, ...edgeOptions }, get().edges),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node
      ),
    });
  },
  reset: () => {
    set(initialState);
  },
});

export const useStore = create(createPipelineStore);

export const resetStore = () => {
  useStore.getState().reset();
};
