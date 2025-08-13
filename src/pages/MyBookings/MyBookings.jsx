import { useEffect, useState } from 'react';
import * as bookingService from '../../services/bookingService';
import BookingCard from '../../components/BookingCard/BookingCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './MyBookings.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const load = async () => {
    setStatus('loading');
    setError('');
    try {
      const data = await bookingService.myBookings();
      setBookings(Array.isArray(data) ? data : []);
      setStatus('idle');
    } catch (e) {
      setError('Failed to load your bookings.');
      setStatus('error');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <main className="myBk">
      <header className="myBk__header">
        <h1>My Bookings</h1>
        <p className="myBk__sub">All requests you have made.</p>
      </header>

      {status === 'loading' && <LoadingSpinner label="Loading your bookings…" />}
      {status === 'error'   && <ErrorMessage message={error} onRetry={load} />}

      {!bookings.length && status === 'idle' && (
        <p className="myBk__hint">You don’t have any bookings yet.</p>
      )}

      <section className="myBk__grid" aria-live="polite">
        {bookings.map(b => (<BookingCard key={b._id} booking={b} />))}
      </section>
    </main>
  );
}