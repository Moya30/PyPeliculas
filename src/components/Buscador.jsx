import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Buscador = () => {

  const history = useNavigate();
  const token = sessionStorage.getItem('token');
  const submitHandler = e => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    const keywrd = e.currentTarget.keyword.value.trim();
    console.log(keywrd);

    if (keywrd.length < 4) {
      MySwal.fire({
        title: <p>Debes escribir una palabra clave</p>,
        //<h2></h2>
      });
    } else {
      e.currentTarget.keyword.value = '';
      history(`/resultados?keyword=${keywrd}`);
    }
  }


  return (
    <>
    {!token && <Navigate to="/" />}
      <form className='d-flex  align-items-left' onSubmit={submitHandler}>
        <label className='form-label mb-0 mx-2'>
          <input
            type="text"
            placeholder="Busca tu pelicula favorita"
            name="keyword"
            className='form-control'

          />
        </label>
        <button type="submit" className='btn btn-success mr-2'> Search </button>

      </form>
    </>
  )
}
