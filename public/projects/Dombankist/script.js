"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const links = document.querySelector(".nav__links");
const logo = document.querySelector(".nav__logo");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const operationsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//navegation

/*document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});*/
//1.Add event listener to common parent element
//2. Determinewhat element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target);
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    //consultar con el common PARENT
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tabs

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const click = e.target.closest(".operations__tab");
  console.log(click);

  if (!click) return;
  //REMOVE
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  operationsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  //ADD
  click.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
      //if element is not the link itself
    });
    logo.style.opacity = this;
  }
};

//menu fade animation
/*nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});*/

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//Selecting Elements
//Stcky navigation
const initialCoords = section1.getBoundingClientRect();
//console.log(initialCoords);
window.addEventListener("scroll", function () {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

/////////////////////////////////////////////////////
/*
const observerCallBack = function (entries, observer) {
  entries.forEach((entr) => {
    console.log(entr);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2], // 0 significa que no está en la vista y 0.2 es el 20% despues de entrar al observer
};
const observer = new IntersectionObserver(observerCallBack, obsOptions);
observer.observe(section1);*/

const header = document.querySelector(".header");
const navHead = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHead}px`,
});
headerObserver.observe(header);
//------------------------------------///*
///REVEAL SECTIONS///
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //se ejecuta la funcuion "reveal section" despues de 0.15% de la seccion seleccioada
});

allSections.forEach(function (section) {
  sectionObserver.observe(section); //usamos nuestro observador para "observar" las secciones
  //  section.classList.add("section--hidden");
});

///////////LAZY LOADING///////////

////////////////
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.5,
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

//slider

const sliders = function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector(".dots");

  const goToSlide = function (slide) {
    slides.forEach((s, index) => {
      // primera iteración index es 0
      s.style.transform = `translateX(${100 * (index - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    } // = primera iteración será 1

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    }
    curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const createDots = function () {
    slides.forEach(function (sli, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"> </button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  //second part
  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) console.log("dot");
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  });
};

sliders();

//0%, 100%,200%...
///////////////////////// excercises///////////
//creating and inserting elements
/*
//.insertAdjacentHTML("afterBegin", variable)
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent = "We use cookies, please accept";
message.innerHTML =
  'We use cookies, please accept <button class="btn btn--close-cookie">Got it</button>';
const header = document.querySelector(".header");
//header.prepend(message);
//header.append(message.cloneNode(true));
header.append(message);
//header.before(message);
//header.after(message);

const allSections = document.querySelectorAll(".section");
console.log(allSections);
const aiDi = document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
document.getElementsByClassName("btn");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  section1.scrollIntoView({ behavior: "smooth" });
});
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });*/

/*
message.style.backgroundColor = "#37383d";
message.style.width = "100%";

console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");
const logo = document.querySelector(".nav__logo");
console.log(logo.alt, logo.src);

//non standart attributes
console.log(logo.getAttribute("designer"));
console.log(logo.setAttribute("company", "bankist"));

//classes
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");*/

/*const h1 = document.querySelector("h1");
const alertH1 = function (e) {
  alert("Dont hover over me!");
  h1.removeEventListener("mouseenter", alertH1);
};*/

//h1.addEventListener("mouseenter", alertH1);
/*h1.onmouseenter = function (e) {  //old school
  alert("on mouse alert");
};*/

//RANDOM COLOR
/*const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});
//////
const h1 = document.querySelector("h1");
//going downwards
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "white";
//parents upwardws
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest(".header").style.background = "var(--gradient-secondary)";
//sideways siblings
console.log(h1.previousElementSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);*/
