import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { TravelPackage } from "../../types/Package";

const ManagePackages: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    const res = await api.get<TravelPackage[]>("/packages");
    setPackages(res.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id: string) => {
    await api.delete(`/packages/${id}`);
    fetchPackages();
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Manage Travel Packages</h2>
        <button
          onClick={() => navigate("/packages/new")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition border"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {pkg.from} ➡ {pkg.to}
            </h3>
            <p className="text-sm text-gray-500">
              {pkg.startDate.slice(0, 10)} to {pkg.endDate.slice(0, 10)}
            </p>
            <p className="text-sm font-medium mt-2">Price: ₹{pkg.basePrice}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {pkg.includedServices.food && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  🍱 Food
                </span>
              )}
              {pkg.includedServices.accommodation && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  🏨 Accommodation
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/packages/edit/${pkg._id}`)}
                className="flex-1 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-sm rounded-md text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id!)}
                className="flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-sm rounded-md text-white"
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
