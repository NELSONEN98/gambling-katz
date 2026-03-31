import "../assets/scss/ui/_aboutMe.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselImg from "./CarouselImg";
import useScrollToNext from "../hooks/useScrollToNext";
import UiShowcase from "./UiShowcase";

export default function AboutMe() {
  const [sectionInfo, setSectionInfo] = useState("section__about");

  useScrollToNext(() => {
    if (sectionInfo === "section__about") {
      setSectionInfo("section__skills");
    }
  });

  function handleSections() {
    setSectionInfo("section__skills");
  }

  return (
    <div className="about__me">
      <div className="about__me__box">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}

        <>
          {sectionInfo === "section__about" && (
            <>
              <AboutMeInfo handleSections={handleSections} />
              <div className="about__me__bg">
                <img className="about__me__bg__img" src="img/moonbg.png" alt="bg" />
              </div>
            </>
          )}
          {sectionInfo === "section__skills" && <Skills />}
        </>
      </div>
    </div>
  );
}

function AboutMeInfo({ handleSections }) {
  return (
    <div className="about__me__container">
      <div className="about__me__text">
        <div className="about__me__title-wrapper">
          {[
            { size: 1.2, top: "-0.5rem", left: "-1.5rem", delay: 1.5 },
            { size: 0.7, top: "-0.8rem", left: "30%", delay: 2.0 },
            { size: 1.0, top: "-0.3rem", right: "-1rem", delay: 1.8 },
            { size: 0.6, top: "50%", left: "-2rem", delay: 2.3 },
            { size: 0.9, top: "50%", right: "-1.5rem", delay: 2.1 },
            { size: 0.8, bottom: "-0.5rem", left: "20%", delay: 1.7 },
            { size: 0.5, bottom: "-0.6rem", right: "25%", delay: 2.5 },
          ].map((s, i) => (
            <div
              key={i}
              className="about__me__deco-star"
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
          <h2 className="about__me__title">About Me</h2>
        </div>
        <p>
          FullStack Developer and Creative Designer with experience in JavaScript, React, NestJS, and Next.js, focused on building responsive and user-centered web interfaces using CSS and SASS. I combine strong technical skills with a solid creative background in Adobe Creative Suite to deliver visually engaging and functional digital solutions.
        </p>
        <p>Do you have an idea or project where you want to unleash all your creativity? Let's bring it to life together!</p>
      </div>
      <CatImg />
      <div className="about__me__button">
        <a className="btn__next" onClick={handleSections}>
          v
        </a>
      </div>
    </div>
  );
}

function Skills() {
  const navigate = useNavigate();
  const skillsCode = [
    { src: "img/jslogo.png", alt: "JavaScript" },
    { src: "img/react.svg", alt: "React" },
    { src: "img/next.png", alt: "next" },
    { src: "img/nest.png", alt: "nest" },
    { src: "img/sass.svg", alt: "Sass" },
    { src: "img/html5.png", alt: "HTML5" },
    { src: "img/css.svg", alt: "CSS" },
    { src: "img/wordpress.svg", alt: "wordpress" },
  ];
  const skillsDesign = [
    { src: "img/figma.svg", alt: "Figma" },
    { src: "img/photoshop.svg", alt: "Photoshop" },
    { src: "img/illustrator.svg", alt: "illustrator" },
    { src: "img/effects.png", alt: "after" },
    { src: "img/lightroom.png", alt: "light" },
    { src: "img/piskel.png", alt: "piskel" },
    { src: "img/fl.png", alt: "flstudio" },
    { src: "img/color.jpg", alt: "flstudio" },
    { src: "img/capcut.jpg", alt: "capcut" },
  ];

  const decoStars = [
    { size: 1.3, top: "-0.6rem", left: "-1.5rem", delay: 1.2 },
    { size: 0.8, top: "-0.8rem", left: "35%", delay: 1.8 },
    { size: 1.1, top: "-0.4rem", right: "-1.2rem", delay: 1.5 },
    { size: 0.6, top: "45%", left: "-2rem", delay: 2.0 },
    { size: 1.0, top: "50%", right: "-1.5rem", delay: 1.7 },
    { size: 0.7, bottom: "-0.5rem", left: "25%", delay: 2.2 },
    { size: 0.5, bottom: "-0.7rem", right: "20%", delay: 1.9 },
  ];

  return (
    <div className="skills no-scroll-nav">
      <div className="skills__title-wrapper">
        {decoStars.map((s, i) => (
          <div
            key={i}
            className="about__me__deco-star"
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
        <h2 className="skills__title">Skills</h2>
      </div>

      <div className="skills__container">
        <div className="skills__design__title__grid">
          <h1 className="skills__header">Coding</h1>
          <p className="skills__design__title__text">
            I've built multiple front-end and full-stack projects using modern technologies such as HTML, CSS, SASS, JavaScript, React, Next.js, and NestJS. I have a strong understanding of how to create responsive, accessible, and high-performance web interfaces, as well as how to integrate frontend and backend systems efficiently. I also use AI-powered tools to optimize development workflows and improve code consistency.
          </p>
          <CarouselImg images={skillsCode} />
        </div>

        <div className="skills__design__title__grid">
          <h1 className="skills__header">Design</h1>
          <p className="skills__design__title__text">
            I enjoy translating ideas into elegant and functional UI designs. With strong skills in Adobe Creative Suite and a solid understanding of UI/UX principles, I combine visual creativity with technical knowledge to deliver engaging digital experiences. I approach every project with a design-first and user-centered mindset, focusing on usability, aesthetics, and continuous improvement.
          </p>
          <CarouselImg images={skillsDesign} />
        </div>
      </div>

      <div className="skills__ux-section">
        <h1 className="skills__header">UX / UI</h1>
        <p className="skills__design__title__text">
          I am passionate about designing and building intuitive UX/UI components that enhance usability and create seamless user experiences!
        </p>
        <UiShowcase />
      </div>

      <div className="about__me__button">
        <a className="btn__next" onClick={() => navigate("/rocket")}>
          v
        </a>
      </div>
    </div>
  );
}

function CatImg() {
  return (
    <div className="about__me__img">
      <img className="about__me__pixel" src="img/bg1.webp" alt="bg1" />
    </div>
  );
}
