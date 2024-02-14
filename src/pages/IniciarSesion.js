import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './IniciarSesion.css';

function IniciarSesion() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const usersFromLocalStorage = JSON.parse(localStorage.getItem('registeredUsers'));
    if (usersFromLocalStorage) {
      setRegisteredUsers(usersFromLocalStorage);
    }

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const { name, lastName, email } = loggedInUser;
      setName(name);
      setLastName(lastName);
      setEmail(email);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if (user) {
      toast.success('Inicio de sesión exitoso');
      setIsLoggedIn(true);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
      toast.error('Correo o contraseña incorrectos.');
    }
  };

  const handleRegister = () => {
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
      toast.error('Ya existe un usuario con ese correo. Por favor, utiliza otro correo.');
    } else {
      const newUser = { name, lastName, email, password };
      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      toast.success('Registro exitoso. Iniciando sesión automáticamente.');
      setIsLoggedIn(true);
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedInUser');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <ToastContainer />
      {isLoggedIn ? (
        <div className="user-info-container">
          <h2>Bienvenido, {name} {lastName}</h2>
          <p>Correo: {email}</p>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div className="container"> 
          {isLogin ? (
            <div>
              <h2>Iniciar Sesión</h2>
              <form className="form-container"> 
                <input type="email" className="input-field" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="input-field" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="button" onClick={handleLogin}>Iniciar Sesión</button>
              </form>
              <div className="signup-link">
                <p>¿No tienes una cuenta? <button className="link" onClick={toggleForm}>Regístrate aquí</button></p>
              </div>
            </div>
          ) : (
            <div>
              <h2>Registrarse</h2>
              <form className="form-container"> 
                <input type="text" className="input-field" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="input-field" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="email" className="input-field" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="input-field" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="button" onClick={handleRegister}>Registrarse</button>
              </form>
              <p>¿Ya tienes una cuenta? <button className="link" onClick={toggleForm}>Iniciar sesión aquí</button></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IniciarSesion;
