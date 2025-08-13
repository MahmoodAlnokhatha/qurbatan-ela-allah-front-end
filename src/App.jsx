import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Vehicles from './pages/Vehicles/Vehicles';
import VehicleDetails from './pages/VehicleDetails/VehicleDetails';
import MyBookings from './pages/MyBookings/MyBookings';
import ManageBookings from './pages/ManageBookings/ManageBookings';
import MyVehicles from './pages/MyVehicles/MyVehicles';
import NewVehicle from './pages/Vehicles/NewVehicle';
import EditVehicle from './pages/Vehicles/EditVehicle';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Vehicles />} />
        <Route path="/vehicles/new" element={<NewVehicle />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
        <Route path="/my-vehicles" element={<MyVehicles />} />
        <Route path="/bookings/my" element={<MyBookings />} />
        <Route path="/bookings/manage" element={<ManageBookings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}