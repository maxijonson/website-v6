import Education from "./components/education/education";
import Experience from "./components/experience/experience";
import Hero from "./components/hero/hero";
import Footer from "../components/footer/footer";
import HomeHeader from "./components/home-header/home-header";
import Intro from "./components/intro/intro";
import Projects from "./components/projects/projects";
import Skills from "./components/skills/skills";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <main>
        <Hero />
        <Intro />
        <Skills />
        <Projects />
        <Experience />
        <Education />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
