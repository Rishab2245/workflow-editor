import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const InputNode = createConfiguredNode(getNodeDefinition('customInput'));
