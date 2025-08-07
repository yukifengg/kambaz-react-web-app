const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function Module() {
  return (
    <div id="wd-module-links">
      <h3>Module API</h3>
      <a
        className="btn btn-primary me-2"
        href={`${REMOTE_SERVER}/lab5/module`}
        target="_blank"
      >
        Get Module
      </a>
      <a
        className="btn btn-secondary"
        href={`${REMOTE_SERVER}/lab5/module/name`}
        target="_blank"
      >
        Get Module Name
      </a>
    </div>
  );
}
