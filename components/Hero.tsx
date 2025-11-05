import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";
import HeroVideoButton from "./HeroVideoButton";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-64px)] max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">

        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          {config.hero?.title || "Welcome to Copenhagen"}
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          {config.hero?.subtitle || config.appDescription}
        </p>
        <HeroVideoButton videoId={config.hero?.videoId} />
        
      </div>
      <div className="lg:w-full">
        <Image
          src={config.hero?.backgroundImage || "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
      <a
        href="#host"
        aria-label="Scroll to host"
        className="absolute left-1/2 -translate-x-1/2 bottom-6 hidden md:flex flex-col items-center gap-1"
      >
        <span className="text-sm font-semibold text-primary">About Host</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-primary animate-bounce"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06l3.72 3.72V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
