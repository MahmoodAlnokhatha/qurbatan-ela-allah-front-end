import { Link } from 'react-router-dom';
import './VehicleCard.css';

export default function VehicleCard({ vehicle }) {
  const start = new Date(vehicle.availability.startDate).toLocaleDateString();
  const end = new Date(vehicle.availability.endDate).toLocaleDateString();

  return (
    <article className="vehCard">
      <div className="vehCard__media">
        <img src={vehicle.imageUrl} alt={`Vehicle in ${vehicle.location}`} loading="lazy" />
      </div>
      <div className="vehCard__body">
        <h3 className="vehCard__title">{vehicle.location}</h3>
        <p className="vehCard__dates">{start} → {end}</p>
        <Link className="vehCard__btn" to={`/vehicles/${vehicle._id}`}>View</Link>
      </div>
    </article>
  );
}