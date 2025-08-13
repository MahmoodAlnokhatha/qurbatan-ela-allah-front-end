import './ManageBookingCard.css';

export default function ManageBookingCard({ booking, onUpdateStatus }) {
  const start = new Date(booking.startDate).toLocaleDateString();
  const end = new Date(booking.endDate).toLocaleDateString();
  const v = booking.vehicle || {};

  return (
    <article className="mBkCard">
      <div className="mBkCard__media">
        {v.imageUrl ? <img src={v.imageUrl} alt={`Vehicle in ${v.location || ''}`} /> : <div className="mBkCard__placeholder" />}
      </div>
      <div className="mBkCard__body">
        <div className="mBkCard__header">
          <h3>{v.location || 'Vehicle'}</h3>
          <span className={`mBkCard__status mBkCard__status--${booking.status}`}>{booking.status}</span>
        </div>
        <p className="mBkCard__requester">Requested by: <strong>{booking.requester?.username || 'unknown'}</strong></p>
        <p className="mBkCard__dates">{start} → {end}</p>

        {booking.status === 'pending' && (
          <div className="mBkCard__actions">
            <button className="mBkCard__btn mBkCard__btn--approve" onClick={() => onUpdateStatus(booking._id, 'approved')}>
              Approve
            </button>
            <button className="mBkCard__btn mBkCard__btn--reject" onClick={() => onUpdateStatus(booking._id, 'rejected')}>
              Reject
            </button>
          </div>
        )}
      </div>
    </article>
  );
}