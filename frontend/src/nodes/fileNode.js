import { createConfiguredNode } from './nodeFactory';
import { getNodeDefinition } from './nodeConfigs';

export const FileNode = createConfiguredNode(getNodeDefinition('file'));
