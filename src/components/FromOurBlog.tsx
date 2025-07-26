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

const FromOurBlog = () => {
  const articles = [
    {
      title: "5 Reasons to Study Abroad",
      summary: "Exploring the top benefits of international education",
      image: "/study.png",
      date: "March 20, 2025",
      author: "John Doe",
    },
    {
      title: "Navigating the Student Application Process",
      summary: "Tips and tricks for a successful application journey",
      image: "/blog-2.jpg",
      date: "April 3, 2025",
      author: "Jane Smith",
    },
    {
      title: "Post-Arrival Tips for International Students",
      summary: "How to settle in your new environment smoothly",
      image: "/blog-3.jpg",
      date: "April 15, 2025",
      author: "Emily Chang",
    },
    {
      title: "Navigating the Student Application Process",
      summary: "Tips and tricks for a successful application journey",
      image: "/blog-4.jpg",
      date: "April 3, 2025",
      author: "Jane Smith",
    },
  ];

  const router = useRouter();

  const handleNav = () => {
    router.push("/blog");
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg border-0 bg-white overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={article.image}
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
                    by {article.author} on {article.date}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-start">
                  <p className="text-gray-600 mb-4">{article.summary}</p>

                  <Button
                    onClick={handleNav}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FromOurBlog;
