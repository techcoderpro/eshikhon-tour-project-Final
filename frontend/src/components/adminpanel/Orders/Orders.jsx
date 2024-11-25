import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../config/config';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fatchInfo() {
            const bookingUrl = `http://${baseUrl}/api/bookings`;
            const { data: { bookings } } = await axios.get(bookingUrl);
            setOrders(bookings);
            console.log(bookings);

        }
        fatchInfo();
    }, [])

    return (
        <div>
            <table className="w-full table-auto shadow rounded-md overflow-hidden divide-y divide-gray-200">
                <thead>
                    <tr className="bg-green-500 text-white text-left">
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">User Email</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Total Seat Booking</th>
                        <th className="p-3">Booking Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-200/50">
                            <td className="p-3">{order._id}</td>
                            <td className="p-3">{order.price}</td>
                            <td className="p-3">{order.userId.email}</td>
                            <td className="p-3">{order.tourId.location}</td>
                            <td className="p-3">{order.noOfSeatBooking}</td>
                            <td className="p-3">
                                {new Date(order.bookingDate).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="0" className="font-bold p-3">Total Price:</td>
                        <td colSpan="1" className="font-bold p-3">{150050}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Orders; 