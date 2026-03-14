const VARIABLE_PATTERN = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;

export const extractTemplateVariables = (value = '') => {
  const variables = [];
  const seen = new Set();

  for (const match of value.matchAll(VARIABLE_PATTERN)) {
    const variableName = match[1];

    if (!seen.has(variableName)) {
      seen.add(variableName);
      variables.push(variableName);
    }
  }

  return variables;
};
