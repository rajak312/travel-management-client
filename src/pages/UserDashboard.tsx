import React, { useEffect, useState } from "react";
import { TravelPackage } from "../types/Package";
import PackageCard from "../components/PackageCard";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { usePackages } from "../api/package";
import { useMyBookings } from "../api/booking";

const UserDashboard: React.FC = () => {
  const { data } = usePackages();
  const { data: bookings } = useMyBookings();
  const [filtered, setFiltered] = useState<TravelPackage[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const bookedPackageIds =
    bookings?.map((b) => b.travelPackage._id?.toString?.()) ?? [];

  useEffect(() => {
    if (!data) return;
    const filteredData = data
      .filter(
        (pkg) =>
          (!from || pkg.from.toLowerCase().includes(from.toLowerCase())) &&
          (!to || pkg.to.toLowerCase().includes(to.toLowerCase())) &&
          (!startDate || new Date(pkg.startDate) >= new Date(startDate)) &&
          (!endDate || new Date(pkg.endDate) <= new Date(endDate))
      )
      .sort((a, b) =>
        sort === "asc" ? a.basePrice - b.basePrice : b.basePrice - a.basePrice
      );

    setFiltered(filteredData);
  }, [data, from, to, startDate, endDate, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Find Your Perfect Trip 🌍
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
        <Input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button
          onClick={() => {
            /* No-op, handled by useEffect */
          }}
        >
          Apply Filters
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">Available Packages</h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">
          No packages found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((pkg) => {
            const isBooked = bookedPackageIds.includes(pkg._id?.toString()!);
            return (
              <PackageCard
                key={pkg._id}
                endDate={pkg.endDate}
                from={pkg.from}
                includedServices={pkg.includedServices}
                price={pkg.basePrice}
                startDate={pkg.startDate}
                to={pkg.to}
                disabled={isBooked}
                onClick={() =>
                  !isBooked && navigate(`/packages/book/${pkg._id}`)
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
