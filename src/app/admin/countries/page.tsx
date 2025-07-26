// app/admin/countries/page.tsx
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
//import { DataTable, Column } from "@/components/admin/DataTable";
import { toast } from "sonner";
import Flag from "react-world-flags";
import { Column, DataTable } from "@/components/admin/table/DataTable";
import { formatDate } from "@/lib/helpers";

const countrySchema = z.object({
  name: z.string().min(1, "Country name is required"),
  slug: z.string().min(1, "Slug is required"),
  flagCode: z
    .string()
    .min(2, "Flag code is required")
    .max(2, "Flag code must be 2 characters"),
  description: z.string().min(1, "Description is required"),
  benefits: z.string().min(1, "Benefits are required"),
  scholarships: z.string().min(1, "Scholarships are required"),
  visaRequirements: z.string().min(1, "Visa requirements are required"),
  popularUniversities: z.string().optional(),
  costOfLiving: z.string().optional(),
  languageRequirements: z.string().optional(),
});

type CountryFormData = z.infer<typeof countrySchema>;

// Mock data
const mockCountries = [
  {
    id: 1,
    name: "United States",
    slug: "united-states",
    flagCode: "US",
    description: "World-class universities offering diverse courses.",
    benefits: "Quality Education, Research Opportunities, Career Prospects",
    scholarships: "Fulbright, Merit-based scholarships",
    visaRequirements: "F-1 Student Visa, Financial proof, I-20 form",
    popularUniversities: "Harvard, MIT, Stanford",
    costOfLiving: "$15,000 - $25,000 per year",
    languageRequirements: "TOEFL/IELTS required",
    createdAt: new Date("2024-01-15"),
    status: "active",
  },
  {
    id: 2,
    name: "United Kingdom",
    slug: "united-kingdom",
    flagCode: "GB",
    description: "Home to historic universities with a global reputation.",
    benefits: "World-renowned education, Cultural diversity, English-speaking",
    scholarships: "Chevening, Commonwealth scholarships",
    visaRequirements: "Student Visa, CAS, Financial proof",
    popularUniversities: "Oxford, Cambridge, Imperial College",
    costOfLiving: "£12,000 - £20,000 per year",
    languageRequirements: "IELTS/TOEFL required",
    createdAt: new Date("2024-01-10"),
    status: "active",
  },
  {
    id: 3,
    name: "Canada",
    slug: "canada",
    flagCode: "CA",
    description: "Known for quality education and multicultural diversity.",
    benefits: "Affordable tuition, Work opportunities, Immigration pathways",
    scholarships: "Vanier CGS, Provincial scholarships",
    visaRequirements: "Study Permit, Letter of acceptance, Financial proof",
    popularUniversities: "University of Toronto, UBC, McGill",
    costOfLiving: "$10,000 - $18,000 per year",
    languageRequirements: "IELTS/TOEFL required",
    createdAt: new Date("2024-01-05"),
    status: "active",
  },
];

export default function CountriesPage() {
  const [countries, setCountries] = useState(mockCountries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<any>(null);

  const form = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      name: "",
      slug: "",
      flagCode: "",
      description: "",
      benefits: "",
      scholarships: "",
      visaRequirements: "",
      popularUniversities: "",
      costOfLiving: "",
      languageRequirements: "",
    },
  });

  const onSubmit = (data: CountryFormData) => {
    if (editingCountry) {
      setCountries((prev) =>
        prev.map((country) =>
          country.id === editingCountry.id
            ? { ...country, ...data, updatedAt: new Date() }
            : country
        )
      );
      toast.success("Country updated successfully!");
    } else {
      const newCountry = {
        id: Date.now(),
        ...data,
        createdAt: new Date(),
        status: "active",
      };
      setCountries((prev) => [...prev, newCountry]);
      toast.success("Country created successfully!");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingCountry(null);
  };

  const handleEdit = (country: any) => {
    setEditingCountry(country);
    form.reset(country);
    setIsDialogOpen(true);
  };

  const handleDelete = (country: any) => {
    setCountries((prev) => prev.filter((c) => c.id !== country.id));
    toast.success("Country deleted successfully!");
  };

  const handleAdd = () => {
    setEditingCountry(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column[] = [
    {
      key: "flagCode",
      label: "Flag",
      render: (value) => (
        <Flag code={value} style={{ width: 32, height: 20 }} />
      ),
    },
    { key: "name", label: "Country", sortable: true },
    {
      key: "description",
      label: "Description",
      render: (value) => <div className="max-w-xs truncate">{value}</div>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={value === "active" ? "default" : "secondary"}>
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
    {
      key: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Countries Management
          </h1>
          <p className="text-muted-foreground">
            Manage study destinations and country information
          </p>
        </div>
      </div>

      <DataTable
        data={countries}
        columns={columns}
        title="Study Destinations"
        searchPlaceholder="Search countries..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterOptions={filterOptions}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCountry ? "Edit Country" : "Add New Country"}
            </DialogTitle>
            <DialogDescription>
              {editingCountry
                ? "Update the country information below."
                : "Fill in the details to create a new study destination."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., united-states" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="flagCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flag Code (2 letters)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., US, GB, CA"
                          maxLength={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costOfLiving"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost of Living</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., $15,000 - $25,000 per year"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the country"
                        className="resize-none"
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
                        placeholder="e.g., Quality Education, Research Opportunities, Career Prospects"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scholarships"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Scholarships</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List available scholarships"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visaRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List visa requirements"
                        className="resize-none"
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
                  name="popularUniversities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Popular Universities</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Harvard, MIT, Stanford"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="languageRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., IELTS/TOEFL required"
                          className="resize-none"
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
                  {editingCountry ? "Update Country" : "Create Country"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
