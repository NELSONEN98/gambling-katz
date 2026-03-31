import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import RocketAnimation from "./components/RocketAnimation";
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/about" element={<AboutMe />} />
      <Route path="/rocket" element={<RocketAnimation />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  );
}

export default App;
