import './ErrorMessage.css';

export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="errBox" role="alert">
      <span className="errBox__icon" aria-hidden>!</span>
      <span className="errBox__msg">{message}</span>
      {onRetry && <button className="errBox__retry" onClick={onRetry}>Retry</button>}
    </div>
  );
}