import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManagePackages from "./pages/admin/ManagePackages";
import AdminBookings from "./pages/admin/AdminBookings";
import EditPackage from "./pages/admin/EditPackage";
import AdminUserBookings from "./pages/admin/AdminUserBookings";
import Home from "./pages/Home"; // ✅ Import Home
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/packages" element={<ManagePackages />} />
        <Route path="/packages/new" element={<EditPackage />} />
        <Route path="/packages/edit/:id" element={<EditPackage />} />
        <Route path="/bookings" element={<AdminBookings />} />
        <Route path="/admin/users-bookings" element={<AdminUserBookings />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
