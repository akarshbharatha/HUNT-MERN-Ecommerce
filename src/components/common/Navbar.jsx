import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiHeart,
  FiSearch,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiPackage,
  FiLogOut,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  const wishlistCount = wishlist.length;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-widest"
        >
          HUNT
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link
            to="/shop"
            className="hover:text-black transition"
          >
            Shop
          </Link>

          <Link
            to="/shop"
            className="hover:text-black transition"
          >
            Hoodies
          </Link>

          <Link
            to="/shop"
            className="hover:text-black transition"
          >
            Sweatshirts
          </Link>

          <Link
            to="/"
            className="hover:text-black transition"
          >
            Our Story
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <button>
            <FiSearch className="text-xl hover:text-black" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative"
          >
            <FiHeart className="text-xl hover:text-red-500 transition" />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative"
          >
            <FiShoppingBag className="text-xl hover:text-black transition" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Logged In */}
          {user ? (
            <div className="relative hidden lg:block">

              <button
                onClick={() =>
                  setShowUserMenu(!showUserMenu)
                }
                className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-neutral-100 transition"
              >
                {/* <span className="font-semibold">
                  {user.name.split(" ")[0]}
                </span> */}
                <Link
  to="/profile"
  className="hidden lg:block font-semibold hover:text-black"
>
  👋 {user.name.split(" ")[0]}
</Link>

                <FiChevronDown />
              </button>

              {showUserMenu && (

                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border bg-white shadow-xl">

                  <div className="border-b p-4">

                    <h3 className="font-bold">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>

                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-100"
                  >
                    <FiUser />
                    My Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-100"
                  >
                    <FiPackage />
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-100"
                  >
                    <FiHeart />
                    Wishlist
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut />
                    Logout
                  </button>

                </div>

              )}

            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden lg:block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden lg:block rounded-lg bg-black px-4 py-2 text-white"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className="md:hidden"
          >
            {isMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
                    {/* End Right Side */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">

          <div className="space-y-1 p-4">

            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2 hover:bg-neutral-100"
            >
              Shop
            </Link>

            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2 hover:bg-neutral-100"
            >
              Hoodies
            </Link>

            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2 hover:bg-neutral-100"
            >
              Sweatshirts
            </Link>

            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2 hover:bg-neutral-100"
            >
              Our Story
            </Link>

            <hr className="my-3" />

            {user ? (
              <>
                <div className="px-3 py-2">

                  <p className="font-bold">
                    {user.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>

                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-neutral-100"
                >
                  <FiUser />
                  My Profile
                </Link>

                <Link
                  to="/my-orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-neutral-100"
                >
                  <FiPackage />
                  My Orders
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-neutral-100"
                >
                  <FiHeart />
                  Wishlist
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-neutral-100"
                >
                  <FiShoppingBag />
                  Cart ({cartCount})
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-3 flex w-full items-center gap-3 rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-neutral-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg bg-black px-3 py-2 text-white"
                >
                  Register
                </Link>
                <Link
  to="/addresses"
  className="hidden lg:block text-sm font-medium text-neutral-700 hover:text-black"
>
  Addresses
</Link>
              </>
            )}

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;