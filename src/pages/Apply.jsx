//import React from "react";
import React, { useEffect } from 'react';
import datos from '../assets/img/datos.gif';
import tarjeta from '../assets/img/tarjeta.gif';
import laborales from '../assets/img/laborales.gif';
import Swal from "sweetalert2";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";



export const Apply = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = React.useState({
  nombre: "",
  cedula: "",
  email: "",
  telefono: "",
  tipoCredito: "Crédito Libre Inversión",
  monto: "",
  plazo: "12",
  destino: "",
  empresa: "",
  cargo: "",
  ingresos: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleReset = (e) => {
  if (e && e.preventDefault) e.preventDefault();
  setFormData({
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    tipoCredito: "Crédito Libre Inversión",
    monto: "",
    plazo: "12",
    destino: "",
    empresa: "",
    cargo: "",
    ingresos: "",
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validar campos vacíos
  for (let key in formData) {
    if (String(formData[key]).trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos antes de enviar.",
      });
      return;
    }
  }

  try {
    // GUARDAR EN FIRESTORE
    await addDoc(collection(db, "solicitudes"), {
      ...formData,
      fecha: new Date().toISOString()
    });

    Swal.fire({
      icon: "success",
      title: "Solicitud enviada",
      text: "Tu solicitud fue enviada correctamente.",
    });

    // Reset
    setFormData({
      nombre: "",
      cedula: "",
      email: "",
      telefono: "",
      tipoCredito: "Crédito Libre Inversión",
      monto: "",
      plazo: "12",
      destino: "",
      empresa: "",
      cargo: "",
      ingresos: "",
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema guardando la solicitud.",
    });
    console.error(error);
  }
};


  return (
    <div className="apply-page">
      
      <main className="container">
        <form className="form-card" onSubmit={handleSubmit}>

          
          <div className="section-title">
            <img src={datos} alt="datos" className="card-image" />
          </div>

          <h2>Datos personales</h2>

          <div className="grid">
            <label>
              Nombre completo
              <input type="text" placeholder="Juan Pérez"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
              />

            </label>

            <label>
              Cédula
              <input type="number" placeholder="12345678"
               name="cedula"
               value={formData.cedula}
               onChange={handleChange}
             />
            </label>

            <label>
              Email
              <input type="email" placeholder="juan@mail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Teléfono
              <input type="tel" placeholder="+57 300 0000000"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </label>
          </div>

          
          <div className="section-title">
            <img src={tarjeta} alt="tarjeta" className="card-image" />
          </div>

          <h2>Datos del crédito</h2>

          <div className="grid">

            <label>
              Tipo de crédito
              <select name="tipoCredito"
                value={formData.tipoCredito}
                onChange={handleChange}>
                <option>Crédito Libre Inversión</option>
                <option>Crédito Vehículo</option>
                <option>Crédito Vivienda</option>
                <option>Crédito Educativo</option>
                <option>Crédito Empresarial</option>
              </select>
            </label>

            <label>
              Monto solicitado
              <input type="number" placeholder="1000000"
               name="monto"
               value={formData.monto}
               onChange={handleChange}
              />
            </label>

            <label>
  Plazo en meses
  <select
    name="plazo"
    value={formData.plazo}
    onChange={handleChange}
  >
    <option value="12">12</option>
    <option value="24">24</option>
    <option value="36">36</option>
    <option value="48">48</option>
    <option value="60">60</option>
  </select>
</label>


            <label className="full">
              Destino del crédito
              <textarea placeholder="Describa el destino del crédito"
                  name="destino"
                  value={formData.destino}
                  onChange={handleChange}></textarea>
            </label>
          </div>

          
          <div className="section-title">
            <img src={laborales} alt="laborales" className="card-image" />
          </div>

          <h2>Datos laborales</h2>

          <div className="grid">
            <label>
              Empresa donde trabaja
              <input type="text" placeholder="Empresa S.A."
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}               
            />
            </label>

            <label>
              Cargo
              <input type="text" placeholder="Analista"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
              />
            </label>

            <label>
              Ingresos mensuales
              <input type="number" placeholder="1500000"
                  name="ingresos"
                  value={formData.ingresos}
                  onChange={handleChange}
              />
            </label>
          </div>
                              
          <div className="form-actions">
            <button className="btn" type="submit">Enviar Solicitud</   button>
            <button className="btn" type="reset" onClick={handleReset}>
          Limpiar Formulario
</button>
          </div>

        </form>
      </main>

         </div>
  );
};
