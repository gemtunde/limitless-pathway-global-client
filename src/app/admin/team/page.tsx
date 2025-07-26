// app/admin/team/page.tsx
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable, Column } from "@/components/admin/table/DataTable";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { formatDate } from "@/lib/helpers";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().optional(),
  bio: z.string().optional(),
  image: z
    .string()
    .url("Must be a valid image URL")
    .optional()
    .or(z.literal("")),
  linkedIn: z
    .string()
    .url("Must be a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  twitter: z.string().optional(),
  status: z.enum(["active", "inactive", "on-leave"]),
  joinDate: z.string().min(1, "Join date is required"),
  skills: z.string().optional(),
  languages: z.string().optional(),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

const departmentOptions = [
  { value: "management", label: "Management" },
  { value: "project-management", label: "Project Management" },
  { value: "counseling", label: "Counseling" },
  { value: "admissions", label: "Admissions" },
  { value: "visa-processing", label: "Visa Processing" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "customer-support", label: "Customer Support" },
];

// Mock data
const mockTeamMembers = [
  {
    id: 1,
    name: "Sule Farida",
    title: "Project Management",
    department: "project-management",
    email: "farida@limitlessglobalpathways.com",
    phone: "+234 901 234 5678",
    location: "Lagos, Nigeria",
    bio: "Experienced project manager with expertise in international education consulting.",
    image: "/farida.jpeg",
    linkedIn: "https://linkedin.com/in/sulefarida",
    twitter: "@sulefarida",
    status: "active",
    joinDate: "2023-01-15",
    skills: "Project Management, Team Leadership, Strategic Planning",
    languages: "English, Hausa, French",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: 2,
    name: "Gloria Owusu Agyeman",
    title: "Project Management",
    department: "project-management",
    email: "gloria@limitlessglobalpathways.com",
    phone: "+234 802 345 6789",
    location: "Accra, Ghana",
    bio: "Dedicated project manager focused on student success and operational excellence.",
    image: "/glria.avif",
    linkedIn: "https://linkedin.com/in/gloriaagyeman",
    twitter: "",
    status: "active",
    joinDate: "2023-02-01",
    skills: "Project Management, Process Optimization, Student Relations",
    languages: "English, Twi",
    createdAt: new Date("2023-02-01"),
  },
  {
    id: 3,
    name: "Helen Idoko",
    title: "Project Management",
    department: "project-management",
    email: "helen@limitlessglobalpathways.com",
    phone: "+234 703 456 7890",
    location: "Abuja, Nigeria",
    bio: "Results-driven project manager with a passion for international education.",
    image: "/helen.avif",
    linkedIn: "https://linkedin.com/in/helenidoko",
    twitter: "",
    status: "active",
    joinDate: "2023-03-01",
    skills: "Project Management, Quality Assurance, Client Relations",
    languages: "English, Igbo",
    createdAt: new Date("2023-03-01"),
  },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const form = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      title: "",
      department: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      image: "",
      linkedIn: "",
      twitter: "",
      status: "active",
      joinDate: "",
      skills: "",
      languages: "",
    },
  });

  const onSubmit = (data: TeamMemberFormData) => {
    if (editingMember) {
      setTeamMembers((prev) =>
        prev.map((member) =>
          member.id === editingMember.id
            ? { ...member, ...data, updatedAt: new Date() }
            : member
        )
      );
      toast.success("Team member updated successfully!");
    } else {
      const newMember = {
        id: Date.now(),
        ...data,
        createdAt: new Date(),
      };
      setTeamMembers((prev) => [...prev, newMember]);
      toast.success("Team member added successfully!");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingMember(null);
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    form.reset(member);
    setIsDialogOpen(true);
  };

  const handleDelete = (member: any) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== member.id));
    toast.success("Team member removed successfully!");
  };

  const handleAdd = () => {
    setEditingMember(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column[] = [
    {
      key: "name",
      label: "Member",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.image} alt={value} />
            <AvatarFallback>
              {value
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.title}</div>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      label: "Department",
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {value.replace("-", " ")}
        </Badge>
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
      key: "location",
      label: "Location",
      render: (value) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {value || "Not specified"}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge
          variant={
            value === "active"
              ? "default"
              : value === "on-leave"
                ? "secondary"
                : "outline"
          }
        >
          {value.replace("-", " ")}
        </Badge>
      ),
    },
    {
      key: "joinDate",
      label: "Join Date",
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "on-leave", label: "On Leave" },
      ],
    },
    {
      key: "department",
      label: "Department",
      options: departmentOptions,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team members and their information
          </p>
        </div>
      </div>

      <DataTable
        data={teamMembers}
        columns={columns}
        title="Team Members"
        searchPlaceholder="Search team members..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterOptions={filterOptions}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Team Member" : "Add New Team Member"}
            </DialogTitle>
            <DialogDescription>
              {editingMember
                ? "Update the team member information below."
                : "Fill in the details to add a new team member."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departmentOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
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
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="on-leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
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
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Lagos, Nigeria" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Details</h3>
                <FormField
                  control={form.control}
                  name="joinDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Join Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief professional bio"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills (comma-separated)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Project Management, Team Leadership"
                            className="resize-none"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages (comma-separated)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., English, French, Spanish"
                            className="resize-none"
                            rows={2}
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
                <h3 className="text-lg font-semibold">Media & Social</h3>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/profile.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="linkedIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter Handle</FormLabel>
                        <FormControl>
                          <Input placeholder="@username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMember ? "Update Member" : "Add Member"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
