import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as vehicleService from '../../services/vehicleService';
import * as bookingService from '../../services/bookingService';
import { UserContext } from '../../contexts/UserContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useToast } from '../../components/Toast/ToastProvider';
import './VehicleDetails.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const toast = useToast();

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null);     
  const [availWindow, setAvailWindow] = useState(null); 
  const [busy, setBusy] = useState([]);
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

  useEffect(() => {
    (async () => {
      try {
        const data = await vehicleService.availability(id);
        if (data?.availability) {
          setAvailWindow({
            start: new Date(data.availability.startDate),
            end: new Date(data.availability.endDate),
          });
        }
        if (data?.bookings?.length) {
          setBusy(
            data.bookings.map(b => ({
              start: dayjs(b.startDate).startOf('day').toDate(),
              end: dayjs(b.endDate).endOf('day').toDate(),
            }))
          );
        } else {
          setBusy([]);
        }
      } catch (e) {
      }
    })();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/sign-in'); return; }
    try {
      const payload = {
        vehicleId: id,
        startDate: dayjs(startDate).format('YYYY-MM-DD'),
        endDate: dayjs(endDate).format('YYYY-MM-DD'),
      };
      const res = await bookingService.create(payload);
      if (res?.err) throw new Error(res.err);
      toast.show('Booking request submitted!', { type: 'success' });
      navigate('/bookings/my');
    } catch (err) {
      toast.show(err.message || 'Failed to create booking.', { type: 'error' });
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
          <p><strong>Donated By:</strong> {vehicle?.owner?.username ?? '—'}</p>
          <p className="vehDet__dates">
            Available: {new Date(vehicle.availability.startDate).toLocaleDateString()} → {new Date(vehicle.availability.endDate).toLocaleDateString()}
          </p>

          <form onSubmit={handleBooking} className="vehDet__form">
            <label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                includeDateIntervals={availWindow ? [{ start: availWindow.start, end: availWindow.end }] : []}
                excludeDateIntervals={busy}
                minDate={availWindow?.start}
                maxDate={availWindow?.end}
                placeholderText="Pick start date"
                required/>
            </label>
            <label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                includeDateIntervals={availWindow ? [{ start: availWindow.start, end: availWindow.end }] : []}
                excludeDateIntervals={busy}
                minDate={startDate || availWindow?.start}
                maxDate={availWindow?.end}
                placeholderText="Pick end date"
                required/>
            </label>
            <button type="submit" className="vehDet__btn">Request booking</button>
          </form>
        </div>
      </section>
    </main>
  );
}