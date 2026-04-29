// Hero / Liftoff section
const { useEffect: useEffect_h, useState: useState_h } = React;

function Hero() {
  const [count, setCount] = useState_h(null); // null = idle
  const [ignited, setIgnited] = useState_h(false);

  useEffect_h(() => {
    const t = setTimeout(() => setCount(3), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect_h(() => {
    if (count === null) return;
    if (count <= 0) {
      setIgnited(true);
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [count]);

  const decoStars = [
    { size: 1.4, top: "12%", left: "8%", delay: 1.0 },
    { size: 1.1, top: "18%", right: "14%", delay: 1.4 },
    { size: 0.8, top: "38%", left: "18%", delay: 1.8 },
    { size: 1.6, top: "30%", right: "8%", delay: 1.2 },
    { size: 1.0, bottom: "28%", left: "12%", delay: 2.0 },
    { size: 0.9, bottom: "22%", right: "18%", delay: 1.6 },
    { size: 0.7, top: "55%", right: "25%", delay: 2.3 },
    { size: 1.2, bottom: "15%", left: "30%", delay: 2.4 },
  ];

  const countText =
    ignited ? "· LIFTOFF ·" :
    count === null ? "SYSTEMS STANDBY" :
    count > 0 ? `T-00:0${count}` :
    "T-00:00";

  return (
    <section className="section hero" id="sec-liftoff" data-screen-label="01 Liftoff">
      <div className="hero__deco-stars">
        {decoStars.map((s, i) => (
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
              animationFillMode: "forwards",
              opacity: 0,
              animationName: "starFadeIn, star-pulse, twinkle",
              animationDuration: "0.6s, 2.5s, 4s",
              animationIterationCount: "1, infinite, infinite",
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

      <div className={`hero__countdown ${ignited ? "hero__countdown--ignited" : ""}`}>
        {countText}
      </div>

      <div className="hero__scroll-hint">
        <span>Initiate journey</span>
        <div className="hero__scroll-hint-arrow" />
      </div>

      <style>{`
        @keyframes starFadeIn { to { opacity: 1; } }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
