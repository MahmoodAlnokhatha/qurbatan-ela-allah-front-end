import './BookingCard.css';

export default function BookingCard({ booking }) {
  const start = new Date(booking.startDate).toLocaleDateString();
  const end = new Date(booking.endDate).toLocaleDateString();
  const v = booking.vehicle || {};

  return (
    <article className="bkCard">
      <div className="bkCard__media">
        {v.imageUrl ? <img src={v.imageUrl} alt={`Vehicle in ${v.location || ''}`} /> : <div className="bkCard__placeholder" />}
      </div>
      <div className="bkCard__body">
        <div className="bkCard__header">
          <h3 className="bkCard__title">{v.location || 'Vehicle'}</h3>
          <span className={`bkCard__status bkCard__status--${booking.status}`}>{booking.status}</span>
        </div>
        <p className="bkCard__dates">{start} → {end}</p>
      </div>
    </article>
  );
}