import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import PackageForm from "../../components/PackageForm";
import { TravelPackage } from "../../types/Package";

const ManagePackages: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [form, setForm] = useState({
    from: "",
    to: "",
    startDate: "",
    endDate: "",
    basePrice: 0,
    food: false,
    accommodation: false,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchPackages = async () => {
    const res = await api.get<TravelPackage[]>("/packages");
    setPackages(res.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TravelPackage = {
      from: form.from,
      to: form.to,
      startDate: form.startDate,
      endDate: form.endDate,
      basePrice: Number(form.basePrice),
      includedServices: {
        food: form.food,
        accommodation: form.accommodation,
      },
    };

    if (editId) {
      await api.put(`/packages/${editId}`, payload);
    } else {
      await api.post("/packages", payload);
    }

    setForm({
      from: "",
      to: "",
      startDate: "",
      endDate: "",
      basePrice: 0,
      food: false,
      accommodation: false,
    });
    setEditId(null);
    fetchPackages();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/packages/${id}`);
    fetchPackages();
  };

  const handleEdit = (pkg: TravelPackage) => {
    setForm({
      from: pkg.from,
      to: pkg.to,
      startDate: pkg.startDate.slice(0, 10),
      endDate: pkg.endDate.slice(0, 10),
      basePrice: pkg.basePrice,
      food: pkg.includedServices?.food,
      accommodation: pkg.includedServices?.accommodation,
    });
    setEditId(pkg._id || null);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 px-4">
      <h2 className="text-2xl font-bold text-indigo-700">
        Manage Travel Packages
      </h2>

      <PackageForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={!!editId}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border p-4 rounded shadow bg-white space-y-1"
          >
            <h3 className="font-semibold text-lg">
              {pkg.from} ➡ {pkg.to}
            </h3>
            <p className="text-sm text-gray-600">
              Start: {pkg.startDate.slice(0, 10)}
            </p>
            <p className="text-sm text-gray-600">
              End: {pkg.endDate.slice(0, 10)}
            </p>
            <p className="text-sm">Price: ₹{pkg.basePrice}</p>
            <p className="text-sm">
              Services: {pkg.includedServices.food && "Food"}{" "}
              {pkg.includedServices.accommodation && "Accommodation"}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(pkg)}
                className="px-3 py-1 text-sm bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id!)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePackages;
