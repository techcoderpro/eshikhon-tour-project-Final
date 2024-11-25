import { useState, useEffect } from 'react'; 
import { baseUrl } from '../../../config/config';
import axios from 'axios'; 

const Users = () => { 
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const url = `http://${baseUrl}/api/users`; 
            const { data: { users } } = await axios.get(url);

            setUsers(users); 
        }
        fetchUsers(); 
    }, [])

    return (
        <div>
            {
                users.length > 0 &&
                users.map(user => {
                    return (
                        <div 
                            key={user._id}
                            className='flex gap-5 text-xl text-purple-900 bg-amber-200'>
                            <h2 className='w-[250px]'>
                                {user.email} 
                            </h2>
                            <p>- {user.role}</p>
                        </div>
                    )
                }) 
            }
        </div>
    )
}

export default Users; 