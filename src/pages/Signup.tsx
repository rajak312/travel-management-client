import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { UserSignUpPayload } from "../types/User";
import { useSignup } from "../api/auth";
import { AxiosError } from "axios";

const Signup: React.FC = () => {
  const [form, setForm] = useState<UserSignUpPayload>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const signupMutation = useSignup();

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") {
      navigate("/packages");
      return;
    }
    navigate("/dashboard");
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(form, {
      onSuccess: (data) => {
        console.log("data", data);
        login(data.user, data.token);
        toast.success("Account created successfully 🎉");
        navigate("/dashboard");
      },
      onError: (error: Error) => {
        let message = "Signup failed. Please try again.";

        if (
          error instanceof AxiosError &&
          error.response?.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
        ) {
          message = (error.response.data as { message: string }).message;
        }

        toast.error(message);
      },
    });
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

            <Button type="submit" children="Sign Up" />
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
