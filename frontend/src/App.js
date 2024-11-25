import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; 

import Navbar from './components/navbar/Navbar';
import Registration from './components/authentication/Registration';
import Login from './components/authentication/Login';
import Dashboard from './components/adminpanel/Dashboard'; 
import PrivateRoute from './PrivateRoute';
import Tours from './components/website/Tours';
import BookTour from './components/website/BookTour';
import Success from './components/website/payment/Success';

function App() { 
  const location = useLocation();
  
  return ( 
    <div className=""> 
      { 
        !location.pathname.includes('/dashboard') && 
        <Navbar /> 
      } 
      
      <Routes> 
        <Route path='/' element={<Tours />} /> 
        <Route path='/book-tour/:tourId' element={<BookTour />} /> 
        <Route path='registration' element={<Registration />} /> 
        <Route path='login' element={<Login />} /> 
        <Route path='success/:transactionID' element={<Success />} /> 
        
        <Route path='dashboard/*' element={
          <PrivateRoute Dashboard={Dashboard} />
        } /> 
      </Routes> 
    </div> 
  ); 
} 

export default App; 