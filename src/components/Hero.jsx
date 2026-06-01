import { useEffect, useState } from "react";
import "../assets/scss/ui/_hero.scss";

const DECO_STARS = [
  { size: 1.4, top: "12%", left: "8%", delay: 1.0 },
  { size: 1.1, top: "18%", right: "14%", delay: 1.4 },
  { size: 0.8, top: "38%", left: "18%", delay: 1.8 },
  { size: 1.6, top: "30%", right: "8%", delay: 1.2 },
  { size: 1.0, bottom: "28%", left: "12%", delay: 2.0 },
  { size: 0.9, bottom: "22%", right: "18%", delay: 1.6 },
  { size: 0.7, top: "55%", right: "25%", delay: 2.3 },
  { size: 1.2, bottom: "15%", left: "30%", delay: 2.4 },
];

export default function Hero() {
  const [count, setCount] = useState(null);
  const [ignited, setIgnited] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [miauu, setMiauu] = useState(false);
  const [avatarAlt, setAvatarAlt] = useState(false);

  const handleAvatarClick = () => {
    if (spinning || miauu) return;
    setSpinning(true);
    setTimeout(() => {
      setAvatarAlt((v) => !v);
      setSpinning(false);
      setMiauu(true);
      setTimeout(() => setMiauu(false), 900);
    }, 400);
  };

  useEffect(() => {
    const t = setTimeout(() => setCount(3), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (count === null) return;
    if (count <= 0) { setIgnited(true); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [count]);

  const countText =
    ignited ? "· READY TO GO ·" :
    count === null ? "SYSTEMS STANDBY" :
    count > 0 ? `T-00:0${count}` : "T-00:00";

  return (
    <section className="section hero" id="sec-liftoff">
      <div className="hero__deco-stars">
        {DECO_STARS.map((s, i) => (
          <div
            key={i}
            className="hero__deco-star"
            style={{
              width: `${s.size}rem`,
              height: `${s.size}rem`,
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              animationDelay: `${s.delay}s, ${s.delay + 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="hero__planet hero__planet--1" />
      <div className="hero__planet hero__planet--2" />

      <div className="hero__preflight">
        <span className="hero__preflight-dot" />
        <span>MISSION NA-01 · PRE-FLIGHT CHECK</span>
      </div>

      <h1 className="hero__name">
        <span className="hero__name-part hero__name-part--first">Nelson</span>
        <span className="hero__name-part hero__name-part--second">Arango</span>
      </h1>

      <p className="hero__title">
        Multidisciplinary Designer
        <span className="hero__title-separator">✦</span>
        Web &amp; Front-End Developer
      </p>

      <div className="hero__avatar-wrap">
        {[
          { size: 18, top: "4%",  left: "10%",  delay: 1.6 },
          { size: 13, top: "12%", left: "82%",  delay: 2.1 },
          { size: 22, top: "50%", left: "-4%",  delay: 1.9 },
          { size: 15, top: "55%", left: "90%",  delay: 2.4 },
          { size: 11, top: "80%", left: "18%",  delay: 2.0 },
          { size: 20, top: "78%", left: "75%",  delay: 1.7 },
          { size: 12, top: "30%", left: "95%",  delay: 2.3 },
          { size: 16, top: "92%", left: "48%",  delay: 2.2 },
        ].map((s, i) => (
          <span
            key={i}
            className="hero__avatar-star"
            style={{ width: s.size, height: s.size, top: s.top, left: s.left, animationDelay: `${s.delay}s, ${s.delay + 0.4}s` }}
          />
        ))}
        <span className={`hero__miauu${miauu ? " hero__miauu--visible" : ""}`}>MIAUU</span>
        <img
          src={avatarAlt ? "/icono/ME2.png" : "/icono/ME.png"}
          alt="Nelson Arango"
          className={`hero__avatar${spinning ? " hero__avatar--spin" : ""}${miauu ? " hero__avatar--hidden" : ""}`}
          onClick={handleAvatarClick}
        />
      </div>

      <div className={`hero__countdown${ignited ? " hero__countdown--ignited" : ""}`}>
        {countText}
      </div>

      <div className="hero__scroll-hint">
        <span>Initiate journey</span>
        <div className="hero__scroll-hint-arrow" />
      </div>
    </section>
  );
}
