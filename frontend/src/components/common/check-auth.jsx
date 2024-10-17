import {useLocation, Navigate } from "react-router-dom";
import React from 'react'

function CheckAuth({isAuthenticated, user, children}){
    const location = useLocation();
    console.log(location.pathname)
    if(window.location.pathname === "/"){
        if(!isAuthenticated){
            return <Navigate to="/shop/home" />
        }else{
            if(user?.role === "admin"){
                return <Navigate to="/admin/dashboard" />
            }else{
                return <Navigate to="/shop/home" />
            }
        }
    }
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />
        }
    }
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
        return <Navigate to="/shop" />
    }
    if (isAuthenticated && user?.role === 'admin' && !location.pathname.includes('/admin')) {
        return <Navigate to='/admin/dashboard' />
    }
    if (!isAuthenticated && location.pathname.includes('/admin')) {
        return <Navigate to='/shop/home' />
    }
    return <>{children}</>
}
export default CheckAuth;