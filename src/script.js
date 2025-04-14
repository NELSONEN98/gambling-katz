const nameP = document.querySelector(".header__name");
const btn = document.querySelector(".header__clickme");

const colors = ["#fff", "#fff2", "#fff7", "#fffc"];
const generateSpaceLayer = function (size, selector, totalStars, duration) {
  const layer = [];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < totalStars; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y + 100}vh 0 ${color}`);
  }
  const container = document.querySelector(selector);
  container.style.setProperty("--space-layer", layer.join(","));
  container.style.setProperty("--star-size", size);
  container.style.setProperty("--animation-duration", duration);
};

generateSpaceLayer("1.5px", ".space-1", 200, "25s");
generateSpaceLayer("2.5px", ".space-2", 200, "20s");
generateSpaceLayer("4.5px", ".space-3", 200, "15s");
