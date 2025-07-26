// app/admin/blog/page.tsx
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
import { FileText, Calendar, Eye } from "lucide-react";
import { formatDate } from "@/lib/helpers";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z
    .string()
    .url("Must be a valid image URL")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  publishDate: z.string().optional(),
  metaDescription: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  readTime: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const categoryOptions = [
  { value: "study-abroad", label: "Study Abroad" },
  { value: "scholarships", label: "Scholarships" },
  { value: "visa-guide", label: "Visa Guide" },
  { value: "student-life", label: "Student Life" },
  { value: "career-advice", label: "Career Advice" },
  { value: "university-guide", label: "University Guide" },
  { value: "finance", label: "Finance" },
  { value: "application-tips", label: "Application Tips" },
];

// Mock data
const mockBlogPosts = [
  {
    id: 1,
    title: "Top 10 Study Destinations for International Students",
    slug: "top-10-study-destinations",
    excerpt:
      "Discover the best countries for international education with comprehensive analysis of each destination.",
    content: "Full blog content here...",
    featuredImage: "/Hero-page.png",
    category: "study-abroad",
    tags: "destinations, universities, international education",
    status: "published",
    publishDate: "2024-01-15",
    metaDescription:
      "Explore the top 10 study destinations for international students",
    author: "Admin User",
    readTime: "8 min read",
    views: 1250,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "How to Secure a Scholarship to Study Abroad",
    slug: "how-to-secure-scholarship",
    excerpt:
      "A comprehensive guide to finding and applying for international scholarships.",
    content: "Full blog content here...",
    featuredImage: "/Hero-study-1.jpg",
    category: "scholarships",
    tags: "scholarships, funding, financial aid",
    status: "published",
    publishDate: "2024-01-10",
    metaDescription:
      "Learn how to secure scholarships for international education",
    author: "Admin User",
    readTime: "6 min read",
    views: 980,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: 3,
    title: "Student Visa Application Tips",
    slug: "student-visa-application-tips",
    excerpt: "Essential tips for a smooth student visa application process.",
    content: "Full blog content here...",
    featuredImage: "/Hero-study-2.jpg",
    category: "visa-guide",
    tags: "visa, application, immigration",
    status: "draft",
    publishDate: "",
    metaDescription: "Tips for successful student visa applications",
    author: "Admin User",
    readTime: "5 min read",
    views: 0,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-08"),
  },
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "",
      tags: "",
      status: "draft",
      publishDate: "",
      metaDescription: "",
      author: "Admin User",
      readTime: "",
    },
  });

  const onSubmit = (data: BlogFormData) => {
    if (editingPost) {
      setBlogPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id
            ? { ...post, ...data, updatedAt: new Date() }
            : post
        )
      );
      toast.success("Blog post updated successfully!");
    } else {
      const newPost = {
        id: Date.now(),
        ...data,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBlogPosts((prev) => [...prev, newPost]);
      toast.success("Blog post created successfully!");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    form.reset(post);
    setIsDialogOpen(true);
  };

  const handleDelete = (post: any) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== post.id));
    toast.success("Blog post deleted successfully!");
  };

  const handleAdd = () => {
    setEditingPost(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value) => (
        <div className="flex items-start">
          <FileText className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {value.replace("-", " ")}
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
      key: "views",
      label: "Views",
      render: (value) => (
        <div className="flex items-center">
          <Eye className="h-4 w-4 mr-1" />
          {formatDate(value)}
        </div>
      ),
    },
    {
      key: "publishDate",
      label: "Published",
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {value ? formatDate(value) : "Not published"}
        </div>
      ),
    },
    { key: "author", label: "Author" },
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
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create and manage blog posts and articles
          </p>
        </div>
      </div>

      <DataTable
        data={blogPosts}
        columns={columns}
        title="Blog Posts"
        searchPlaceholder="Search blog posts..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterOptions={filterOptions}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {editingPost
                ? "Update the blog post information below."
                : "Fill in the details to create a new blog post."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog post title" {...field} />
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
                      <Input
                        placeholder="e.g., how-to-study-abroad"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of the blog post"
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your blog post content here"
                        className="resize-none min-h-[200px]"
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
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="readTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Time</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5 min read" {...field} />
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
                        placeholder="e.g., study abroad, scholarships, visa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
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

              <FormField
                control={form.control}
                name="publishDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description (SEO)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="SEO meta description for search engines"
                        className="resize-none"
                        rows={2}
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
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
