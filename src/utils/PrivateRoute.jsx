import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Layout from '../components/Layout';



export default function PrivateRoutes() {
    let  token = localStorage.getItem("_token") == null ? false : true;
    return (
        <>
            {token ? <Layout> <Outlet  /></Layout> : <Navigate to="/login" />};
        </>

    )
    }