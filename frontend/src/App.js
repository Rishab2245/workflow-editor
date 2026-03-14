import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { NotificationCenter } from './notificationCenter';

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__logo">wE</span>
          <div>
            <span className="topbar__eyebrow">Workflow Editor</span>
          </div>
        </div>
      </header>

      <section className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <PipelineToolbar />
          <SubmitButton />
        </aside>

        <section className="dashboard-main">
          <PipelineUI />
        </section>
      </section>

      <NotificationCenter />
    </main>
  );
}

export default App;
