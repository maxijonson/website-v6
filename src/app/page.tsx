import Education from "./components/education/education";
import Experience from "./components/experience/experience";
import Hero from "./components/hero/hero";
import Intro from "./components/intro/intro";
import Projects from "./components/projects/projects";
import Skills from "./components/skills/skills";

const Home = () => {
  return (
    <main>
      <Hero />
      <Intro />
      <Skills />
      <Projects />
      <Experience />
      <Education />
    </main>
  );
};

export default Home;
