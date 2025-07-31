"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import { useBlogBySlug } from "@/hooks/admin/queries/blogs";
import { formatDate } from "@/lib/helpers";

// const blogData = {
//   "top-10-study-destinations": {
//     title: "Top 10 Study Destinations for International Students",
//     image: "/Hero-page.png",
//     content: `Discover the most popular and welcoming countries for international students. Countries like the UK, Canada, Australia, and Germany consistently rank high due to their world-class universities, multicultural environments, and post-study work opportunities.`,
//   },
//   "how-to-secure-scholarship": {
//     title: "How to Secure a Scholarship to Study Abroad",
//     image: "/Hero-study-1.jpg",
//     content: `Scholarships can significantly reduce the financial burden of studying abroad. This guide walks you through various types of scholarships (merit-based, need-based, program-specific), how to find them, and tips for writing winning applications.`,
//   },
//   "student-visa-application-tips": {
//     title: "Tips for a Smooth Student Visa Application Process",
//     image: "/Hero-study-2.jpg",
//     content: `Securing your student visa is a crucial step. From gathering documents and preparing for interviews to understanding processing timelines, this article offers a clear roadmap.`,
//   },
//   "budgeting-tips-for-international-students": {
//     title: "Budgeting Tips for International Students",
//     image: "/event-1.jpg",
//     content: `Learn how to manage your finances while studying abroad. This article offers practical budgeting advice, money-saving strategies, and tips on avoiding unnecessary expenses.`,
//   },
//   "student-accommodation-guide": {
//     title: "Choosing the Right Student Accommodation Abroad",
//     image: "/event-2.jpg",
//     content: `Explore your housing options when studying abroad. We cover dorms, shared apartments, homestays, and what to consider before signing any contract.`,
//   },
//   "part-time-jobs-for-students": {
//     title: "Finding Part-Time Jobs While Studying Abroad",
//     image: "/education.jpg",
//     content: `This article explains how international students can find legal part-time work, balance study and job, and gain experience in a new country.`,
//   },
//   "language-preparation-tips": {
//     title: "Preparing for Language Proficiency Exams",
//     image: "/education.jpg",
//     content: `Understand the importance of exams like IELTS, TOEFL, and others. Learn how to prepare, what resources to use, and how to improve your scores.`,
//   },
//   "how-to-choose-your-major": {
//     title: "How to Choose the Right Major for Your Career Goals",
//     image: "/blog-2.jpg",
//     content: `A guide to aligning your passion, skills, and long-term career goals with your academic major and study abroad destination.`,
//   },
//   "cultural-adjustment-abroad": {
//     title: "Adjusting to a New Culture: What to Expect",
//     image: "/blog-3.jpg",
//     content: `Cultural shock is real. Here are ways to ease into your new environment, make friends, and thrive abroad.`,
//   },
//   "mental-health-support-students": {
//     title: "Mental Health Support for International Students",
//     image: "/blog-4.jpg",
//     content: `Tips on taking care of your mental health abroad, finding support services on campus, and staying connected to your roots.`,
//   },
//   "student-health-insurance-guide": {
//     title: "Your Guide to Student Health Insurance Abroad",
//     image: "/event-1.jpg",
//     content: `This article outlines the types of student insurance policies available, what they cover, and how to choose the right one for you.`,
//   },
//   "internships-during-study": {
//     title: "Gaining Experience Through Internships Abroad",
//     image: "/event-2.jpg",
//     content: `Learn how to find internships while studying abroad, the benefits they offer, and how to use them as a career springboard.`,
//   },
// };

export default function BlogDetails() {
  // const params = useParams();
  // const slug = params?.slug as string;
  // const post = blogData[slug as keyof typeof blogData];

  // if (!post) notFound();
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const { data: blogData, isLoading } = useBlogBySlug(slug);
  const blog = blogData?.data || [];
  console.log("Blog data fetched:", blog);

  // Ensure slug is available before accessing data
  if (!slug) return <p>Loading...</p>;

  if (!blog) return notFound();
  if (isLoading) return <TableSkeleton rows={5} />;

  return (
    <div className="min-h-screen">
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Study Abroad Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Limitless Global Pathways Blog,
            </p>
          </motion.div>
        </div>
      </section>
      <section className="w-full py-10 md:py-20 px-4 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            {blog.title}
          </h1>
          <Image
            src={blog.image || "/blog-2.jpg"}
            alt={blog.title}
            width={900}
            height={500}
            className="w-full h-auto rounded-lg mb-8"
          />
          <div className=" flex items-center justify-between mb-6 w-full">
            <p className="text-sm text-gray-500">
              Published By {blog.author || "Admin"}
            </p>
            <p className="text-sm text-gray-500 ">
              Published on {formatDate(blog.createdAt as string)}
            </p>
            <p className="text-sm text-gray-500 ">
              {blog.category || "Uncategorized"}
            </p>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
