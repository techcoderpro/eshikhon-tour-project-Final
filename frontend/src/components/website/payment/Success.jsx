import axios from 'axios';
import React, { useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';
import { baseUrl } from '../../../config/config';

const Success = () => { 
    const { transactionID } = useParams();  

    useEffect(() => {
        async function placeOrder() {
            const bookingUrl = `http://${baseUrl}/api/bookings`;

            const token = localStorage.getItem('token');
            const orderInfo = JSON.parse(localStorage.getItem('orderInfo')); 
            const { id } = jwtDecode(token);
            console.log({orderInfo, userId: id});
            
            
            try {
                await axios.post(bookingUrl, {
                    noOfSeat: orderInfo.seatNumber, 
                    userId: id, 
                    tourId: orderInfo.tourId, 
                    transactionID, 
                    price: orderInfo.price, 
                }); 
            } 
            catch (error) {
                
            }
        } 
        placeOrder(); 
    }, [transactionID]) 

    return (
        <div>
            <h1 className='text-5xl font-bold ml-36'>
                Success! Your order has been placed.
            </h1>
        </div>
    )
}

export default Success; 