import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ Dashboard }) => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(token ? true : false);

    useEffect(() => {
        function checkToken() {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);

                    // Role Check - Admin allowed 
                    if (decodedToken.role === 'visitor') { 
                        setLoggedIn(false); 
                        localStorage.removeItem('token'); 
                        return <Navigate to="/login" />; 
                    } 

                    // Expiry time check 
                    const currentTime = Date.now() / 1000; 

                    if (decodedToken.exp && decodedToken.exp > currentTime) { 
                        setLoggedIn(true); 
                        setLoading(false); 
                    } 
                    else { 
                        localStorage.removeItem('token'); 
                        setLoggedIn(false); 
                    } 
                } 
                catch (error) { 
                    return <Navigate to="/login" />; 
                } 
            } 
        } 

        checkToken(); 
    }, []);

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    if(loading) return; 
    
    return <Dashboard />;
};

export default PrivateRoute;