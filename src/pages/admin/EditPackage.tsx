import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TravelPackage } from "../../types/Package";
import PackageForm from "../../components/PackageForm";
import { toast } from "react-toastify";
import {
  useCreatePackage,
  usePackage,
  useUpdatePackage,
} from "../../api/package";

const EditPackage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { data: pkg } = usePackage(id);
  const createMutation = useCreatePackage();
  const updateMutation = useUpdatePackage();

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
    if (!pkg) return;
    setForm({
      from: pkg.from,
      to: pkg.to,
      startDate: pkg.startDate.slice(0, 10),
      endDate: pkg.endDate.slice(0, 10),
      basePrice: pkg.basePrice,
      food: pkg.includedServices.food,
      accommodation: pkg.includedServices.accommodation,
    });
  }, [pkg]);

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

    if (isEdit) {
      updateMutation.mutate(
        {
          data: payload,
          id,
        },
        {
          onSuccess: () => {
            toast.success("Package updated successfully ✅");
            navigate("/packages");
          },
          onError: (error) => {
            console.error(error);
            toast.error("Something went wrong 😓");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Package Created successfully ✅");
          navigate("/packages");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Something went wrong 😓");
        },
      });
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
