// frontend/src/pages/MyBookings.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const userResponse = await axiosInstance.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userId = userResponse.data._id;

        const response = await axiosInstance.get(`bookings?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} className="mb-4">
            <p>Provider: {booking.providerName}</p>
            <p>Slot: {booking.slot}</p>
            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
