import './LoadingSpinner.css';

export default function LoadingSpinner({ label = 'Loading…', size = 'md' }) {
  return (
    <div className={`spinner spinner--${size}`} role="status" aria-live="polite">
      <div className="spinner__ring" />
      <span className="spinner__label">{label}</span>
    </div>
  );
}