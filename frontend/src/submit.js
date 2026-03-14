import { useState } from 'react';
import { useStore } from './store';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://workflow-editor-vlh0.onrender.com';

export const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const showNotification = useStore((state) => state.showNotification);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      showNotification({
        variant: 'success',
        title: 'Analysis complete',
        message: 'The backend checked the current workflow structure successfully.',
        items: [
          { label: 'Nodes', value: result.num_nodes },
          { label: 'Edges', value: result.num_edges },
          { label: 'DAG', value: result.is_dag ? 'Yes' : 'No' },
        ],
      });
    } catch (error) {
      showNotification({
        variant: 'error',
        title: 'Analysis unavailable',
        message:
          'Could not analyze the pipeline. Make sure the FastAPI backend is running on http://127.0.0.1:8000 and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="submit-bar">
      <div>
        <span className="toolbar__eyebrow">Validate</span>
        <h2>Run pipeline check</h2>
        <p>Count nodes, count edges, and verify the graph is acyclic.</p>
      </div>

      <button
        type="button"
        className="submit-bar__button"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Analyzing pipeline...' : 'Analyze Pipeline'}
      </button>
    </section>
  );
};
