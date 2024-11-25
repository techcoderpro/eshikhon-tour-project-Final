import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 
import { baseUrl } from '../../../config/config';

const CreateForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        const url = `http://${baseUrl}/api/tours`; 
        const response = await axios.post(url, data, { headers: { 'Authorization': token } });

        console.log(response); 
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Booking Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Location Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('location', { required: 'Location is required' })}
                        placeholder="Enter location"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                </div>

                {/* Price Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('price', { required: 'Price is required' })}
                        placeholder="Enter price"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Start Date Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('startDate', { required: 'Start date is required' })}
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                </div>

                {/* End Date Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('endDate', { required: 'End date is required' })}
                    />
                    {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                </div>

                {/* Max Seats Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Max Seats</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('maxSeats', { required: 'Max seats is required' })}
                        placeholder="Enter max seats"
                    />
                    {errors.maxSeats && <p className="text-red-500 text-sm mt-1">{errors.maxSeats.message}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateForm; 