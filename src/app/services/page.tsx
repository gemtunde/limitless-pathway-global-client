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
import {
  CheckCircle,
  // FileText,
  // GraduationCap,
  // Plane,
  // Users,
  // CreditCard,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useService } from "@/hooks/admin/queries/service";
import { Service } from "../admin/services/page";
import React from "react";
import HeroSection from "@/components/HeroSection";

export default function Services() {
  const { data: serviceData, isLoading } = useService();
  const services = serviceData?.data || [];

  const process = [
    {
      step: "01",
      title: "Initial Consultation",
      description:
        "Free consultation to understand your goals and preferences.",
    },
    {
      step: "02",
      title: "Profile Assessment",
      description:
        "Comprehensive evaluation of your academic and professional background.",
    },
    {
      step: "03",
      title: "University Selection",
      description:
        "Shortlist universities based on your profile and preferences.",
    },
    {
      step: "04",
      title: "Application Process",
      description:
        "Complete application support from documentation to submission.",
    },
    {
      step: "05",
      title: "Visa Assistance",
      description: "End-to-end visa application support and guidance.",
    },
    {
      step: "06",
      title: "Pre-Departure",
      description: "Orientation and preparation for your study abroad journey.",
    },
  ];

  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
        title="Our Services"
        description="Comprehensive support for your study abroad journey from start to finish"
      />

      {/* Services Section */}
      {/* Mission Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome to Limitless Global Pathways -{" "}
                <span className="text-[#fa4d32]">
                  Your Gateway to International Education
                </span>
              </h2>
              <p className="text-[16px] text-gray-600 mb-3">
                Limitless Global Pathways is a premier international educational
                consultancy dedicated to helping students explore and pursue
                study abroad opportunities worldwide. We provide comprehensive
                guidance in selecting the right universities and academic
                programs based on students qualifications, career aspirations,
                and personal goals. Our expert team assists with the complete
                admission process, scholarship applications, and student visa
                preparation.
              </p>
              <p className="text-[16px] text-gray-600 mb-3">
                Limitless Global Pathways is your one-stop solution for students
                aspiring to study overseas. We are recognised for our commitment
                to shaping the careers of international education seekers. We
                are established to transform aspirations into achievements
                through our expert guidance and comprehensive services. We serve
                as the vital bridge connecting students with universities across
                the globe.
              </p>
              {/* <p className="text-[16px] text-gray-600 mb-3">
                We believe in delivering exceptional service quality and
                ensuring the fastest, most efficient admission process for our
                students. Our platform offers detailed information on
                universities, academic programs, scholarships, and application
                processes across various countries, providing students, parents,
                and individuals with the essential tools and resources needed to
                navigate every stage of their study abroad journey with
                confidence.
              </p> */}
              {/* <p className="text-[16px] text-gray-600">
                At Limitless Global Pathways, we position ourselves as your
                reliable, knowledgeable, and resourceful guide for international
                education, helping you take the first step toward applying to
                global institutions and achieving your academic dreams abroad.
              </p> */}

              <div className="flex flex-col sm:flex-row gap-4 my-4 justify-center">
                <Button
                  onClick={() => handleNav("/apply-now")}
                  size="lg"
                  variant="outline"
                  // className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => handleNav("/contact")}
                  size="lg"
                  // variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Send Enquiry
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/Hero-study-1.jpg"
                alt="Our Mission"
                width={500}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              What We Offer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Our comprehensive range of services designed to make your study
              abroad dreams a reality
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              services.map((service: Service, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="bg-[#fa4d32] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        {"0" + (index + 1)}
                      </div>
                      {/* <div
                            >
                        <service.icon />
                      </div> */}
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {service.title || "Service Title Not"}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {service.description || "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#fa4d32] mr-2 flex-shrink-0" />
                        {service?.features || "Explore our features"}
                      </p>

                      {/* <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      Learn More
                    </Button> */}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              At Limitless Global Pathways, we position ourselves as your
              reliable, knowledgeable, and resourceful guide for international
              education, helping you take the first step toward applying to
              global institutions and achieving your academic dreams abroad.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="bg-[#fa4d32] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {item.step}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#fa4d32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Book a free consultation with our experts today and take the first
              step towards your study abroad goals.
            </p>
            <Button
              onClick={() => handleNav("/apply-now")}
              size="lg"
              className="bg-white hover:bg-yellow-100 text-black font-semibold"
            >
              Book Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
