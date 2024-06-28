import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axiosInstance.get('/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    };
    fetchBookings();
  }, [navigate]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map(booking => (
          <div key={booking._id} className="card shadow-lg p-4">
            <h2 className="text-xl font-semibold">{booking.gasProvider.name}</h2>
            <p>Slot: {booking.slot}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
