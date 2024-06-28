import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

const useBookings = (userId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/bookings?userId=${userId}`);
        setBookings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  return { bookings, loading, error };
};

export default useBookings;
