
import React from 'react';
import "../CSS/SquareComponent.css";
import "../CSS/styles.css";

export const SquareComponent = ({ value, onClick }) => {
  const imageSrc = value === 'X' ? 'https://d1uy1wopdv0whp.cloudfront.net/sticky_images/britannia/cow.png' : value === 'O' ? 'https://d1uy1wopdv0whp.cloudfront.net/sticky_images/britannia/milk.png' : null;
  return (
    <button className="square" onClick={onClick} disabled={value !== null}>
      {imageSrc && <img src={imageSrc} alt={value} className="square_img" />}
    </button>
  );
};