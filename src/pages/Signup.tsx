import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // 🚀 redirect after signup
    } catch (err) {
      const axiosErr = err as import("axios").AxiosError<{ message: string }>;
      setError(axiosErr.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100 px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <h2 className="text-center text-2xl font-semibold text-indigo-600">
            Create a User Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" text="Sign Up" />
          </form>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
