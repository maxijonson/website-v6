import Education from "./components/education/education";
import Experience from "./components/experience/experience";
import Hero from "./components/hero/hero";
import Footer from "../components/footer/footer";
import HomeHeader from "./components/home-header/home-header";
import Intro from "./components/intro/intro";
import Projects from "./components/projects/projects";
import Skills from "./components/skills/skills";
import { getHomePage } from "../../sanity/queries/pages/home-page/getHomePage";

const Home = async () => {
  const { sections } = await getHomePage();

  return (
    <div>
      <HomeHeader />
      <main>
        {sections.map((section) => {
          switch (section._type) {
            case "homeHero":
              return <Hero key={section._key} {...section} />;
            case "homeIntro":
              return <Intro key={section._key} {...section} />;
          }
        })}
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
