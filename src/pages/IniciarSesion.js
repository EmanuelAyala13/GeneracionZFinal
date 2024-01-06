import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './IniciarSesion.css';

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

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

          toast.success('Registro exitoso', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });

          localStorage.setItem('isAuthenticated', 'true');
          navigate('/');
        }
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="iniciar-sesion-container">
      <Navbar />
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
              Iniciar Sesión
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
          </>
        )}
        <button type="button" onClick={toggleForm} className="toggle-button">
          {isLogin ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </button>
      </form>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default IniciarSesion;
