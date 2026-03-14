import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from './store';
import { getNodeDefinition } from './nodes/nodeConfigs';
import { iconMap } from './nodes/icons';
import { extractTemplateVariables } from './nodes/textUtils';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const renderInput = ({
  id,
  kind = 'text',
  value,
  options = [],
  placeholder,
  onChange,
  textareaRef,
  rows = 5,
}) => {
  if (kind === 'select') {
    return (
      <select
        id={id}
        className="editor-modal__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => {
          const normalizedOption =
            typeof option === 'string' ? { label: option, value: option } : option;
          return (
            <option key={normalizedOption.value} value={normalizedOption.value}>
              {normalizedOption.label}
            </option>
          );
        })}
      </select>
    );
  }

  if (kind === 'textarea') {
    return (
      <textarea
        id={id}
        ref={textareaRef}
        className="editor-modal__input editor-modal__textarea"
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <input
      id={id}
      className="editor-modal__input"
      type={kind}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export const NodeEditorModal = () => {
  const activeNodeId = useStore((state) => state.activeNodeId);
  const closeNodeEditor = useStore((state) => state.closeNodeEditor);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const activeNode = useStore((state) =>
    state.nodes.find((node) => node.id === state.activeNodeId) || null
  );
  const textareaRef = useRef(null);
  const [templateHeight, setTemplateHeight] = useState(160);

  const definition = activeNode ? getNodeDefinition(activeNode.type) : null;
  const Icon = activeNode ? iconMap[activeNode.type] : null;
  const textValue = activeNode?.data?.text ?? '';
  const variables = useMemo(() => extractTemplateVariables(textValue), [textValue]);

  useEffect(() => {
    if (!activeNodeId) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNodeEditor();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeNodeId, closeNodeEditor]);

  useEffect(() => {
    if (activeNode?.type !== 'text' || !textareaRef.current) {
      return;
    }

    const textarea = textareaRef.current;
    textarea.style.height = '0px';
    const nextHeight = clamp(textarea.scrollHeight, 160, 320);
    textarea.style.height = `${nextHeight}px`;
    setTemplateHeight(nextHeight);
  }, [activeNode?.type, textValue]);

  if (!activeNode || !definition) {
    return null;
  }

  const fields =
    activeNode.type === 'text'
      ? [
          {
            key: 'text',
            label: 'Template',
            kind: 'textarea',
            placeholder: 'Draft a template using {{variables}}.',
            textareaRef,
            rows: 8,
          },
        ]
      : definition.fields;

  return (
    <div className="editor-modal__backdrop" onClick={closeNodeEditor}>
      <div className="editor-modal" onClick={(event) => event.stopPropagation()}>
        <div className="editor-modal__header">
          <div className="editor-modal__title-group">
            <div className="editor-modal__icon-shell" style={{ '--node-accent': definition.accent }}>
              {Icon ? <Icon /> : null}
            </div>
            <div>
              <span className="editor-modal__eyebrow">{definition.label} node</span>
              <h3>{activeNode.data.displayName || definition.label}</h3>
            </div>
          </div>

          <button type="button" className="editor-modal__close" onClick={closeNodeEditor}>
            Close
          </button>
        </div>

        <div className="editor-modal__body">
          <section className="editor-modal__panel">
            <span className="editor-modal__section-label">Configuration</span>

            <label className="editor-modal__field" htmlFor={`${activeNode.id}-displayName`}>
              <span>Node name</span>
              <input
                id={`${activeNode.id}-displayName`}
                className="editor-modal__input"
                value={activeNode.data.displayName || definition.label}
                onChange={(event) =>
                  updateNodeField(activeNode.id, 'displayName', event.target.value)
                }
              />
            </label>

            {fields.map((field) => (
              <label
                key={field.key}
                className="editor-modal__field"
                htmlFor={`${activeNode.id}-${field.key}`}
              >
                <span>{field.label}</span>
                {renderInput({
                  id: `${activeNode.id}-${field.key}`,
                  kind: field.kind,
                  value: activeNode.data[field.key] ?? '',
                  options: field.options,
                  placeholder: field.placeholder,
                  onChange: (value) => updateNodeField(activeNode.id, field.key, value),
                  textareaRef: field.textareaRef,
                  rows: field.rows,
                })}
              </label>
            ))}
          </section>

          <section className="editor-modal__panel editor-modal__panel--meta">
            <span className="editor-modal__section-label">Overview</span>

            <div className="editor-modal__details">
              <div>
                <span className="editor-modal__detail-label">Type</span>
                <strong>{definition.label}</strong>
              </div>
              <div>
                <span className="editor-modal__detail-label">Description</span>
                <strong>{definition.description}</strong>
              </div>
              <div>
                <span className="editor-modal__detail-label">Handles</span>
                <strong>{definition.handles.length}</strong>
              </div>
            </div>

            {activeNode.type === 'text' ? (
              <div className="editor-modal__variables">
                <span className="editor-modal__detail-label">Detected variables</span>
                {variables.length ? (
                  <div className="editor-modal__chip-row">
                    {variables.map((variable) => (
                      <span key={variable} className="editor-modal__chip">
                        {variable}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="editor-modal__helper">
                    Add placeholders like {'{{customer_name}}'} to create input handles.
                  </p>
                )}
                <span className="editor-modal__helper">
                  Template editor height: {templateHeight}px
                </span>
              </div>
            ) : (
              <p className="editor-modal__helper">
                Click any node card in the canvas to reopen this editor and adjust its settings.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
