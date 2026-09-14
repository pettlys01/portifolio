import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Showcase from "@/components/Showcase";
import SiteFooter from "@/components/SiteFooter";
import Solutions from "@/components/Solutions";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Showcase />
        <Solutions />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
