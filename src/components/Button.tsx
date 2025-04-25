import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
  >
    {text}
  </button>
);

export default Button;
