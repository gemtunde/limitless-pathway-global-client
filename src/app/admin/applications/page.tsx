// app/admin/applications/page.tsx
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
//import { DataTable, Column } from "@/components/admin/DataTable";

import { Column, DataTable } from "@/components/admin/table/DataTable";
import { toast } from "sonner";
import { Mail, Phone, User, GraduationCap, MapPin } from "lucide-react";
import { formatDate } from "@/lib/helpers";

const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  nationality: z.string().min(1, "Nationality is required"),
  country: z.string().min(1, "Preferred country is required"),
  course: z.string().min(1, "Course of interest is required"),
  budget: z.string().min(1, "Budget is required"),
  qualification: z.string().min(1, "Educational qualification is required"),
  message: z.string().optional(),
  status: z.enum([
    "new",
    "reviewing",
    "contacted",
    "accepted",
    "rejected",
    "completed",
  ]),
  priority: z.enum(["low", "medium", "high"]),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

// Mock data
const mockApplications = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+234 901 234 5678",
    city: "Lagos",
    nationality: "Nigerian",
    country: "United Kingdom",
    course: "Computer Science",
    budget: "$30,000 - $40,000",
    qualification: "Bachelor's Degree in Engineering - 85%",
    message:
      "I am interested in pursuing a Master's degree in Computer Science in the UK. I have strong programming skills and research experience.",
    status: "new",
    priority: "medium",
    assignedTo: "",
    notes: "",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+234 802 345 6789",
    city: "Abuja",
    nationality: "Nigerian",
    country: "Canada",
    course: "Business Administration",
    budget: "$25,000 - $35,000",
    qualification: "HND in Business Studies - 3.5 GPA",
    message:
      "Looking for MBA programs in Canada with good scholarship opportunities.",
    status: "reviewing",
    priority: "high",
    assignedTo: "Admin User",
    notes: "Potential candidate for scholarship program",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@example.com",
    phone: "+234 703 456 7890",
    city: "Port Harcourt",
    nationality: "Nigerian",
    country: "United States",
    course: "Medicine",
    budget: "$50,000+",
    qualification: "Bachelor's in Biology - First Class",
    message:
      "Interested in medical school programs in the USA. Have MCAT scores ready.",
    status: "contacted",
    priority: "high",
    assignedTo: "Admin User",
    notes: "Follow up scheduled for next week",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-21"),
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<any>(null);
  const [viewMode, setViewMode] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      nationality: "",
      country: "",
      course: "",
      budget: "",
      qualification: "",
      message: "",
      status: "new",
      priority: "medium",
      assignedTo: "",
      notes: "",
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    if (editingApplication) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingApplication.id
            ? { ...app, ...data, updatedAt: new Date() }
            : app
        )
      );
      toast.success("Application updated successfully!");
    } else {
      const newApplication = {
        id: Date.now(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setApplications((prev) => [...prev, newApplication]);
      toast.success("Application created successfully!");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingApplication(null);
    setViewMode(false);
  };

  const handleEdit = (application: any) => {
    setEditingApplication(application);
    setViewMode(false);
    form.reset(application);
    setIsDialogOpen(true);
  };

  const handleView = (application: any) => {
    setEditingApplication(application);
    setViewMode(true);
    form.reset(application);
    setIsDialogOpen(true);
  };

  const handleDelete = (application: any) => {
    setApplications((prev) => prev.filter((app) => app.id !== application.id));
    toast.success("Application deleted successfully!");
  };

  const handleAdd = () => {
    setEditingApplication(null);
    setViewMode(false);
    form.reset();
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: Column[] = [
    {
      key: "firstName",
      label: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          {`${row.firstName} ${row.lastName}`}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (value) => (
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          <span className="truncate max-w-xs">{value}</span>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (value) => (
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          {value}
        </div>
      ),
    },
    {
      key: "country",
      label: "Preferred Country",
      render: (value) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {value}
        </div>
      ),
    },
    {
      key: "course",
      label: "Course",
      render: (value) => (
        <div className="flex items-center">
          <GraduationCap className="h-4 w-4 mr-2" />
          <span className="truncate max-w-xs">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge className={getStatusColor(value)}>{value}</Badge>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (value) => (
        <Badge className={getPriorityColor(value)}>{value}</Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Applied",
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "new", label: "New" },
        { value: "reviewing", label: "Reviewing" },
        { value: "contacted", label: "Contacted" },
        { value: "accepted", label: "Accepted" },
        { value: "rejected", label: "Rejected" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      options: [
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
    },
    {
      key: "country",
      label: "Country",
      options: [
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "United States", label: "United States" },
        { value: "Canada", label: "Canada" },
        { value: "Australia", label: "Australia" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Applications Management
          </h1>
          <p className="text-muted-foreground">
            Manage student applications and track their progress
          </p>
        </div>
      </div>

      <DataTable
        data={applications}
        columns={columns}
        title="Student Applications"
        searchPlaceholder="Search applications..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        filterOptions={filterOptions}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode
                ? "View Application"
                : editingApplication
                  ? "Edit Application"
                  : "Create New Application"}
            </DialogTitle>
            <DialogDescription>
              {viewMode
                ? "Application details and status information."
                : editingApplication
                  ? "Update the application information below."
                  : "Fill in the details to create a new application."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter first name"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter last name"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter city"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter nationality"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Study Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Country</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter preferred country"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course of Interest</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter course of interest"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter budget range"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="qualification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Educational Qualification</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter educational qualification"
                            disabled={viewMode}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information or requirements"
                          className="resize-none"
                          rows={3}
                          disabled={viewMode}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {!viewMode && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Application Management
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="reviewing">
                                Reviewing
                              </SelectItem>
                              <SelectItem value="contacted">
                                Contacted
                              </SelectItem>
                              <SelectItem value="accepted">Accepted</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="assignedTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assigned To</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Assign to team member"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add internal notes about this application"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {viewMode ? "Close" : "Cancel"}
                </Button>
                {!viewMode && (
                  <Button type="submit">
                    {editingApplication
                      ? "Update Application"
                      : "Create Application"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
