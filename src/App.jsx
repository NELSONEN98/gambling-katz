import { useState, useEffect } from "react";
import CometCursor from "./components/CometCursor";
import Starfield from "./components/Starfield";
import { HUD, MissionNav, RocketCompanion, TweaksPanel } from "./components/UI";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Warp from "./components/Warp";

const SECTIONS = [
  { id: "sec-liftoff", label: "01 · Liftoff" },
  { id: "sec-about",   label: "02 · Origin" },
  { id: "sec-skills",  label: "03 · Systems" },
  { id: "sec-portfolio", label: "04 · Missions" },
  { id: "sec-contact", label: "05 · Transmit" },
];

export default function App() {
  const [progress, setProgress]   = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [tweaks, setTweaks]       = useState({
    density:  1,
    parallax: 1,
    accent:   "#ffe45e",
    cursor:   true,
    warp:     true,
  });

  // Sync accent CSS variable when tweaks change
  useEffect(() => {
    const r = parseInt(tweaks.accent.slice(1, 3), 16);
    const g = parseInt(tweaks.accent.slice(3, 5), 16);
    const b = parseInt(tweaks.accent.slice(5, 7), 16);
    const root = document.documentElement;
    root.style.setProperty("--accent", tweaks.accent);
    root.style.setProperty("--accent-soft", tweaks.accent + "99");
    root.style.setProperty("--accent-glow", `rgba(${r},${g},${b},0.35)`);
    root.style.setProperty("--border", `rgba(${r},${g},${b},0.18)`);
  }, [tweaks.accent]);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const prog       = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(prog);

      let active = 0;
      SECTIONS.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) active = i;
      });
      setActiveIdx(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <CometCursor enabled={tweaks.cursor} />
      <Starfield density={tweaks.density} speed={tweaks.parallax} />
      <HUD progress={progress} activeIdx={activeIdx} sections={SECTIONS} />
      <MissionNav activeIdx={activeIdx} onJump={jumpTo} sections={SECTIONS} />
      <RocketCompanion progress={progress} />

      <main>
        <Hero />
        <About />
        {tweaks.warp && <Warp label="· HYPERSPACE JUMP ·" />}
        <Skills />
        {tweaks.warp && <Warp label="· APPROACHING PORTFOLIO ·" />}
        <Portfolio />
        {tweaks.warp && <Warp label="· OPENING CHANNEL ·" />}
        <Contact />
      </main>

      <TweaksPanel state={tweaks} setState={setTweaks} />
    </>
  );
}
