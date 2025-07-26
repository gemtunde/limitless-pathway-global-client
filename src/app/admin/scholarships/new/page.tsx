"use client";

import { useRouter } from "next/navigation";
//import { BannerForm } from "@/components/forms/BannerForm";
import { ScholarshipFormData } from "@/lib/admin/validations";
import { BannerForm } from "@/components/form/BannerForm";

export default function NewBanner() {
  const router = useRouter();

  const handleSubmit = (values: ScholarshipFormData) => {
    console.log("VALUES", values);
    //setData((prev) => [...prev, values]);
    router.push("/admin/scholarships");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Create Scholarship</h2>
      <BannerForm onSubmit={handleSubmit} />
    </div>
  );
}
