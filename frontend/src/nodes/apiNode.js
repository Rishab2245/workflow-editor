import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const ApiNode = createConfiguredNode(getNodeDefinition('api'));
