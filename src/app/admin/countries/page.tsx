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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
//import { DataTable, Column } from "@/components/admin/DataTable";
import { toast } from "sonner";
import Flag from "react-world-flags";
import { Column, DataTable } from "@/components/admin/table/DataTable";
import { formatDate } from "@/lib/helpers";
import { useCountries } from "@/hooks/admin/queries/countries";
import {
  useCreateCountries,
  useDeleteCountries,
  useUpdateCountries,
} from "@/hooks/admin/mutations/countries/useCountries";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import { ExternalLink, Loader2, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Options for form selects
const countryOptions = [
  { value: "United-States", label: "United States" },
  { value: "United-Kingdom", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "New-Zealand", label: "New Zealand" },
  { value: "Ireland", label: "Ireland" },
  { value: "Scotland", label: "Scotland" },
  { value: "Australia", label: "Australia" },
];

export type CountryFormData = z.infer<typeof countrySchema>;

export interface Country {
  id: string;
  name: string;
  slug: string;
  flagCode: string;
  description: string;
  benefits: string;
  scholarships: string;
  visaRequirements: string;
  popularUniversities: string;
  costOfLiving: string;
  languageRequirements: string;
  createdAt: Date;
  updatedAt?: Date;
  status: "active" | "inactive";
  // Optional fields that might be present in view data
  _id?: string | number;
  code?: string;
  region?: string;
  population?: string;
  applicationUrl?: string;
  // Index signature for DataTable compatibility
  [key: string]: string | number | Date | undefined;
}

export default function CountriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Country | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewCountry, setViewCountry] = useState<Country | null>(null);

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

  const [currentPage, setCurrentPage] = useState(1);
  const { data: countryData, isLoading } = useCountries(currentPage, 10);

  // Define a more flexible API response type
  interface ApiCountryResponse {
    _id?: number;
    id?: number;
    name?: string;
    slug?: string;
    flagCode?: string;
    description?: string;
    benefits?: string;
    scholarships?: string;
    visaRequirements?: string;
    popularUniversities?: string;
    costOfLiving?: string;
    languageRequirements?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    status?: "active" | "inactive" | string;
    code?: string;
    region?: string;
    population?: string;
    applicationUrl?: string;
  }

  const apiCountries: ApiCountryResponse[] = countryData?.data || [];

  // Transform data to ensure it has the required id field and correct status type
  const transformedCountries: Country[] = apiCountries.map((country) => ({
    id:
      country._id?.toString() ??
      country.id?.toString() ??
      Date.now().toString(),
    name: country.name ?? "",
    slug: country.slug ?? "",
    flagCode: country.flagCode ?? "",
    description: country.description ?? "",
    benefits: country.benefits ?? "",
    scholarships: country.scholarships ?? "",
    visaRequirements: country.visaRequirements ?? "",
    popularUniversities: country.popularUniversities ?? "",
    costOfLiving: country.costOfLiving ?? "",
    languageRequirements: country.languageRequirements ?? "",
    createdAt: country.createdAt ? new Date(country.createdAt) : new Date(),
    updatedAt: country.updatedAt ? new Date(country.updatedAt) : undefined,
    status: country.status === "active" ? "active" : "inactive",
    // Include optional fields if they exist
    _id: country._id,
    code: country.code,
    region: country.region,
    population: country.population,
    applicationUrl: country.applicationUrl,
  }));

  // Mutations
  const createCountry = useCreateCountries();
  const updateCountry = useUpdateCountries();
  const deleteCountry = useDeleteCountries();

  const onSubmit = async (data: CountryFormData) => {
    try {
      if (editingCountry) {
        const res = await updateCountry.mutateAsync({
          data,
          id: editingCountry.id,
        });
        toast.success(res.message || "Country has been updated successfully!");
        console.log("EDIT Country updated:", data);
        console.log("EDIT Country response:", res);
      } else {
        const res = await createCountry.mutateAsync(data);
        toast.success(res.message || "Country has been created successfully!");
      }
    } catch (error) {
      console.error("Error creating country:", error);
      toast.error("Failed to create country");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingCountry(null);
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
    form.reset(country);
    setIsDialogOpen(true);
  };

  const handleView = (country: Country) => {
    setViewCountry(country);
    console.log("View Country:", country._id);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (country: Country) => {
    setIsDeleteDialogOpen(true);
    setDeleteData(country);
    console.log("Deleting country:", country);
  };

  const handleDeleteCountry = async () => {
    try {
      const res = await deleteCountry.mutateAsync(deleteData?.id as string);
      toast.success(res.message || "Country deleted successfully!");
    } catch (error) {
      console.error("Error deleting country:", error);
      toast.error("Failed to delete country");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteData(null);
    }
  };

  const handleAdd = () => {
    setEditingCountry(null);
    form.reset({
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
    });

    setIsDialogOpen(true);
  };

  const columns: Column<Country>[] = [
    {
      key: "flagCode",
      label: "Flag",
      render: (value: string | number | Date | undefined) => {
        const flagCode = value as string;
        return <Flag code={flagCode} style={{ width: 32, height: 20 }} />;
      },
    },
    { key: "name", label: "Country", sortable: true },
    {
      key: "description",
      label: "Description",
      render: (value: string | number | Date | undefined) => {
        const description = value as string;
        return <div className="max-w-xs truncate">{description}</div>;
      },
    },
    {
      key: "status",
      label: "Status",
      render: (value: string | number | Date | undefined) => {
        const status = value as "active" | "inactive";
        return (
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value: string | number | Date | undefined) => {
        return formatDate(value as string);
      },
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

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable<Country>
          data={transformedCountries}
          columns={columns}
          title="Countries"
          searchPlaceholder="Search countries..."
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
                {/* <FormField
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
                /> */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryOptions.map((option) => (
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

                <Button type="submit" disabled={createCountry.isPending}>
                  {editingCountry ? (
                    updateCountry.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Country"
                    )
                  ) : createCountry.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Country"
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
              Are you sure you want to delete this country:
              <span className="text-red-500">
                {deleteData ? ` ${deleteData.name}` : ""}
              </span>
            </DialogTitle>
            <DialogDescription className="ml-4">
              This action cannot be undone. This will permanently delete the
              country.
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
              onClick={handleDeleteCountry}
              disabled={deleteCountry.isPending}
              className="w-full"
            >
              Delete
              {deleteCountry.isPending && (
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
              <DrawerTitle>Countries</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold mx-2">
                {viewCountry?.name}
                <Badge variant="outline">{viewCountry?.status}</Badge>
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                {viewCountry?.code} • {viewCountry?.region} •{" "}
                {viewCountry?.population}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="my-2">
                <p className="font-semibold">Cost Of Living:</p>
                <p>{viewCountry?.costOfLiving}</p>
              </div>

              <div className="my-2">
                <p className="font-semibold">Description:</p>
                <p>{viewCountry?.description}</p>
              </div>

              <div className="my-2">
                <p className="font-semibold">Language Requirements:</p>
                <p>{viewCountry?.languageRequirements}</p>
              </div>

              <div className="my-2">
                <p className="font-semibold">Scholarships:</p>
                <p>{viewCountry?.scholarships}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Popular Universities:</p>
                <p>{viewCountry?.popularUniversities}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Benefits:</p>
                <p>{viewCountry?.benefits}</p>
              </div>
              {viewCountry?.applicationUrl && (
                <div className="pt-4">
                  <Button asChild variant="link" className="text-blue-600 p-0">
                    <a
                      href={viewCountry?.applicationUrl}
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
