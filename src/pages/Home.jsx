//import React from 'react';
import React, { useEffect } from 'react';
import {Hero} from '../components/Hero';
import {CreditCard} from '../components/CreditCard';
//import {creditsData} from '../data/creditsData';

import { useState } from 'react';
import { db } from "../firebase/config.js"; 
import { collection, getDocs } from "firebase/firestore";


export const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [credits, setCredits] = useState([]);

  useEffect(() => {
  const fetchCredits = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "credits"));
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCredits(data);

    } catch (error) {
      console.error("Error obteniendo créditos:", error);
    }
  };

  fetchCredits();
}, []);


    console.log('Datos de los créditos', credits);

             

    return (
       <>

      <Hero 
        title="Encuentra el Crédito Perfecto para Ti"
        subtitle="Tasas competitivas, aprobación rápida y sin trámites complicados"
      />


      <main className="container">
        <section className="credits-section">
          
          <h3>Nuestros Productos</h3>

          
          <div className="cards-grid">
            
            {credits.map((credit) => {
  
              return (
                <CreditCard 
                  key={credit.id}    // KEY ES OBLIGATORIA - Identifica cada Elemento de forma única
                  credit={credit}     // Pasamos el objeto completo como prop
                />
              );
            })}

            
          </div>
        </section>
      </main>
    </>
  );
};

 