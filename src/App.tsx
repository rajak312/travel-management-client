import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManagePackages from "./pages/admin/ManagePackages";
import AdminBookings from "./pages/admin/AdminBookings";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/admin/packages" element={<ManagePackages />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
    </Routes>
  );
}

export default App;
