import AppearOnScroll from "./AppearOnScroll";
import "../assets/scss/ui/_contact.scss";

export default function Contact() {
  return (
    <section className="section contact-section" id="sec-contact">
      <div className="section__inner">
        <AppearOnScroll>
          <div className="section-chip">
            <span className="section-chip__num">05 /</span>
            <span>Transmission · Open channel</span>
          </div>
        </AppearOnScroll>

        <AppearOnScroll delay={100}>
          <div className="transmission">
            <div className="transmission__head">
              <span className="transmission__head-dot" />
              <span>INCOMING TRANSMISSION · STAND BY</span>
            </div>
            <div className="transmission__body">
              <div>
                <h2 className="transmission__title">
                  Ready to build something <span>out of this world?</span>
                </h2>
                <p className="transmission__text">
                  I'm currently open for opportunities, collaborations and unusual missions.
                  If you have an idea floating around — design, front-end, or both —
                  let's coordinate a launch.
                </p>
                <div className="transmission__links">
                  <a
                    className="t-link t-link--primary"
                    href="https://www.linkedin.com/in/nelson-enrique-bedoya-arango-1466071b1/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    → LinkedIn
                  </a>
                  <a className="t-link" href="https://github.com/NELSONEN98" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <a className="t-link" href="https://nelson-arango-portfolio.netlify.app/" target="_blank" rel="noreferrer">
                    Live portfolio
                  </a>
                </div>
              </div>
              <div className="transmission__meta">
                {[
                  ["Callsign", "NELSONEN98"],
                  ["Role", "Designer / Dev"],
                  ["Base", "[04.7231 · -73.8592]"],
                  ["Status", "Open for missions"],
                  ["Uplink", "●●●●●●●●"],
                ].map(([k, v]) => (
                  <div className="transmission__meta-row" key={k}>
                    <span className="transmission__meta-key">{k}</span>
                    <span className="transmission__meta-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AppearOnScroll>

        <footer className="site-footer">
          <span>© 2025 Nelson Arango</span>
          <span>MISSION NA-01 · COMPLETE</span>
        </footer>
      </div>
    </section>
  );
}
