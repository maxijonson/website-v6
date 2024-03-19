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
    </main>
  );
};

export default Home;
