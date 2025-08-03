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
//import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Flag from "react-world-flags"; // Corrected flag import
import { useRouter } from "next/navigation";
import { useCountries } from "@/hooks/admin/queries/countries";
import { Loader2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";

export interface ApiCountryResponse {
  _id?: number;
  id?: number;
  name?: string;
  slug?: string;
  flagCode?: string;
  description?: string;
  benefits?: string;
  scholarships?: string;
  visaRequirements?: string;
  popularUniversities?: string;
  costOfLiving?: string;
  languageRequirements?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  status?: "active" | "inactive" | string;
  code?: string;
  region?: string;
  population?: string;
  applicationUrl?: string;
}

export default function Countries() {
  const router = useRouter();

  const handleNav = () => {
    router.push("apply-now");
  };

  const { data: countryData, isLoading } = useCountries();

  const countries: ApiCountryResponse[] = countryData?.data || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Study Destinations
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore top study destinations and choose the right fit for your
              educational journey
            </p>
          </motion.div>
        </div>
      </section> */}
      {/* <HeroSection
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
        title="Study Destinations tunde"
        description="Explore top study destinations and choose the right fit for your educational journey"
      /> */}
      {/* <HeroSection
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        //  image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        title="Study Destinations"
        description="Explore top study destinations and choose the right fit for your educational journey"
      /> */}
      <HeroSection
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop"
        title="Study Destinations"
        description="Explore top study destinations and choose the right fit for your educational journey"
      />

      {/* Countries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-8 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              countries.map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex-shrink-0 w-64"
                >
                  <Link href={`/countries/${country.slug}`}>
                    <Card className="h-[400px] border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
                      <div className="flex items-center justify-center h-28 bg-gray-100 rounded-t-lg">
                        <Flag code={country.flagCode} className="h-16 w-auto" />
                      </div>
                      <CardHeader className="text-center flex-shrink-0">
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {country.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-3">
                          {country.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center flex-grow flex flex-col justify-end">
                        <Button className="mt-auto w-full">Learn More</Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#ff814f] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Help Choosing a Country?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Talk to our experts and get personalized recommendations based on
              your preferences and goals.
            </p>
            <Button
              onClick={handleNav}
              size="lg"
              variant="outline"
              //className=" hover:bg-yellow-100 text-black font-semibold"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
