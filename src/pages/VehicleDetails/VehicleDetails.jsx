import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as vehicleService from '../../services/vehicleService';
import * as bookingService from '../../services/bookingService';
import { UserContext } from '../../contexts/UserContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './VehicleDetails.css';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const load = async () => {
    setStatus('loading');
    setError('');
    try {
      const data = await vehicleService.show(id);
      setVehicle(data);
      setStatus('idle');
    } catch (e) {
      setError('Failed to load vehicle details.');
      setStatus('error');
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/sign-in'); return; }
    try {
      const res = await bookingService.create({ vehicleId: id, startDate, endDate });
      if (res?.err) throw new Error(res.err);
      alert('Booking request submitted!');
      navigate('/bookings/my');
    } catch (err) {
      alert(err.message || 'Failed to create booking.');
    }
  };

  if (status === 'loading') return <main className="vehDet"><LoadingSpinner label="Loading vehicle…" /></main>;
  if (status === 'error')   return <main className="vehDet"><ErrorMessage message={error} onRetry={load} /></main>;
  if (!vehicle) return null;

  return (
    <main className="vehDet">
      <header className="vehDet__header">
        <h1>Vehicle in {vehicle.location}</h1>
      </header>

      <section className="vehDet__content">
        <div className="vehDet__media">
          <img src={vehicle.imageUrl} alt={`Vehicle in ${vehicle.location}`} loading="lazy" decoding="async" />
        </div>

        <div className="vehDet__info">
          <p className="vehDet__dates">
            Available: {new Date(vehicle.availability.startDate).toLocaleDateString()} → {new Date(vehicle.availability.endDate).toLocaleDateString()}
          </p>

          <form onSubmit={handleBooking} className="vehDet__form">
            <label>
              Start date:
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </label>
            <label>
              End date:
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </label>
            <button type="submit" className="vehDet__btn">Request booking</button>
          </form>
        </div>
      </section>
    </main>
  );
}