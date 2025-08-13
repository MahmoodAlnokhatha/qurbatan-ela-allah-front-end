import { useEffect, useMemo, useRef, useState } from 'react';
import './VehicleForm.css';

export default function VehicleForm({
  mode = 'create',
  initialData = null,
  onSubmit,
  submitting = false,
  submitLabel = 'Save',
}) {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!initialData) return;
    setLocation(initialData.location || '');
    if (initialData.availability?.startDate) {
      const s = new Date(initialData.availability.startDate);
      setStartDate(s.toISOString().slice(0, 10));
    }
    if (initialData.availability?.endDate) {
      const e = new Date(initialData.availability.endDate);
      setEndDate(e.toISOString().slice(0, 10));
    }
    setPreviewUrl(initialData.imageUrl || '');
  }, [initialData]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) { setFile(null); return; }
    if (!/^image\//.test(f.type)) {
      setErr('Please select a valid image file.');
      e.target.value = '';
      return;
    }
    setErr('');
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  };

  const canSubmit = useMemo(() => {
    if (!location || !startDate || !endDate) return false;
    if (new Date(startDate) > new Date(endDate)) return false;
    return true;
  }, [location, startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!canSubmit) {
      setErr('Please fill all fields correctly.');
      return;
    }
    try {
      await onSubmit({ location, startDate, endDate, file });
      if (mode === 'create' && fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setErr(error?.message || 'Failed to save vehicle.');
    }
  };

  return (
    <form className="vehForm" onSubmit={handleSubmit} noValidate>
      <div className="vehForm__grid">
        <div className="vehForm__left">
          <div className="vehForm__field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              placeholder="e.g., Manama"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              minLength={2}
              maxLength={100}
            />
          </div>

          <div className="vehForm__row">
            <div className="vehForm__field">
              <label htmlFor="start">Start date</label>
              <input
                id="start"
                name="start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="vehForm__field">
              <label htmlFor="end">End date</label>
              <input
                id="end"
                name="end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="vehForm__field">
            <label htmlFor="image">Vehicle image {mode === 'create' ? '(required)' : '(optional)'}</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              required={mode === 'create'}
            />
            <p className="vehForm__help">Accepted: JPG, PNG, WEBP, HEIC/HEIF</p>
          </div>

          {err && <p className="vehForm__error" role="alert">{err}</p>}

          <div className="vehForm__actions">
            <button className="vehForm__submit" type="submit" disabled={!canSubmit || submitting}>
              {submitLabel}
            </button>
          </div>
        </div>

        <div className="vehForm__right">
          <div className="vehForm__preview">
            {previewUrl ? <img src={previewUrl} alt="Preview" /> : <div className="vehForm__placeholder">Image preview</div>}
          </div>
        </div>
      </div>
    </form>
  );
}