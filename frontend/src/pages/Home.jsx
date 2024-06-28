import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';

const Home = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await axiosInstance.get('/gasProviders');
      setProviders(response.data);
    };
    fetchProviders();
  }, []);

  return (
    <>
    
    <div className="container mx-auto">     
      <h1 className="text-3xl font-bold mb-6">Gas Providers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map(provider => (
          <div key={provider._id} className="card shadow-lg p-4">
            <h2 className="text-xl font-semibold">{provider.name}</h2>
            <p>Category: {provider.category}</p>
            <Link to={`/booking?providerId=${provider._id}`} className="btn btn-primary mt-4">Book Now</Link>
          </div>
        ))}
      </div>
    </div>
     <Banner></Banner>
    </>
  );
};

export default Home;
