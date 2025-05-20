import React from "react";
import { useNavigate } from "react-router-dom";
import { TravelPackage } from "../types/Package";

const PackageCard: React.FC<{ pkg: TravelPackage }> = ({ pkg }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/packages/${pkg._id}`)}
      className="cursor-pointer bg-white shadow rounded-xl p-4 hover:shadow-lg transition border"
    >
      <h3 className="text-lg font-semibold">{pkg.from} ➡ {pkg.to}</h3>
      <p className="text-sm text-gray-500">
        {pkg.startDate.slice(0, 10)} to {pkg.endDate.slice(0, 10)}
      </p>
      <p className="text-sm font-medium mt-1">₹{pkg.basePrice}</p>
      <div className="mt-2 flex gap-2 flex-wrap">
        {pkg.includedServices.food && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            🍱 Food
          </span>
        )}
        {pkg.includedServices.accommodation && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            🏨 Accommodation
          </span>
        )}
      </div>
    </div>
  );
};

export default PackageCard;
