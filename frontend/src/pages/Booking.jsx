import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {
  const [provider, setProvider] = useState(null);
  const [slot, setSlot] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const providerId = new URLSearchParams(location.search).get('providerId');

  useEffect(() => {
    console.log('Provider ID:', providerId);
    const fetchProvider = async () => {
      try {
        const response = await axiosInstance.get(`/gasProviders/${providerId}`);
        console.log('Fetched provider:', response.data);
        setProvider(response.data);
      } catch (error) {
        console.error('Failed to fetch provider:', error);
      }
    };
    fetchProvider();
  }, [providerId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await axiosInstance.post('/bookings', { gasProviderId: providerId, slot }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/profile');
    } catch (error) {
      console.error('Booking failed', error);
    }
  };

  return (
    <div className="container mx-auto">
      {provider ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Book Slot for {provider.name}</h1>
          <form onSubmit={handleBooking} className="max-w-md mx-auto">
            <div className="mb-4">
              <select value={slot} onChange={(e) => setSlot(e.target.value)} className="select select-bordered w-full">
                {provider.availableSlots?.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">Book Slot</button>
          </form>
        </>
      ) : (
        <p>Loading provider details...</p>
      )}
    </div>
  );
};

export default Booking;
