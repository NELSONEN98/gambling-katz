import "../assets/scss/ui/_header.scss";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useScrollToNext from "../hooks/useScrollToNext";

function Header() {
  const [startedJourney, setStartedJourney] = useState(false);
  const navigate = useNavigate();

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
        navigate("/about");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [startedJourney, navigate]);

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
        {[
          { size: 1.4, top: "-1rem",   left: "8%",    delay: 2.0 },
          { size: 0.8, top: "0rem",    left: "30%",   delay: 2.5 },
          { size: 1.1, top: "-0.5rem", right: "12%",  delay: 1.9 },
          { size: 0.6, top: "18%",     left: "-1.5rem", delay: 2.3 },
          { size: 1.6, top: "22%",     right: "-2rem",  delay: 2.1 },
          { size: 0.7, top: "55%",     left: "-1rem", delay: 2.7 },
          { size: 1.0, top: "60%",     right: "-1.5rem", delay: 2.4 },
          { size: 0.9, bottom: "-0.5rem", left: "15%", delay: 2.2 },
          { size: 0.6, bottom: "-0.8rem", left: "50%", delay: 2.8 },
          { size: 1.2, bottom: "-0.3rem", right: "10%", delay: 2.0 },
          { size: 0.7, top: "40%",     left: "3%",    delay: 3.0 },
          { size: 0.5, top: "10%",     right: "30%",  delay: 2.6 },
        ].map((s, i) => (
          <div
            key={i}
            className="header__deco-star"
            style={{
              width: `${s.size}rem`,
              height: `${s.size}rem`,
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              animationDelay: `${s.delay}s, ${s.delay}s`,
            }}
          />
        ))}
        <div className="header__name header__name--first">Nelson</div>
        <div className="header__name header__name--second">Arango</div>
        <p className="header__resume">
          Multidisciplinary Designer | Web &amp; Front-End Developer
        </p>
        <a className="header__clickme" onClick={() => setStartedJourney(true)}>
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
