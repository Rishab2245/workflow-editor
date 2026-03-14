import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const TransformNode = createConfiguredNode(getNodeDefinition('transform'));
