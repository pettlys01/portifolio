import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Philosophy from "@/components/Philosophy";
import TechStrip from "@/components/TechStrip";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Philosophy />
        <TechStrip />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
