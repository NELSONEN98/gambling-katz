// Comet cursor + trailing particles
const { useEffect: useEffect_c, useRef: useRef_c, useState: useState_c } = React;

function CometCursor({ enabled = true }) {
  const cometRef = useRef_c(null);
  const [trails, setTrails] = useState_c([]);

  useEffect_c(() => {
    if (!enabled) return;
    let lastT = 0;
    let tid = 0;
    const onMove = (e) => {
      if (cometRef.current) {
        cometRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const now = performance.now();
      if (now - lastT > 40) {
        lastT = now;
        const id = ++tid;
        setTrails((arr) => [...arr, { id, x: e.clientX, y: e.clientY }].slice(-14));
        setTimeout(() => setTrails((arr) => arr.filter((t) => t.id !== id)), 600);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  useEffect_c(() => {
    document.body.classList.toggle("no-custom-cursor", !enabled);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={cometRef} className="cursor-comet" />
      {trails.map((t, i) => (
        <div
          key={t.id}
          className="cursor-trail"
          style={{
            transform: `translate(${t.x}px, ${t.y}px) translate(-50%, -50%) scale(${1 - i * 0.05})`,
            opacity: 0.5 - i * 0.03,
          }}
        />
      ))}
    </>
  );
}

window.CometCursor = CometCursor;
