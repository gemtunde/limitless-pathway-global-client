"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useBlogs } from "@/hooks/admin/queries/blogs";
import { IBlog } from "../admin/blog/page";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";

export default function BlogPage() {
  const { data: blogData, isLoading } = useBlogs();
  const blogs = blogData?.data || [];
  console.log("Blogs data:", blogs);
  return (
    <div className="min-h-screen">
      <HeroSection
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop"
        title="Study Abroad Blog"
        description="Ready to start your international education journey? We are here to guide you every step of the way to secure admission at top universities worldwide."
      />

      <section className="w-full py-10 md:py-20 px-4 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              blogs.map((blog: IBlog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className=" rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col h-full"
                >
                  <Image
                    src={
                      typeof blog.image === "string"
                        ? blog.image
                        : "/blog-2.jpg"
                    }
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  {/* Added flex-1 flex flex-col to make content area flexible */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Content wrapper that will grow to fill available space */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-primary hover:underline">
                        {blog.excerpt || "Read this blog to learn more!"}
                      </p>
                    </div>

                    {/* Button container that stays at the bottom */}
                    <div className="mt-4">
                      <Button
                      //className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Read more →
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
