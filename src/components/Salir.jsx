import React from 'react'
import { Link } from 'react-router-dom'

export const Salir = (props) => {
    
  return (
    <>
    <h3>Salir</h3>
    <button className='btn btn-danger' onClick={props.onLogout}>
        
    <Link to="/login" > </Link> 
    <a> Salir </a>
    </button>
    </>
  )
}
