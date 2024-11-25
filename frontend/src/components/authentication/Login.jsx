import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';
import { baseUrl } from '../../config/config'; 

const Login = () => { 
    const navigate = useNavigate(); 
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); 

    const { register, handleSubmit, formState: { errors } } = useForm(); 

    const onSubmit = async (data) => { 
        try { 
            const url = `http://${baseUrl}/api/users/signin`; 
            const { data: { token } } = await axios.post(url, data); 

            localStorage.setItem('token', token); 

            setSuccess('Registration successful!'); 
            setError(null); 

            const decodedToken = jwtDecode(token); 
            if (decodedToken.role === 'visitor') { 
                window.location.href = 'http://localhost:3000/'; 
                return; 
            } 

            // Visit to admin panel 
            navigate('/dashboard'); 
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
                    border: '1px solid blue', 
                    padding: '20px', 
                    width: '400px',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
                }}>
                    <h2 className='mb-8 text-center text-4xl text-blue-900'>
                        Welcome!
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{display: 'flex', gap: '15px', flexDirection: 'column'}}>
                            <div style={{lineHeight: '40px', display: 'flex', flexWrap: 'wrap'}}>
                                <label style={{width: '100px', textAlign: 'right', paddingRight: '0px'}} htmlFor="email">
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
                                        width: '70%'
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
                                <label style={{width: '100px', textAlign: 'right', paddingRight: '0px'}} htmlFor="password">
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
                                        width: '70%'
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
                            
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                                <button 
                                    type="submit"
                                    style={{
                                        padding: '10px 40px',
                                        borderRadius: '5px', 
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        cursor: 'pointer', 
                                        fontSize: '20px', 
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

export default Login;