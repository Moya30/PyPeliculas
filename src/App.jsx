import { Routes, Route, useNavigate } from "react-router-dom";
import { Listado } from "./components/Listado"
import { Login } from "./components/Login"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DetalleMovie } from "./components/DetalleMovie";
import { Resultados } from "./components/Resultados";
import { Favoritos } from "./components/Favoritos";
import { useEffect, useState } from "react";
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./components/Home";

function App() {

  const [favorites, setFavorites] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    
    const favsInLocal = localStorage.getItem('favs');
      if(favsInLocal !== null){
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray);
      }

  }, [])
  
  function onLogout(){
    sessionStorage.clear()
    history('/')
  }

  const addOrRemoveFronFav = e => {
    
    const favMovies = localStorage.getItem('favs');

    let tempMovieInFavs;

    if (favMovies === null) {
      tempMovieInFavs = [];

    } else {
      tempMovieInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imageURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      title,
      overview,
      imageURL,
      id: btn.dataset.movieId
    }



    // validar para que no se guarde doble
    let movieIsInArray = tempMovieInFavs.find(oneMOvie => {
      return oneMOvie.id === movieData.id
    })

    // si la pelicula no esta, se agrega
    if (!movieIsInArray) {
      tempMovieInFavs.push(movieData);
      // guardar en el localstorage
      localStorage.setItem('favs', JSON.stringify(tempMovieInFavs));
      setFavorites(tempMovieInFavs);
      console.log("se agrego la pelicula ");
    } else {
      let moviesLeft = tempMovieInFavs.filter(oneMOvie => {
        return oneMOvie.id !== movieData.id;
      });

      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log("se elimino la pelicula");
    }

  }

  return (
    <>
      <Header  favorites={favorites} onLogout={onLogout}/>
      <div className="container">

        <Routes>
          <Route exact path="/" Component={Login} />
          <Route path="/home" Component={Home} />
          <Route path="/listado" element={ <Listado addOrRemoveFronFav={addOrRemoveFronFav} ></Listado>} />
          <Route path="/detalle" Component={DetalleMovie} />
          <Route path="/resultados" Component={Resultados} />
          <Route path="/favoritos" element={ <Favoritos  addOrRemoveFronFav={addOrRemoveFronFav} favorites={favorites}  ></Favoritos>} />
        </Routes>

      </div>
       <Footer /> 
    </>
  )
}

export default App
