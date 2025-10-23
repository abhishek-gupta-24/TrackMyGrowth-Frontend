import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        const requiredAuth = authentication; 
        const userIsLoggedIn = authStatus; 

        if (requiredAuth && !userIsLoggedIn) {
            navigate("/login");
        } 
        else if (!requiredAuth && userIsLoggedIn) {
            navigate("/profile");
        }

        setLoader(false);

    }, [authStatus, navigate, authentication]);

    return loader ? <div className="min-h-screen flex items-center justify-center"><h1>Loading Route...</h1></div> : <>{children}</>;
}