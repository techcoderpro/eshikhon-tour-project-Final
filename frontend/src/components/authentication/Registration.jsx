import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl } from '../../config/config'; 

const Registration = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const url = `http://${baseUrl}/api/users/signup`; 
            const response = await axios.post(url, data); 
            setSuccess('Registration successful!');
            setError(null);
        } 
        catch (error) {
            setError('Registration failed. Please try again.');
            setSuccess(null);

            setTimeout(() => {
                setError(null); 
            }, 8000)
        }
    };

    return (
        <div style={{height: '850px'}}>
            <div style={{
                height: '100%', display: 'flex', 
                justifyContent: 'center', alignItems: 'center', 
            }}>
                <div style={{
                    border: '1px solid black', 
                    padding: '20px', 
                    width: '400px',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
                }}>
                    <h2 className='text-center text-3xl mb-10 text-blue-900'>
                        Registration
                    </h2> 

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{display: 'flex', gap: '15px', flexDirection: 'column'}}>
                            <div style={{lineHeight: '40px', display: 'flex', flexWrap: 'wrap'}}>
                                <label style={{width: '140px', textAlign: 'right', paddingRight: '0px'}} htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                                    style={{ 
                                        border: '1px solid #ccc',
                                        borderRadius: '5px', 
                                        paddingLeft: '10px',
                                        width: '60%'
                                    }} 
                                />
                                {errors.email && 
                                <span style={{
                                    color: 'red', fontWeight: 'bold', 
                                    paddingLeft: '140px', margin: '0'
                                }}>
                                    Email is required
                                </span>}
                            </div>
                            
                            <div style={{lineHeight: '40px', display: 'flex', flexWrap: 'wrap'}}>
                                <label style={{width: '140px', textAlign: 'right', paddingRight: '0px'}} htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                    style={{ 
                                        border: '1px solid #ccc',
                                        borderRadius: '5px', 
                                        paddingLeft: '10px',
                                        width: '60%'
                                    }} 
                                />
                                {errors.password && 
                                <span style={{
                                    color: 'red', fontWeight: 'bold', 
                                    paddingLeft: '140px', margin: '0'
                                }}>
                                    Password is required 
                                </span>}
                            </div>
                            
                            <div style={{lineHeight: '40px', display: 'flex', flexWrap: 'wrap'}}>
                                <label style={{width: '140px', textAlign: 'right', paddingRight: '0px'}} htmlFor="confirmPassword">
                                    Confirm Password:
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    {...register("confirmPassword", { required: true, validate: value => value === getValues('password') })}
                                    
                                    style={{ 
                                        border: '1px solid #ccc',
                                        borderRadius: '5px', 
                                        paddingLeft: '10px',
                                        width: '60%'
                                    }} 
                                />
                                {errors.confirmPassword && 
                                <p style={{
                                    color: 'red', fontWeight: 'bold', 
                                    paddingLeft: '140px', margin: '0'
                                }}>
                                    Passwords do not match
                                </p>}
                            </div>

                            <div className='flex justify-center mt-2'>
                                <button 
                                    type="submit"
                                    style={{
                                        padding: '8px 25px',
                                        borderRadius: '5px', 
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        cursor: 'pointer', 
                                        fontSize: '18px', 
                                        border: '0px'
                                    }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                    {error && 
                    <p style={{color: 'red', fontWeight: 'bold'}}>
                        {error}
                    </p>}
                    {success && <p>{success}</p>}
                </div>
            </div>
        </div> 
    );
};

export default Registration;