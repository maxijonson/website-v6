import HeroLogo from "./hero-logo/hero-logo";
import React, { Suspense } from "react";

const LogoAngular = React.lazy(() => import("$/svg/logo/logo-angular.svg"));
const LogoCsharp = React.lazy(() => import("$/svg/logo/logo-csharp.svg"));
const LogoCss = React.lazy(() => import("$/svg/logo/logo-css.svg"));
const LogoFirebase = React.lazy(() => import("$/svg/logo/logo-firebase.svg"));
const LogoGcp = React.lazy(() => import("$/svg/logo/logo-gcp.svg"));
const LogoHtml = React.lazy(() => import("$/svg/logo/logo-html.svg"));
const LogoJava = React.lazy(() => import("$/svg/logo/logo-java.svg"));
const LogoJs = React.lazy(() => import("$/svg/logo/logo-javascript.svg"));
const LogoMongodb = React.lazy(() => import("$/svg/logo/logo-mongodb.svg"));
const LogoMysql = React.lazy(() => import("$/svg/logo/logo-mysql.svg"));
const LogoNest = React.lazy(() => import("$/svg/logo/logo-nest.svg"));
const LogoNext = React.lazy(() => import("$/svg/logo/logo-next.svg"));
const LogoNode = React.lazy(() => import("$/svg/logo/logo-node.svg"));
const LogoPython = React.lazy(() => import("$/svg/logo/logo-python.svg"));
const LogoReact = React.lazy(() => import("$/svg/logo/logo-react.svg"));
const LogoSanity = React.lazy(() => import("$/svg/logo/logo-sanity.svg"));
const LogoSass = React.lazy(() => import("$/svg/logo/logo-sass.svg"));
const LogoTs = React.lazy(() => import("$/svg/logo/logo-typescript.svg"));

const HeroBackground = () => {
  return (
    <Suspense fallback={null}>
      <HeroLogo
        logo={LogoReact}
        containerClassName="rotate-[0deg]"
        className="drop-shadow-[0_0_5px_#53C1DE] animation-delay-[0ms]"
      />
      <HeroLogo
        logo={LogoNest}
        containerClassName="rotate-[20deg]"
        className="drop-shadow-[0_0_5px_#ea2845] animation-delay-[2100ms]"
      />
      <HeroLogo
        logo={LogoNode}
        containerClassName="rotate-[40deg]"
        className="drop-shadow-[0_0_5px_#6cc24a] animation-delay-[900ms]"
      />
      <HeroLogo
        logo={LogoTs}
        containerClassName="rotate-[60deg]"
        className="drop-shadow-[0_0_5px_#3178c6] animation-delay-[3900ms]"
      />
      <HeroLogo
        logo={LogoFirebase}
        containerClassName="rotate-[80deg]"
        className="drop-shadow-[0_0_5px_#fcca3f] animation-delay-[3300ms]"
      />
      <HeroLogo
        logo={LogoAngular}
        containerClassName="rotate-[100deg]"
        className="drop-shadow-[0_0_5px_#DD0031] animation-delay-[1500ms]"
      />
      <HeroLogo
        logo={LogoCsharp}
        containerClassName="rotate-[120deg]"
        className="drop-shadow-[0_0_5px_#7F3A86] animation-delay-[4500ms]"
      />
      <HeroLogo
        logo={LogoCss}
        containerClassName="rotate-[140deg]"
        className="drop-shadow-[0_0_5px_#33AADD] animation-delay-[5100ms]"
      />
      <HeroLogo
        logo={LogoGcp}
        containerClassName="rotate-[160deg]"
        className="drop-shadow-[0_0_5px_#4285F4] animation-delay-[1200ms]"
      />
      <HeroLogo
        logo={LogoJava}
        containerClassName="rotate-[180deg]"
        className="drop-shadow-[0_0_5px_#E76F00] animation-delay-[2700ms]"
      />
      <HeroLogo
        logo={LogoJs}
        containerClassName="rotate-[200deg]"
        className="drop-shadow-[0_0_5px_#f7df1e] animation-delay-[1800ms]"
      />
      <HeroLogo
        logo={LogoMongodb}
        containerClassName="rotate-[220deg]"
        className="drop-shadow-[0_0_5px_#48a547] animation-delay-[600ms]"
      />
      <HeroLogo
        logo={LogoNext}
        containerClassName="rotate-[240deg]"
        className="drop-shadow-[0_0_5px_#000000] animation-delay-[300ms] dark:drop-shadow-[0_0_5px_#FFFFFF]"
      />
      <HeroLogo
        logo={LogoHtml}
        containerClassName="rotate-[260deg]"
        className="drop-shadow-[0_0_5px_#F16529] animation-delay-[4800ms]"
      />
      <HeroLogo
        logo={LogoSanity}
        containerClassName="rotate-[280deg]"
        className="drop-shadow-[0_0_5px_#F04939] animation-delay-[3000ms]"
      />
      <HeroLogo
        logo={LogoPython}
        containerClassName="rotate-[300deg]"
        className="drop-shadow-[0_0_5px_#F9C600] animation-delay-[4200ms]"
      />
      <HeroLogo
        logo={LogoSass}
        containerClassName="rotate-[320deg]"
        className="drop-shadow-[0_0_5px_#CC6699] animation-delay-[2400ms]"
      />
      <HeroLogo
        logo={LogoMysql}
        containerClassName="rotate-[340deg]"
        className="drop-shadow-[0_0_5px_#00758f] animation-delay-[3600ms]"
      />
    </Suspense>
  );
};

export default HeroBackground;
