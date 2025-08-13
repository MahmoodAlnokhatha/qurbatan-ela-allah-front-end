import { useEffect, useState } from 'react';
import * as vehicleService from '../../services/vehicleService';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './Vehicles.css';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const load = async () => {
    setStatus('loading');
    setError('');
    try {
      const data = await vehicleService.index();
      setVehicles(Array.isArray(data) ? data : []);
      setStatus('idle');
    } catch (e) {
      setError('Failed to load vehicles.');
      setStatus('error');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <main className="vehPage">
      <header className="vehPage__header">
        <h1>Available Vehicles</h1>
        <p className="vehPage__sub">Browse all vehicles available for volunteering.</p>
      </header>

      {status === 'loading' && <LoadingSpinner label="Loading vehicles…" />}
      {status === 'error'   && <ErrorMessage message={error} onRetry={load} />}

      {!vehicles.length && status === 'idle' && (
        <p className="vehPage__hint">No vehicles available right now.</p>
      )}

      <section className="vehPage__grid" aria-live="polite">
        {vehicles.map(v => (<VehicleCard key={v._id} vehicle={v} />))}
      </section>
    </main>
  );
}