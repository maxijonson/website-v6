import Education from "./components/education/education";
import Experience from "./components/experience/experience";
import Hero from "./components/hero/hero";
import Footer from "../components/footer/footer";
import HomeHeader from "./components/home-header/home-header";
import Intro from "./components/intro/intro";
import Projects from "./components/projects/projects";
import Skills from "./components/skills/skills";
import { getHomePage } from "../../sanity/queries/pages/home-page/getHomePage";
import TristanStructuredData from "@/components/structured-data/tristan-structured-data";
import StructuredData from "@/components/structured-data/structured-data";

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
            case "homeSkills":
              return <Skills key={section._key} {...section} />;
            case "homeProjects":
              return <Projects key={section._key} {...section} />;
            case "homeExperience":
              return <Experience key={section._key} {...section} />;
            case "homeCredentials":
              return <Education key={section._key} {...section} />;
          }
        })}
      </main>
      <Footer />
      <StructuredData
        data={{
          "@type": "WebSite",
          url: "https://www.chintristan.io/",
          name: "Tristan Chin's Personal Website",
        }}
      />
      <TristanStructuredData />
    </div>
  );
};

export default Home;
