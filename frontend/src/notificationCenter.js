import { useStore } from './store';

export const NotificationCenter = () => {
  const notification = useStore((state) => state.notification);
  const clearNotification = useStore((state) => state.clearNotification);

  if (!notification) {
    return null;
  }

  return (
    <aside className={`notice notice--${notification.variant || 'info'}`}>
      <div className="notice__header">
        <div>
          <span className="notice__eyebrow">
            {notification.variant === 'error' ? 'Request failed' : 'Pipeline analysis'}
          </span>
          <strong>{notification.title}</strong>
        </div>

        <button type="button" className="notice__close" onClick={clearNotification}>
          Dismiss
        </button>
      </div>

      {notification.message ? <p>{notification.message}</p> : null}

      {notification.items?.length ? (
        <div className="notice__metrics">
          {notification.items.map((item) => (
            <div key={item.label} className="notice__metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </aside>
  );
};
