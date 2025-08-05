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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/admin/table/DataTable";
import { toast } from "sonner";
import {
  FileText,
  Calendar,
  //Eye,
  Loader2,
  X,
  //ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/helpers";
import { useBlogs } from "@/hooks/admin/queries/blogs";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import {
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from "@/hooks/admin/mutations/blogs/useBlog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
//import ImageUploadZone from "@/components/form/ImageUploadZone";
import ImageUploadZone from "@/components/form/ImageUploadZone";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  image: z
    .string()
    .url("Must be a valid image URL")
    .optional()
    .or(z.literal("")),

  //image: z.string().optional(),
  //image: z.any().optional(),
  // image: z
  //   .string()
  //   .url("Must be a valid image URL")
  //   .optional()
  //   .or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  publishDate: z.string().optional(),
  metaDescription: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  readTime: z.string().optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags?: string;
  status: "draft" | "published" | "archived";
  publishDate?: string;
  metaDescription?: string;
  author: string;
  readTime?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  // Index signature for DataTable compatibility
  [key: string]: string | number | Date | undefined;
}

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

export default function BlogPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<IBlog | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<IBlog | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewBlog, setViewBlog] = useState<IBlog | null>(null);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      tags: "",
      status: "draft",
      publishDate: "",
      metaDescription: "",
      author: "Admin User",
      readTime: "",
    },
  });
  //const [bannerFile, setBannerFile] = useState<File | null>(null);

  //form.setValue("image", bannerFile);
  // const handleImageUpload = (file: File | null) => {
  //   setBannerFile(file);
  //   if (file) {
  //     // Assuming you want to store the file name as the path
  //     form.setValue("image", file.name);
  //   } else {
  //     form.setValue("image", "");
  //   }
  // };

  // Data fetching and mutations
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blogData, isLoading } = useBlogs(currentPage, 10);
  const blogs = blogData?.data || [];
  console.log("Blogs data fetched:", blogs);

  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  // Transform data to ensure it has the required id field
  const transformedBlogs: IBlog[] = blogs.map((blog: IBlog) => ({
    ...blog,
    id: blog._id || blog.id, // Ensure id field exists
  }));

  // const onSubmit = (data: BlogFormData) => {
  //   if (editingPost) {
  //     setBlogPosts((prev) =>
  //       prev.map((post) =>
  //         post.id === editingPost.id
  //           ? { ...post, ...data, updatedAt: new Date() }
  //           : post
  //       )
  //     );
  //     toast.success("Blog post updated successfully!");
  //   } else {
  //     const newPost: IBlog = {
  //       id: Date.now(),
  //       ...data,
  //       views: 0,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };
  //     setBlogPosts((prev) => [...prev, newPost]);
  //     toast.success("Blog post created successfully!");
  //   }

  //   form.reset();
  //   setIsDialogOpen(false);
  //   setEditingPost(null);
  // };

  // Form submission handler
  const onSubmit = async (data: BlogFormData) => {
    try {
      // If image is a filename (not URL and not empty), prepend base URL
      // if (data.image && !data.image.startsWith("http") && data.image !== "") {
      //   data.image = `${process.env.NEXT_PUBLIC_MEDIA_URL}/${data.image}`;
      // }
      if (editingPost) {
        const res = await updateBlog.mutateAsync({ data, id: editingPost.id });
        toast.success(
          res.message || "Blog post has been updated successfully!"
        );
      } else {
        console.log("Creating new blog post with data:", data);
        const res = await createBlog.mutateAsync(data);
        toast.success(
          res.message || "Blog post has been created successfully!"
        );
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post");
    }

    form.reset();
    setIsDialogOpen(false);
    setEditingPost(null);
  };
  const handleEdit = (post: IBlog) => {
    setEditingPost(post);
    form.reset(post);
    setIsDialogOpen(true);
  };

  const handleDelete = (post: IBlog) => {
    setIsDeleteDialogOpen(true);
    setDeleteData(post);
  };

  const handleDeleteBlog = async () => {
    try {
      const res = await deleteBlog.mutateAsync(deleteData?._id as string);
      toast.success(res.message || "Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteData(null);
    }
  };

  const handleView = (post: IBlog) => {
    setViewBlog(post);
    setIsViewDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPost(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const columns: Column<IBlog>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value: string | number | Date | undefined) => {
        const title = value as string;
        return (
          <div className="flex items-start">
            <FileText className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
            <span className="font-medium">{title}</span>
          </div>
        );
      },
    },
    {
      key: "category",
      label: "Category",
      render: (value: string | number | Date | undefined) => {
        const category = value as string;
        return (
          <Badge variant="outline" className="capitalize">
            {category.replace("-", " ")}
          </Badge>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (value: string | number | Date | undefined) => {
        const status = value as "draft" | "published" | "archived";
        return (
          <Badge
            variant={
              status === "published"
                ? "default"
                : status === "draft"
                  ? "secondary"
                  : "outline"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    // {
    //   key: "views",
    //   label: "Views",
    //   render: (value: string | number | Date | undefined) => {
    //     const views = value as number;
    //     return (
    //       <div className="flex items-center">
    //         <Eye className="h-4 w-4 mr-1" />
    //         {views.toLocaleString()}
    //       </div>
    //     );
    //   },
    // },
    {
      key: "publishDate",
      label: "Published",
      render: (value: string | number | Date | undefined) => {
        const publishDate = value as string;
        return (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {publishDate ? formatDate(publishDate) : "Not published"}
          </div>
        );
      },
    },
    {
      key: "author",
      label: "Author",
    },
    // {
    //   key: "createdAt",
    //   label: "Created",
    //   sortable: true,
    //   render: (value: string | number | Date | undefined) => {
    //     //const date = value as Date;
    //     return formatDate(value as string);
    //   },
    // },
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

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable<IBlog>
          data={transformedBlogs}
          columns={columns}
          title="Blogs"
          searchPlaceholder="Search blogs..."
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

              {/* <FormField
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
              /> */}
              {/* <ImageUploadZone
                label="Banner Image"
                description="Upload a clear Banner Image"
                file={bannerFile}
                onChange={setBannerFile}
              /> */}
              {/* <ImageUploadZone
                label="Banner Image"
                description="Upload a clear Banner Image"
                file={bannerFile}
                onChange={(url) => setBannerFile(url)}
              /> */}
              {/* Image Upload Section */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image</FormLabel>
                    <FormControl>
                      <ImageUploadZone
                        label=""
                        description="Upload a featured image for your blog post (max 4MB)"
                        value={field.value}
                        onChange={(url) => field.onChange(url || "")}
                        disabled={createBlog.isPending || updateBlog.isPending}
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
      {/* Delete Dialog */}
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
              onClick={handleDeleteBlog}
              disabled={deleteBlog.isPending}
              className="w-full"
            >
              Delete
              {deleteBlog.isPending && (
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
                <DrawerTitle>Blog</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>
              <DrawerHeader>
                <DrawerTitle className="text-xl font-bold">
                  {viewBlog?.title}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-muted-foreground">
                  {viewBlog?.category}
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="my-2">
                  <p className="font-semibold">Date:</p>
                  <p>
                    {viewBlog?.publishDate
                      ? formatDate(viewBlog?.publishDate as string)
                      : "N/A"}
                  </p>
                </div>
                <div className="my-2">
                  <p className="font-semibold">Author:</p>
                  <p>{viewBlog?.author}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Description:</p>
                  <p>{viewBlog?.content}</p>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Excerpts:</p>
                  <p>{viewBlog?.excerpt}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{viewBlog?.status}</Badge>
                </div>

                <div className="my-2">
                  <p className="font-semibold">Tags:</p>
                  <p>{viewBlog?.tags}</p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </Drawer>
    </div>
  );
}
