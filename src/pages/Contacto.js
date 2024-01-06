import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contacto.css';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || apellido.trim() === '' || email.trim() === '' || asunto.trim() === '') {
      toast.error('Por favor, completa todas las casillas', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('email', email);
    localStorage.setItem('asunto', asunto);

    toast.success('Formulario enviado con éxito', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    setNombre('');
    setApellido('');
    setEmail('');
    setAsunto('');
  };

  return (
    <div>
      <Navbar />
      <div className="contacto-container">
        <h2>Contacto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <label>
            Apellido:
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Asunto:
            <textarea value={asunto} onChange={(e) => setAsunto(e.target.value)} />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Contacto;
