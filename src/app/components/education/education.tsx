import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import Credential from "./credential/credential";
import imageEts from "$/image/credential/ets.png";
import imageClg from "$/image/credential/clg.png";
import imageAngular from "$/image/credential/angular.jpg";
import imageReact from "$/image/credential/react.jpg";
import imagePython from "$/image/credential/python.jpg";
import imageNode from "$/image/credential/node.jpg";
import { cn } from "@/lib/utils";

const Education = () => {
  return (
    <HomeSection id="education">
      <HomeHeading>Education</HomeHeading>
      <p className="pb-4 text-lg md:text-xl">
        The following shows all the schools and courses I've taken relevant to
        my software developement career.
      </p>
      <div className={cn("grid grid-cols-1 gap-5", "md:grid-cols-2")}>
        <Credential
          name="Bachelor of Engineering, Software Engineering"
          issuer="École de Technologie Supérieure"
          location="Montreal, QC"
          type="University Degree"
          date="September 2019 - August 2023"
          image={imageEts}
        />
        <Credential
          name="Computer Science"
          issuer="Collège Lionel-Groulx"
          location="Sainte-Thérèse, QC"
          type="College Degree"
          date="August 2016 - June 2019"
          image={imageClg}
        />
        <Credential
          name="Angular - The Complete Guide"
          issuer="Udemy"
          type="Online Course"
          date="May 2021"
          image={imageAngular}
        />
        <Credential
          name="Complete Python 3 Bootcamp"
          issuer="Udemy"
          type="Online Course"
          date="February 2020"
          image={imagePython}
        />
        <Credential
          name="The Complete React Web Developer Course"
          issuer="Udemy"
          type="Online Course"
          date="January 2019"
          image={imageReact}
        />
        <Credential
          name="The Complete Node.js Developer Course"
          issuer="Udemy"
          type="Online Course"
          date="June 2018"
          image={imageNode}
        />
      </div>
    </HomeSection>
  );
};

export default Education;
