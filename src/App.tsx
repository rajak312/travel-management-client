import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManagePackages from "./pages/admin/ManagePackages";
import AdminBookings from "./pages/admin/AdminBookings";
import EditPackage from "./pages/admin/EditPackage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/packages" element={<ManagePackages />} />
      <Route path="/packages/new" element={<EditPackage />} />
      <Route path="/packages/edit/:id" element={<EditPackage />} />
      <Route path="/bookings" element={<AdminBookings />} />
    </Routes>
  );
}

export default App;
