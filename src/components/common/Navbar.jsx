import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
// 1. IMPORT OUR CUSTOM GLOBAL DATA HOOK
import { useCart } from '../../context/CartContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 2. EXTRACT THE LIVE RUNNING VALUE FROM GLOBAL STATE
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* BRAND LOGO ROUTING TO HOME */}
        <div className="flex-1 lg:flex-none">
          <Link to="/" className="text-2xl font-bold tracking-widest text-neutral-900">HUNT</Link>
        </div>

        {/* DESKTOP DESCRIPTIVE ROUTES */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
          <Link to="/shop" className="text-neutral-600 hover:text-neutral-900 transition-colors">Shop All</Link>
          <Link to="/shop" className="text-neutral-600 hover:text-neutral-900 transition-colors">Oversized Hoodies</Link>
          <Link to="/shop" className="text-neutral-600 hover:text-neutral-900 transition-colors">Sweatshirts</Link>
          <Link to="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">Our Story</Link>
        </nav>

        {/* UTILITY QUICK CONTROL TRIGGERS */}
        <div className="flex flex-1 items-center justify-end space-x-6">
          <button className="text-neutral-600 hover:text-neutral-900 p-1 cursor-pointer" aria-label="Search">
            <FiSearch className="h-5 w-5" />
          </button>
          
          <button className="text-neutral-600 hover:text-neutral-900 p-1 cursor-pointer relative" aria-label="Wishlist">
            <FiHeart className="h-5 w-5" />
          </button>

          {/* DYNAMIC CART ACCELERATOR LINK */}
          <Link 
            to="/cart" 
            className="text-neutral-600 hover:text-neutral-900 p-1 cursor-pointer relative block" 
            aria-label="Shopping Cart"
          >
            <FiShoppingBag className="h-5 w-5" />
            
            {/* DYNAMIC BADGE COUNT CONTAINER */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white transition-all duration-300 transform scale-110">
              {cartCount}
            </span>
          </Link>

          {/* MOBILE TOGGLE DRAWER HAMBURGER */}
          <button className="md:hidden text-neutral-600 hover:text-neutral-900 p-1 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE RESPONSIVE NAV INTERFACE OVERLAY */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 py-4 space-y-3 shadow-lg">
          <Link to="/shop" className="block text-base font-medium text-neutral-800 hover:text-neutral-900" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
          <Link to="/shop" className="block text-base font-medium text-neutral-800 hover:text-neutral-900" onClick={() => setIsMenuOpen(false)}>Oversized Hoodies</Link>
          <Link to="/shop" className="block text-base font-medium text-neutral-800 hover:text-neutral-900" onClick={() => setIsMenuOpen(false)}>Sweatshirts</Link>
          <Link to="/" className="block text-base font-medium text-neutral-800 hover:text-neutral-900" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;