// Portfolio section — constellation of projects
const { useState: useState_p, useMemo: useMemo_p } = React;

const PROJECTS = [
  {
    id: "cosmicuikit",
    title: "Cosmic UI Kit",
    url: "projects/UIKit.html",
    cat: "uikit",
    tags: ["react", "sass"],
    coord: "UI-001",
    desc: "A live library of interactive components I design and build — buttons, toggles, sliders, steppers, progress rings, badges and more. Built with React and custom CSS, tuned for consistent motion and focus states.",
    featured: true,
  },
  {
    id: "subinvoxa",
    title: "SubInvoxa",
    url: "https://subinvoxa.com/",
    cat: "react",
    tags: ["react", "js", "css"],
    coord: "AX-014",
    desc: "Frontend of the Subinvoxa platform for submitting electronic invoices to DIAN. Built the UI, design system, color variables, and visual identity — plus logo design in Photoshop and subtle UI animations for polish.",
  },
  {
    id: "moviemeter",
    title: "Movie Meter",
    url: "https://reliable-pavlova-06cf00.netlify.app/",
    cat: "react",
    tags: ["react", "js", "css"],
    coord: "BX-027",
    desc: "Interactive app to search, rate and save favorite movies. Login system and local storage persist the user's personal library.",
  },
  {
    id: "reactquiz",
    title: "React Quiz",
    url: "https://react-quiz-test-a.netlify.app/",
    cat: "react",
    tags: ["react", "js", "css"],
    coord: "CX-041",
    desc: "Interactive quiz with 15 crafted questions on React fundamentals. Dynamic state management with useReducer for a smooth, responsive flow.",
  },
  {
    id: "resume",
    title: "Interactive Resume",
    url: "https://nelson-arango-portfolio.netlify.app/",
    cat: "react",
    tags: ["react", "js", "sass"],
    coord: "DX-003",
    desc: "Resume as a dynamic, interactive journey. Animations with React, Framer Motion, CSS/SASS and pixel art — all designs and images drawn from scratch.",
  },
  {
    id: "animal",
    title: "Animal Gambling",
    url: "#",
    cat: "javascript",
    tags: ["js", "css", "html"],
    coord: "JX-108",
    desc: "Two-player desktop game in JS/HTML/CSS. Pick your character — first to 50 points wins.",
  },
  {
    id: "bankist",
    title: "Bankist App",
    url: "#",
    cat: "javascript",
    tags: ["js", "css", "html"],
    coord: "JX-222",
    desc: "Modern banking interface with CSS animations. Minimalist approach, smooth interactions and a clean UX.",
  },
  {
    id: "guess",
    title: "Guess my number!",
    url: "#",
    cat: "javascript",
    tags: ["js", "css", "html"],
    coord: "JX-330",
    desc: "Small desktop game in JS/HTML/CSS — guess a random number before your attempts run out.",
  },
  {
    id: "arquitec",
    title: "Arquitectura Bosque",
    url: "#",
    cat: "sass",
    tags: ["css", "html"],
    coord: "HX-010",
    desc: "Landing page showcasing Arquitectura Bosque — Basic, Premier, and Elite models highlighted dynamically.",
  },
  {
    id: "guitar",
    title: "Guitar LA",
    url: "#",
    cat: "sass",
    tags: ["css", "html"],
    coord: "HX-024",
    desc: "E-commerce for iconic guitars from Los Angeles, with subtle CSS animations and a considered color palette.",
  },
  {
    id: "nucleus",
    title: "Nucleus Wallet",
    url: "#",
    cat: "sass",
    tags: ["css", "html"],
    coord: "HX-037",
    desc: "Landing page for the Nucleus Wallet app, communicating its key features and value proposition clearly.",
  },
  {
    id: "cocina",
    title: "Escuela Cocina",
    url: "https://willowy-otter-a52d8b.netlify.app/",
    cat: "sass",
    tags: ["sass", "html"],
    coord: "HX-051",
    desc: "Landing showcasing a cooking school — clean typography and Sass-driven layout.",
  },
  {
    id: "bahn",
    title: "Bahn BnB",
    url: "https://jolly-cendol-94138f.netlify.app/",
    cat: "sass",
    tags: ["sass", "html"],
    coord: "HX-063",
    desc: "Promo landing for Bahn BnB — explore travel destinations and pick desired dates.",
  },
  {
    id: "state",
    title: "Real State",
    url: "https://dulcet-trifle-f3b951.netlify.app/",
    cat: "sass",
    tags: ["sass", "html"],
    coord: "HX-077",
    desc: "Landing page for a real estate company showcasing properties, reviews and a blog section.",
  },
  {
    id: "meeti",
    title: "Meeti",
    url: "https://golden-bublanina-115075.netlify.app/",
    cat: "sass",
    tags: ["sass", "html"],
    coord: "HX-084",
    desc: "Practice project based on the Meeting website — built to sharpen CSS Grid and Flexbox.",
  },
  {
    id: "podcast",
    title: "Podcast FM",
    url: "https://keen-salmiakki-e27f4c.netlify.app/",
    cat: "sass",
    tags: ["sass", "html"],
    coord: "HX-092",
    desc: "Promo site for Podcast FM — a platform for creators to upload and share podcasts with the world.",
  },
  {
    id: "cafe",
    title: "La Cafetería",
    url: "https://meek-duckanoo-6ae791.netlify.app/",
    cat: "sass",
    tags: ["sass", "html"],
    coord: "HX-099",
    desc: "Cozy landing for a café — warm palette, clear hierarchy, Sass-driven styles.",
  },
  {
    id: "tech",
    title: "Tech PRO",
    url: "#",
    cat: "sass",
    tags: ["css", "html"],
    coord: "HX-111",
    desc: "Product showcase for Tech PRO headphones — highlighting features and specs.",
  },
  {
    id: "delivery",
    title: "Delivery App",
    url: "https://beautiful-pegasus-0d193a.netlify.app/",
    cat: "sass",
    tags: ["sass", "html"],
    coord: "HX-128",
    desc: "Promo site for a food delivery app — features forward, encouraging downloads.",
  },
];

const FILTERS = [
  { id: "all", label: "Show all" },
  { id: "uikit", label: "UI / Components" },
  { id: "react", label: "React" },
  { id: "javascript", label: "JavaScript" },
  { id: "sass", label: "Sass / CSS + HTML" },
];

function ProjectCard({ p }) {
  const isExternal = p.url && p.url !== "#";
  return (
    <a
      className="project-card"
      href={isExternal ? p.url : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      <div className="project-card__thumb">
        <div className="project-card__thumb-grid" />
        <div className="project-card__thumb-meta">PROJECT · {p.coord}</div>
        <div className="project-card__thumb-coords">[ {p.id.toUpperCase()} ]</div>
        <div className="project-card__thumb-label">{p.title}</div>
        <div className="project-card__link-indicator" aria-hidden>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{p.title}</h3>
        <p className="project-card__desc">{p.desc}</p>
        <div className="project-card__tags">
          {p.tags.map((t) => (
            <span key={t} className={`project-tag project-tag--${t}`}>#{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState_p("all");
  const list = useMemo_p(
    () => filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter),
    [filter]
  );
  return (
    <section className="section portfolio-section" id="sec-portfolio" data-screen-label="04 Portfolio">
      <div className="section__inner">
        <AppearOnScroll>
          <div className="section-chip">
            <span className="section-chip__num">04 /</span>
            <span>Portfolio · Constellation</span>
          </div>
        </AppearOnScroll>
        <AppearOnScroll delay={100}>
          <h2 className="section-title">
            My <span className="section-title__accent">projects</span>
          </h2>
        </AppearOnScroll>
        <AppearOnScroll delay={200}>
          <p className="section-sub">
            Here are some of my projects that showcase my skills and creativity.
            Each card is a mission — tap to dock into the live deployment.
          </p>
        </AppearOnScroll>
        <AppearOnScroll delay={300}>
          <div className="portfolio__filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`portfolio__filter ${filter === f.id ? "portfolio__filter--active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </AppearOnScroll>

        <div className="portfolio__grid">
          {list.map((p, i) => (
            <AppearOnScroll key={p.id} delay={Math.min(i * 40, 400)}>
              <ProjectCard p={p} />
            </AppearOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Portfolio = Portfolio;
