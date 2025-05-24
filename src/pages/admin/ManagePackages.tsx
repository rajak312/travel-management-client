import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TravelPackage } from "../../types/Package";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useDeletePackage, usePackages } from "../../api/package";

type Status = "all" | "upcoming" | "active" | "completed";

const ManagePackages: React.FC = () => {
  const [filter, setFilter] = useState<Status>("all");
  const navigate = useNavigate();
  const { data: packages = [], isPending: isPackagePending } = usePackages();
  const { mutate: deletePackage, isPending: isDeletePending } =
    useDeletePackage();

  const handleDelete = (id: string) => {
    deletePackage(id, {
      onSuccess: () => toast.success("Package deleted successfully 🗑️"),
      onError: () => toast.error("Failed to delete package"),
    });
  };

  const getStatus = (pkg: TravelPackage): Status => {
    const today = new Date();
    const start = new Date(pkg.startDate);
    const end = new Date(pkg.endDate);

    if (end < today) return "completed";
    if (start > today) return "upcoming";
    return "active";
  };

  const filtered =
    filter === "all"
      ? packages
      : packages.filter((pkg) => getStatus(pkg) === filter);

  const renderPackage = () => {
    if (isPackagePending) return <Loader />;
    return (
      <>
        <div className="flex gap-3 mb-6">
          {["all", "upcoming", "active", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as Status)}
              className={`capitalize px-4 py-1.5 rounded-full text-sm font-medium ${
                filter === status
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          isPackagePending ? (
            <Loader />
          ) : (
            <p className="text-center text-gray-500">No packages to display.</p>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((pkg) => (
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
                <p className="text-sm font-medium mt-2">
                  Price: ₹{pkg.basePrice}
                </p>

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
        )}
      </>
    );
  };
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/packages/new")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add New
        </button>
      </div>
      {renderPackage()}
    </div>
  );
};

export default ManagePackages;
