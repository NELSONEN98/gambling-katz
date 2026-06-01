import AppearOnScroll from "./AppearOnScroll";
import "../assets/scss/ui/_skills.scss";

function SkillsOrbit() {
  return (
    <div className="skills__orbit">
      <div className="orbit-center" />
      <div className="orbit-ring" style={{ width: "38%", height: "38%", "--dur": "14s" }}>
        <div className="orbit-ring__dot" style={{ "--dot-color": "#ffe45e" }} />
      </div>
      <div className="orbit-ring orbit-ring--reverse" style={{ width: "58%", height: "58%", "--dur": "22s" }}>
        <div className="orbit-ring__dot" style={{ "--dot-color": "#a07aff" }} />
      </div>
      <div className="orbit-ring" style={{ width: "78%", height: "78%", "--dur": "34s" }}>
        <div className="orbit-ring__dot" style={{ "--dot-color": "#7adfff" }} />
      </div>
      <div className="orbit-ring orbit-ring--reverse" style={{ width: "98%", height: "98%", "--dur": "48s" }}>
        <div className="orbit-ring__dot" style={{ "--dot-color": "#ff7ac6" }} />
      </div>
      <div className="orbit-skill-label" style={{ "--x": "0px", "--y": "-19%" }}>Frontend</div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section skills" id="sec-skills">
      <div className="section__inner">
        <div className="skills__head">
          <div>
            <AppearOnScroll>
              <div className="section-chip">
                <span className="section-chip__num">03 /</span>
                <span>Skills · Navigation systems</span>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h2 className="section-title">
                Tools that orbit <span className="section-title__accent">my craft</span>
              </h2>
            </AppearOnScroll>
            <AppearOnScroll delay={200}>
              <p className="section-sub">
                Front-end, full-stack, and visual design — a layered toolkit that lets me ship
                responsive, accessible interfaces and carry them from concept to pixel.
              </p>
            </AppearOnScroll>
          </div>
          <AppearOnScroll delay={200}>
            <SkillsOrbit />
          </AppearOnScroll>
        </div>

        <div className="skills__columns">
          <AppearOnScroll className="skill-col">
            <div className="skill-col__label">
              <span>Coding</span>
              <span className="skill-col__label-id">MOD-01</span>
            </div>
            <h4 className="skill-col__title">Front-end &amp; Full-stack</h4>
            <p className="skill-col__desc">
              Multiple front-end and full-stack projects using modern stacks. Strong focus on
  responsive, accessible, high-performance interfaces, with experience connecting
  frontend to backend and integrating AI-driven workflows, agents, and modular systems.
            </p>
            <div className="skill-chips">
              {["JavaScript", "React", "Next.js", "NestJS", "Sass", "HTML5", "CSS", "WordPress"].map((s) => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </AppearOnScroll>

          <AppearOnScroll delay={100} className="skill-col">
            <div className="skill-col__label">
              <span>Design</span>
              <span className="skill-col__label-id">MOD-02</span>
            </div>
            <h4 className="skill-col__title">Visual &amp; Motion</h4>
            <p className="skill-col__desc">
              Translating ideas into elegant, functional UI. Strong Adobe Creative Suite,
  styleguides, and motion, with a design-first mindset enhanced by AI-assisted
  workflows and system-driven approaches focused on usability and aesthetics.
            </p>
            <div className="skill-chips">
              {["Figma", "Photoshop", "Illustrator", "After Effects", "Lightroom", "Claude Design", "Ableton", "CapCut"].map((s) => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </AppearOnScroll>

          <AppearOnScroll delay={200} className="skill-col">
            <div className="skill-col__label">
              <span>UX / UI</span>
              <span className="skill-col__label-id">MOD-03</span>
            </div>
            <h4 className="skill-col__title">Systems &amp; Interaction</h4>
            <p className="skill-col__desc">
              Passionate about designing and building intuitive UX/UI components that
enhance usability and create seamless user experiences, while leveraging AI
to generate scalable styleguides, modular systems, and consistent design patterns.
            </p>
            <div className="skill-chips">
              {["Design systems", "Prototyping", "Microinteractions", "Accessibility", "User flows"].map((s) => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </AppearOnScroll>
        </div>
      </div>
    </section>
  );
}
