"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const blogData = {
  "top-10-study-destinations": {
    title: "Top 10 Study Destinations for International Students",
    image: "/Hero-page.png",
  },
  "how-to-secure-scholarship": {
    title: "How to Secure a Scholarship to Study Abroad",
    image: "/Hero-study-1.jpg",
  },
  "student-visa-application-tips": {
    title: "Tips for a Smooth Student Visa Application Process",
    image: "/Hero-study-2.jpg",
  },
  "budgeting-tips-for-international-students": {
    title: "Budgeting Tips for International Students",
    image: "/event-1.jpg",
  },
  "student-accommodation-guide": {
    title: "Choosing the Right Student Accommodation Abroad",
    image: "/event-2.jpg",
  },
  "part-time-jobs-for-students": {
    title: "Finding Part-Time Jobs While Studying Abroad",
    image: "/education.jpg",
  },
  "language-preparation-tips": {
    title: "Preparing for Language Proficiency Exams",
    image: "/career.png",
  },
  "how-to-choose-your-major": {
    title: "How to Choose the Right Major for Your Career Goals",
    image: "/blog-2.jpg",
  },
  "cultural-adjustment-abroad": {
    title: "Adjusting to a New Culture: What to Expect",
    image: "/blog-3.jpg",
  },
  "mental-health-support-students": {
    title: "Mental Health Support for International Students",
    image: "/blog-4.jpg",
  },
  "student-health-insurance-guide": {
    title: "Your Guide to Student Health Insurance Abroad",
    image: "/event-1.jpg",
  },
  "internships-during-study": {
    title: "Gaining Experience Through Internships Abroad",
    image: "/event-2.jpg",
  },
};

export default function BlogPage() {
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(blogData).map(([slug, { title, image }]) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <Image
                  src={image}
                  alt={title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {title}
                  </h2>
                  <p className="text-sm text-primary hover:underline">
                    Read more →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
