import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../assets/scss/ui/_rocketAnimation.scss";

export default function RocketAnimation({ onSectionPortfolio }) {
  const [isRocketClicked, setIsRocketClicked] = useState(false);
  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function handleRocket() {
    setIsRocketClicked(true);
    setTimeout(() => {
      onSectionPortfolio();
    }, 1500);
  }

  useEffect(() => {
    const handleResize = () => {
      windowSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Genera 180 estrellas con valores aleatorios una sola vez
  const stars = useMemo(() => {
    return Array.from({ length: 180 }).map(() => ({
      y: Math.random() * windowSize.current.height, // Posición vertical aleatoria
      delay: Math.random() * 5, // Retraso aleatorio
      duration: Math.random() * 10 + 5, // Duración aleatoria
      offset: Math.random() * -200, // Desplazamiento inicial aleatorio
    }));
  }, []);

  return (
    <div className={`rocket__animation ${isRocketClicked ? "expanded" : ""}`}>
      <div className="stars-container">
        {stars.map((star, index) => (
          <motion.div
            key={`star-${index}`}
            className={`star ${index % 2 === 0 ? "star1" : "star2"}`}
            initial={{
              opacity: 0,
              transform: `translateX(${windowSize.current.width + 600
                }px) translateY(${star.y}px)`,
            }}
            animate={{
              opacity: 1,
              transform: `translateX(-100px) translateY(${star.y}px)`,
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>
      <div className="rocket__animation__container">
        <div
          className="rocket__animation__container__rocket"
          onClick={handleRocket}
        >
          <img
            className={`rocket__animation__img ${isRocketClicked ? "rocket__expanded" : ""
              }`}
            src="/img/rockered.png"
            alt="rocket"
          />
        </div>
        {!isRocketClicked && (
          <p className="rocket__animation__skip" onClick={onSectionPortfolio}>
            Continue ...
          </p>
        )}
      </div>
    </div>
  );
}
