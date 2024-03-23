import Contact from "./components/contact/contact";
import Education from "./components/education/education";
import Experience from "./components/experience/experience";
import Hero from "./components/hero/hero";
import HomeFooter from "./components/home-footer/home-footer";
import Intro from "./components/intro/intro";
import Projects from "./components/projects/projects";
import Skills from "./components/skills/skills";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Intro />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <HomeFooter />
    </>
  );
};

export default Home;
