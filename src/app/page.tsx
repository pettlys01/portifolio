import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import Nav from "@/components/Nav";
import Philosophy from "@/components/Philosophy";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Philosophy />
        <Included />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
