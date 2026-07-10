import React from "react";

function AddressCard({ address, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold">
            {address.fullName}
          </h2>

          {address.isDefault && (
            <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              Default
            </span>
          )}

        </div>

      </div>

      <div className="mt-5 space-y-1 text-gray-600">

        <p>{address.phone}</p>

        <p>{address.address}</p>

        <p>
          {address.city}, {address.state}
        </p>

        <p>{address.country}</p>

        <p>{address.pincode}</p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(address)}
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-800"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(address._id)}
          className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default AddressCard;