import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Booking } from "../../types/Booking";

const getStatus = (start: string, end: string) => {
  const today = new Date();
  const s = new Date(start);
  const e = new Date(end);
  if (e < today) return "Completed";
  if (s <= today && today <= e) return "Active";
  return "Upcoming";
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    const res = await api.get<Booking[]>("/bookings/all");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-950 mb-6">All Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md text-sm">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Package</th>
              <th className="px-4 py-2 text-left">Travel Dates</th>
              <th className="px-4 py-2 text-left">Services</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div className="font-medium">{booking.user.name}</div>
                  <div className="text-xs text-gray-500">
                    {booking.user.email}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {booking.travelPackage.from} ➡ {booking.travelPackage.to}
                </td>
                <td className="px-4 py-2">
                  {booking.travelPackage.startDate.slice(0, 10)} to{" "}
                  {booking.travelPackage.endDate.slice(0, 10)}
                </td>
                <td className="px-4 py-2">
                  {booking.selectedOptions.food && "🍱 Food "}
                  {booking.selectedOptions.accommodation && "🏨 Stay"}
                </td>
                <td className="px-4 py-2">₹{booking.totalPrice}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatus(
                        booking.travelPackage.startDate,
                        booking.travelPackage.endDate
                      ) === "Completed"
                        ? "bg-green-100 text-green-700"
                        : getStatus(
                            booking.travelPackage.startDate,
                            booking.travelPackage.endDate
                          ) === "Active"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {getStatus(
                      booking.travelPackage.startDate,
                      booking.travelPackage.endDate
                    )}
                  </span>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
