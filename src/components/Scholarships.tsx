"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  //CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
import { Calendar, Book, GraduationCap } from "lucide-react";

const Scholarships = () => {
  const scholarships = [
    {
      icon: GraduationCap,
      title: "Fulbright U.S. Student Program",
      eligibility: "Graduating seniors, graduate students, young professionals",
      deadline: "October 1, 2025",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Book,
      title: "Chevening Scholarship",
      eligibility: "Emerging leaders with strong academic backgrounds",
      deadline: "November 7, 2025",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Calendar,
      title: "Commonwealth Scholarship",
      eligibility: "Students from developing commonwealth countries",
      deadline: "October 1, 2025",
      color: "bg-green-100 text-green-600",
    },
  ];

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
            Scholarships Highlight
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Explore the scholarships that can support your studies abroad
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg border-0 bg-white">
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${scholarship.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <scholarship.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {scholarship.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-start">
                  <div className="text-gray-600 mb-4  ">
                    <strong className="mr-1">Eligibility:</strong>
                    {scholarship.eligibility}
                  </div>
                </CardContent>
                <CardFooter className="flex items-start">
                  <div className="flex items-center justify-start text-sm text-gray-600">
                    <span className="flex items-center justify-center font-bold text-gray-700 mr-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Deadline:
                    </span>
                    {scholarship.deadline}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
