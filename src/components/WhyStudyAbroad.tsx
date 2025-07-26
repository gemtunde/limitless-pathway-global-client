"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Globe, GraduationCap, Briefcase, TrendingUp } from "lucide-react";
import Image from "next/image";

const WhyStudyAbroad = () => {
  const reasons = [
    {
      //icon: Globe,
      path: "/worldwide.jpg",
      title: "Global Exposure",
      description: "Experience new cultures and broaden your worldview",
      color: "bg-blue-100 text-blue-600",
    },
    {
      path: "/education.jpg",
      // icon: GraduationCap,
      title: "Quality Education",
      description: "Access renowned universities and programs",
      color: "bg-green-100 text-green-600",
    },
    {
      path: "/career.png",
      //icon: Briefcase,
      title: "Career Opportunities",
      description: "Boost your resume with international credentials",
      color: "bg-purple-100 text-purple-600",
    },
    {
      path: "/growth.jpg",
      //icon: TrendingUp,
      title: "Personal Growth",
      description: "Gain independence, confidence and life long friends",
      color: "bg-orange-100 text-orange-600",
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
            WHY STUDY ABROAD?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Unlock opportunities beyond borders
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
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
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Image
                      src={reason.path}
                      alt={reason.title}
                      width={80}
                      height={80}
                      className="object-cover rounded-full p-1"
                    />
                    {/* <reason.icon className="h-8 w-8" /> */}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStudyAbroad;
