import { Position } from 'reactflow';
import { extractTemplateVariables } from './textUtils';

const textSelectOptions = [
  { label: 'Text', value: 'Text' },
  { label: 'File', value: 'File' },
];

export const nodeDefinitions = {
  customInput: {
    type: 'customInput',
    label: 'Input',
    description: 'Capture external text or file data.',
    accent: '#13b5a3',
    footer: (data) => data.inputType || 'Text',
    defaults: (nodeId) => ({
      displayName: 'Input',
      inputName: nodeId.replace('customInput-', 'input_'),
      inputType: 'Text',
    }),
    fields: [
      { key: 'inputName', label: 'Field name', kind: 'text', placeholder: 'input_name' },
      { key: 'inputType', label: 'Type', kind: 'select', options: textSelectOptions },
    ],
    handles: [{ key: 'value', type: 'source', position: Position.Right }],
  },
  llm: {
    type: 'llm',
    label: 'LLM',
    description: 'Generate completions from prompt and system inputs.',
    accent: '#ff6d5a',
    footer: (data) => data.model || 'gpt-4o-mini',
    defaults: () => ({
      displayName: 'OpenAI Chat Model',
      model: 'gpt-4o-mini',
      temperature: '0.2',
    }),
    fields: [
      { key: 'model', label: 'Model', kind: 'text', placeholder: 'gpt-4o-mini' },
      { key: 'temperature', label: 'Temperature', kind: 'text', placeholder: '0.2' },
    ],
    handles: [
      { key: 'system', type: 'target', position: Position.Left, style: { top: '34%' } },
      { key: 'prompt', type: 'target', position: Position.Left, style: { top: '68%' } },
      { key: 'response', type: 'source', position: Position.Right },
    ],
  },
  text: {
    type: 'text',
    label: 'Text',
    description: 'Compose prompt text and expose variables.',
    accent: '#35b46b',
    footer: (data) => {
      const count = extractTemplateVariables(data.text || '').length;
      return count ? `${count} variable handle${count > 1 ? 's' : ''}` : 'No variables yet';
    },
    defaults: () => ({
      displayName: 'Text Template',
      text: 'Summarize {{input}} into a short answer.',
    }),
    fields: [],
    handles: [{ key: 'output', type: 'source', position: Position.Right }],
  },
  customOutput: {
    type: 'customOutput',
    label: 'Output',
    description: 'Publish text or image results.',
    accent: '#9b8cff',
    footer: (data) => data.outputType || 'Text',
    defaults: (nodeId) => ({
      displayName: 'Output',
      outputName: nodeId.replace('customOutput-', 'output_'),
      outputType: 'Text',
    }),
    fields: [
      { key: 'outputName', label: 'Output name', kind: 'text', placeholder: 'output_name' },
      {
        key: 'outputType',
        label: 'Type',
        kind: 'select',
        options: [
          { label: 'Text', value: 'Text' },
          { label: 'Image', value: 'Image' },
        ],
      },
    ],
    handles: [{ key: 'value', type: 'target', position: Position.Left }],
  },
  prompt: {
    type: 'prompt',
    label: 'Prompt',
    description: 'Wrap instructions before they reach the model.',
    accent: '#f973b0',
    footer: (data) => data.tone || 'Helpful',
    defaults: () => ({
      displayName: 'Prompt Builder',
      templateName: 'system_prompt',
      tone: 'Helpful',
    }),
    fields: [
      { key: 'templateName', label: 'Prompt name', kind: 'text', placeholder: 'system_prompt' },
      {
        key: 'tone',
        label: 'Tone',
        kind: 'select',
        options: ['Helpful', 'Concise', 'Friendly', 'Technical'],
      },
    ],
    handles: [
      { key: 'context', type: 'target', position: Position.Left },
      { key: 'prompt', type: 'source', position: Position.Right },
    ],
  },
  file: {
    type: 'file',
    label: 'File',
    description: 'Reference a file source and extraction mode.',
    accent: '#5da9ff',
    footer: (data) => `${data.fileType || 'PDF'} • ${data.extractionMode || 'OCR'}`,
    defaults: () => ({
      displayName: 'File Input',
      fileType: 'PDF',
      extractionMode: 'OCR',
    }),
    fields: [
      {
        key: 'fileType',
        label: 'File type',
        kind: 'select',
        options: ['PDF', 'CSV', 'Image'],
      },
      {
        key: 'extractionMode',
        label: 'Mode',
        kind: 'select',
        options: ['OCR', 'Structured', 'Raw'],
      },
    ],
    handles: [{ key: 'file', type: 'source', position: Position.Right }],
  },
  condition: {
    type: 'condition',
    label: 'Condition',
    description: 'Route flow based on a simple condition.',
    accent: '#f59e0b',
    footer: (data) => data.rule || 'contains_keyword',
    defaults: () => ({
      displayName: 'Condition',
      rule: 'contains_keyword',
      threshold: '0.5',
    }),
    fields: [
      { key: 'rule', label: 'Rule', kind: 'text', placeholder: 'contains_keyword' },
      { key: 'threshold', label: 'Threshold', kind: 'text', placeholder: '0.5' },
    ],
    handles: [
      { key: 'input', type: 'target', position: Position.Left },
      { key: 'true', type: 'source', position: Position.Right, style: { top: '36%' } },
      { key: 'false', type: 'source', position: Position.Right, style: { top: '70%' } },
    ],
  },
  api: {
    type: 'api',
    label: 'API',
    description: 'Send enriched data to an external endpoint.',
    accent: '#43c2ff',
    footer: (data) => `${data.method || 'POST'} ${data.routeName || '/webhook'}`,
    defaults: () => ({
      displayName: 'HTTP Request',
      method: 'POST',
      routeName: '/webhook',
    }),
    fields: [
      { key: 'routeName', label: 'Route', kind: 'text', placeholder: '/webhook' },
      {
        key: 'method',
        label: 'Method',
        kind: 'select',
        options: ['POST', 'PUT', 'GET'],
      },
    ],
    handles: [
      { key: 'payload', type: 'target', position: Position.Left },
      { key: 'response', type: 'source', position: Position.Right },
    ],
  },
  transform: {
    type: 'transform',
    label: 'Transform',
    description: 'Normalize or reshape data before output.',
    accent: '#8b7cff',
    footer: (data) => `${data.operation || 'summarize'} • ${data.format || 'JSON'}`,
    defaults: () => ({
      displayName: 'Transform',
      operation: 'summarize',
      format: 'JSON',
    }),
    fields: [
      {
        key: 'operation',
        label: 'Operation',
        kind: 'select',
        options: ['summarize', 'classify', 'extract', 'map'],
      },
      {
        key: 'format',
        label: 'Format',
        kind: 'select',
        options: ['JSON', 'Markdown', 'Plain Text'],
      },
    ],
    handles: [
      { key: 'input', type: 'target', position: Position.Left },
      { key: 'output', type: 'source', position: Position.Right },
    ],
  },
};

export const toolbarNodes = [
  { type: 'customInput', label: 'Input', description: 'Start the workflow with raw user data.' },
  { type: 'llm', label: 'LLM', description: 'Run a model with prompt and system context.' },
  { type: 'customOutput', label: 'Output', description: 'Finish the flow with a visible result.' },
  { type: 'text', label: 'Text', description: 'Compose prompt text and expose variables.' },
  { type: 'prompt', label: 'Prompt', description: 'Shape instructions before model execution.' },
  { type: 'file', label: 'File', description: 'Bring a document or image into the graph.' },
  { type: 'condition', label: 'Condition', description: 'Branch logic into true and false paths.' },
  { type: 'api', label: 'API', description: 'Forward data to an external service.' },
  { type: 'transform', label: 'Transform', description: 'Convert data into a new structure.' },
];

export const getNodeDefinition = (type) => nodeDefinitions[type];

export const createNodeData = (type, nodeId) => {
  const definition = getNodeDefinition(type);
  const defaults =
    typeof definition?.defaults === 'function'
      ? definition.defaults(nodeId)
      : definition?.defaults || {};

  return {
    id: nodeId,
    nodeType: type,
    ...defaults,
  };
};
