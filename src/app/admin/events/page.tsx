// app/admin/events/page.tsx
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
//import { DataTable, Column } from "@/components/admin/DataTable";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Column, DataTable } from "@/components/admin/table/DataTable";
import { formatDate } from "@/lib/helpers";

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

type EventFormData = z.infer<typeof eventSchema>;

// Mock data
const mockEvents = [
  {
    id: 1,
    title: "UK Study Expo – Virtual Edition",
    description:
      "Join us for the UK Study Expo – Virtual Edition, a comprehensive online event designed to guide aspiring international students through the excitement and opportunities of studying in the UK.",
    eventType: "virtual",
    date: "2025-10-20",
    time: "14:00",
    duration: "2.5 hours",
    location: "Online (Zoom)",
    maxAttendees: "500",
    registrationFee: "Free",
    targetAudience:
      "Secondary school graduates, University students, Parents/guardians, School counselors, Working professionals",
    agenda:
      "University presentations, Scholarship information, Visa guidance, Q&A sessions",
    speakers:
      "University representatives, Immigration experts, Former students",
    requirements: "Stable internet connection, Zoom app",
    registrationDeadline: "2025-10-18",
    status: "published",
    featuredImage: "/event-1.jpg",
    createdAt: new Date("2024-01-15"),
    registeredCount: 245,
  },
  {
    id: 2,
    title: "Canada Education Fair 2025",
    description:
      "Discover Canadian universities and colleges at our comprehensive education fair featuring top institutions from across Canada.",
    eventType: "in-person",
    date: "2025-11-15",
    time: "10:00",
    duration: "6 hours",
    location: "Lagos Convention Centre, Nigeria",
    maxAttendees: "1000",
    registrationFee: "₦2,000",
    targetAudience: "Students, Parents, Educators",
    agenda: "University booths, Information sessions, One-on-one consultations",
    speakers: "University admissions officers, Education consultants",
    requirements: "Valid ID for entry",
    registrationDeadline: "2025-11-10",
    status: "published",
    featuredImage: "/event-2.jpg",
    createdAt: new Date("2024-01-10"),
    registeredCount: 156,
  },
  {
    id: 3,
    title: "USA University Webinar Series",
    description:
      "Monthly webinar series featuring different USA universities and their programs.",
    eventType: "virtual",
    date: "2025-09-25",
    time: "19:00",
    duration: "1.5 hours",
    location: "Online Platform",
    maxAttendees: "200",
    registrationFee: "Free",
    targetAudience: "Prospective students interested in USA education",
    agenda:
      "University presentation, Program details, Application process, Q&A",
    speakers: "University representatives",
    requirements: "Internet connection, Device with audio/video capability",
    registrationDeadline: "2025-09-23",
    status: "draft",
    featuredImage: "",
    createdAt: new Date("2024-01-05"),
    registeredCount: 0,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

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

  const onSubmit = (data: EventFormData) => {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? { ...event, ...data, updatedAt: new Date() }
            : event
        )
      );
      toast.success("Event updated successfully!");
    } else {
      const newEvent = {
        id: Date.now(),
        ...data,
        createdAt: new Date(),
        registeredCount: 0,
      };
      setEvents((prev) => [...prev, newEvent]);
      toast.success("Event created successfully!");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    form.reset(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (event: any) => {
    setEvents((prev) => prev.filter((e) => e.id !== event.id));
    toast.success("Event deleted successfully!");
  };

  const handleAdd = () => {
    setEditingEvent(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column[] = [
    { key: "title", label: "Event Title", sortable: true },
    {
      key: "eventType",
      label: "Type",
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(value)}
        </div>
      ),
    },
    {
      key: "time",
      label: "Time",
      render: (value) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {value}
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (value) => (
        <div className="flex items-center max-w-xs truncate">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          {value}
        </div>
      ),
    },
    {
      key: "registeredCount",
      label: "Registered",
      render: (value) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {value}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge
          variant={
            value === "published"
              ? "default"
              : value === "draft"
                ? "secondary"
                : value === "cancelled"
                  ? "destructive"
                  : "outline"
          }
        >
          {value}
        </Badge>
      ),
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

      <DataTable
        data={events}
        columns={columns}
        title="Events"
        searchPlaceholder="Search events..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterOptions={filterOptions}
      />

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
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
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
    </div>
  );
}
