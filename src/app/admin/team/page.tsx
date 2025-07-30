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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable, Column } from "@/components/admin/table/DataTable";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Loader2, X } from "lucide-react";
import { formatDate } from "@/lib/helpers";
import { useTeam } from "@/hooks/admin/queries/team";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import {
  useCreateTeam,
  useDeleteTeam,
  useUpdateTeam,
} from "@/hooks/admin/mutations/team/useTeam";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
//import ImageUploadZone from "@/components/form/ImageUploadZone";

// Define the ITeam interface
export interface ITeam {
  id: string;
  _id?: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location?: string;
  bio?: string;
  image?: string;
  linkedIn?: string;
  twitter?: string;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
  skills?: string;
  languages?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Index signature for DataTable compatibility
  [key: string]: string | number | Date | undefined;
}

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

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

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

export default function TeamPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<ITeam | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<ITeam | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewTeam, setViewTeam] = useState<ITeam | null>(null);
  //const [bannerFile, setBannerFile] = useState<File | null>(null);

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
  //form.setValue("image", bannerFile ? URL.createObjectURL(bannerFile) : "");

  // Data fetching and mutations
  const [currentPage, setCurrentPage] = useState(1);
  const { data: teamData, isLoading } = useTeam(currentPage, 10);
  const teams = teamData?.data || [];
  //console.log("Team data fetched:", teams);

  // Import the mutations
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();
  const deleteTeam = useDeleteTeam();

  // Transform data to ensure it has the required id field
  const transformedTeams: ITeam[] = teams.map((team: ITeam) => ({
    ...team,
    id: team._id || team.id, // Ensure id field exists
  }));

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      if (editingMember) {
        const res = await updateTeam.mutateAsync({
          data,
          id: editingMember.id,
        });
        toast.success(
          res.message || "Team member has been updated successfully!"
        );
      } else {
        console.log("Creating new team member with data:", data);
        const res = await createTeam.mutateAsync(data);
        toast.success(
          res.message || "Team member has been created successfully!"
        );
      }
    } catch (error) {
      console.error("Error creating team member:", error);
      toast.error("Failed to create team member");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingMember(null);
  };

  const handleEdit = (member: ITeam) => {
    setEditingMember(member);
    form.reset({
      name: member.name,
      title: member.title,
      department: member.department,
      email: member.email,
      phone: member.phone,
      location: member.location || "",
      bio: member.bio || "",
      image: member.image || "",
      linkedIn: member.linkedIn || "",
      twitter: member.twitter || "",
      status: member.status,
      joinDate: member.joinDate,
      skills: member.skills || "",
      languages: member.languages || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (member: ITeam) => {
    // Handle delete logic here - you'll need to implement deleteTeam mutation
    setIsDeleteDialogOpen(true);
    setDeleteData(member);
    //toast.success("Team member removed successfully!");
  };

  const handleDeleteTeam = async () => {
    try {
      const res = await deleteTeam.mutateAsync(deleteData?._id as string);
      toast.success(res.message || "Team member deleted successfully!");
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteData(null);
    }
  };
  const handleView = (team: ITeam) => {
    setViewTeam(team);
    setIsViewDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column<ITeam>[] = [
    {
      key: "name",
      label: "Member",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.image} alt={value as string} />
            <AvatarFallback>
              {(value as string)
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value as string}</div>
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
          {(value as string).replace("-", " ")}
        </Badge>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (value) => (
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          <span className="truncate max-w-xs">{value as string}</span>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (value) => (
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          {value as string}
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (value) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {(value as string) || "Not specified"}
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
          {(value as string).replace("-", " ")}
        </Badge>
      ),
    },
    {
      key: "joinDate",
      label: "Join Date",
      sortable: true,
      render: (value) => formatDate(value as string),
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

  // if (isLoading) {
  //   return (
  //     <div className="space-y-8">
  //       <div className="flex items-center justify-between">
  //         <div>
  //           <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
  //           <p className="text-muted-foreground">
  //             Loading team members...
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable<ITeam>
          data={transformedTeams}
          columns={columns}
          title="Team Members"
          searchPlaceholder="Search team members..."
          onAdd={handleAdd}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          filterOptions={filterOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

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
                          value={field.value}
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
                          value={field.value}
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
                {/* <ImageUploadZone
                  label="Banner Image"
                  description="Upload a clear Banner Image"
                  file={bannerFile}
                  onChange={setBannerFile}
                /> */}

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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto items-center justify-center">
          <DialogHeader>
            <DialogTitle className="p-4 text">
              Are you sure you want to delete this team member:
              <span className="text-red-500">
                {deleteData ? ` ${deleteData.name}` : ""}
              </span>
            </DialogTitle>
            <DialogDescription className="ml-4">
              This action cannot be undone. This will permanently delete the
              team member.
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
              onClick={handleDeleteTeam}
              disabled={deleteTeam.isPending}
              className="w-full"
            >
              Delete
              {deleteTeam.isPending && (
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
                <DrawerTitle>Team</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>
              <DrawerHeader>
                <DrawerTitle className="text-xl font-bold">
                  {viewTeam?.name}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-muted-foreground">
                  {viewTeam?.department}
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="my-2">
                  <p className="font-semibold">Date:</p>
                  <p>
                    {viewTeam?.joinDate
                      ? formatDate(viewTeam?.joinDate as string)
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2">
                  <p className="font-semibold">Phone:</p>
                  <p>{viewTeam?.phone}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Bio:</p>
                  <p>{viewTeam?.bio}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Skills:</p>
                  <p>{viewTeam?.skills}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{viewTeam?.status}</Badge>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Title:</p>
                  <p>{viewTeam?.title}</p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </Drawer>
    </div>
  );
}
