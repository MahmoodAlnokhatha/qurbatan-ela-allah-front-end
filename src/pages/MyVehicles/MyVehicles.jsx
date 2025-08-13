import { useEffect, useState } from 'react';
import * as vehicleService from '../../services/vehicleService';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './MyVehicles.css';

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    setStatus('loading');
    setError('');
    try {
      const data = await vehicleService.myVehicles();
      setVehicles(Array.isArray(data) ? data : []);
      setStatus('idle');
    } catch (e) {
      setError('Failed to load your vehicles.');
      setStatus('error');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this vehicle?')) return;
    try {
      const res = await vehicleService.remove(id);
      if (res?.err) throw new Error(res.err);
      setVehicles(prev => prev.filter(v => v._id !== id));
    } catch (e) {
      alert('Failed to delete vehicle.');
    }
  };

  return (
    <main className="myVeh">
      <header className="myVeh__header">
        <h1>My Vehicles</h1>
        <p className="myVeh__sub">Vehicles you’ve shared for volunteering.</p>
        <div className="myVeh__actions">
          <Link to="/vehicles/new" className="myVeh__newBtn">Add Vehicle</Link>
        </div>
      </header>

      {status === 'loading' && <LoadingSpinner label="Loading your vehicles…" />}
      {status === 'error'   && <ErrorMessage message={error} onRetry={load} />}

      {!vehicles.length && status === 'idle' && (
        <p className="myVeh__hint">You have not added any vehicles yet.</p>
      )}

      <section className="myVeh__grid">
        {vehicles.map(v => (
          <article key={v._id} className="myVeh__card">
            <div className="myVeh__media">
              <img src={v.imageUrl} alt={`Vehicle in ${v.location}`} loading="lazy" />
            </div>
            <div className="myVeh__body">
              <h3 className="myVeh__title">{v.location}</h3>
              <p className="myVeh__dates">
                {new Date(v.availability.startDate).toLocaleDateString()} → {new Date(v.availability.endDate).toLocaleDateString()}
              </p>
              <div className="myVeh__cardActions">
                <button onClick={() => navigate(`/vehicles/${v._id}/edit`)} className="btn btn--ghost">Edit</button>
                <button onClick={() => handleDelete(v._id)} className="btn btn--danger">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}