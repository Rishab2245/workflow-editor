import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const ConditionNode = createConfiguredNode(getNodeDefinition('condition'));
