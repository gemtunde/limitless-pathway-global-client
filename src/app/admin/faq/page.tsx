// app/admin/faqs/page.tsx
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
import { DataTable, Column } from "@/components/admin/table/DataTable";
import { toast } from "sonner";
import { HelpCircle, Hash } from "lucide-react";
import { formatDate } from "@/lib/helpers";

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

type FaqFormData = z.infer<typeof faqSchema>;

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

// Mock data based on the original FAQ content
const mockFaqs = [
  {
    id: 1,
    question: "What is Limitless Global Pathways?",
    answer:
      "Limitless Global Pathways is a comprehensive platform dedicated to helping students explore and pursue study abroad opportunities. We provide detailed information on universities, academic programs, scholarships, and application processes across various countries, along with essential tools and resources to guide you through every stage of your international education journey.",
    category: "general",
    tags: "platform, services, international education",
    order: "1",
    status: "published",
    helpful: "25",
    notHelpful: "2",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    question: "How can Limitless Global Pathways help me study abroad?",
    answer:
      "We serve as your reliable guide by providing curated information about global institutions, connecting you with suitable programs, assisting with application processes, and offering ongoing support throughout your study abroad journey. Our platform is designed to help you make informed decisions with confidence.",
    category: "general",
    tags: "guidance, support, application assistance",
    order: "2",
    status: "published",
    helpful: "31",
    notHelpful: "1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: 3,
    question: "Is your service free to use?",
    answer:
      "Please contact us directly for detailed information about our service offerings and any associated costs. We provide various levels of support to match different student needs and budgets.",
    category: "costs",
    tags: "pricing, costs, free service",
    order: "3",
    status: "published",
    helpful: "18",
    notHelpful: "5",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: 4,
    question: "What documents do I need for studying abroad?",
    answer:
      "Academic transcripts and certificates, Language proficiency test scores (IELTS, TOEFL, etc.), Statement of purpose or personal statement, Letters of recommendation, Passport and visa documentation, Financial statements or sponsorship letters, Portfolio (for creative programs)",
    category: "documents",
    tags: "requirements, transcripts, visa, financial proof",
    order: "4",
    status: "published",
    helpful: "42",
    notHelpful: "3",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: 5,
    question: "Do you provide information about scholarships?",
    answer:
      "Yes, we maintain comprehensive information about scholarships available for international students, including government scholarships, university-specific awards, and private funding opportunities. Our scholarships section is regularly updated with new opportunities.",
    category: "scholarships",
    tags: "funding, financial aid, government scholarships",
    order: "5",
    status: "published",
    helpful: "38",
    notHelpful: "2",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-20"),
  },
];

export default function FaqsPage() {
  const [faqs, setFaqs] = useState(mockFaqs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);

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

  const onSubmit = (data: FaqFormData) => {
    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === editingFaq.id
            ? { ...faq, ...data, updatedAt: new Date() }
            : faq
        )
      );
      toast.success("FAQ updated successfully!");
    } else {
      const newFaq = {
        id: Date.now(),
        ...data,
        helpful: data.helpful || "0",
        notHelpful: data.notHelpful || "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setFaqs((prev) => [...prev, newFaq]);
      toast.success("FAQ created successfully!");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingFaq(null);
  };

  const handleEdit = (faq: any) => {
    setEditingFaq(faq);
    form.reset(faq);
    setIsDialogOpen(true);
  };

  const handleDelete = (faq: any) => {
    setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
    toast.success("FAQ deleted successfully!");
  };

  const handleAdd = () => {
    setEditingFaq(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column[] = [
    {
      key: "question",
      label: "Question",
      sortable: true,
      render: (value) => (
        <div className="flex items-start max-w-md">
          <HelpCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {value}
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
          {value}
        </Badge>
      ),
    },
    {
      key: "order",
      label: "Order",
      render: (value) => (
        <div className="flex items-center">
          <Hash className="h-4 w-4 mr-1" />
          {value || "N/A"}
        </div>
      ),
    },
    {
      key: "helpful",
      label: "Helpful",
      render: (value) => (
        <div className="text-green-600 font-medium">👍 {value || 0}</div>
      ),
    },
    {
      key: "notHelpful",
      label: "Not Helpful",
      render: (value) => (
        <div className="text-red-600 font-medium">👎 {value || 0}</div>
      ),
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      sortable: true,
      render: (value) => formatDate(value),
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

      <DataTable
        data={faqs}
        columns={columns}
        title="Frequently Asked Questions"
        searchPlaceholder="Search FAQs..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterOptions={filterOptions}
      />

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
    </div>
  );
}
