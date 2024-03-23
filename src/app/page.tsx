import Contact from "./components/contact/contact";
import Education from "./components/education/education";
import Experience from "./components/experience/experience";
import Hero from "./components/hero/hero";
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
      <footer className="py-8 text-center text-sm">
        &copy; 2024
        {new Date().getFullYear() !== 2024
          ? ` - ${new Date().getFullYear()}`
          : ""}{" "}
        &middot; Tristan Chin &middot; All rights reserved
      </footer>
    </>
  );
};

export default Home;
