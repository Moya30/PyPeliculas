import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const Resultados = () => {
  const token = sessionStorage.getItem('token');
  const query = new URLSearchParams(window.location.search);
  const keyword = query.get('keyword');
  console.log("rraaa:" + keyword);
  const MySwal = withReactContent(Swal);


  const [moviesResult, setMoviesResult] = useState([])
  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=03100c88273d5b6300ead7a121b133e5&language=es-ES&query=${keyword}`;
    axios.get(endPoint).then( response => {
      const dat = response.data.results;
      if (dat.length === 0){
        MySwal.fire({
          title: 'No hay resultados',
          text: 'Escribe alguna pelicula',
          icon: 'error',
          confirmButtonText: 'Ok'
          }
        );
      }
      setMoviesResult(dat);
    })
      .catch(error =>{
        console.log(error.message)
      })
  },[keyword]);
  

  return (
    <>
       {!token && <Navigate to="/" />}
      <h3>Buscaste: <em>{keyword}</em></h3>
      <div className='row'>
              {moviesResult.length === 0 && <h3>No hay resultados </h3>}
                {
                   moviesResult && moviesResult?.map((oneMovie, idx) => {
                        return(
                            <div className='col-4' key={idx}>
                                <div className='card my-4'>
                                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${oneMovie.backdrop_path}`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.original_title}</h5>

                                        {/* <p className="card-text">{oneMovie.overview.substring(0,100)}</p> */}
                                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">view detalle</Link>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    </>
  )
}
