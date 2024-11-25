import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './Menu/Menu';
import Home from './AdminHome/Home';
import Tours from './Tours/Tours';
import Users from './Users/Users';
import CreateForm from './Tours/CreateForm';
import Orders from './Orders/Orders';

const Dashboard = () => {
    return (
        <div className='flex min-h-[100vh]'>
            <div className='min-w-[250px] w-[20%] bg-gray-800 text-white'>
                <Menu />
            </div>
            <div className='flex-1 bg-gray-300'> 
                <div className='h-[70px] bg-gray-900 border-b border-indigo-700 flex justify-end'>
                    <button 
                        className="bg-red-600 text-white text-xl px-6 py-2 m-2 rounded-lg"
                        onClick={() => { 
                            window.localStorage.removeItem('token');
                            window.location.href = 'http://localhost:3000/';
                        }}>
                        Logout
                    </button>
                </div>
                <div className='m-5 border-2 border-gray-500 h-[89%] rounded-2xl p-5'>
                    <Routes> 
                        <Route path='/' element={<Home />} /> 
                        <Route path='/all-users' element={<Users />} /> 
                        <Route path='/tours' element={<Tours />} /> 
                        <Route path='/create-tour' element={<CreateForm />} /> 
                        <Route path='/orders' element={<Orders />} /> 
                    </Routes> 
                </div>
            </div>
        </div> 
    ) 
} 

export default Dashboard; 