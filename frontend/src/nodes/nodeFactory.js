import { BaseNode } from './baseNode';
import { iconMap } from './icons';

export const createConfiguredNode = (definition) => {
  const ConfiguredNode = ({ id, data, selected }) => {
    const handles = definition.handles.map((handle) => ({
      ...handle,
      id: `${id}-${handle.key}`,
    }));

    return (
      <BaseNode
        title={data?.displayName || definition.label}
        subtitle={definition.label}
        accent={definition.accent}
        icon={iconMap[definition.type]}
        handles={handles}
        selected={selected}
        badge={definition.label}
        footer={definition.footer ? definition.footer(data || {}) : definition.description}
      />
    );
  };

  ConfiguredNode.displayName = `${definition.label}Node`;

  return ConfiguredNode;
};
