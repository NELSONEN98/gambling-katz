import { useEffect, useMemo, useRef, useState } from "react";
import "../assets/scss/ui/_starfield.scss";

export default function Starfield({ density = 1, speed = 1 }) {
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  const stars = useMemo(() => {
    const make = (count, opts) =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: opts.sizeMin + Math.random() * (opts.sizeMax - opts.sizeMin),
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
        min: 0.15 + Math.random() * 0.25,
        max: 0.7 + Math.random() * 0.3,
      }));
    return {
      far: make(Math.round(120 * density), { sizeMin: 0.5, sizeMax: 1.2 }),
      mid: make(Math.round(70 * density), { sizeMin: 1.0, sizeMax: 2.0 }),
      near: make(Math.round(35 * density), { sizeMin: 1.5, sizeMax: 3.0 }),
    };
  }, [density]);

  useEffect(() => {
    let raf;
    const tick = () => {
      const y = window.scrollY;
      if (layer1Ref.current) layer1Ref.current.style.transform = `translateY(${y * -0.05 * speed}px)`;
      if (layer2Ref.current) layer2Ref.current.style.transform = `translateY(${y * -0.15 * speed}px)`;
      if (layer3Ref.current) layer3Ref.current.style.transform = `translateY(${y * -0.3 * speed}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const [shoots, setShoots] = useState([]);
  useEffect(() => {
    let alive = true;
    const launch = () => {
      if (!alive) return;
      const id = Math.random();
      setShoots((arr) => [...arr, { id, top: Math.random() * 50, left: 20 + Math.random() * 60 }]);
      setTimeout(() => setShoots((arr) => arr.filter((x) => x.id !== id)), 1600);
      setTimeout(launch, 3500 + Math.random() * 4500);
    };
    const t = setTimeout(launch, 2500);
    return () => { alive = false; clearTimeout(t); };
  }, []);

  const renderLayer = (list, ref, cls) => (
    <div ref={ref} className={`starfield__layer ${cls}`}>
      {list.map((s, i) => (
        <div
          key={i}
          className="starfield__star"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            "--dur": `${s.dur}s`,
            "--delay": `${s.delay}s`,
            "--min": s.min,
            "--max": s.max,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="starfield">
      {renderLayer(stars.far, layer1Ref, "starfield__layer--far")}
      {renderLayer(stars.mid, layer2Ref, "starfield__layer--mid")}
      {renderLayer(stars.near, layer3Ref, "starfield__layer--near")}
      {shoots.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
        />
      ))}
    </div>
  );
}
