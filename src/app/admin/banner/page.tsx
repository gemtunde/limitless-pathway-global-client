"use client";

import { useState } from "react";
import { AdminTable } from "@/components/table/AdminTable";
import Link from "next/link";
//import { EditDrawer } from "@/components/edit-drawer";
//import { BannerForm } from "@/components/forms/BannerForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditDrawer } from "@/components/form/EditDrawer ";
import { BannerForm } from "@/components/form/BannerForm";
import { DeleteDialog } from "@/components/form/DeleteDialog";

export default function BannerPage() {
  const [banners, setBanners] = useState([
    {
      id: "1",
      name: "Tunde",
      description: "Dance",
      image: "github",
    },
    {
      id: "2",
      name: "BabaTunde",
      description: "Sing",
      image: "mail",
    },
  ]);

  // const handleUpdate = (updatedBanner: ScholarshipType) => {
  //   setBanners(
  //     banners.map((b) => (b.id === updatedBanner.id ? updatedBanner : b))
  //   );
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-xl font-semibold">List Banner</h2>
        <Link href="/admin/banner/new">
          <Button>New Banner</Button>
        </Link>
      </div>

      {banners?.length > 0 ? (
        <AdminTable
          data={banners}
          columns={[
            { header: "Scholarship name", accessorKey: "name" },
            { header: "Description", accessorKey: "description" },
            { header: "Image", accessorKey: "image" },
          ]}
          onEdit={() => {}}
          // onDelete={(row) => console.log("Delete", row)}
          renderEdit={(row) => (
            <EditDrawer
              data={row}
              title="Edit Banner"
              trigger={
                <Button variant="ghost" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
              }
            >
              {(data, onSuccess) => (
                <BannerForm
                  initialValues={data}
                  onSubmit={(values) => {
                    console.log(values);
                    // handleUpdate(values);
                    onSuccess();
                  }}
                />
              )}
            </EditDrawer>
          )}
          onDelete={(row) => {
            setBanners(banners.filter((b) => b.id !== row.id));
            // Add your API call here if needed
            // await deleteBanner(row.id);
          }}
          // Optional: Custom delete button
          renderDelete={(row) => (
            <DeleteDialog
              onConfirm={() => {
                setBanners(banners.filter((b) => b.id !== row.id));
                // Add your API call here if needed
              }}
              title={`Delete ${row.name}?`}
              description="This will permanently remove this banner from your system."
            />
          )}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
