import { Suspense } from "react";
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
      <Suspense fallback={<div className="h-16 bg-base-200"></div>}>
        <Header />
      </Suspense>
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
