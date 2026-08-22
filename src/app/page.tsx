import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import Nav from "@/components/Nav";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Philosophy />
        <Stack />
        <Included />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
