import { useState } from "react";
import "../assets/scss/ui/_ui-persistent.scss";

export function HUD({ progress, activeIdx, sections }) {
  const pct = Math.round(progress * 100);
  return (
    <div className="hud">
      <div className="hud__left">
        <span className="hud__dot" />
        <span>NA-01</span>
        <span>·</span>
        <span>{sections[activeIdx]?.label || "·"}</span>
      </div>
      <div className="hud__right">
        <span>UPLINK</span>
        <div className="hud__bar">
          <div className="hud__bar-fill" style={{ "--p": `${pct}%` }} />
        </div>
        <span>{pct}%</span>
      </div>
    </div>
  );
}

export function MissionNav({ activeIdx, onJump, sections }) {
  return (
    <nav className="mission-nav" aria-label="Mission nav">
      {sections.map((s, i) => (
        <a
          key={s.id}
          className={`mission-nav__item ${activeIdx === i ? "mission-nav__item--active" : ""}`}
          href={`#${s.id}`}
          onClick={(e) => { e.preventDefault(); onJump(s.id); }}
        >
          <span className="mission-nav__dot" />
          <span className="mission-nav__label">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}

export function RocketCompanion({ progress }) {
  const y = 15 + progress * 70;
  const distance = Math.round(progress * 42000).toLocaleString();
  return (
    <div className="rocket-companion" style={{ "--rocket-y": `${y}%` }}>
      <div className="rocket-companion__body">
        <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#ffe45e" />
            </linearGradient>
          </defs>
          <path d="M24 2 L34 22 L14 22 Z" fill="url(#rg)" stroke="#ffe45e" strokeWidth="1" />
          <rect x="14" y="22" width="20" height="20" rx="3" fill="#f4f4f4" stroke="#ffe45e" strokeWidth="1" />
          <circle cx="24" cy="30" r="4" fill="#05070e" stroke="#ffe45e" strokeWidth="1.2" />
          <circle cx="23" cy="29" r="1.2" fill="#7adfff" />
          <path d="M14 36 L6 46 L14 44 Z" fill="#ffe45e" />
          <path d="M34 36 L42 46 L34 44 Z" fill="#ffe45e" />
          <rect x="16" y="42" width="16" height="4" fill="#ffe45e" />
        </svg>
        <div className="rocket-companion__flame" />
      </div>
      <div className="rocket-companion__distance">{distance} KM</div>
    </div>
  );
}

export function TweaksPanel({ state, setState }) {
  const [open, setOpen] = useState(false);

  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));

  return (
    <>
      <button
        className="tweaks-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle tweaks panel"
      >
        ✦
      </button>
      {open && (
        <div className="tweaks-panel open">
          <div className="tweaks-panel__head">
            <h4 className="tweaks-panel__title">✦ Mission config</h4>
            <button className="ui-btn ui-btn--ghost" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="tweak">
            <div className="tweak__label">
              <span>Star density</span>
              <span className="tweak__val">{state.density.toFixed(1)}×</span>
            </div>
            <input type="range" min="0.3" max="2" step="0.1" value={state.density}
              onChange={(e) => set("density", Number(e.target.value))} />
          </div>
          <div className="tweak">
            <div className="tweak__label">
              <span>Parallax speed</span>
              <span className="tweak__val">{state.parallax.toFixed(1)}×</span>
            </div>
            <input type="range" min="0" max="2" step="0.1" value={state.parallax}
              onChange={(e) => set("parallax", Number(e.target.value))} />
          </div>
          <div className="tweak">
            <div className="tweak__label"><span>Accent hue</span><span className="tweak__val">{state.accent}</span></div>
            <div className="tweak__chips">
              {[
                { k: "#ffe45e", label: "Sun" },
                { k: "#7adfff", label: "Ice" },
                { k: "#a07aff", label: "Nebula" },
                { k: "#7bffbc", label: "Aurora" },
                { k: "#ff7ac6", label: "Pulsar" },
              ].map((c) => (
                <button key={c.k}
                  className={`tweak__chip ${state.accent === c.k ? "active" : ""}`}
                  onClick={() => set("accent", c.k)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="tweak">
            <div className="tweak__label"><span>Comet cursor</span></div>
            <div className="tweak__chips">
              <button className={`tweak__chip ${state.cursor ? "active" : ""}`} onClick={() => set("cursor", true)}>On</button>
              <button className={`tweak__chip ${!state.cursor ? "active" : ""}`} onClick={() => set("cursor", false)}>Off</button>
            </div>
          </div>
          <div className="tweak">
            <div className="tweak__label"><span>Warp transitions</span></div>
            <div className="tweak__chips">
              <button className={`tweak__chip ${state.warp ? "active" : ""}`} onClick={() => set("warp", true)}>On</button>
              <button className={`tweak__chip ${!state.warp ? "active" : ""}`} onClick={() => set("warp", false)}>Off</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
