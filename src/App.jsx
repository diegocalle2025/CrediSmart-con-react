import { HashRouter, Routes, Route } from 'react-router-dom'

//import { useState } from 'react'
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

import './App.css'
import { Home } from './pages/Home'
import { Apply } from './pages/Apply'
import Simulator from './pages/Simulator';
//import { Simulator}  from './pages/Simulator'
import { Solicitudes } from './pages/Solicitudes';



 function App() {
  
  return (
    <HashRouter>
    <Navbar/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/simulador' element={<Simulator/>}/>
      <Route path='/solicitar' element={<Apply/>}/>
      <Route path='/solicitudes' element={<Solicitudes/>}/>
       </Routes>

       <div className="container-columnas">
        <div className="col">
          <h3>Personas</h3>
          <p>Dónde y cómo pagar</p>
          <p>Solicitud de crédito</p>
          <p>Simula tu crédito</p>
          <p>Dónde comprar</p>
        </div>

        <div className="col">
          <h3>Sobre Nosotros</h3>
          <p>Trabaja con nosotros</p>
          <p>Crecimiento y desarrollo</p>
          <p>Blog</p>
          <p>Preguntas frecuentes</p>
        </div>

        <div className="col">
          <h3>Contacto</h3>
          <p>Nit: 811007713</p>
          <p>Cl. 26 Sur # 48 – 91, Ayurá Center II,</p>
          <p>Envigado, Antioquia, Colombia.</p>
          <p>Descarga la App SGB</p>
        </div>
      </div>

       <Footer/>
     
    </HashRouter>   


  )
}

export default App;
 
