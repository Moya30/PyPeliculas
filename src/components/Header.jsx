import React from 'react'
import { Link } from 'react-router-dom'
import { Buscador } from './Buscador'
import { Salir } from './Salir'


export const Header = (props) => {
    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-3'>
                <div className='container collapse navbar-collapse' id="navbarSupportedContent">
                    <Link className='navbar-brand' to="/" >Freddy</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id="navbarNav">
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <Link to={'/home'} className='nav-link'> Home </Link>
                            </li>
                            <li>
                                <Link to={'/Listado'} className='nav-link'> Listado </Link>
                            </li>
                            <li>
                                <Link to={'/favoritos'} className='nav-link' > favoritos </Link>
                            </li>
                            <li className='nav-item d-flex align-items-center'>
                                <span className='text-success'>
                                    {
                                        props.favorites.length > 0 && <> peliculas en favoritos: {props.favorites.length}</>
                                    }
                                </span>

                            </li>
                        </ul>
                    </div>
                    <Buscador />
                    <Salir onLogout={props.onLogout} />
                </div>
            </nav>
        </header>
    )
}
