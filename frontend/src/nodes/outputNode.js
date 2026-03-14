import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const OutputNode = createConfiguredNode(getNodeDefinition('customOutput'));
