import React, { useEffect, useState } from "react";

function AddressForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Address" : "Add Address"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="3"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

          </div>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />

            Default Address

          </label>

          <div className="flex justify-end gap-3 pt-5">

            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-lg"
            >
              Save Address
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddressForm;