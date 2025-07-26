"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const servicesFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
  features: z.string().min(1, "Features are required"),
});

type Service = z.infer<typeof servicesFormSchema>;

const iconOptions = [
  { label: "Globe", value: "globe" },
  { label: "Graduation Cap", value: "graduation-cap" },
  { label: "Users", value: "users" },
  { label: "Book", value: "book" },
];

const colorOptions = [
  { label: "Green", value: "green" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Yellow", value: "yellow" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<Service>({
    resolver: zodResolver(servicesFormSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: undefined,
      color: undefined,
      features: "",
    },
  });

  const onSubmit = (data: Service) => {
    if (isEditing && editIndex !== null) {
      const updated = [...services];
      updated[editIndex] = data;
      setServices(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setServices([...services, data]);
    }

    form.reset({
      title: "",
      description: "",
      icon: undefined,
      color: undefined,
      features: "",
    });

    setOpen(false);
  };

  const handleEdit = (index: number) => {
    const service = services[index];
    form.reset({
      title: service.title,
      description: service.description,
      icon: service.icon || undefined,
      color: service.color || undefined,
      features: service.features,
    });
    setIsEditing(true);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Services</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                form.reset({
                  title: "",
                  description: "",
                  icon: undefined,
                  color: undefined,
                  features: "",
                });
                setIsEditing(false);
                setEditIndex(null);
              }}
            >
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit" : "Add"} Service</DialogTitle>
              <DialogDescription>
                Fill in the details of the service
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Service Title" {...field} />
                      </FormControl>
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
                          placeholder="Service Description"
                          {...field}
                        />
                      </FormControl>
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
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {iconOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colorOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Textarea
                          placeholder="Comma-separated features"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {isEditing ? "Update" : "Create"} Service
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="border rounded p-4 space-y-2">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="text-muted-foreground">{service.description}</p>
            <p className="text-sm">Icon: {service.icon}</p>
            <p className="text-sm">Color: {service.color}</p>
            <p className="text-sm">Features: {service.features}</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => handleEdit(index)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
