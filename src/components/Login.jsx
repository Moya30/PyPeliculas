import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {
  const MySwal = withReactContent(Swal);

  const history = useNavigate();

  const submitHundler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email === '' || password === '') {
      MySwal.fire(
        <h2>Los campos no pueden estar vacios</h2>
      );

      return;
    }

    if (email !== '' && !regexEmail.test(email)) {
      MySwal.fire({
        title: <p>Debes escribir una dirección de correo electronico valida</p>,
        //<h2></h2>
      });
      return;
    }

    if (email !== 'challenge@alkemy.org' || password !== 'react') {
      MySwal.fire(
        <h2>Credenciales invalidas</h2>
      );
      return;
    }


    axios
      .post('http://challenge-react.alkemy.org', { email, password })
      .then(res => {
        MySwal.fire(
          'Datos validos',
          'Ingresaste correctamente',
          'success'
        );
        const token = res.data.token
        sessionStorage.setItem('token', token);
        localStorage.setItem('Minombre', 'Freddy Moya')
        console.log("token: " + token);

        history('/Listado')
      })
  }

  let token = sessionStorage.getItem('token');

  return (
    <>
    {
      token && <Navigate to="/Listado" />
    }
      <div className='row'>
        <div className='col-6 offset-3'>
          <h2> Formulario del login </h2>
          <form onSubmit={submitHundler}>
            <label className='form-label d-block mt-2'>
              <span>Correo electronico: </span>
              <br />
              <input
                type="text"
                placeholder="Escriba su email"
                name="email"
                className='form-control'

              />
            </label>
            <br />
            <label className='form-label d-block mt-2'>
              <span>Contraseña: </span>
              <br />
              <input
                type="password"
                placeholder="Escriba su contraseña"
                name="password"
                className='form-control'
              />
            </label>
            <br />
            <button type="submit" className='btn btn-success mt-2'> Ingresar </button>
            
          </form>
        </div>
      </div>
    </>
  )
}
