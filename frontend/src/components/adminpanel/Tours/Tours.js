import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { baseUrl } from '../../../config/config';


const Tours = () => {
    const [tours, setTours] = useState([]); 

    useEffect(() => {
        async function fetchTours() {
            const url = `http://${baseUrl}/api/tours`; 
            const { data: { data } } = await axios.get(url); 
            setTours(data); 
        } 
        fetchTours(); 
    }, [])

    return (
        <div className=''>
            <button className='bg-green-400 text-white- rounded-lg px-6 py-2 mb-2'>
                <Link to="/dashboard/create-tour">
                    Create Tour
                </Link>
            </button>
            <div className='w-full'>
                <h1 className='text-4xl mb-4 text-center text-indigo-700'>
                    Tours List
                </h1>

                { 
                    tours.length === 0 &&  
                    <h1> 
                        No Tour Found 
                    </h1> 
                } 

                <div className={`w-1/3 min-w-[300px] max-w-[450px] mx-auto max-h-[665px] pr-2
                    scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700/45 
                    scrollbar-track-slate-400/40 overflow-y-scroll scrollbar-thin`}> 
                    { 
                        tours.map(tour => (
                            <div 
                                key={tour._id} 
                                className={`border-2 border-neutral-900/30 hover:border-orange-600/90 hover:bg-gray-200/40 transition-all rounded-lg 
                                px-4 py-4 mb-3`}>
                                <h2 className='text-lg'>Location: {tour.location}</h2>
                                <h2 className='text-lg'>Price: {tour.price}</h2>
                                <h2 className='text-lg'>Maximum Seat: {tour.maxSeats}</h2>
                                <h2 className='text-lg'>Total Bookings: {tour.totalOccupiedSeat}</h2>
                                <h2 className='text-lg'>Tour Startes from: {new Date(tour.startDate).toLocaleDateString()}</h2>
                                <h2 className='text-lg'>Tour Ends: {new Date(tour.endDate).toLocaleDateString()}</h2> 
                            </div> 
                        )) 
                    } 
                </div> 
            </div> 
        </div> 
    ) 
} 

export default Tours; 