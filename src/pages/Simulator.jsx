//import React from 'react';
import React, { useEffect } from 'react';
import banner from '../assets/img/banner.jpg';
import tcredito from '../assets/img/tcredito.gif';
import carro from '../assets/img/carro-nuevo.gif';
import vivienda from '../assets/img/bungalow-sobre-el-agua.gif';
import birrete from '../assets/img/birrete.gif';
import empresa from '../assets/img/empresa.gif';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

        
export default function Simulator() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

const [search, setSearch] = React.useState("");
const [error, setError] = React.useState("");
const [activeFilter, setActiveFilter] = React.useState(null);

const [simProduct, setSimProduct] = React.useState("");
const [simAmount, setSimAmount] = React.useState("");
const [simMonths, setSimMonths] = React.useState("");
const [simFee, setSimFee] = React.useState(0);

const products = [
  { name: "Crédito Libre Inversión", min: 1000000, max: 30000000, rate: 0.125 },
  { name: "Crédito Vehículo", min: 3000000, max: 50000000, rate: 0.098 },
  { name: "Crédito Vivienda", min: 10000000, max: 50000000, rate: 0.072 },
  { name: "Crédito Educativo", min: 1000000, max: 20000000, rate: 0.060 },
  { name: "Crédito Empresarial", min: 5000000, max: 80000000, rate: 0.110 }
];

const filteredProducts = products.filter(p => {
  let match = true;

  if (search.trim() !== "") {
    match = p.name.toLowerCase().includes(search.toLowerCase());
  }

  if (activeFilter === "1-20") {
    match = match && p.max <= 20000000;
  } else if (activeFilter === "1-50") {
    match = match && p.min >= 1000000 && p.max <= 50000000;
  } else if (activeFilter === "50+") {
    match = match && p.max >= 50000000;
  }

  return match;
});

React.useEffect(() => {
  if (search.trim() !== "" && filteredProducts.length === 0) {
    setError("❌ No se encontraron productos con ese nombre.");
   
    Swal.fire({
      icon: "error",
      title: "No encontrado",
      text: "No hay productos que coincidan con la búsqueda.",
      confirmButtonText: "Entendido",
    });

  } else {
    setError("");
  }
}, [search, activeFilter]);

React.useEffect(() => {
    const product = products.find(p => p.name === simProduct);
    if (!product || simAmount <= 0 || simMonths <= 0) {
      setSimFee(0);
      return;
    }

    const monthlyRate = product.rate / 12;
    const fee =
      (simAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -simMonths));
    setSimFee(Math.round(fee));
  }, [simProduct, simAmount, simMonths]);


    const resetSimulation = () => {
    setSimProduct("");
    setSimAmount("");
    setSimMonths("");
    setSimFee(0);
  };

  return (
    <>
      
            
      <section className="banner">
        <img src={banner} alt="Banner principal" />
        <div className="banner-text">
          <h2>Conoce nuestros productos y elige la opción que más te guste.</h2>
        </div>
      </section>

      
      <main className="container">
        <section className="sim-controls">
          <div className="control-row">
            <label htmlFor="search">Buscar por nombre del producto:</label>
            <input
  id="search"
  list="creditos"
  placeholder="Ejemplo: Crédito Vehículo"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
    
/>

{error && <p className="error">{error}</p>}

          </div>

          <div className="control-row">
            <label>Filtrar por monto:</label>
            <div className="filters">
            <button className="filter" onClick={() => setActiveFilter("1-20")}>
    1 millón a 20 millones
  </button>

  <button className="filter" onClick={() => setActiveFilter("1-50")}>
    de 1 millón a 50 millones
  </button>

  <button className="filter" onClick={() => setActiveFilter("50+")}>
    50 millones o más
  </button>

  <button className="filter" onClick={() => { setActiveFilter(null); setSearch(""); }}>
    Quitar filtros
  </button>
                       
            </div>
          </div>
        </section>

        
        <section className="cards-grid">
  
  <article 
    className="card"
    style={{ display: filteredProducts.some(p => p.name === "Crédito Libre Inversión") ? "block" : "none" }}
  >
    <img src={tcredito} alt="icono" className="icon-gif" />
    <div className="card-body">
      <h3>Crédito Libre Inversión</h3>
      <p className="rate">Tasa: <strong>12.5% anual</strong></p>
      <p className="amount">Monto: $1.000.000 – $30.000.000</p>
      <p className="term">Plazo máximo: 60 meses</p>
      <div className="card-actions">
        <Link className="btn" to="/solicitar">Solicitar</Link>
      </div>
    </div>
  </article>

  <article 
    className="card"
    style={{ display: filteredProducts.some(p => p.name === "Crédito Vehículo") ? "block" : "none" }}
  >
    <img src={carro} alt="icono" className="icon-gif" />
    <div className="card-body">
      <h3>Crédito Vehículo</h3>
      <p className="rate">Tasa: <strong>9.8% anual</strong></p>
      <p className="amount">Monto: $3.000.000 – $50.000.000</p>
      <p className="term">Plazo máximo: 60 meses</p>
      <div className="card-actions">
        <Link className="btn" to="/solicitar">Solicitar</Link>
      </div>
    </div>
  </article>

  <article 
    className="card"
    style={{ display: filteredProducts.some(p => p.name === "Crédito Vivienda") ? "block" : "none" }}
  >
    <img src={vivienda} alt="icono" className="icon-gif" />
    <div className="card-body">
      <h3>Crédito Vivienda</h3>
      <p className="rate">Tasa: <strong>7.2% anual</strong></p>
      <p className="amount">Monto: $10.000.000 – $50.000.000</p>
      <p className="term">Plazo máximo: 240 meses</p>
      <div className="card-actions">
        <Link className="btn" to="/solicitar">Solicitar</Link>
      </div>
    </div>
  </article>

  <article 
    className="card"
    style={{ display: filteredProducts.some(p => p.name === "Crédito Educativo") ? "block" : "none" }}
  >
    <img src={birrete} alt="icono" className="icon-gif" />
    <div className="card-body">
      <h3>Crédito Educativo</h3>
      <p className="rate">Tasa: <strong>6.0% anual</strong></p>
      <p className="amount">Monto: $1.000.000 – $20.000.000</p>
      <p className="term">Plazo máximo: 48 meses</p>
      <div className="card-actions">
        <Link className="btn" to="/solicitar">Solicitar</Link>
      </div>
    </div>
  </article>

  <article 
    className="card"
    style={{ display: filteredProducts.some(p => p.name === "Crédito Empresarial") ? "block" : "none" }}
  >
    <img src={empresa} alt="icono" className="icon-gif" />
    <div className="card-body">
      <h3>Crédito Empresarial</h3>
      <p className="rate">Tasa: <strong>11.0% anual</strong></p>
      <p className="amount">Monto: $5.000.000 – $80.000.000</p>
      <p className="term">Plazo máximo: 72 meses</p>
      <div className="card-actions">
        <Link className="btn" to="/solicitar">Solicitar</Link>
      </div>
    </div>
  </article>
</section>







<section className="sim-controls">
<div className="control-row">
  <label className="control-row">Simulación de crédito:</label>
   <h4>Producto:</h4>
    <select
      value={simProduct}
      onChange={(e) => setSimProduct(e.target.value)}
      style={{ width: "250px" }}
    >
      <option value="">Selecciona un producto</option>
      {products.map((p, i) => (
        <option key={i} value={p.name}>
          {p.name}
        </option>
      ))}
    </select>
  </div>

  <div className="sim-input">
    <h4>Monto solicitado:</h4>
    <input
      type="number"
      placeholder="Ej: 5000000"
      value={simAmount}
      onChange={(e) => setSimAmount(Number(e.target.value))}
    />
  </div>

  <div className="sim-input">
    <h4>Meses:</h4>
    <input
      type="number"
      min="1"
      max="240"
      value={simMonths}
      onChange={(e) => setSimMonths(Number(e.target.value))}
    />
  </div>

  <div className="sim-result">
    <h4>Cuota mensual:</h4>
    <p className="fee">
      {simFee > 0 ? `$ ${simFee.toLocaleString()}` : "$"}
    </p>
  </div>

  <button 
  onClick={resetSimulation} 
  className="btn"
  
>
  Limpiar simulador
</button>



  </section>


      </main>
                
      
    </>
   
      );
}
