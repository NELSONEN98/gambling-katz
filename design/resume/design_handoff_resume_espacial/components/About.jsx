// About Me section with animated moon
const { useEffect: useEffect_a, useRef: useRef_a } = React;

function AppearOnScroll({ children, delay = 0, as = "div", className = "" }) {
  const ref = useRef_a(null);
  useEffect_a(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const Cmp = as;
  return (
    <Cmp ref={ref} className={`appear ${className}`}>
      {children}
    </Cmp>
  );
}

function Moon() {
  // Random craters
  const craters = [
    { top: "22%", left: "35%", size: 22 },
    { top: "55%", left: "20%", size: 14 },
    { top: "70%", left: "55%", size: 30 },
    { top: "40%", left: "65%", size: 10 },
    { top: "15%", left: "68%", size: 16 },
    { top: "62%", left: "78%", size: 12 },
    { top: "80%", left: "30%", size: 9 },
  ];
  return (
    <div className="moon">
      <div className="moon__ring" />
      <div className="moon__body">
        {craters.map((c, i) => (
          <div
            key={i}
            className="moon__crater"
            style={{ top: c.top, left: c.left, width: c.size, height: c.size }}
          />
        ))}
      </div>
      <div className="moon__orbit">
        <div className="moon__orbit-sat" />
      </div>
      <div className="moon__label">WAYPOINT · 02 · LUNA</div>
    </div>
  );
}

function About() {
  return (
    <section className="section about" id="sec-about" data-screen-label="02 About">
      <div className="section__inner">
        <div className="about__grid">
          <div>
            <AppearOnScroll>
              <div className="section-chip">
                <span className="section-chip__num">02 /</span>
                <span>About Me · Origin</span>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h2 className="section-title">
                Designer &amp; dev <span className="section-title__accent">across dimensions</span>
              </h2>
            </AppearOnScroll>
            <AppearOnScroll delay={200} className="about__text">
              <p>
                <strong>FullStack Developer and Creative Designer</strong> with experience in
                JavaScript, React, NestJS, and Next.js, focused on building responsive and
                user-centered web interfaces using CSS and SASS.
              </p>
              <p>
                I combine strong technical skills with a solid creative background in Adobe
                Creative Suite to deliver visually engaging and functional digital solutions.
              </p>
              <p>
                Have an idea or project where you want to unleash all your creativity?
                <strong> Let's bring it to life together.</strong>
              </p>
            </AppearOnScroll>

            <AppearOnScroll delay={300}>
              <div className="about__stats">
                <div className="about__stat">
                  <div className="about__stat-num">5+</div>
                  <div className="about__stat-label">Years coding</div>
                </div>
                <div className="about__stat">
                  <div className="about__stat-num">20+</div>
                  <div className="about__stat-label">Shipped projects</div>
                </div>
                <div className="about__stat">
                  <div className="about__stat-num">∞</div>
                  <div className="about__stat-label">Curiosity</div>
                </div>
              </div>
            </AppearOnScroll>
          </div>

          <AppearOnScroll delay={200}>
            <Moon />
          </AppearOnScroll>
        </div>
      </div>
    </section>
  );
}

window.About = About;
window.AppearOnScroll = AppearOnScroll;
