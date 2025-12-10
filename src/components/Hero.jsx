import React from 'react';
import video from '../assets/img/video.mp4';

export const Hero = ({title, subtitle}) => {
    return ( 
      <> 
       <div className="container"> 
        <section className="intro"> 
         <h2>!!! BIENVENIDOS A SU MEJOR OPCIÓN EN CRÉDITOS ¡¡¡</h2>       
        </section> 
  </div>,
        <section className="banner-contain">
  <video autoPlay muted loop playsInline className="banner-video">
    <source src={video} type="video/mp4" />
  </video>

  <div className="banner-overlay">
    <h2>¿Sin dinero? Tenemos el crédito perfecto para ti.</h2>
  </div>
</section>
</> 
    )
}

  