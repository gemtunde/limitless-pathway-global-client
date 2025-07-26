"use client";

import { useCallback, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

type Props = {
  label: string;
  description?: string;
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function ImageUploadZone({
  label,
  description,
  file,
  onChange,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0];
      if (!selected) return;
      const maxSizeMB = 3;
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (selected.size > maxSizeMB * 1024 * 1024) {
        setError(`Image too large. Max size is ${maxSizeMB}MB`);
        return;
      }

      if (!allowedTypes.includes(selected.type)) {
        setError("Invalid file type. Use JPEG, PNG, or WEBP.");
        return;
      }
      setError(null);
      if (selected) onChange(selected);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  const handleRemove = () => onChange(null);

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-gray-700">{label}</p>
      <p className="text-sm font-medium text-gray-700">{description}</p>

      {file ? (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
          <Image
            src={URL.createObjectURL(file)}
            alt="preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Drag & drop or <span className="underline">browse</span>
          </p>
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
