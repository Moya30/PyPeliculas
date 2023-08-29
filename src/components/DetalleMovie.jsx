import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


export const DetalleMovie = () => {

  const [detalis, setDetalis] = useState(null);

  const token = sessionStorage.getItem('token');
  const query = new URLSearchParams(window.location.search);
  const movieID = query.get('movieID');

  useEffect(() => {
    const endPonit = `https://api.themoviedb.org/3/movie/${movieID}?api_key=03100c88273d5b6300ead7a121b133e5&language=en-US`
    axios.get(endPonit).then(response => {
      const apiData = response.data;
      setDetalis(apiData);
    })
      .catch(error => {
        console.log(error);
      })

  }, [])


  return (
    <>
      {!token && <Navigate to="/" />}
      
      
      { detalis &&   
        <>
          <h2> Titulo: {detalis.title} </h2>
          <div className='row'>
            <div className='col-4'>
            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${detalis.backdrop_path}`} alt="Card image cap" />

            </div>
            <div className='col-8'>
              <h5> Fecha de estreno: {detalis.release_date} </h5>
              <h3> Reseña </h3>
              <p>{detalis.overview}</p>
              <h5>Rating {detalis.vote_average}</h5>
              <h5>Generos</h5>
              <ul>
                {  detalis && detalis.genres.map((oneGener,indx) => <li key={oneGener.id}>{oneGener.name}</li>)}
              </ul>
            </div>
          </div>
        </>
      }
    </>
  )
}
