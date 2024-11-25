import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { baseUrl } from '../../../config/config'; 

const Home = () => { 
    const [data, setData] = useState({
        users: 0, 
        tours: 0
    });

    useEffect(() => {
        async function fatchInfo() {
            const userUrl = `http://${baseUrl}/api/users`; 
            const { data: { users } } = await axios.get(userUrl); 

            const tourUrl = `http://${baseUrl}/api/tours`; 
            const { data: { data: tours } } = await axios.get(tourUrl); 

            setData({users: users.length, tours: tours.length});
        } 
        fatchInfo(); 
    }, []) 

    return (
        <div className='flex justify-center items-center gap-5 h-full'>
            <div className={`w-[40%] h-[400px] bg-green-400 rounded-xl p-5 flex items-center justify-center
                border border-green-500/30`}>
                <h2 className='text-[50px] font-semibold '>
                    Users: {data.users}
                </h2>
            </div>
            <div className={`w-[40%] h-[400px] bg-indigo-400/60 rounded-xl p-5 flex items-center justify-center
                border border-green-500/30`}>
                <h2 className='text-[50px] font-semibold'>
                    Tours: {data.tours}
                </h2>
            </div>
        </div> 
    )
}

export default Home; 