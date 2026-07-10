import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAddresses,
  deleteAddress,
  createAddress,
  updateAddress,
} from "../services/addressService";
import AddressCard from "../components/address/AddressCard";
import toast from "react-hot-toast";
import AddressForm from "../components/address/AddressForm";
function Addresses() {
  const { token } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);
  const fetchAddresses = async () => {
    try {
      const data = await getAddresses(token);
      setAddresses(data.addresses);
    } catch (error) {
      toast.error("Failed to load addresses.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    try {
      await deleteAddress(id, token);

      toast.success("Address deleted.");

      setAddresses((prev) =>
        prev.filter((address) => address._id !== id)
      );
    } catch (error) {
      toast.error("Unable to delete address.");
    }
  };

  const handleEdit = (address) => {
  setEditingAddress(address);
  setShowForm(true);
};
const handleSubmit = async (formData) => {
  try {
    if (editingAddress) {
      await updateAddress(
        editingAddress._id,
        formData,
        token
      );

      toast.success("Address updated.");
    } else {
      await createAddress(formData, token);

      toast.success("Address added.");
    }

    setShowForm(false);
    setEditingAddress(null);

    await fetchAddresses();

  } catch (error) {
    toast.error("Failed to save address.");
  }
};
  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Addresses...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-black">
          Saved Addresses
        </h1>

        <button
  onClick={() => {
    setEditingAddress(null);
    setShowForm(true);
  }}
  className="bg-black text-white px-5 py-3 rounded-lg hover:bg-neutral-800"
>
  + Add Address
</button>

      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-bold">
            No saved addresses.
          </h2>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}

        </div>
      )}
      {showForm && (
  <AddressForm
    initialData={editingAddress}
    onSubmit={handleSubmit}
    onCancel={() => {
      setShowForm(false);
      setEditingAddress(null);
    }}
  />
)}

    </div>
  );
}

export default Addresses;