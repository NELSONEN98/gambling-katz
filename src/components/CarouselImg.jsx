import React, { useState } from "react";
import "../assets/scss/ui/_imageCarousel.scss";

export default function CarouselImg({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length); // Avanza al siguiente índice
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length); // Retrocede al índice anterior
  };

  const visibleImages = [
    images[(activeIndex - 1 + images.length) % images.length], // Imagen anterior
    images[activeIndex], // Imagen seleccionada
    images[(activeIndex + 1) % images.length], // Imagen siguiente
  ];

  return (
    <div className="image__carousel">
      <div className="carousel__container">
        {visibleImages.map((image, index) => (
          <img
            onWheel={(e) => {
              if (e.deltaY > 0) {
                handlePrev(); // Scroll hacia abajo
              } else {
                handleNext(); // Scroll hacia arriba
              }
            }}
            key={index}
            className={`carousel__image ${
              index === 1
                ? "carousel__image--selected "
                : "carousel__image--unselected"
            }`}
            src={image.src}
            alt={image.alt}
            onClick={index !== 1 ? handleNext : undefined}
          />
        ))}
      </div>
    </div>
  );
}
