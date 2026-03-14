import { memo } from 'react';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const createIcon = (paths) =>
  memo(function NodeIcon() {
    return <svg aria-hidden="true" {...iconProps}>{paths}</svg>;
  });

export const InputIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M4 12h10" />
    <path d="M10 6l6 6-6 6" />
  </>
);

export const OutputIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M20 12H10" />
    <path d="M14 6l-6 6 6 6" />
  </>
);

export const TextIcon = createIcon(
  <>
    <path d="M5 7h14" />
    <path d="M9 7v10" />
    <path d="M15 7v10" />
    <path d="M5 17h14" />
  </>
);

export const SparklesIcon = createIcon(
  <>
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
    <path d="M18.5 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
  </>
);

export const PromptIcon = createIcon(
  <>
    <path d="M5 4h14a2 2 0 0 1 2 2v12l-4-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <path d="M7 7h10" />
    <path d="M7 11h10" />
    <path d="M7 15h6" />
  </>
);

export const FileIcon = createIcon(
  <>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </>
);

export const ConditionIcon = createIcon(
  <>
    <path d="M12 3l9 9-9 9-9-9 9-9z" />
    <path d="M9.5 12l2 2 4-4" />
  </>
);

export const ApiIcon = createIcon(
  <>
    <path d="M8 8a3 3 0 1 0 0 6" />
    <path d="M16 8a3 3 0 1 1 0 6" />
    <path d="M8 11h8" />
    <path d="M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </>
);

export const TransformIcon = createIcon(
  <>
    <path d="M7 7h10" />
    <path d="M7 12h6" />
    <path d="M7 17h10" />
    <path d="M15 10l2 2-2 2" />
  </>
);

export const iconMap = {
  customInput: InputIcon,
  llm: SparklesIcon,
  customOutput: OutputIcon,
  text: TextIcon,
  prompt: PromptIcon,
  file: FileIcon,
  condition: ConditionIcon,
  api: ApiIcon,
  transform: TransformIcon,
};
