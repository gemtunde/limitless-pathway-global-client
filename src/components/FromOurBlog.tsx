"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBlogs } from "@/hooks/admin/queries/blogs";
import { IBlog } from "@/app/admin/blog/page";
import { Loader2 } from "lucide-react";
import { formatDate } from "@/lib/helpers";

const FromOurBlog = () => {
  const { data: blogData, isLoading } = useBlogs();
  const blogs = blogData?.data || [];

  const router = useRouter();

  const handleNav = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            From Our Blog
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Get tips, advice, and updates on studying abroad
          </motion.p>
          <Button className="mt-6" onClick={() => handleNav("")}>
            View All Blogs
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <p className="text-gray-500">Loading blogs...</p>
              <Loader2 className="h-8 w-8 animate-spin text-gray-500 ml-2" />
            </div>
          ) : (
            blogs.map((article: IBlog, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                {/* Added flex flex-col to make the card a flex container */}
                <Card className="h-full transition-all duration-300 hover:shadow-lg border-0 bg-white overflow-hidden flex flex-col">
                  <div className="relative h-40">
                    <Image
                      src={(article.image as string) || "/blog-2.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="text-start">
                    <CardTitle className="text-sm font-semibold text-gray-800 mt-4">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-gray-500 mt-1">
                      by {article.author} on{" "}
                      {formatDate(article.createdAt as unknown as string)}
                    </CardDescription>
                  </CardHeader>

                  {/* Added flex-1 flex flex-col to make content fill remaining space */}
                  <CardContent className="text-start flex-1 flex flex-col">
                    {/* Content wrapper that will grow to fill available space */}
                    <div className="flex-1">
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    </div>

                    {/* Button container that stays at the bottom */}
                    <div>
                      <Button
                        onClick={() => handleNav(article.slug)}
                        size="sm"
                        // className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FromOurBlog;
