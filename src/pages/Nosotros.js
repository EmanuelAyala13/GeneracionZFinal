import React from 'react';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Nosotros.css';

const Nosotros = () => {
  const handleEmailButtonClick = () => {
    toast.success("¡Correo enviado con éxito!");
    window.location.href = "mailto:24siemprels@gmail.com?subject=Consulta";
  };

  return (
    <div>
      <Navbar />
      <div className="Container">
        <h2 className="Title">¿Quiénes Somos?</h2>
        <div className="Paragraph"> 
          <p>
            En <strong>Generación Z</strong>, nos dedicamos a brindar soluciones innovadoras para mejorar tu experiencia digital. 
            Somos más que una tienda; somos tu compañero en el viaje de sumergirte por completo en tus juegos favoritos, el mundo del streaming y la creación de contenido audiovisual excepcional.
          </p>
          <p>
            Nuestra misión es ofrecerte no solo productos, sino también asesoramiento experto y soluciones integrales que transformen la forma en que juegas, compartes y disfrutas del mundo digital.
          </p>
        </div>
        <button className="EmailButton" onClick={handleEmailButtonClick}>Contactar por Correo</button>
      </div>
    </div>
  );
};

export default Nosotros;
