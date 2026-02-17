import "../assets/scss/ui/_header.scss";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useScrollToNext from "../hooks/useScrollToNext";

function Header({ onJourneyComplete }) {
  const [startedJourney, setStartedJourney] = useState(false);

  useScrollToNext(() => {
    if (!startedJourney) {
      setStartedJourney(true);
    }
  });

  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  useEffect(() => {
    if (startedJourney) {
      const timer = setTimeout(() => {
        onJourneyComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [startedJourney, onJourneyComplete]);

  // Genera 180 estrellas con valores aleatorios una sola vez
  const stars = useMemo(() => {
    return Array.from({ length: 120 }).map(() => ({
      x: Math.random(),
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 20,
      offset: Math.random() * -700,
    }));
  }, []);

  return (
    <div className="header">
      {/* Se muestran las estrellas con diferente animación según el estado */}
      {[0, 1].map((group) => (
        <div className="stars-container" key={group}>
          {stars.map((star, index) => (
            <motion.div
              key={`star-${group}-${index}-${startedJourney}`}
              className={`star ${index % 2 === 0 ? "star1" : "star2"}`}
              initial={{
                opacity: 0,
                transform: `translateY(${windowSize.current.height + star.offset
                  }px) translateX(${star.x * windowSize.current.width}px)`,
              }}
              animate={{
                opacity: 1,
                transform: `translateY(-700px) translateX(${star.x * windowSize.current.width
                  }px)`,
              }}
              transition={{
                duration: startedJourney ? 2 : star.duration,
                repeat: Infinity,
                delay: startedJourney
                  ? star.delay
                  : star.delay + group * (star.duration / 2),
              }}
            />
          ))}
        </div>
      ))}

      {/* Sección de inicio */}
      <div
        className={!startedJourney ? "header__inicio" : "header__inicio moveUp"}
      >
        <div className="header__name">Nelson</div>
        <div className="header__name">Arango</div>
        <p className="header__resume">Multidisciplinary Designer | Web & Front-End Developer
        </p>
        <a className="header__clickme" onClick={setStartedJourney}>
          v
        </a>
      </div>

      {/* Imagen del gato */}
      <div className={!startedJourney ? "kitten" : "kitten moveUp"}>
        <img className="cat__img" src="/img/cat3.webp" alt="cat" />
      </div>
    </div>
  );
}

export default Header;
