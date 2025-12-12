

import React, { use } from 'react'
import {Link, useLocation } from 'react-router-dom'

export const Navbar = () => {

    const location =
     useLocation();
     const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
     }

      const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Catálogo de Créditos';
      case '/simulador':
        return 'Simulador de Crédito';
      case '/solicitar':
        return 'Solicitar Crédito';
      default:
        return 'Sistema de Créditos';
    }
  }

  const getPageSubtitle = () => {
    switch (location.pathname) {
      case '/':
        return 'El mejor plan de créditos del mercado';
      case '/simulador':
        return 'Calcula fácilmente tu crédito';
      case '/solicitar':
        return 'Completa tu solicitud en minutos';
      default:
        return 'Visualiza y gestiona tus solicitudes de crédito';
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">

        <div className="brand">
          <Link to="/" className="logo">SGB</Link>
          <div className="brand-text">
            <h1>{getPageTitle()}</h1>
            <p className="subtitle">{getPageSubtitle()}</p>
          </div>
        </div>

        <ul className="nav">
  <li>
    <Link to="/" className={`nav ${isActive('/')}`}>
      Inicio
    </Link>
  </li>

  <li>
    <Link to="/simulador" className={`nav ${isActive('/simulador')}`}>
      Simulador
    </Link>
  </li>

  <li>
    <Link to="/solicitar" className={`nav ${isActive('/solicitar')}`}>
      Solicitar Crédito
    </Link>
  </li>
  <li>
  <Link to="/solicitudes" className={`nav ${isActive('/solicitudes')}`}>
    Solicitudes
  </Link>
</li>

</ul>



      </div>
    </header>
  )
}
