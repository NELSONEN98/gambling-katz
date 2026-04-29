// Top HUD + side mission nav + rocket companion + tweaks panel
const { useEffect: useEffect_ui, useState: useState_ui } = React;

const SECTIONS = [
  { id: "sec-liftoff", label: "01 · Liftoff" },
  { id: "sec-about", label: "02 · Origin" },
  { id: "sec-skills", label: "03 · Systems" },
  { id: "sec-portfolio", label: "04 · Missions" },
  { id: "sec-contact", label: "05 · Transmit" },
];

function HUD({ progress, activeIdx }) {
  const pct = Math.round(progress * 100);
  return (
    <div className="hud">
      <div className="hud__left">
        <span className="hud__dot" />
        <span>NA-01</span>
        <span>·</span>
        <span>{SECTIONS[activeIdx]?.label || "·"}</span>
      </div>
      <div className="hud__right">
        <span>UPLINK</span>
        <div className="hud__bar"><div className="hud__bar-fill" style={{ "--p": `${pct}%` }} /></div>
        <span>{pct}%</span>
      </div>
    </div>
  );
}

function MissionNav({ activeIdx, onJump }) {
  return (
    <nav className="mission-nav" aria-label="Mission nav">
      {SECTIONS.map((s, i) => (
        <a
          key={s.id}
          className={`mission-nav__item ${activeIdx === i ? "mission-nav__item--active" : ""}`}
          onClick={(e) => { e.preventDefault(); onJump(s.id); }}
          href={`#${s.id}`}
        >
          <span className="mission-nav__dot" />
          <span className="mission-nav__label">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}

function RocketCompanion({ progress }) {
  // Map progress [0..1] to viewport Y: 15% -> 85%
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
          {/* nose */}
          <path d="M24 2 L34 22 L14 22 Z" fill="url(#rg)" stroke="#ffe45e" strokeWidth="1" />
          {/* body */}
          <rect x="14" y="22" width="20" height="20" rx="3" fill="#f4f4f4" stroke="#ffe45e" strokeWidth="1" />
          {/* window */}
          <circle cx="24" cy="30" r="4" fill="#05070e" stroke="#ffe45e" strokeWidth="1.2" />
          <circle cx="23" cy="29" r="1.2" fill="#7adfff" />
          {/* fins */}
          <path d="M14 36 L6 46 L14 44 Z" fill="#ffe45e" />
          <path d="M34 36 L42 46 L34 44 Z" fill="#ffe45e" />
          {/* base */}
          <rect x="16" y="42" width="16" height="4" fill="#ffe45e" />
        </svg>
        <div className="rocket-companion__flame" />
      </div>
      <div className="rocket-companion__distance">{distance} KM</div>
    </div>
  );
}

function TweaksPanel({ state, setState }) {
  const [open, setOpen] = useState_ui(false);

  // Expose via parent message for toolbar toggle
  useEffect_ui(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", handler);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch {}
    return () => window.removeEventListener("message", handler);
  }, []);

  const set = (k, v) => {
    setState((s) => ({ ...s, [k]: v }));
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
    } catch {}
  };

  if (!open) return null;
  return (
    <div className="tweaks-panel open">
      <div className="tweaks-panel__head">
        <h4 className="tweaks-panel__title">✦ Tweaks · Mission config</h4>
        <button className="ui-btn ui-btn--ghost" onClick={() => setOpen(false)}>×</button>
      </div>
      <div className="tweak">
        <div className="tweak__label"><span>Star density</span><span className="tweak__val">{state.density.toFixed(1)}×</span></div>
        <input type="range" min="0.3" max="2" step="0.1" value={state.density}
          onChange={(e) => set("density", Number(e.target.value))} />
      </div>
      <div className="tweak">
        <div className="tweak__label"><span>Parallax speed</span><span className="tweak__val">{state.parallax.toFixed(1)}×</span></div>
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
  );
}

window.HUD = HUD;
window.MissionNav = MissionNav;
window.RocketCompanion = RocketCompanion;
window.TweaksPanel = TweaksPanel;
window.SECTIONS = SECTIONS;
