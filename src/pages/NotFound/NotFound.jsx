import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="nf">
      <h1 className="nf__title">404</h1>
      <p className="nf__text">Page not found.</p>
      <Link to="/" className="nf__link">Go back home</Link>
    </main>
  );
}