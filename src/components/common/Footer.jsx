import React from 'react';
// Importing brand social icons from react-icons
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-600">
      {/* 1. MAIN CONTENT LINKS GRID */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* COLUMN 1: BRAND STATEMENT */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold tracking-widest text-neutral-900 uppercase">HUNT</h3>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              Premium streetwear curated by AtlaQuality. Elevating your daily rotation with heavyweight comfort and clean aesthetics.
            </p>
            {/* SOCIAL MEDIA HOVER HANDLERS */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-black transition-colors" aria-label="Instagram">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-black transition-colors" aria-label="Twitter">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-black transition-colors" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: SHOP CATEGORIES */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><a href="#" className="hover:text-black transition-colors">Shop All Drops</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Oversized Hoodies</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Classic Hoodies</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sweatshirts</a></li>
            </ul>
          </div>

          {/* COLUMN 3: COMPANY CHANNELS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><a href="#" className="hover:text-black transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Press</a></li>
            </ul>
          </div>

          {/* COLUMN 4: CUSTOMER SUPPORT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">FAQ & Sizing</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 2. SUB-FOOTER: COPYRIGHT & LEGAL COMPLIANCE TERMS */}
      <div className="border-t border-neutral-100 bg-neutral-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:px-6 md:flex-row lg:px-8 space-y-4 md:space-y-0 text-xs font-light text-neutral-400">
          <p>© {new Date().getFullYear()} HUNT / AtlaQuality. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-neutral-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-600 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;