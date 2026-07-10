import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-black mb-10">
        My Account
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Left Card */}
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mt-4">
            {user?.name}
          </h2>

          <p className="text-center text-gray-500 mt-2">
            {user?.email}
          </p>

        </div>

        {/* Right Menu */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Account Menu
          </h2>

          <div className="space-y-4">

            <Link
              to="/my-orders"
              className="block border rounded-xl p-4 hover:bg-gray-50"
            >
              📦 My Orders
            </Link>

            <Link
              to="/wishlist"
              className="block border rounded-xl p-4 hover:bg-gray-50"
            >
              ❤️ Wishlist
            </Link>

            <Link
              to="/addresses"
              className="block border rounded-xl p-4 hover:bg-gray-50"
            >
              📍 Saved Addresses
            </Link>

            <button
              onClick={logout}
              className="w-full text-left border rounded-xl p-4 text-red-600 hover:bg-red-50"
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;