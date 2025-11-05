import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Host from "@/components/Host";
import Home from "@/components/Home";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <Host />
        <Home />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
