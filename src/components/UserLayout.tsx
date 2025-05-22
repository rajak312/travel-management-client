import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const adminOptions = [
  { to: "/bookings", label: "Bookings" },
  { to: "/admin/users-bookings", label: "Users & Bookings" },
];

const userOptions = [{ to: "/my-bookings", label: "My Bookings" }];

const UserLayout: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const isAdmin = user?.role === "admin";
  const options = isAdmin ? adminOptions : userOptions;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className=" text-white pt-4 flex justify-between items-center relative px-8 ">
        <Link
          to={isAdmin ? "/packages" : "/dashboard"}
          className="text-xl font-bold text-black"
        >
          <FaPlaneDeparture color="blue" size={28} />
        </Link>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="focus:outline-none"
          >
            <FaUserCircle color="black" size={28} />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg z-10">
              {options.map((option) => (
                <Link
                  to={option.to}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenMenu(false)}
                >
                  {option.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
