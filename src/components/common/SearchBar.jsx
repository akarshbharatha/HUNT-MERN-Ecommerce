import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

export default SearchBar;