import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <main className="dashboard">
      <div className="dashboard-content">
        <h1>Welcome, {user.username}</h1>
        <p>Thank you for joining our application. We’re glad to have you here!</p>
        <div className="dashboard-buttons">
        <button onClick={() => navigate('/my-vehicles')}>Manage Vehicles</button>
        <button onClick={() => navigate('/my-bookings')}>Manage Bookings</button>
      </div>
      </div>
    </main>
  );
}