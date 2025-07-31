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

export default function Countries() {
  // const countries = [
  //   {
  //     name: "United States",
  //     description: "World-class universities offering diverse courses.",
  //     code: "US",
  //     slug: "united-states",
  //   },
  //   {
  //     name: "United Kingdom",
  //     description: "Home to historic universities with a global reputation.",
  //     code: "GB",
  //     slug: "united-kingdom",
  //   },
  //   {
  //     name: "Canada",
  //     description: "Known for quality education and multicultural diversity.",
  //     code: "CA",
  //     slug: "canada",
  //   },
  //   {
  //     name: "Scotland",
  //     description: "Famous for cutting-edge research and vibrant campus life.",
  //     code: "GB",
  //     slug: "scotland",
  //   },
  //   {
  //     name: "New Zealand",
  //     description: "Quality education in a stunning natural environment.",
  //     code: "NZ",
  //     slug: "new-zealand",
  //   },
  //   {
  //     name: "Ireland",
  //     description: "English-speaking education with rich cultural heritage.",
  //     code: "IE",
  //     slug: "ireland",
  //   },
  //   {
  //     name: "Wales",
  //     description: "Central European education with strong research focus.",
  //     code: "GB",
  //     slug: "wales",
  //   },
  // ];
  const router = useRouter();

  const handleNav = () => {
    router.push("apply-now");
  };

  //const [currentPage, setCurrentPage] = useState(1);
  const { data: countryData, isLoading } = useCountries();

  // Define a more flexible API response type
  interface ApiCountryResponse {
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

  const countries: ApiCountryResponse[] = countryData?.data || [];
  console.log("Country Data:", countries);
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
              Study Destinations
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore top study destinations and choose the right fit for your
              educational journey
            </p>
          </motion.div>
        </div>
      </section>

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
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                      <div className="flex items-center justify-center h-28 bg-gray-100 rounded-t-lg">
                        <Flag code={country.flagCode} className="h-16 w-auto" />
                      </div>
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {country.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {country.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                          Learn More
                        </Button>
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
      <section className="py-20 bg-blue-600">
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
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Talk to our experts and get personalized recommendations based on
              your preferences and goals.
            </p>
            <Button
              onClick={handleNav}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
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
