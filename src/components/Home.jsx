import React from 'react'
import { Navigate } from 'react-router-dom';

export const Home = () => {
  const token = sessionStorage.getItem('token');
  return (
    <>
    {!token && <Navigate to="/" />}
    <div>Home</div>

    </>
  )
}
