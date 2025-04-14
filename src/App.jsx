import { use, useState } from "react";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import RocketAnimation from "./components/RocketAnimation";
import Portfolio from "./components/Portfolio";
import Studies from "./components/Studies";
function App() {
  const [activeView, setActiveView] = useState("header");

  const handleJourneyComplete = () => {
    setActiveView("aboutMe");
  };

  const handleSectionRocket = () => {
    setActiveView("rocket");
  };
  const handlePortfolio = () => {
    setActiveView("portfolio");
  };

  const handleSectionStudies = () => {
    setActiveView("studies");
  };
  return (
    <>
      {activeView === "header" && (
        <Header onJourneyComplete={handleJourneyComplete} />
      )}
      {activeView === "aboutMe" && (
        <AboutMe onSectionRocket={handleSectionRocket} />
      )}
      {activeView === "rocket" && (
        <RocketAnimation onSectionPortfolio={handlePortfolio} />
      )}
      {activeView === "portfolio" && (
        <Portfolio setActiveView={setActiveView} />
      )}
    </>
  );
}

export default App;
