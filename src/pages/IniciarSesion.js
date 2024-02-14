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
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      toast.success('Inicio de sesión exitoso', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      setIsLoggedIn(true);
      navigate('/');
    } else {
      toast.error('Correo o contraseña incorrectos', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const handleRegister = () => {
    if (name.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '') {
      toast.error('Por favor, completa todas las casillas', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else {
      localStorage.setItem('name', name);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('email', email); // Guardar el correo electrónico
      localStorage.setItem('password', password); // Guardar la contraseña

      toast.success('Registro exitoso', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      localStorage.setItem('isAuthenticated', 'true');
      setIsLoggedIn(true);
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    setIsLoggedIn(false);
    setConfirmLogout(false);
  };

  const confirmLogoutAction = () => {
    handleLogout();
    setConfirmLogout(false);
  };

  return (
    <div className="iniciar-sesion-container">
      <Navbar />
      {isLoggedIn ? (
        <div className="user-info">
          <p>Nombre: {localStorage.getItem('name')}</p>
          <p>Correo: {localStorage.getItem('email')}</p>
          <button className="logout-button" onClick={() => setConfirmLogout(true)}>Cerrar Sesión</button>
        </div>
      ) : (
        <div className="login-form">
          <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          <form>
            {isLogin ? (
              <>
                <label>Correo Electrónico:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="login-button" onClick={handleLogin}>Iniciar Sesión</button>
                <button type="button" className="register-button" onClick={() => setIsLogin(false)}>Registrarse</button>
              </>
            ) : (
              <>
                <label>Nombre:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <label>Apellido:</label>
                <input type="text" onChange={(e) => setLastName(e.target.value)} />
                <label>Correo Electrónico:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <label>Contraseña:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="register-button" onClick={handleRegister}>Registrarse</button>
                <button type="button" className="login-button" onClick={() => setIsLogin(true)}>Cancelar</button>
              </>
            )}
          </form>
        </div>
      )}
      {confirmLogout && (
        <div className="logout-confirmation show">
          <p>¿Estás seguro de cerrar sesión?</p>
          <button className="confirm-logout" onClick={confirmLogoutAction}>Sí</button>
          <button className="cancel-logout" onClick={() => setConfirmLogout(false)}>No</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default IniciarSesion;
