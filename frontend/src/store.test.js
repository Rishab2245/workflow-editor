import { resetStore, useStore } from './store';

describe('pipeline store', () => {
  beforeEach(() => {
    resetStore();
  });

  it('updates node fields in the shared store', () => {
    useStore.getState().addNode({
      id: 'customInput-1',
      type: 'customInput',
      position: { x: 0, y: 0 },
      data: {
        id: 'customInput-1',
        nodeType: 'customInput',
        inputName: 'input_1',
        inputType: 'Text',
      },
    });

    useStore.getState().updateNodeField('customInput-1', 'inputName', 'customer_query');

    expect(useStore.getState().nodes[0].data.inputName).toBe('customer_query');
    expect(useStore.getState().nodes[0].data.inputType).toBe('Text');
  });
});
