import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axiosInstance.get('/providers');
        setProviders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return { providers, loading, error };
};

export default useProviders;
