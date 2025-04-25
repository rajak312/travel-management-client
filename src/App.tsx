import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/user/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
