const link = document.querySelector(".navegacion");
const expand = document.querySelector(".btn-expand");
const nav = document.querySelector(".navegacion");
const section1 = document.querySelector("#section--1");
const stickyMenu = document.querySelector(".sticky__menu");
const header = document.querySelector(".header");
const section = document.querySelectorAll(".seccion");
//MENU RESPONSIVE
expand.addEventListener("click", function () {
  nav.classList.toggle("expanded");
  nav.style.transition = "0.5s";
});

// SMOOTH SCROLL
nav.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("link")) {
    const id = e.target.getAttribute("href");
    const targetElement = document.querySelector(id);
    if (id === "#section--1") {
      targetElement.scrollIntoView({ behavior: "smooth" });
      // window.scrollBy(0, 250);
    } else targetElement.scrollIntoView({ behavior: "smooth" });
  }
});

//** sticky navigation */

const stickyNav = function (entries) {
  const [entry] = entries;
  //  console.log(entry);
  if (!entry.isIntersecting) stickyMenu.classList.add("display");
  else stickyMenu.classList.remove("display");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);

//REVEAL SECTIONS
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hiden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

section.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hiden");
});
