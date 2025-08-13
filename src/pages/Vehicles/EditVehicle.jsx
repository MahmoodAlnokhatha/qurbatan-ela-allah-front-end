import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VehicleForm from '../../components/VehicleForm/VehicleForm';
import * as vehicleService from '../../services/vehicleService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './EditVehicle.css';

export default function EditVehicle() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setErr('');
      setLoading(true);
      try {
        const data = await vehicleService.show(id);
        if (data?.err) throw new Error(data.err);
        setVehicle(data);
      } catch (e) {
        setErr(e?.message || 'Failed to load vehicle.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async ({ location, startDate, endDate, file }) => {
    setSubmitting(true);
    setErr('');
    try {
      const res = await vehicleService.update(id, { location, startDate, endDate, file });
      if (res?.err) throw new Error(res.err);
      navigate('/my-vehicles');
    } catch (e) {
      setErr(e?.message || 'Failed to update vehicle.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="vehEdit">
      <header className="vehEdit__header">
        <h1>Edit Vehicle</h1>
      </header>

      {loading && <LoadingSpinner label="Loading vehicle…" />}
      {err && !loading && <ErrorMessage message={err} />}

      {!loading && vehicle && (
        <>
          {submitting && <div style={{ margin: '8px 0' }}><LoadingSpinner label="Saving changes…" /></div>}
          <VehicleForm
            mode="edit"
            initialData={vehicle}
            onSubmit={handleUpdate}
            submitting={submitting}
            submitLabel="Save changes"
          />
        </>
      )}
    </main>
  );
}