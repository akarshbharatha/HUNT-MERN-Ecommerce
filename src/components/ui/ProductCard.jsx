import React from 'react';
import { FiHeart } from 'react-icons/fi';
// 1. IMPORT THE LINK COMPONENT FROM OUR ROUTER ENGINE
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md border border-neutral-100">
      
      {/* PRODUCT IMAGE CONTAINER */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* WISHLIST BUTTON */}
        <button 
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-600 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-black shadow-sm cursor-pointer z-10 active:scale-90"
          aria-label="Add to Wishlist"
        >
          <FiHeart className="h-4 w-4" />
        </button>

        {/* TAG BADGE */}
        {product.tag && (
          <span className="absolute top-3 left-3 rounded-md bg-neutral-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      {/* PRODUCT TEXT INFORMATION METADATA */}
      <div className="mt-4 flex flex-col flex-1 px-1">
        <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">
          {product.category}
        </span>
        
        <h3 className="mt-1 text-sm font-semibold text-neutral-800 tracking-tight transition-colors group-hover:text-black">
          {/* 2. SWAPPING <a> FOR <Link> AND WRITING A DYNAMIC ELEMENT PATH LINK */}
          <Link to={`/product/${product.id}`}>
            {/* This absolute span expands the clickable area to cover the entire card box */}
            <span className="absolute inset-0 z-0" />
            {product.name}
          </Link>
        </h3>
        
        {/* PRICE & BUTTON BOX */}
        <div className="mt-3 flex items-center justify-between border-t border-neutral-50 pt-2">
          <p className="text-base font-bold text-neutral-900">
            ${product.price.toFixed(2)}
          </p>
          <span className="text-xs font-medium text-neutral-500 group-hover:text-black transition-colors underline underline-offset-4 decoration-neutral-300 group-hover:decoration-black">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;