import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useLenisGsapSync } from "./hooks/useLenisGsapSync";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function Sections() {
  useLenisGsapSync();
  return (
    <div className="min-h-screen w-full bg-bone">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <Sections />;
  }

  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 0.9, smoothWheel: true }}>
      <Sections />
    </ReactLenis>
  );
}
