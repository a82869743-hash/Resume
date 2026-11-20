import { lazy, Suspense, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { LoadingProvider, useLoading } from "./context/LoadingProvider";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP, prefersReducedMotion, isTouch } from "./lib/gsap";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import SkillMarquee from "./components/SkillMarquee";
import Career from "./components/Career";
import Achievements from "./components/Achievements";
import Work from "./components/Work";
import Education from "./components/Education";
import Contact from "./components/Contact";

const Toolkit = lazy(() => import("./components/Toolkit"));

const Site = () => {
  const { loaded } = useLoading();

  useEffect(() => {
    document.body.classList.toggle("is-loading", !loaded);
    if (loaded) requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [loaded]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.25,
      effects: true,
      smoothTouch: false,
      normalizeScroll: !isTouch(),
    });
    smoother.scrollTop(0);
    gsap.ticker.lagSmoothing(0);
  });

  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />
      <div className="grain" aria-hidden />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Landing />
            <About />
            <WhatIDo />
            <SkillMarquee />
            <Work />
            <Career />
            <Achievements />
            <Suspense fallback={<div style={{ height: "100vh" }} />}>
              <Toolkit />
            </Suspense>
            <Education />
          </main>
          <Contact />
        </div>
      </div>
      <Analytics />
    </>
  );
};

const App = () => (
  <LoadingProvider>
    <Site />
  </LoadingProvider>
);

export default App;
