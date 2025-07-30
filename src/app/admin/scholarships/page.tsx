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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, ExternalLink, Loader2, X } from "lucide-react";
import {
  Column,
  DataTable,
  BaseTableData,
  FilterOption,
} from "@/components/admin/table/DataTable";
//import { formatDate } from "@/lib/helpers";
import { useScholarships } from "@/hooks/admin/queries/scholarships";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import {
  useCreateScholarships,
  useDeleteScholarship,
  useUpdateScholarships,
} from "@/hooks/admin/mutations/scholarships/useScholarships";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

// Zod schema for form validation
const scholarshipSchema = z.object({
  title: z.string().min(1, "Title is required"),
  provider: z.string().min(1, "Provider is required"),
  amount: z.string().min(1, "Amount is required"),
  deadline: z.string().min(1, "Deadline is required"),
  location: z.string().min(1, "Location is required"),
  level: z.string().min(1, "Level is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  benefits: z.string().min(1, "Benefits are required"),
  category: z.string().min(1, "Category is required"),
  applicationUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  status: z.string().min(1, "Status is required"),
});

export type ScholarshipFormData = z.infer<typeof scholarshipSchema>;

// TypeScript interface for Scholarship data that extends BaseTableData
export interface Scholarship extends BaseTableData {
  id: string;
  _id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  location: string;
  level: string;
  description: string;
  requirements: string;
  benefits: string;
  category: string;
  applicationUrl: string;
  status: "active" | "inactive" | "expired";
  createdAt: Date;
  updatedAt: Date;
}

// Options for form selects
const categoryOptions = [
  { value: "Research", label: "Research" },
  { value: "Leadership", label: "Leadership" },
  { value: "Development", label: "Development" },
  { value: "Exchange", label: "Exchange" },
  { value: "Academic", label: "Academic" },
  { value: "Merit-based", label: "Merit-based" },
  { value: "Need-based", label: "Need-based" },
];

const levelOptions = [
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "Master's", label: "Master's" },
  { value: "PhD", label: "PhD" },
  { value: "Postgraduate", label: "Postgraduate" },
  { value: "Various", label: "Various" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "expired", label: "Expired" },
];

export default function ScholarshipsPage() {
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Scholarship | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewScholarship, setViewScholarship] = useState<Scholarship | null>(
    null
  );
  const [editingScholarship, setEditingScholarship] =
    useState<Scholarship | null>(null);
  const [editId, setEditId] = useState<string>("");

  // Form setup
  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      title: "",
      provider: "",
      amount: "",
      deadline: "",
      location: "",
      level: "",
      description: "",
      requirements: "",
      benefits: "",
      category: "",
      applicationUrl: "",
      status: "",
    },
  });

  // Data fetching and mutations
  const [currentPage, setCurrentPage] = useState(1);
  const { data: scholarshipData, isLoading } = useScholarships(currentPage, 10);
  const scholarships = scholarshipData?.data || [];

  const createScholarship = useCreateScholarships();
  const updateScholarship = useUpdateScholarships();
  const deleteScholarship = useDeleteScholarship();

  // Transform data to ensure it has the required id field
  const transformedScholarships: Scholarship[] = scholarships.map(
    (scholarship: Scholarship) => ({
      ...scholarship,
      id: scholarship._id || scholarship.id, // Ensure id field exists
    })
  );

  // Form submission handler
  const onSubmit = async (data: ScholarshipFormData) => {
    try {
      if (editingScholarship) {
        const res = await updateScholarship.mutateAsync({ data, id: editId });

        toast.success(
          res.message || "Scholarship has been updated successfully!"
        );
      } else {
        const res = await createScholarship.mutateAsync(data);
        toast.success(
          res.message || "Scholarship has been created successfully!"
        );
      }
    } catch (error) {
      console.error("Error creating scholarship:", error);
      toast.error("Failed to create scholarship");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingScholarship(null);
  };

  // Event handlers for table actions
  const handleEdit = (scholarship: Scholarship) => {
    setEditId(scholarship._id);
    setEditingScholarship(scholarship);
    form.reset({
      ...scholarship,
      applicationUrl: scholarship.applicationUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleView = (scholarship: Scholarship) => {
    setViewScholarship(scholarship);
    console.log("View Scholarship:", scholarship._id);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (scholarship: Scholarship) => {
    setIsDeleteDialogOpen(true);
    setDeleteData(scholarship);
  };

  const handleDeleteScholarship = async () => {
    try {
      const res = await deleteScholarship.mutateAsync(
        deleteData?._id as string
      );
      toast.success(res.message || "Scholarship deleted successfully!");
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      toast.error("Failed to delete scholarship");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteData(null);
    }
  };

  const handleAdd = () => {
    setEditingScholarship(null);
    form.reset({
      title: "",
      provider: "",
      amount: "",
      deadline: "",
      location: "",
      level: "",
      description: "",
      requirements: "",
      benefits: "",
      category: "",
      applicationUrl: "",
      status: "",
    });
    setIsDialogOpen(true);
  };

  // Column definitions with proper typing
  const columns: Column<Scholarship>[] = [
    { key: "title", label: "Title", sortable: true },
    // { key: "provider", label: "Provider", sortable: true },
    // {
    //   key: "amount",
    //   label: "Amount",
    //   render: (value) => (
    //     <div className="flex items-center">
    //       <DollarSign className="h-4 w-4 mr-1" />
    //       {String(value)}
    //     </div>
    //   ),
    // },
    {
      key: "deadline",
      label: "Deadline",
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {String(value)}
        </div>
      ),
    },
    { key: "location", label: "Location" },
    { key: "level", label: "Level" },
    {
      key: "category",
      label: "Category",
      render: (value) => <Badge variant="outline">{String(value)}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        const status = String(value) as "active" | "inactive" | "expired";
        return (
          <Badge
            variant={
              status === "active"
                ? "default"
                : status === "expired"
                  ? "destructive"
                  : "secondary"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    // {
    //   key: "createdAt",
    //   label: "Created",
    //   sortable: true,
    //   render: (value) => formatDate(value as string),
    // },
  ];

  // Filter options for the table
  const filterOptions: FilterOption[] = [
    { key: "status", label: "Status", options: statusOptions },
    { key: "category", label: "Category", options: categoryOptions },
    { key: "level", label: "Level", options: levelOptions },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Scholarships Management
          </h1>
          <p className="text-muted-foreground">
            Manage scholarship opportunities and funding information
          </p>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable<Scholarship>
          data={transformedScholarships}
          columns={columns}
          title="Scholarships"
          searchPlaceholder="Search scholarships..."
          onAdd={handleAdd}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          filterOptions={filterOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingScholarship ? "Edit Scholarship" : "Add New Scholarship"}
            </DialogTitle>
            <DialogDescription>
              {editingScholarship
                ? "Update the scholarship information below."
                : "Fill in the details to create a new scholarship opportunity."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scholarship Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter scholarship title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider/Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter provider name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scholarship Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Full funding, $10,000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Deadline</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location/Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Level</FormLabel>
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
                          {levelOptions.map((option) => (
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
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
                          {categoryOptions.map((option) => (
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
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description of the scholarship"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Bachelor's degree, U.S. citizenship, Strong academic record"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benefits (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Full tuition, Monthly stipend, Travel allowance, Health insurance"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/apply"
                        {...field}
                        value={field.value || ""}
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
                <Button type="submit" disabled={createScholarship.isPending}>
                  {editingScholarship ? (
                    updateScholarship.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Scholarship"
                    )
                  ) : createScholarship.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Scholarship"
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
              Are you sure you want to delete this scholarship:
              <span className="text-red-500">
                {deleteData ? ` ${deleteData.title}` : ""}
              </span>
            </DialogTitle>
            <DialogDescription className="ml-4">
              This action cannot be undone. This will permanently delete the
              scholarship.
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
              onClick={handleDeleteScholarship}
              disabled={deleteScholarship.isPending}
              className="w-full"
            >
              Delete
              {deleteScholarship.isPending && (
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
              <DrawerTitle>Scholarship</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold">
                {viewScholarship?.title}
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                {viewScholarship?.category} • {viewScholarship?.level} •{" "}
                {viewScholarship?.location}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4 overflow-y-auto">
              <div>
                <p className="font-semibold">Provider:</p>
                <p>{viewScholarship?.provider}</p>
              </div>

              <div>
                <p className="font-semibold">Description:</p>
                <p>{viewScholarship?.description}</p>
              </div>

              <div>
                <p className="font-semibold">Requirements:</p>
                <p>{viewScholarship?.requirements}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{viewScholarship?.status}</Badge>
                <Badge variant="secondary">₦{viewScholarship?.amount}</Badge>
                <Badge variant="default">
                  Deadline: {viewScholarship?.deadline}
                </Badge>
              </div>

              <div>
                <p className="font-semibold">Benefits:</p>
                <p>{viewScholarship?.benefits}</p>
              </div>
              {viewScholarship?.applicationUrl && (
                <div className="pt-4">
                  <Button asChild variant="link" className="text-blue-600 p-0">
                    <a
                      href={viewScholarship?.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
