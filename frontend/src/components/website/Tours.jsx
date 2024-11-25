import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { baseUrl } from '../../config/config'; 

const Tours = () => {
  const [allTour, setTours] = useState([]);

  useEffect(() => {
      async function fatchInfo() { 
          const tourUrl = `http://${baseUrl}/api/tours`; 
          const { data: { data: tours } } = await axios.get(tourUrl); 
          setTours(tours);
      } 
      fatchInfo(); 
  }, []) 

  return (
    <div className='w-[60%] border-x-2 border-neutral-800/5 mx-auto p-5'>
      <h1 className='text-5xl text-orange-600 font-extrabold text-center'>
        All tours are listed below 
      </h1> 

      <div className='mt-10'>
        {
          allTour.map((tour, idx) => (
            <div key={idx} className='border-2 border-neutral-800/10 hover:border-neutral-800/20 p-5 mb-3 rounded-md w-1/2 mx-auto'>
              <h2 className='text-2xl font-semibold'>
                {tour.location}
              </h2>
              <p className='text-lg text-gray-600'>
                Price: {tour.price}
              </p>
              <p className='text-lg text-gray-600'>
                Available Seats: {tour.maxSeats - tour.totalOccupiedSeat}
              </p>
              <p className='text-lg text-gray-600'>Start Date: {new Date(tour.startDate).toLocaleDateString()}</p>
              <p className='text-lg text-gray-600'>End Date: {new Date(tour.endDate).toLocaleDateString()}</p> 

              <Link to={`/book-tour/${tour._id}`}>
                <button 
                  className='mt-6 bg-green-300 text-black text-2xl w-full py-2 rounded-full font-semibold'> 
                  Book Now 
                </button>
              </Link>
            </div>
          )) 
        } 
      </div>
    </div>
  )
}

export default Tours; 