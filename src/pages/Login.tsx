import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { UserLoginPayload } from "../types/User";
import { useLogin } from "../api/auth";
import { AxiosError } from "axios";

const LoginTabs = () => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
  const [form, setForm] = useState<UserLoginPayload>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { mutate: loginMutate } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutate(form, {
      onSuccess: (data) => {
        login(data.user, data.token);
        toast.success(`Welcome back, ${data.user.name} 🎉`);

        if (data.user.role === "admin") {
          navigate("/packages");
        } else {
          navigate("/dashboard");
        }
      },

      onError: (error: Error) => {
        let message = "Login failed. Please try again.";
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

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100 px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 flex flex-col justify-between min-h-[500px]">
        {/* Tab Buttons - Full Width */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab("user")}
            className={`py-2 rounded-full text-sm font-semibold transition ${
              activeTab === "user"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`py-2 rounded-full text-sm font-semibold transition ${
              activeTab === "admin"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Login or Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" children="Continue" />
        </form>
        {/* Google Login (User Only) */}
        {activeTab === "user" && (
          <>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium py-2 borde3r rounded-md hover:bg-gray-100 transition"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>
            <p className="text-sm text-center text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </>
        )}

        {/* Terms */}
        <p className="text-xs text-center text-gray-400 mt-2">
          By continuing, you agree to the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Services
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginTabs;
