import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const PromptNode = createConfiguredNode(getNodeDefinition('prompt'));
