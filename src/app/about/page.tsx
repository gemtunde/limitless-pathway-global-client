"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Target, Users, Heart, ArrowRight, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTeam } from "@/hooks/admin/queries/team";
import { ITeam } from "../admin/team/page";

export default function About() {
  // const members = [
  //   {
  //     name: "Sule Farida",
  //     image: "/farida.jpeg",
  //     title: "Project Management",
  //   },
  //   {
  //     name: "Gloria Owusu Agyeman",
  //     image: "/glria.avif",
  //     title: "Project Management",
  //   },
  //   {
  //     name: "Helen Idoko",
  //     image: "/helen.avif",
  //     title: "Project Management",
  //   },
  // ];
  // Data fetching and mutations
  const { data: teamData, isLoading } = useTeam();
  const members = teamData?.data || [];
  console.log("Team data fetched:", members);

  const values = [
    {
      icon: Award,
      title: "Our Vision",
      description:
        "Recognized as a trusted global platform for studying abroad.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Creating a website that empowers students educational journey.",
    },
    {
      icon: Users,
      title: "Our History",
      description:
        "LGP was founded to make global education accessible connecting students to universities worldwide.",
    },
    {
      icon: Heart,
      title: "Compassionate",
      description:
        "We understand the challenges of studying abroad and provide compassionate support.",
    },
  ];
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Limitless Global Pathways
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner in making international education dreams a
              reality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-[16px] text-gray-600 mb-3">
                Limitless Global Pathways was founded in the 2000&apos;s we
                believe that studying abroad isn’t just about choosing a
                university it’s about discovering who you are, what you love,
                and where your dreams can take you.
              </p>
              <p className="text-[16px] text-gray-600 mb-3">
                Our easy-to-use platform opens the doors to world-class
                universities, life changing scholarships, and inspiring academic
                programs across the globe. From understanding admission
                requirements to preparing your application and securing funding
                we guide you step by step.
              </p>
              <p className="text-[16px] text-gray-600 mb-3">
                But we’re more than just information. We’re your partner in
                every moment of this adventure. Need help comparing countries?
                Want tips for visa interviews? Curious about living abroad?
                You’ll find practical tools, expert advice, and caring support
                right here.
              </p>
              <p className="text-[16px] text-gray-600">
                So, if you’re ready to explore the world and create a future
                without limits let’s begin this journey together.
              </p>
              <p className="text-[16px] text-gray-600">
                Limitless Global Pathways your gateway to a successful academic
                journey{" "}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 my-4 justify-center">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                  onClick={() => handleNav("/apply-now")}
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
                  Contact Us
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

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              The principles that guide us in everything we do
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Our experienced team is dedicated to helping you achieve your
              study abroad goals
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              members.map((member: ITeam) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 4 * 0.2 }}
                >
                  <Card className="text-center border-0 shadow-lg">
                    <Image
                      src={`${member.image}`}
                      alt={`Team Member ${member.id}`}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {member.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {member.title}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
