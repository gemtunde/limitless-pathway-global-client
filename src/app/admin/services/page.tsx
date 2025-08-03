"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Calendar, Loader2, X } from "lucide-react";
import {
  Column,
  DataTable,
  BaseTableData,
  //FilterOption,
} from "@/components/admin/table/DataTable";
import { TableSkeleton } from "@/components/table/TableSkeleton";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useService } from "@/hooks/admin/queries/service";
import {
  useCreateService,
  useDeleteService,
  useUpdateService,
} from "@/hooks/admin/mutations/service/useService";
import { formatDate } from "@/lib/helpers";

// Zod schema for form validation
const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  //color: z.string().min(1, "Color is required"),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features is required"),
  //icon: z.string().min(1, "Icon is required"),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export interface Service extends BaseTableData {
  id: string;
  _id: string;
  title: string;
  //color: string;
  description: string;
  features: string;
  //icon: string;
  createdAt: Date;
  updatedAt: Date;
}

// Options for form selects
// const iconOptions = [
//   { value: "Users", label: "Users" },
//   { value: "GraduationCap", label: "GraduationCap" },
//   { value: "FileText", label: "FileText" },
//   { value: "Plane", label: "Plane" },
//   { value: "CreditCard", label: "CreditCard" },
//   { value: "CheckCircle", label: "CheckCircle" },
// ];

// const colorOptions = [
//   { value: "red", label: "Red" },
//   { value: "green", label: "Green" },
//   { value: "blue", label: "Blue" },
//   { value: "yellow", label: "Yellow" },
//   { value: "purple", label: "Purple" },
//   { value: "orange", label: "Orange" },
// ];

export default function ServicesPage() {
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Service | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewService, setViewService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editId, setEditId] = useState<string>("");

  // Form setup
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      // color: "",
      features: "",
      // icon: "",
      description: "",
    },
  });

  // Data fetching and mutations
  const [currentPage, setCurrentPage] = useState(1);
  const { data: serviceData, isLoading } = useService(currentPage, 10);
  const services = serviceData?.data || [];

  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  // // Transform data to ensure it has the required id field
  const transformedServices: Service[] = services.map((service: Service) => ({
    ...service,
    id: service._id || service.id, // Ensure id field exists
  }));

  // Form submission handler
  const onSubmit = async (data: ServiceFormData) => {
    try {
      if (editingService) {
        const res = await updateService.mutateAsync({ data, id: editId });

        toast.success(res.message || "Service has been updated successfully!");
      } else {
        const res = await createService.mutateAsync(data);
        toast.success(res.message || "Service has been created successfully!");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingService(null);
  };

  // Event handlers for table actions
  const handleEdit = (Service: Service) => {
    setEditId(Service._id);
    setEditingService(Service);
    form.reset({
      ...Service,
    });
    setIsDialogOpen(true);
  };

  const handleView = (Service: Service) => {
    setViewService(Service);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (Service: Service) => {
    setIsDeleteDialogOpen(true);
    setDeleteData(Service);
  };

  const handleDeleteService = async () => {
    try {
      const res = await deleteService.mutateAsync(deleteData?._id as string);
      toast.success(res.message || "Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete Service");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteData(null);
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    form.reset({
      title: "",

      features: "",

      description: "",
    });
    setIsDialogOpen(true);
  };

  // Column definitions with proper typing
  const columns: Column<Service>[] = [
    { key: "title", label: "Title", sortable: true },
    { key: "description", label: "Description", sortable: true },

    { key: "features", label: "Features" },
    // {
    //   key: "createdAt",
    //   label: "Created At",
    //   render: (value) => (
    //     <div className="flex items-center">
    //       <Calendar className="h-4 w-4 mr-1" />
    //       {formatDate(value as string)}
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Services Management
          </h1>
          <p className="text-muted-foreground">
            Manage Service opportunities and funding information
          </p>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable<Service>
          data={transformedServices}
          columns={columns}
          title="Services"
          searchPlaceholder="Search services..."
          onAdd={handleAdd}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          //filterOptions={filterOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update the Service information below."
                : "Fill in the details to create a new Service opportunity."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Service title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter features..e.g Visa checklist, mock interviews, embassy prep, and success tips"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select academic level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colorOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              disabled={!option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {iconOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              disabled={!option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              disabled={!option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description of the service"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createService.isPending}>
                  {editingService ? (
                    updateService.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Service"
                    )
                  ) : createService.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Service"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto items-center justify-center">
          <DialogHeader>
            <DialogTitle className="p-4 text">
              Are you sure you want to delete this Service:
              <span className="text-red-500">
                {deleteData ? ` ${deleteData.title}` : ""}
              </span>
            </DialogTitle>
            <DialogDescription className="ml-4">
              This action cannot be undone. This will permanently delete the
              Service.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex w-full ">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteService}
              disabled={deleteService.isPending}
              className="w-full"
            >
              Delete
              {deleteService.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Drawer */}
      <Drawer
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        direction="right"
      >
        <DrawerContent
          className={`h-full top-0 right-0 left-auto mt-0 w-[500px] rounded-none`}
        >
          <div className="flex flex-col h-full">
            <DrawerHeader className="flex items-center justify-between p-4 border-b">
              <DrawerTitle>Service</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold">
                {viewService?.title}
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 p-4 overflow-y-auto">
              <div>
                <p className="font-semibold">Description:</p>
                <p>{viewService?.description}</p>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Features:</p>
                <p>{viewService?.features}</p>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
