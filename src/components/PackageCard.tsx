import React from "react";
import { TravelPackage } from "../types/Package";

export type PackageCardProps = Pick<
  TravelPackage,
  "from" | "to" | "includedServices" | "startDate" | "endDate"
> & {
  price: number;
  isAdmin?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

const PackageCard: React.FC<PackageCardProps> = ({
  from,
  to,
  includedServices,
  startDate,
  endDate,
  price,
  onClick,
  onDelete,
  onEdit,
  isAdmin = false,
}) => {
  return (
    <div
      className="cursor-pointer bg-white shadow rounded-xl p-4 hover:shadow-lg transition border"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">
        {from} ➡ {to}
      </h3>
      <p className="text-sm text-gray-500">
        {startDate.slice(0, 10)} to {endDate.slice(0, 10)}
      </p>
      <p className="text-sm font-medium mt-1">₹{price}</p>
      <div className="mt-2 flex gap-2 flex-wrap">
        {includedServices.food && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            🍱 Food
          </span>
        )}
        {includedServices.accommodation && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            🏨 Accommodation
          </span>
        )}
      </div>
      {isAdmin && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={onEdit}
            className="flex-1 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-sm rounded-md text-white"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-sm rounded-md text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
