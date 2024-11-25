import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config/config';


const BookTour = () => {
    const [tour, setTour] = useState({}); 

    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [postCode, setPostCode] = useState(''); 

    const [seatNumber, setSeatNumber] = useState(1);
    const { tourId } = useParams();

    useEffect(() => {
        async function fatchInfo() {
            if (tour.location) return;

            const tourUrl = `http://${baseUrl}/api/tours/${tourId}`;
            const { data: { data } } = await axios.get(tourUrl);
            setTour(data);
        }
        fatchInfo();
    }, []) 

    async function makePayment() {
        const paymentUrl = `http://${baseUrl}/api/pay`;
        const { data: { GatewayPageURL } } = await axios.post(paymentUrl, {
            price: tour.price * seatNumber, 
            name, email, phone, postCode
        }); 

        localStorage.setItem('orderInfo', JSON.stringify({
            price: tour.price * seatNumber, 
            name, email, phone, postCode, 
            tourId, seatNumber
        })) 

        window.location.replace(GatewayPageURL); 
    } 

    return (
        <div className='w-[60%] border-x-2 border-neutral-800/5 mx-auto p-5'>
            <h1 className='text-5xl text-blue-600 font-extrabold text-center'>
                Book your favourite destination
            </h1>


            <div className='mt-10'> 
                <div className='p-5 mb-3 rounded-md w-1/3 mx-auto'> 
                    <div> 
                        <h2 className='text-xl font-semibold mb-3'>
                            Amazing {tour.location}
                        </h2>
                        <p className='text-lg text-gray-600'>
                            Price: {tour.price} / seat 
                        </p>
                        <p className='text-lg text-gray-600'>
                            Available Seats: {tour.maxSeats - tour.totalOccupiedSeat}
                        </p>
                        <p className='text-lg text-gray-600'>Start Date: {new Date(tour.startDate).toLocaleDateString()}</p>
                        <p className='text-lg text-gray-600'>End Date: {new Date(tour.endDate).toLocaleDateString()}</p>
                    </div> 

                    <div className='flex mt-3 text-xl'> 
                        <span className='pt-[4px]'> 
                            Seat 
                        </span>  
                        <button 
                            className='mx-5 border-2 border-indigo-950 px-3 py-1 rounded-lg text-xl transition-all hover:bg-indigo-950 hover:text-white'
                            onClick={() => { 
                                if (seatNumber >= 2) {
                                    setSeatNumber(Number(seatNumber) - 1);
                                }
                            }}>
                            - 
                        </button> 
                        <input 
                            type='number' 
                            value={seatNumber} 
                            className='w-[80px] bg-gray-300/40 pl-2 rounded-md' 
                            onChange={(e) => {
                                const value = +e.target.value;
                                if(value >= 1 && value <= (tour.maxSeats - tour.totalOccupiedSeat)) {
                                    setSeatNumber(value); 
                                }
                            }} 
                        /> 
                        <button 
                            className='mx-5 border-2 border-indigo-950 px-3 py-1 rounded-lg text-xl transition-all hover:bg-indigo-950 hover:text-white'
                            onClick={() => { 
                                if ((tour.maxSeats - tour.totalOccupiedSeat) > seatNumber) {
                                    setSeatNumber(Number(seatNumber) + 1);
                                } 
                            }}>
                            + 
                        </button> 
                    </div> 

                    <div className='mt-5'> 
                        <p className='text-xl'> 
                            Total Price: {tour.price * seatNumber} 
                        </p> 
                    </div> 
                </div>  
            </div> 

            <div className='mt-8'> 
                <div>
                    <div className='mb-4'>
                        <span className='mb-2'>Name:</span> 
                        <input 
                            type='text' 
                            placeholder='Sohel Rana' 
                            onChange={(e) => setName(e.target.value)}
                            className='border-2 border-gray-300 px-4 py-2 rounded-md w-full' />
                    </div>
                    <div className='mb-4'>
                        <span className='mb-2'>Email:</span> 
                        <input 
                            type='text' 
                            placeholder='sohel@gmail.com' 
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 border-gray-300 px-4 py-2 rounded-md w-full' />
                    </div>
                    <div className='mb-4'>
                        <span className='mb-2'>Phone:</span> 
                        <input 
                            type='text' 
                            placeholder='0171234567' 
                            onChange={(e) => setPhone(e.target.value)}
                            className='border-2 border-gray-300 px-4 py-2 rounded-md w-full' />
                    </div>
                    <div className='mb-4'>
                        <span className='mb-2'>Post Code:</span> 
                        <input 
                            type='text' 
                            placeholder='1216' 
                            onChange={(e) => setPostCode(e.target.value)}
                            className='border-2 border-gray-300 px-4 py-2 rounded-md w-full' />
                    </div>
                </div>
                <button 
                    className='mt-6 mb-20 bg-red-600 text-white text-xl px-28 py-3 rounded-full font-semibold'
                    onClick={makePayment}> 
                    Pay  
                </button> 
            </div>
        </div> 
    ) 
} 

export default BookTour; 