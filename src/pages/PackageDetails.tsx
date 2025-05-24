import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BackLink } from "../components/BackLink";
import { useCreateBooking } from "../api/booking";
import { usePackage } from "../api/package";

const PackageDetails = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [selectedFood, setSelectedFood] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const bookingMutation = useCreateBooking();
  const { data: pkg } = usePackage(id);

  useEffect(() => {
    if (pkg) {
      let price = pkg.basePrice;
      if (selectedFood) price += 200;
      if (selectedAccommodation) price += 500;
      setTotalPrice(price);
    }
  }, [pkg, selectedFood, selectedAccommodation]);

  const handleBooking = async () => {
    bookingMutation.mutate(
      {
        packageId: id,
        selectedOptions: {
          food: selectedFood,
          accommodation: selectedAccommodation,
        },
      },
      {
        onSuccess: () => {
          toast.success("Booking successful!");
          navigate("/my-bookings");
        },
        onError: () => {
          toast.error("Booking failed");
        },
      }
    );
  };

  if (!pkg) return <p className="text-center mt-10">Loading package...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 mt-6">
      <BackLink to="/dashboard" label="Back to Package List" />
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          {pkg.from} ➜ {pkg.to}
        </h1>

        {/* Travel Details Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Travel Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
            <div className="p-4 bg-gray-50 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="text-lg font-semibold">
                {new Date(pkg.startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">End Date</p>
              <p className="text-lg font-semibold">
                {new Date(pkg.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Base Price</p>
              <p className="text-lg font-semibold">₹{pkg.basePrice}</p>
            </div>
          </div>
        </div>

        {/* Optional Services */}
        <div className="space-y-4 mb-6">
          {pkg.includedServices.food && (
            <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 shadow-sm hover:shadow transition">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFood}
                  onChange={() => setSelectedFood(!selectedFood)}
                  className="h-5 w-5 accent-blue-600"
                />
                <span className="text-base">Include Food (+₹200)</span>
              </label>
            </div>
          )}

          {pkg.includedServices.accommodation && (
            <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 shadow-sm hover:shadow transition">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAccommodation}
                  onChange={() =>
                    setSelectedAccommodation(!selectedAccommodation)
                  }
                  className="h-5 w-5 accent-blue-600"
                />
                <span className="text-base">Include Accommodation (+₹500)</span>
              </label>
            </div>
          )}
        </div>

        {/* Total Price & Book Button */}
        <div className="text-xl font-semibold text-right text-blue-600 mb-6">
          Total Price: ₹{totalPrice}
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageDetails;
