import { extractTemplateVariables } from './textUtils';

describe('extractTemplateVariables', () => {
  it('returns variables in first-seen order', () => {
    expect(
      extractTemplateVariables('Hello {{name}} from {{company}} and {{name}} again')
    ).toEqual(['name', 'company']);
  });

  it('ignores invalid placeholders', () => {
    expect(
      extractTemplateVariables('{{ valid_name }} {{ 123bad }} {{ also-bad }}')
    ).toEqual(['valid_name']);
  });

  it('returns an empty list when no variables are present', () => {
    expect(extractTemplateVariables('No placeholders here')).toEqual([]);
  });
});
