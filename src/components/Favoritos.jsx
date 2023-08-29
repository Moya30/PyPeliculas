import { Navigate } from "react-router-dom";

export const Favoritos = (props) => {
    const token = sessionStorage.getItem('token');
    return (
    
    <>  
     {!token && <Navigate to="/" />}
        <h2> Seccion favoritos </h2>
        <div className='row'>
                { !props.favorites.length && <div className="col-12 text-danger"> No tienes nada en favoritos</div>}
                {
                   props.favorites.map((oneMovie, idx) => {
                        return(
                            <div className='col-3' key={idx}>
                                <div className='card my-4'>
                                    <img className="card-img-top" src={oneMovie.imageURL} alt="Card image cap" />
                                   <button 
                                   className='favorite-btn'
                                   onClick={props.addOrRemoveFronFav}
                                   data-movie-id={oneMovie.id}
                                   > 🖤 </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.original_title}</h5>

                                        <p className="card-text">{oneMovie.overview.substring(0,100)}</p>
                                        {/* <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">view detalle</Link> */}

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
