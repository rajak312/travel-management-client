import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManagePackages from "./pages/admin/ManagePackages";
import AdminBookings from "./pages/admin/AdminBookings";
import EditPackage from "./pages/admin/EditPackage";
import AdminUserBookings from "./pages/admin/AdminUserBookings";
import UserDashboard from "./pages/UserDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PackageDetails from "./pages/PackageDetails";
import UserBookings from "./pages/UserBookings";
import UserLayout from "./components/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/packages/book/:id" element={<PackageDetails />} />
            <Route path="/my-bookings" element={<UserBookings />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<UserLayout />}>
            <Route path="/packages" element={<ManagePackages />} />
            <Route path="/packages/new" element={<EditPackage />} />
            <Route path="/packages/edit/:id" element={<EditPackage />} />
            <Route path="/bookings" element={<AdminBookings />} />
            <Route
              path="/admin/users-bookings"
              element={<AdminUserBookings />}
            />
            <Route path="/packages/book/:id" element={<PackageDetails />} />
            <Route path="/my-bookings" element={<UserBookings />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
