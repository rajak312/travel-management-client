import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManagePackages from "./pages/admin/ManagePackages";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/admin/packages" element={<ManagePackages />} />
    </Routes>
  );
}

export default App;
