import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Qurbatan Ela Allah</Link>
      <div className="flex gap-4 items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
            <Link to="/login" className="hover:underline">Sign In</Link>
          </>
        ) : (
          <>
            <Link to="/publish" className="hover:underline">Donate Vehicle</Link>
            <Link to="/my-vehicles" className="hover:underline">My Vehicles</Link>
            <Link to="/my-requests" className="hover:underline">My Requests</Link>
            <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
