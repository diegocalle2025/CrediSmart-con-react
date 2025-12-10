import React from "react";
import { Link } from "react-router-dom";



export const CreditCard = ({ credit }) => {
  const {
    name,
    description,
    minAmount,
    maxAmount,
    interestRate,
    maxTerm,    
    icon
  } = credit;

  return (
    
    
    <div className="card">      
      <div className="card-media">
        <img src={credit.image} alt={credit.name} className="icon" />
      </div>
     
      <div className="card-body">
        <h3>{name}</h3>
        <p className="rate">Tasa: {interestRate}% mensual</p>
        <p className="amount">Monto: {minAmount} - {maxAmount}</p>
        <p className="term">Plazo máximo: {maxTerm} meses</p>
        <p>{description}</p>

        <div className="card-actions">
          <Link className="btn" to="/solicitar">
            Solicitar Ahora
          </Link>
        </div>
      </div>

    </div>
  );
};
