import { useState } from "react";
import "../assets/scss/ui/_uiShowcase.scss";

export default function UiShowcase() {
  const [switches, setSwitches] = useState([true, false, true]);
  const [checks, setChecks] = useState([true, false, true, false]);
  const [radio, setRadio] = useState(0);
  const [slider, setSlider] = useState(65);
  const [text, setText] = useState("");

  const toggleSwitch = (i) =>
    setSwitches((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const toggleCheck = (i) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const checkLabels = ["Responsive", "Accessible", "Animated", "Dark mode"];

  return (
    <div className="ui-showcase">
      <div className="ui-showcase__scroll">
        {/* Orbiting circles */}
        <div className="ui-showcase__card ui-showcase__card--orbits">
          <span className="ui-showcase__label">Motion</span>
          <div className="orbits">
            <div className="orbits__center" />
            <div className="orbits__ring orbits__ring--1">
              <div className="orbits__dot orbits__dot--yellow" />
            </div>
            <div className="orbits__ring orbits__ring--2">
              <div className="orbits__dot orbits__dot--purple" />
            </div>
            <div className="orbits__ring orbits__ring--3">
              <div className="orbits__dot orbits__dot--blue" />
            </div>
            <div className="orbits__ring orbits__ring--4">
              <div className="orbits__dot orbits__dot--pink" />
            </div>
          </div>
        </div>

        {/* Switches */}
        <div className="ui-showcase__card">
          <span className="ui-showcase__label">Toggle switches</span>
          <div className="ui-showcase__row">
            {switches.map((on, i) => (
              <button
                key={i}
                className={`ui-switch ${on ? "ui-switch--on" : ""}`}
                onClick={() => toggleSwitch(i)}
                aria-pressed={on}
              >
                <span className="ui-switch__thumb" />
              </button>
            ))}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="ui-showcase__card">
          <span className="ui-showcase__label">Checkboxes</span>
          <div className="ui-showcase__col">
            {checks.map((on, i) => (
              <label key={i} className="ui-check">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggleCheck(i)}
                  className="ui-check__input"
                />
                <span className="ui-check__box">
                  {on && (
                    <svg viewBox="0 0 12 10" className="ui-check__icon">
                      <polyline points="1.5 5 4.5 8 10.5 2" />
                    </svg>
                  )}
                </span>
                <span className="ui-check__text">{checkLabels[i]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Radio buttons */}
        <div className="ui-showcase__card">
          <span className="ui-showcase__label">Radio buttons</span>
          <div className="ui-showcase__col">
            {["Small", "Medium", "Large"].map((label, i) => (
              <label key={i} className="ui-radio">
                <input
                  type="radio"
                  name="size"
                  checked={radio === i}
                  onChange={() => setRadio(i)}
                  className="ui-radio__input"
                />
                <span className="ui-radio__circle" />
                <span className="ui-radio__text">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="ui-showcase__card">
          <span className="ui-showcase__label">Range slider</span>
          <input
            type="range"
            min="0"
            max="100"
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            className="ui-slider"
            style={{
              background: `linear-gradient(to right, #ffe45e ${slider}%, #333 ${slider}%)`,
            }}
          />
          <span className="ui-showcase__value">{slider}%</span>
        </div>

        {/* Text input */}
        <div className="ui-showcase__card">
          <span className="ui-showcase__label">Text input</span>
          <input
            type="text"
            className="ui-input"
            placeholder="Type something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="ui-showcase__card">
          <span className="ui-showcase__label">Buttons</span>
          <div className="ui-showcase__row">
            <button className="ui-btn ui-btn--primary">Primary</button>
            <button className="ui-btn ui-btn--outline">Outline</button>
            <button className="ui-btn ui-btn--ghost">Ghost</button>
          </div>
        </div>
      </div>
    </div>
  );
}
