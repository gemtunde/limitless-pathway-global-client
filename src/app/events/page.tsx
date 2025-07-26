"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

// export const metadata: Metadata = {
//   title: "Event | Limitless Global Pathways",
// };

export default function EventPage() {
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
              UK Study Expo – Virtual Edition
            </h1>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Register Now
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-20 py-16">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Event Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Event Title: UK Study Expo –
                  Virtual Edition
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Date: October 20, 2025
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Time: 2:00 PM - 4:30 PM (WAT)
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location: Online (Zoom - link
                  shared after registration)
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Event Type: Virtual
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Registration Fee: Free
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Event Description</h3>
              <p className="text-gray-800">
                Join us for the UK Study Expo – Virtual Edition, a comprehensive
                online event designed to guide aspiring international students
                through the excitement and opportunities of studying in the UK.
                This interactive session will help you discover UK universities,
                available scholarships, admissions requirements, and tips—all
                from the comfort of your home.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Who Should Attend</h3>
              <ul className="list-disc list-inside text-gray-800">
                <li>
                  Secondary school graduates seeking undergraduate programs in
                  the UK
                </li>
                <li>
                  University students or graduates interested in postgraduate
                  opportunities
                </li>
                <li>
                  Parents/guardians looking to explore study options for their
                  children
                </li>
                <li>
                  School counselors and academic advisors supporting
                  international education
                </li>
                <li>
                  Working professionals aiming to upskill through UK-based
                  certifications and master’s programs
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Why You Should Attend:
              </h3>
              <ul className="list-disc list-inside text-gray-800">
                <li>Learn how to apply for UK student visas</li>
                <li>
                  Discover fully and partially funded scholarship opportunities
                </li>
                <li>
                  Gain insights on student life, accommodation, and career
                  options
                </li>
                <li>Ask your questions live during interactive Q&A sessions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">How to Register</h3>
              <ol className="list-decimal list-inside text-gray-800">
                <li>Click Register Now and Fill out form</li>
                <li>
                  Check your email for a confirmation link and event details
                </li>
                <li>Mark your calendar and join us live on the event date!</li>
              </ol>
            </div>
          </div>

          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="text-lg font-semibold mb-2">
                Subscribe to Newsletter
              </h4>
              <div className="flex gap-2">
                <Input placeholder="Enter email address" />
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
