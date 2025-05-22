import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { Booking } from "../types/Booking";
import PackageCard from "../components/PackageCard";

const UserBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (err) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        You have no bookings yet.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-bold ">My Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {bookings.map((booking) => {
          const { travelPackage, selectedOptions, totalPrice } = booking;
          const { _id, endDate, from, startDate, to } = travelPackage;
          return (
            <PackageCard
              includedServices={selectedOptions}
              {...{
                _id,
                endDate,
                from,
                startDate,
                to,
              }}
              price={totalPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserBookings;
