import "../assets/scss/ui/_menuModalSection.scss";
import { useState, useEffect } from "react";

export default function MenuModalSelection({ onClose, setActiveView }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="background">
      <div className={`menu ${isClosing ? "menu--close" : "menu--open"}`}>
        <button className="menu__close" onClick={handleClose}>
          &times;
        </button>
        <div className="menu__title">
          <h1 className="menu__title__text">
            Do you want to go back to a section?
          </h1>
        </div>

        <div className="menu__grid">
          <div className="menu__options">
            <ul className="menu__list">
              <li
                className="menu__option"
                onClick={() => setActiveView("header")}
              >
                ⭐ beginning of the journey
              </li>
              <li
                className="menu__option"
                onClick={() => setActiveView("aboutMe")}
              >
                ⭐ About me
              </li>
            </ul>
            <div className="menu__img__container">
              <img className="menu__img" src="img/rocketpiskel.png" alt="bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
