import React from 'react';
import './Card.css'; // Assurez-vous de créer également un fichier Card.css pour le style

const Card = ({ image, title, owner }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-info">
        <h3>{title}</h3>
        <p>{owner}</p>
      </div>
    </div>
  );
}

export default Card;
