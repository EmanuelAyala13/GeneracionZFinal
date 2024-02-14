import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './IniciarSesion.css';

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (isLogin) {
      if (email.trim() === '' || password.trim() === '') {
        toast.error('Por favor, completa todas las casillas', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else if (email === 'usuario@example.com' && password === 'contraseña') {
        toast.success('Inicio de sesión exitoso', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('email', email); // Guardar el correo electrónico
        setIsLoggedIn(true);
        navigate('/');
      } else {
        toast.error('Correo o contraseña incorrectos', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } else {
      if (name.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '') {
        toast.error('Por favor, completa todas las casillas', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else {
        const confirmarRegistro = window.confirm('¿Estás seguro de registrarte?');
        if (confirmarRegistro) {
          localStorage.setItem('name', name);
          localStorage.setItem('lastName', lastName);
          localStorage.setItem('email', email); // Guardar el correo electrónico

          toast.success('Registro exitoso', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });

          localStorage.setItem('isAuthenticated', 'true');
          setIsLoggedIn(true);
          navigate('/');
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
  };

  const toggleForm = () => {
    if (isLoggedIn) {
      setConfirmLogout(true);
    } else {
      setIsLogin(!isLogin);
    }
  };

  const confirmLogoutAction = () => {
    handleLogout();
    setConfirmLogout(false);
  };

  return (
    <div className="iniciar-sesion-container">
      <Navbar />
      {isLoggedIn ? (
        confirmLogout ? (
          <div className="logout-confirmation">
            <p>¿Estás seguro de cerrar sesión?</p>
            <button onClick={confirmLogoutAction}>Sí</button>
            <button onClick={() => setConfirmLogout(false)}>No</button>
          </div>
        ) : (
          <>
            <p>Nombre: {localStorage.getItem('name')}</p>
            <p>Correo Electrónico: {localStorage.getItem('email')}</p>
            <button onClick={toggleForm}>Cerrar Sesión</button>
          </>
        )
      ) : (
        <>
          <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          <form>
            {isLogin ? (
              <>
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="login-button" onClick={handleLogin}>
                  {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
                </button>
                <button type="button" className="register-button" onClick={() => setIsLogin(false)}>
                  Registrarse
                </button>
              </>
            ) : (
              <>
                <label>Nombre:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <label>Apellido:</label>
                <input type="text" onChange={(e) => setLastName(e.target.value)} />
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="register-button" onClick={handleLogin}>
                  Registrarse
                </button>
                <button type="button" className="login-button" onClick={() => setIsLogin(true)}>
                  Iniciar Sesión
                </button>
              </>
            )}
          </form>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default IniciarSesion;
