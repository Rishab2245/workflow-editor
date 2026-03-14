import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const LLMNode = createConfiguredNode(getNodeDefinition('llm'));
