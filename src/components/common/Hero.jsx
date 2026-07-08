import React from 'react';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white">
      {/* BACKGROUND GRAPHIC ELEMENT: A subtle gradient overlay over an immersive dark layout */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
      
      {/* PLACEHOLDER STOCK STREETWEAR IMAGE: High-quality professional fashion photo from Unsplash */}
      <img 
        src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1600&q=80" 
        alt="HUNT Premium Oversized Hoodies" 
        className="absolute inset-0 h-full w-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
      />

      {/* HERO CONTENT CONTAINER */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8 flex flex-col items-start justify-center min-h-[70vh]">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-widest uppercase text-neutral-200 backdrop-blur-sm animate-fade-in">
          Drop 01 / Winter Essentials
        </span>
        
        <h2 className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-6xl uppercase font-sans leading-none">
          Define Your <br />
          <span className="text-neutral-400">Comfort Zone.</span>
        </h2>
        
        <p className="mt-6 max-w-lg text-base text-neutral-300 font-light leading-relaxed">
          The HUNT Oversized Hoodie series is engineered with heavy 450GSM organic cotton. Minimalist aesthetic outside, absolute luxury warmth inside.
        </p>
        
        {/* CALL TO ACTION BUTTON BLOCK */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-6 font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-100 cursor-pointer shadow-lg active:scale-95">
            <span className="tracking-wide">Shop Collection</span>
            {/* Minimalist arrow that slides right slightly when hovering */}
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          
          <button className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-transparent px-6 font-medium text-white transition-colors duration-300 hover:bg-white/10 cursor-pointer backdrop-blur-sm">
            Explore Lookbook
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;