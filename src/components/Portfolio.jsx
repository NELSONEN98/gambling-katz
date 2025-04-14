import React from "react";
import { useState } from "react";
import "../assets/scss/ui/_Portfolio.scss";
import MenuModalSelection from "./MenuModalSelection";
import { ReactTag, HtmlTag, CssTag, SassTag, JsTag } from "./Tags";

export default function Portfolio({ setActiveView }) {
  const [optionSelected, setOptionSelected] = useState("all");
  const [isMenuSelected, setIsMenuSelected] = useState(false);

  function closeModal() {
    setIsMenuSelected(false);
  }
  return (
    <div className="portfolio">
      <div className="portfolio__grid">
        <div className="portfolio__container__text">
          <h2 className="portfolio__title">My projects</h2>

          <p className="portfolio__text">
            Here are some of my projects that showcase my skills and creativity
            :)
          </p>
          <ul className="portfolio__list__container">
            <li
              className={`portfolio__list ${
                optionSelected === "all" ? "portfolio__list__active" : ""
              }`}
              onClick={() => setOptionSelected("all")}
            >
              Show all
            </li>
            <li
              className={`portfolio__list ${
                optionSelected === "react" ? "portfolio__list__active" : ""
              }`}
              onClick={() => setOptionSelected("react")}
            >
              React
            </li>
            <li
              className={`portfolio__list ${
                optionSelected === "javascript" ? "portfolio__list__active" : ""
              }`}
              onClick={() => setOptionSelected("javascript")}
            >
              JavaScript
            </li>
            <li
              className={`portfolio__list ${
                optionSelected === "sass" ? "portfolio__list__active" : ""
              }`}
              onClick={() => setOptionSelected("sass")}
            >
              SASS / CSS + HTML
            </li>
            {/*<li
              className={`portfolio__list ${
                optionSelected === "illustrations"
                  ? "portfolio__list__active"
                  : ""
              }`}
              onClick={() => setOptionSelected("illustrations")}
            >
              Some of my illustrations
            </li>*/}
          </ul>
          <div className="portfolio__social__links">
            <a href="https://github.com/NELSONEN98" target="_blank">
              <img
                className="portfolio__social__img"
                src="/img/github-mark.png"
                alt="githube"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/nelson-enrique-bedoya-arango-1466071b1/"
              target="_blank"
            >
              <img
                className="portfolio__social__img"
                src="/img/linked.png"
                alt="linkedin"
              />
            </a>
            <img
              className="portfolio__social__img portfolio__social__img--rocket"
              src="/img/rocketpiskel.png"
              alt="rocket"
              onClick={() => setIsMenuSelected(true)}
            />
          </div>
        </div>
        {isMenuSelected && (
          <>
            <MenuModalSelection
              onClose={closeModal}
              setActiveView={setActiveView}
            />
          </>
        )}
        <div className="portfolio__menu">
          {optionSelected === "all" && (
            <>
              <ReactPortfolio />
              <JsPortfolio />
              <HtmlPorfolo />
            </>
          )}
          {optionSelected === "react" && (
            <>
              <ReactPortfolio />
            </>
          )}
          {optionSelected === "sass" && (
            <>
              <HtmlPorfolo />
            </>
          )}
          {optionSelected === "javascript" && (
            <>
              <JsPortfolio />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ReactPortfolio() {
  return (
    <>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/movie-meter.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://reliable-pavlova-06cf00.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Movie Meter
            </a>
            <p className="portfolio__content__text">
              Movie Meter is an interactive web application that allows users to
              search for, rate, and save their favorite movies. It includes a
              login system and uses local storage to preserve user information
              and their personal movie library.
            </p>
            <div className="tag__container">
              <ReactTag />
              <JsTag />
              <CssTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/resume.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://nelson-arango-portfolio.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Interactive Resume
            </a>
            <p className="portfolio__content__text">
              This project was designed to showcase my resume in a dynamic and
              interactive way. It features animations built with React, Framer
              Motion, CSS/SASS Animation, and pixel art. All designs and images
              were created by me from scratch.
            </p>
            <div className="tag__container">
              <ReactTag />
              <JsTag />
              <SassTag />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function JsPortfolio() {
  return (
    <>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img className="portfolio__img" src="/img/animal.PNG" alt="ejemplo" />
          <div className="portfolio__content__flex">
            <a
              href="projects/AnimalGambling/index.html"
              className="portfolio__content__title"
              target="_blank"
            >
              Animal Gambling
            </a>
            <p className="portfolio__content__text">
              A two-player desktop game built with JavaScript, HTML, and CSS.
              Choose your character and start playing — the first player to
              reach 50 points wins!.
            </p>
            <div className="tag__container">
              <JsTag />
              <CssTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/bankist.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="/projects/Dombankist/index.html"
              className="portfolio__content__title"
              target="_blank"
            >
              Bankist App
            </a>
            <p className="portfolio__content__text">
              A modern banking interface developed using JavaScript and CSS
              animations. This project embraces a minimalist design approach,
              focusing on smooth interactions and a clean user experience.
            </p>
            <div className="tag__container">
              <JsTag />
              <CssTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img className="portfolio__img" src="/img/number.PNG" alt="ejemplo" />
          <div className="portfolio__content__flex">
            <a
              href="/projects/score/index.html"
              className="portfolio__content__title"
              target="_blank"
            >
              Guess my number!
            </a>
            <p className="portfolio__content__text">
              A small desktop game built with JavaScript, HTML, and CSS, where
              the goal is to guess a random number before you run out of
              attempts.
            </p>
            <div className="tag__container">
              <JsTag />
              <CssTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HtmlPorfolo() {
  return (
    <>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/arquitec.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="/projects/arquitectura/index.html"
              target="_blank"
              className="portfolio__content__title"
            >
              Arquitectura Bosque
            </a>
            <p className="portfolio__content__text">
              A landing page designed to showcase the company Arquitectura
              Bosque in an attractive and dynamic way, highlighting its Basic,
              Premier, and Elite models.
            </p>
            <div className="tag__container">
              <CssTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/guitar.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="/projects/guitarLa/index.html"
              target="_blank"
              className="portfolio__content__title"
            >
              Guitar LA
            </a>
            <p className="portfolio__content__text">
              A website where you can buy some of the best guitars from Los
              Angeles. It features subtle CSS animations and a consistent,
              well-thought-out color scheme.
            </p>
            <div className="tag__container">
              <CssTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/nucleus.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="/projects/nucleus/index.html"
              target="_blank"
              className="portfolio__content__title"
            >
              Nucleus wallet
            </a>
            <p className="portfolio__content__text">
              A landing page designed to showcase the Nucleus Wallet app in a
              clear and engaging way, highlighting its key features and value
              proposition.
            </p>
            <div className="tag__container">
              <CssTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/cocina.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://willowy-otter-a52d8b.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Escuela Cocina
            </a>
            <p className="portfolio__content__text">
              A landing page created to promote the Bahn BnB platform, allowing
              users to explore exciting travel destinations and easily select
              their desired travel dates.
            </p>
            <div className="tag__container">
              <SassTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/bahn.png"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://jolly-cendol-94138f.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Bahn BnB
            </a>
            <p className="portfolio__content__text">
              A landing page created to promote the Bahn BnB platform, allowing
              users to explore exciting travel destinations and easily select
              their desired travel dates.
            </p>
            <div className="tag__container">
              <SassTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/state.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://dulcet-trifle-f3b951.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Real state
            </a>
            <p className="portfolio__content__text">
              A landing page designed to promote Real State, a company that
              sells houses and apartments. This site is built not only to
              showcase available properties, but also to feature customer
              reviews and a blog section.
            </p>
            <div className="tag__container">
              <SassTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/meeti.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://golden-bublanina-115075.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Meeti
            </a>
            <p className="portfolio__content__text">
              A practice project based on the Meeting website, created to
              improve my skills using CSS Grid and Flexbox.
            </p>
            <div className="tag__container">
              <SassTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/podcast.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="
https://keen-salmiakki-e27f4c.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Podcast FM
            </a>
            <p className="portfolio__content__text">
              A website created to promote Podcast FM, a platform where users
              can upload and share their podcasts with the world.
            </p>
            <div className="tag__container">
              <SassTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/cafeteria.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://meek-duckanoo-6ae791.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              La Cafetería
            </a>
            <p className="portfolio__content__text">
              A website created to promote Podcast FM, a platform where users
              can upload and share their podcasts with the world.
            </p>
            <div className="tag__container">
              <SassTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/tech.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="/projects/tech/index.html"
              target="_blank"
              className="portfolio__content__title"
            >
              Tech PRO
            </a>
            <p className="portfolio__content__text">
              A website created to showcase the new Tech PRO headphones,
              highlighting their main features and specifications.
            </p>
            <div className="tag__container">
              <CssTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__content">
        <div className="portfolio__content__grid">
          <img
            className="portfolio__img"
            src="/img/portfolio/delivery.PNG"
            alt="ejemplo"
          />
          <div className="portfolio__content__flex">
            <a
              href="https://beautiful-pegasus-0d193a.netlify.app/"
              target="_blank"
              className="portfolio__content__title"
            >
              Delivery App
            </a>
            <p className="portfolio__content__text">
              Delivery App is a promotional website for a food delivery
              application, designed to showcase its features and encourage user
              downloads.
            </p>
            <div className="tag__container">
              <SassTag />
              <HtmlTag />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
