import { useUsersAndBookings } from "../../api/booking";

const AdminUserBookings = () => {
  const { data } = useUsersAndBookings();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Users and Their Bookings
      </h2>

      {data?.map(({ user, bookings }) => (
        <div
          key={user._id}
          className="bg-white rounded-xl shadow mb-6 p-5 space-y-4"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {bookings.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No bookings yet</p>
          ) : (
            <table className="w-full text-sm border-t">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="px-3 py-2">From</th>
                  <th className="px-3 py-2">To</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">End Date</th>
                  <th className="px-3 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2">{b.travelPackage.from}</td>
                    <td className="px-3 py-2">{b.travelPackage.to}</td>
                    <td className="px-3 py-2">
                      {formatDate(b.travelPackage.startDate)}
                    </td>
                    <td className="px-3 py-2">
                      {formatDate(b.travelPackage.endDate)}
                    </td>
                    <td className="px-3 py-2">₹{b.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminUserBookings;
