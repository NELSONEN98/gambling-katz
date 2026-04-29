import AppearOnScroll from "./AppearOnScroll";
import "../assets/scss/ui/_about.scss";

function Moon() {
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
          <div key={i} className="moon__crater" style={{ top: c.top, left: c.left, width: c.size, height: c.size }} />
        ))}
      </div>
      <div className="moon__orbit">
        <div className="moon__orbit-sat" />
      </div>
      <div className="moon__label">WAYPOINT · 02 · LUNA</div>
    </div>
  );
}

export default function About() {
  return (
    <section className="section about" id="sec-about">
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
  user-centered web interfaces — now extending into AI-driven systems, agents,
  and modular skills.
</p>
<p>
  I combine strong technical skills with a creative background in Adobe Creative
  Suite, working with structured approaches like SDD and design systems to build
  scalable, intelligent, and visually engaging solutions.
</p>
<p>
  Have an idea or project you want to push further with design, code, or AI? 
  <strong> Let’s bring it to life together.</strong>
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
