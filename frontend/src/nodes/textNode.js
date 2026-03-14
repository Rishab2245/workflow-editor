import { useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { TextIcon } from './icons';
import { extractTemplateVariables } from './textUtils';

export const TextNode = ({ id, data, selected }) => {
  const text = data?.text ?? 'Summarize {{input}} into a short answer.';
  const variables = useMemo(() => extractTemplateVariables(text), [text]);

  const handles = [
    ...variables.map((variable, index) => ({
      id: `${id}-${variable}`,
      type: 'target',
      position: Position.Left,
      style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
    })),
    {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right,
    },
  ];

  return (
    <BaseNode
      title={data?.displayName || 'Text Template'}
      subtitle="Text"
      accent="#35b46b"
      icon={TextIcon}
      handles={handles}
      selected={selected}
      badge="Text"
      footer={
        variables.length
          ? `${variables.length} variable handle${variables.length > 1 ? 's' : ''}`
          : 'No variables yet'
      }
    />
  );
};
