import React, { useState, useEffect } from "react";
import Header from './header.js';
import Dashbody from './dashbody.js';
import LoadingSpinner from '../components/LoadingSpinner';



const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className='background'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header />
          <Dashbody />
        </>
      )}
    </div>
  );
};





export default Dashboard;
