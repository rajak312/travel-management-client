import React from "react";

interface InputProps {
  label?: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      {...{
        name,
        type,
        value,
        placeholder,
        onChange,
      }}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
    />
  </div>
);

export default Input;
