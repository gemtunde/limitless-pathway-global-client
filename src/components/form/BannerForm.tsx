"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormSubmitButton } from "@/components/form/FormSubmitButton";
import { UserPlus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ScholarshipFormData,
  scholarshipFormSchema,
} from "@/lib/admin/validations";
import ImageUploadZone from "./ImageUploadZone";
import { useState } from "react";

interface BannerFormProps {
  initialValues?: ScholarshipFormData;
  onSubmit: (values: ScholarshipFormData) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export function BannerForm({
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false,
}: BannerFormProps) {
  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      image: undefined,
    },
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  form.setValue("image", bannerFile);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        name="name"
        label="Name"
        placeholder="Enter banner name"
        control={form.control}
      />
      <FormInput
        label="Description"
        name="description"
        placeholder="Enter description"
        control={form.control}
      />
      <ImageUploadZone
        label="Banner Image"
        description="Upload a clear Banner Image"
        file={bannerFile}
        onChange={setBannerFile}
      />

      <div className="flex gap-2">
        <FormSubmitButton
          icon={
            isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )
          }
          iconPosition="start"
        >
          {isEditing ? "Save Changes" : "Create Banner"}
        </FormSubmitButton>

        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
