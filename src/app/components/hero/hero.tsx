import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "@/../public/images/tristan/ipnos.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center bg-background align-middle">
      <Avatar className="mb-4 size-40 self-center">
        <AvatarImage asChild src={profileImage.src}>
          <Image src={profileImage} alt="Tristan Chin" priority />
        </AvatarImage>
        <AvatarFallback className="bg-blue-900 text-6xl font-bold text-white">
          TC
        </AvatarFallback>
      </Avatar>
      <h1 className="pb-2 text-center text-5xl font-bold">Tristan Chin</h1>
      <h2 className="text-md text-center">
        B. Eng. Software Engineering & <br />
        Web Developer
      </h2>
    </div>
  );
};

export default Hero;
