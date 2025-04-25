import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { TravelPackage } from "../../types/Package";
import PackageForm from "../../components/PackageForm";
import { toast } from "react-toastify";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    from: "",
    to: "",
    startDate: "",
    endDate: "",
    basePrice: 0,
    food: false,
    accommodation: false,
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/packages/${id}`).then((res) => {
        const pkg = res.data;
        setForm({
          from: pkg.from,
          to: pkg.to,
          startDate: pkg.startDate.slice(0, 10),
          endDate: pkg.endDate.slice(0, 10),
          basePrice: pkg.basePrice,
          food: pkg.includedServices.food,
          accommodation: pkg.includedServices.accommodation,
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: TravelPackage = {
      from: form.from,
      to: form.to,
      startDate: form.startDate,
      endDate: form.endDate,
      basePrice: Number(form.basePrice),
      includedServices: {
        food: form.food,
        accommodation: form.accommodation,
      },
    };

    try {
      if (isEdit) {
        await api.put(`/packages/${id}`, payload);
        toast.success("Package updated successfully ✅");
      } else {
        await api.post("/packages", payload);
        toast.success("Package created successfully 🎉");
      }

      navigate("/packages");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong 😓");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          onClick={() => navigate("/packages")}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to Package List
        </button>
      </div>

      <PackageForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={isEdit}
      />
    </div>
  );
};

export default EditPackage;
