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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, DollarSign } from "lucide-react";
import { Column, DataTable } from "@/components/admin/table/DataTable";
import { formatDate } from "@/lib/helpers";

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

type ScholarshipFormData = z.infer<typeof scholarshipSchema>;

type Scholarship = {
  id: number;
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
  status: string;
  createdAt: Date;
  updatedAt?: Date;
};

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

const mockScholarships: Scholarship[] = [
  {
    id: 1,
    title: "Fulbright U.S. Student Program",
    provider: "U.S. State Department",
    amount: "Full funding",
    deadline: "2025-10-01",
    location: "United States",
    level: "Graduate",
    description: "...",
    requirements: "...",
    benefits: "...",
    category: "Research",
    applicationUrl: "https://us.fulbrightonline.org/",
    status: "active",
    createdAt: new Date("2024-01-15"),
  },
];

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] =
    useState<Scholarship[]>(mockScholarships);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] =
    useState<Scholarship | null>(null);

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

  const onSubmit = (data: ScholarshipFormData) => {
    if (editingScholarship) {
      setScholarships((prev) =>
        prev.map((s) =>
          s.id === editingScholarship.id
            ? { ...s, ...data, updatedAt: new Date() }
            : s
        )
      );
      toast.success("Scholarship updated successfully!");
    } else {
      const newScholarship: Scholarship = {
        id: Date.now(),
        ...data,
        applicationUrl: data.applicationUrl || "",
        createdAt: new Date(),
      };
      setScholarships((prev) => [...prev, newScholarship]);
      toast.success("Scholarship created successfully!");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingScholarship(null);
  };

  const handleEdit = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    form.reset({
      ...scholarship,
      applicationUrl: scholarship.applicationUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (scholarship: Scholarship) => {
    setScholarships((prev) => prev.filter((s) => s.id !== scholarship.id));
    toast.success("Scholarship deleted successfully!");
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

  const columns: Column[] = [
    { key: "title", label: "Title", sortable: true },
    { key: "provider", label: "Provider", sortable: true },
    {
      key: "amount",
      label: "Amount",
      render: (value) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          {value}
        </div>
      ),
    },
    {
      key: "deadline",
      label: "Deadline",
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {value}
        </div>
      ),
    },
    { key: "location", label: "Location" },
    { key: "level", label: "Level" },
    {
      key: "category",
      label: "Category",
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge
          variant={
            value === "active"
              ? "default"
              : value === "expired"
                ? "destructive"
                : "secondary"
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  const filterOptions = [
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

      <DataTable
        data={scholarships}
        columns={columns}
        title="Scholarships"
        searchPlaceholder="Search scholarships..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterOptions={filterOptions}
      />

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
                              disabled={!option.value} // Prevent empty values
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
                              disabled={!option.value} // Prevent empty values
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
                              disabled={!option.value} // Prevent empty values
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
                <Button type="submit">
                  {editingScholarship
                    ? "Update Scholarship"
                    : "Create Scholarship"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
