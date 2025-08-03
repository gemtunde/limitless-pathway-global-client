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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
//import { DataTable, Column } from "@/components/admin/DataTable";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  //ExternalLink,
  Loader2,
  //MapPin,
  Users,
  X,
} from "lucide-react";
import { Column, DataTable } from "@/components/admin/table/DataTable";
import { formatDate } from "@/lib/helpers";
import { useEvents } from "@/hooks/admin/queries/events";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import {
  useCreateEvents,
  useDeleteEvent,
  useUpdateEvents,
} from "@/hooks/admin/mutations/events/useEvents";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
//import Image from "next/image";

const eventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  description: z.string().min(1, "Description is required"),
  eventType: z.enum(["virtual", "in-person", "hybrid"]),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(1, "Location is required"),
  maxAttendees: z.string().optional(),
  registrationFee: z.string().optional(),
  targetAudience: z.string().min(1, "Target audience is required"),
  agenda: z.string().optional(),
  speakers: z.string().optional(),
  requirements: z.string().optional(),
  registrationDeadline: z.string().optional(),
  status: z.enum(["draft", "published", "cancelled", "completed"]),
  featuredImage: z.string().optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;

export interface IEvent {
  id: string;
  title: string;
  description: string;
  eventType: "virtual" | "in-person" | "hybrid";
  date: string;
  time: string;
  duration: string;
  location: string;
  maxAttendees?: string;
  registrationFee?: string;
  targetAudience: string;
  agenda?: string;
  speakers?: string;
  requirements?: string;
  registrationDeadline?: string;
  status: "draft" | "published" | "cancelled" | "completed";
  featuredImage?: string;
  createdAt: Date;
  updatedAt?: Date;
  registeredCount: number;
  // Index signature for DataTable compatibility
  [key: string]: string | number | Date | undefined;
}

export default function EventsPage() {
  //const [events, setEvents] = useState<IEvent[]>(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<IEvent | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewEvent, setViewEvent] = useState<IEvent | null>(null);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      eventType: "virtual",
      date: "",
      time: "",
      duration: "",
      location: "",
      maxAttendees: "",
      registrationFee: "",
      targetAudience: "",
      agenda: "",
      speakers: "",
      requirements: "",
      registrationDeadline: "",
      status: "draft",
      featuredImage: "",
    },
  });

  // Data fetching and mutations
  const [currentPage, setCurrentPage] = useState(1);
  const { data: eventData, isLoading } = useEvents(currentPage, 10);
  const event = eventData?.data || [];
  console.log("Events data fetched:", event);

  // Transform data to ensure it has the required id field
  const transformedEvents: IEvent[] = event.map((event: IEvent) => ({
    ...event,
    id: event._id || event.id, // Ensure id field exists
  }));

  const createEvent = useCreateEvents();
  const updateEvent = useUpdateEvents();
  const deleteEvent = useDeleteEvent();
  // Form submission handler
  const onSubmit = async (data: EventFormData) => {
    try {
      if (editingEvent) {
        const res = await updateEvent.mutateAsync({
          data,
          id: editingEvent.id,
        });

        toast.success(
          res.message || "Scholarship has been updated successfully!"
        );
      } else {
        const res = await createEvent.mutateAsync(data);
        toast.success(res.message || "Event has been created successfully!");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: IEvent) => {
    setEditingEvent(event);
    form.reset(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (event: IEvent) => {
    setIsDeleteDialogOpen(true);
    setDeleteData(event);
    //toast.success("Event deleted successfully!");
  };
  const handleDeleteEvent = async () => {
    try {
      const res = await deleteEvent.mutateAsync(deleteData?._id as string);
      toast.success(res.message || "Event has been deleted successfully!");
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      toast.error("Failed to delete scholarship");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteData(null);
    }
  };
  const handleView = (event: IEvent) => {
    setViewEvent(event);
    console.log("View Event:", event._id);
    setIsViewDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingEvent(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column<IEvent>[] = [
    { key: "title", label: "Event Title", sortable: true },
    {
      key: "eventType",
      label: "Type",
      render: (value: string | number | Date | undefined) => {
        const eventType = value as "virtual" | "in-person" | "hybrid";
        return (
          <Badge variant="outline" className="capitalize">
            {eventType}
          </Badge>
        );
      },
    },
    {
      key: "date",
      label: "Date",
      render: (value: string | number | Date | undefined) => {
        const dateString = value as string;
        return (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(dateString)}
          </div>
        );
      },
    },
    {
      key: "time",
      label: "Time",
      render: (value: string | number | Date | undefined) => {
        const timeString = value as string;
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {timeString}
          </div>
        );
      },
    },
    // {
    //   key: "location",
    //   label: "Location",
    //   render: (value: string | number | Date | undefined) => {
    //     const location = value as string;
    //     return (
    //       <div className="flex items-center max-w-xs truncate">
    //         <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
    //         {location}
    //       </div>
    //     );
    //   },
    // },
    {
      key: "registeredCount",
      label: "Registered",
      render: (value: string | number | Date | undefined) => {
        const count = value as number;
        return (
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {count}
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (value: string | number | Date | undefined) => {
        const status = value as
          | "draft"
          | "published"
          | "cancelled"
          | "completed";
        return (
          <Badge
            variant={
              status === "published"
                ? "primary"
                : status === "draft"
                  ? "secondary"
                  : status === "cancelled"
                    ? "destructive"
                    : "outline"
            }
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" },
        { value: "cancelled", label: "Cancelled" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      key: "eventType",
      label: "Type",
      options: [
        { value: "virtual", label: "Virtual" },
        { value: "in-person", label: "In-Person" },
        { value: "hybrid", label: "Hybrid" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Events Management
          </h1>
          <p className="text-muted-foreground">
            Manage educational events, webinars, and fairs
          </p>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable<IEvent>
          data={transformedEvents}
          columns={columns}
          title="Events"
          searchPlaceholder="Search events..."
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
              {editingEvent ? "Edit Event" : "Create New Event"}
            </DialogTitle>
            <DialogDescription>
              {editingEvent
                ? "Update the event information below."
                : "Fill in the details to create a new event."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description of the event"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="virtual" id="virtual" />
                          <label htmlFor="virtual">Virtual</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-person" id="in-person" />
                          <label htmlFor="in-person">In-Person</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hybrid" id="hybrid" />
                          <label htmlFor="hybrid">Hybrid</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2.5 hours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location/Platform</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Online (Zoom) or Physical address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxAttendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Attendees (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 500"
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
                  name="registrationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Fee (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Free or $25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Deadline (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Secondary school graduates, University students, Parents"
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
                name="agenda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agenda (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Event schedule and activities"
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
                name="speakers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speakers (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List of speakers and their roles"
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
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What attendees need to prepare or bring"
                        className="resize-none"
                        rows={2}
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
                          {/* <SelectItem value="draft">Draft</SelectItem> */}
                          <SelectItem value="published">In Progress</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  {editingEvent ? "Update Event" : "Create Event"}
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
              onClick={handleDeleteEvent}
              disabled={deleteEvent.isPending}
              className="w-full"
            >
              Delete
              {deleteEvent.isPending && (
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
              <DrawerTitle>Event</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold">
                {viewEvent?.title}
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                {viewEvent?.eventType} • {viewEvent?.duration} •{" "}
                {viewEvent?.location}
              </DrawerDescription>
              <DrawerDescription className="text-sm text-muted-foreground">
                {formatDate(viewEvent?.date ? viewEvent.date.toString() : "")} •{" "}
                {viewEvent?.time} • {viewEvent?.location}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4 overflow-y-auto">
              {/* {viewEvent?.featuredImage && (
                <Image
                  src={viewEvent.featuredImage}
                  alt="Featured"
                  className="w-full h-48 object-cover mb-4 rounded"
                  width={500}
                  height={200}
                />
              )} */}
              <div className="my-2">
                <p className="font-semibold">Agenda:</p>
                <p>{viewEvent?.agenda}</p>
              </div>

              <div className="my-2">
                <p className="font-semibold">Description:</p>
                <p>{viewEvent?.description}</p>
              </div>

              <div className="my-2">
                <p className="font-semibold">Requirements:</p>
                <p>{viewEvent?.requirements}</p>
              </div>

              <div className="my-2">
                <p className="font-semibold">Location:</p>
                <p>{viewEvent?.location}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Speakers:</p>
                <p>{viewEvent?.speakers}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Target Audience:</p>
                <p>{viewEvent?.targetAudience}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Registration Deadline:</p>
                <p>{viewEvent?.registrationDeadline}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Registration Fee:</p>
                <p>{viewEvent?.registrationFee}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Max Attendees:</p>
                <p>{viewEvent?.maxAttendees}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Status:</p>
                <Badge
                  variant={
                    viewEvent?.status === "published"
                      ? "default"
                      : viewEvent?.status === "draft"
                        ? "secondary"
                        : viewEvent?.status === "cancelled"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {viewEvent?.status}
                </Badge>
              </div>
              <div className="my-2">
                <p className="font-semibold">Created At:</p>
                <p>
                  {formatDate(
                    viewEvent?.createdAt ? viewEvent.createdAt.toString() : ""
                  )}
                </p>
              </div>
              {viewEvent?.updatedAt && (
                <div className="mt-2">
                  <p className="font-semibold">Updated At:</p>
                  <p>{formatDate(viewEvent.updatedAt.toString())}</p>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
