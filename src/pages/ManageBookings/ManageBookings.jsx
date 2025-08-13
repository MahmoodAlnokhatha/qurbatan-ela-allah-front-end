import { useEffect, useState } from 'react';
import * as bookingService from '../../services/bookingService';
import ManageBookingCard from '../../components/ManageBookingCard/ManageBookingCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './ManageBookings.css';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setStatus('loading');
    setError('');
    try {
      const data = await bookingService.incomingBookings();
      setBookings(Array.isArray(data) ? data : []);
      setStatus('idle');
    } catch (e) {
      setError('Failed to load incoming bookings.');
      setStatus('error');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await bookingService.updateStatus(id, newStatus);
      if (res?.err) throw new Error(res.err);
      setBookings(prev => prev.map(b => (b._id === id ? { ...b, status: newStatus } : b)));
    } catch (e) {
      alert('Failed to update status.');
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <main className="mBk">
      <header className="mBk__header">
        <h1>Manage Bookings</h1>
        <p className="mBk__sub">Approve or reject incoming booking requests.</p>
      </header>

      {status === 'loading' && <LoadingSpinner label="Loading incoming bookings…" />}
      {status === 'error'   && <ErrorMessage message={error} onRetry={fetchBookings} />}

      {!bookings.length && status === 'idle' && (
        <p className="mBk__hint">No booking requests yet.</p>
      )}

      <section className="mBk__grid">
        {bookings.map(b => (
          <ManageBookingCard key={b._id} booking={b} onUpdateStatus={handleUpdateStatus} />
        ))}
      </section>
    </main>
  );
}