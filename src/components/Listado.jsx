import axios from 'axios';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Listado = ( props ) => {
    const token = sessionStorage.getItem('token');
    const MySwal = withReactContent(Swal);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=03100c88273d5b6300ead7a121b133e5&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMovie(apiData.results)
                console.log(response)
            })
            .catch(error => {
                MySwal.fire({
                    title: 'Error del API',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                    }
                  );
            })
    },[setMovie]);

    console.log(movie);
    return (
        <>
            {!token && <Navigate to="/" />}
            <div className='row'>
                {/* estructura base */}
                {
                    movie.map((oneMovie, idx) => {
                        return(
                            <div className='col-3' key={idx}>
                                <div className='card'>
                                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${oneMovie.backdrop_path}`} alt="Card image cap" />
                                   <button 
                                   className='favorite-btn'
                                   onClick={props.addOrRemoveFronFav}
                                   data-movie-id={oneMovie.id}
                                   > 🖤 </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.original_title}</h5>

                                        <p className="card-text">{oneMovie.overview.substring(0,100)}</p>
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
