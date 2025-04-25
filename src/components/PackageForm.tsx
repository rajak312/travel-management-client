import React from "react";

interface PackageFormProps {
  form: {
    from: string;
    to: string;
    startDate: string;
    endDate: string;
    basePrice: number;
    food: boolean;
    accommodation: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({
  form,
  onChange,
  onSubmit,
  isEditing,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-5 border"
    >
      <h2 className="text-xl font-semibold text-gray-700">
        {isEditing ? "Edit Package" : "Create New Package"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            From
          </label>
          <input
            type="text"
            name="from"
            value={form.from}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            To
          </label>
          <input
            type="text"
            name="to"
            value={form.to}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Base Price (₹)
        </label>
        <input
          type="number"
          name="basePrice"
          value={form.basePrice}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="flex gap-6 items-center pt-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <input
            type="checkbox"
            name="food"
            checked={form.food}
            onChange={onChange}
          />
          Food
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <input
            type="checkbox"
            name="accommodation"
            checked={form.accommodation}
            onChange={onChange}
          />
          Accommodation
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        {isEditing ? "Update Package" : "Add Package"}
      </button>
    </form>
  );
};

export default PackageForm;
