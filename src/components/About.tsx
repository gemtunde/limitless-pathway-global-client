"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const About = () => {
  const stats = [
    { number: "1+", label: "Years Experience", icon: Award },
    { number: "50+", label: "Students Helped", icon: Users },
    { number: "5+", label: "Countries", icon: MapPin },
  ];

  const features = [
    "Expert counseling and guidance",
    "Personalized study plans",
    "University application assistance",
    "Visa processing support",
    "Pre-departure orientation",
    "Post-arrival support",
  ];
  const router = useRouter();

  const handleNav = () => {
    router.push("/about");
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Welcome to Limitless Global Pathways – Your Gateway to
              <span className="text-[#ff814f]"> Global Education</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Are you exploring options for studying abroad? Limitless Global
              Pathways (LGP) is your trusted student recruitment agency
              committed to guiding students across Africa and beyond toward
              world-class educational opportunities.
            </p>

            {/* <p className="text-lg text-gray-600 mb-8">
              Navigating international applications can feel overwhelming, but with our experienced team of global education specialists, you&apos;ll never be alone. We provide personalized guidance, expert advice, and unwavering support, ensuring your journey from aspiration to admission is smooth and successful.
            </p> */}

            {/* <p className="text-lg text-gray-600 mb-8">
              As a reliable and student-centered organization, LGP delivers a
              smooth and efficient experience. Our comprehensive services are
              designed to support your aspirations journey from inquiry to
              international admissions at Limitless Global Pathways.
            </p> */}

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-[#ff814f] flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={handleNav}
              size="lg"
              // className="bg-blue-600 hover:bg-blue-700"
            >
              Learn More About Us
            </Button>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/welcome.jpg"
                alt="Students studying"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <stat.icon className="h-8 w-8 text-[#ff814f] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
