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
import { DataTable, Column } from "@/components/admin/table/DataTable";
import { toast } from "sonner";
import { HelpCircle, Loader2, X } from "lucide-react";
import { formatDate } from "@/lib/helpers";
import {
  useCreateFaq,
  useDeleteFaq,
  useUpdateFaq,
} from "@/hooks/admin/mutations/faq/useFaq";
import { useFaq } from "@/hooks/admin/queries/faq";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags?: string;
  order?: string;
  status: "published" | "draft" | "archived";
  helpful?: string;
  notHelpful?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Index signature for DataTable compatibility
  [key: string]: string | number | Date | undefined;
}

const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  order: z.string().optional(),
  status: z.enum(["published", "draft", "archived"]),
  helpful: z.string().optional(),
  notHelpful: z.string().optional(),
});

export type FaqFormData = z.infer<typeof faqSchema>;

const categoryOptions = [
  { value: "general", label: "General" },
  { value: "applications", label: "Applications" },
  { value: "scholarships", label: "Scholarships" },
  { value: "visa", label: "Visa & Immigration" },
  { value: "costs", label: "Costs & Financing" },
  { value: "countries", label: "Countries & Destinations" },
  { value: "support", label: "Support & Services" },
  { value: "documents", label: "Documents" },
];

export default function FaqsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<IFaq | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<IFaq | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewFaq, setViewFaq] = useState<IFaq | null>(null);

  const form = useForm<FaqFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
      tags: "",
      order: "",
      status: "published",
      helpful: "0",
      notHelpful: "0",
    },
  });

  const { data: faqData, isLoading } = useFaq(currentPage, 10);
  const faqs = faqData?.data || [];

  const createFaq = useCreateFaq();
  const updateFaq = useUpdateFaq();
  const deleteFaq = useDeleteFaq();

  const transformedFaqs: IFaq[] = faqs.map((faq: IFaq) => ({
    ...faq,
    id: faq._id ?? faq.id ?? "", // Ensure id is always a string (fallback to empty string if missing)
  }));

  const columns: Column<IFaq>[] = [
    {
      key: "question",
      label: "Question",
      sortable: true,
      render: (value) => (
        <div className="flex items-start max-w-md">
          <HelpCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
          <span className="font-medium">
            {typeof value === "string" ? value : ""}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {typeof value === "string" ? value : ""}
        </Badge>
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
                : "outline"
          }
        >
          {typeof value === "string" ? value : ""}
        </Badge>
      ),
    },
    // {
    //   key: "order",
    //   label: "Order",
    //   render: (value) => (
    //     <div className="flex items-center">
    //       <Hash className="h-4 w-4 mr-1" />
    //       {typeof value === "string" && value ? value : "N/A"}
    //     </div>
    //   ),
    // },
    // {
    //   key: "helpful",
    //   label: "Helpful",
    //   render: (value) => (
    //     <div className="text-green-600 font-medium">
    //       👍 {typeof value === "string" && value ? value : 0}
    //     </div>
    //   ),
    // },
    // {
    //   key: "notHelpful",
    //   label: "Not Helpful",
    //   render: (value) => (
    //     <div className="text-red-600 font-medium">
    //       👎 {typeof value === "string" && value ? value : 0}
    //     </div>
    //   ),
    // },
    {
      key: "updatedAt",
      label: "Last Updated",
      sortable: true,
      render: (value) => formatDate(value as string),
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "published", label: "Published" },
        { value: "draft", label: "Draft" },
        { value: "archived", label: "Archived" },
      ],
    },
    {
      key: "category",
      label: "Category",
      options: categoryOptions,
    },
  ];

  const onSubmit = async (data: FaqFormData) => {
    // if (editingFaq) {
    //   // Update logic here
    //   toast.success("FAQ updated successfully!");
    // } else {
    //   // Create logic here
    //   toast.success("FAQ created successfully!");
    // }
    try {
      if (editingFaq) {
        const res = await updateFaq.mutateAsync({ data, id: editingFaq.id });
        toast.success(res.message || "FAQ post has been updated successfully!");
      } else {
        const res = await createFaq.mutateAsync(data);
        toast.success(res.message || "FAQ post has been created successfully!");
      }
    } catch (error) {
      console.error("Error creating FAQ post:", error);
      toast.error("Failed to create FAQ post");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingFaq(null);
  };

  const handleEdit = (faq: IFaq) => {
    setEditingFaq(faq);
    form.reset(faq);
    setIsDialogOpen(true);
  };

  const handleDelete = (faq: IFaq) => {
    // Delete logic here
    setIsDeleteDialogOpen(true);
    setDeleteData(faq);
    // toast.success("FAQ deleted successfully!");
  };
  const handleDeleteFaq = async () => {
    try {
      const res = await deleteFaq.mutateAsync(deleteData?._id as string);
      toast.success(res.message || "FAQ deleted successfully!");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteData(null);
    }
  };
  const handleView = (faq: IFaq) => {
    setViewFaq(faq);
    setIsViewDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingFaq(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQs Management</h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions and their answers
          </p>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable<IFaq>
          data={transformedFaqs}
          columns={columns}
          title="FAQs"
          searchPlaceholder="Search FAQs..."
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
              {editingFaq ? "Edit FAQ" : "Create New FAQ"}
            </DialogTitle>
            <DialogDescription>
              {editingFaq
                ? "Update the FAQ information below."
                : "Fill in the details to create a new FAQ."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the frequently asked question"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a comprehensive answer to the question"
                        className="resize-none min-h-[120px]"
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
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
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 1, 2, 3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="helpful"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Helpful Count</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notHelpful"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Not Helpful Count</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., application, documents, visa"
                        {...field}
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
                  {editingFaq ? "Update FAQ" : "Create FAQ"}
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
              Are you sure you want to delete this FAQ:
              <span className="text-red-500">
                {deleteData ? ` ${deleteData.question}` : ""}
              </span>
            </DialogTitle>
            <DialogDescription className="ml-4">
              This action cannot be undone. This will permanently delete the
              FAQ.
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
              onClick={handleDeleteFaq}
              disabled={deleteFaq.isPending}
              className="w-full"
            >
              Delete
              {deleteFaq.isPending && (
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
                <DrawerTitle>FAQ</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>
              <DrawerHeader>
                <DrawerTitle className="text-xl font-bold">
                  {viewFaq?.tags}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-muted-foreground">
                  {viewFaq?.category}
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="my-2">
                  <p className="font-semibold">Date Created:</p>
                  <p>
                    {viewFaq?.createdAt
                      ? formatDate(viewFaq?.createdAt.toString())
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2">
                  <p className="font-semibold">Question:</p>
                  <p>{viewFaq?.question}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Answer:</p>
                  <p>{viewFaq?.answer}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Tags:</p>
                  <p>{viewFaq?.tags}</p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </Drawer>
    </div>
  );
}
