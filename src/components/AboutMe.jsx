import "../assets/scss/ui/_aboutMe.scss";
import React, { useState } from "react";
import CarouselImg from "./CarouselImg";

export default function AboutMe({ onSectionRocket }) {
  const [sectionInfo, setSectionInfo] = useState("section__about");

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
            <AboutMeInfo handleSections={handleSections} />
          )}
          {sectionInfo === "section__skills" && (
            <Skills onSectionRocket={onSectionRocket} />
          )}

          <div className="about__me__bg">
            <img className="about__me__bg__img" src="img/moonbg.png" alt="bg" />
          </div>
        </>
      </div>
    </div>
  );
}

function AboutMeInfo({ handleSections }) {
  return (
    <div className="about__me__container">
      <div className="about__me__text">
        <h2 className="about__me__title">About Me</h2>
        <p>
          Hi, I'm Nelson — a creative web developer with a designer’s eye and a
          passion for crafting beautiful, user-centered digital experiences.
        </p>
        <p>
          With a strong background in web development and digital design, I
          build sleek, functional interfaces and components using the latest
          technologies.
        </p>
        <p>
          Naturally curious and detail-obsessed, I'm always learning, always
          evolving.
        </p>
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

function Skills({ onSectionRocket }) {
  const skillsCode = [
    { src: "img/jslogo.png", alt: "JavaScript" },
    { src: "img/react.svg", alt: "React" },
    { src: "img/sass.svg", alt: "Sass" },
    { src: "img/html5.png", alt: "HTML5" },
    { src: "img/css.svg", alt: "CSS" },
    { src: "img/wordpress.svg", alt: "wordpress" },
  ];
  const skillsDesign = [
    { src: "img/figma.svg", alt: "Figma" },
    { src: "img/photoshop.svg", alt: "Photoshop" },
    { src: "img/illustrator.svg", alt: "illustrator" },
    { src: "img/piskel.png", alt: "piskel" },
    { src: "img/fl.png", alt: "flstudio" },
    { src: "img/color.jpg", alt: "flstudio" },
    { src: "img/capcut.jpg", alt: "capcut" },
  ];

  return (
    <div className="skills">
      <h2 className="skills__title">Skills</h2>

      <div className="skills__container">
        <div className="skills__design__title__grid">
          <h1 className="skills__header">Coding</h1>
          <p className="skills__design__title__text">
            I’ve built several front-end projects using modern technologies like
            HTML, CSS, JavaScript, and React. I’ve developed a strong
            understanding of how to create responsive, accessible, and
            user-friendly web interfaces.
          </p>
          <CarouselImg images={skillsCode} />
        </div>

        <div className="skills__design__title__grid">
          <h1 className="skills__header">Design</h1>
          <p className="skills__design__title__text">
            I enjoy translating ideas into elegant UI designs that are both
            functional and visually compelling. With a strong sense of
            aesthetics, usability, and empathy for users, I approach every
            project with a design-first mindset that puts people at the center.
          </p>
          <CarouselImg images={skillsDesign} />
          <p className="warning">.</p>
        </div>
      </div>
      <div className="about__me__button">
        <a className="btn__next" onClick={onSectionRocket}>
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
