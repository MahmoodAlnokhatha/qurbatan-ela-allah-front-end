import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../../components/VehicleForm/VehicleForm';
import * as vehicleService from '../../services/vehicleService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './NewVehicle.css';

export default function NewVehicle() {
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleCreate = async ({ location, startDate, endDate, file }) => {
    setSubmitting(true);
    setErr('');
    try {
      const res = await vehicleService.create({ location, startDate, endDate, file });
      if (res?.err) throw new Error(res.err);
      navigate('/my-vehicles');
    } catch (e) {
      setErr(e?.message || 'Failed to create vehicle.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="vehNew">
      <header className="vehNew__header">
        <h1>Add Vehicle</h1>
        <p className="vehNew__sub">Share your vehicle for volunteer use.</p>
      </header>

      {err && <ErrorMessage message={err} />}
      {submitting && <div style={{ margin: '8px 0' }}><LoadingSpinner label="Saving vehicle…" /></div>}

      <VehicleForm mode="create" onSubmit={handleCreate} submitting={submitting} submitLabel="Create vehicle" />
    </main>
  );
}