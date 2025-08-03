"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  DollarSign,
  GraduationCap,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useScholarships } from "@/hooks/admin/queries/scholarships";
import { Scholarship } from "../admin/scholarships/page";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/helpers";
import HeroSection from "@/components/HeroSection";

export default function Scholarships() {
  const { data: scholarshipData, isLoading } = useScholarships();
  const scholarships = scholarshipData?.data || [];
  const categories = [
    "All",
    "Research",
    "Leadership",
    "Development",
    "Exchange",
    "Academic",
  ];
  const countries: string[] = [
    "All",
    ...Array.from(
      new Set((scholarships as Scholarship[]).map((s) => String(s.location)))
    ),
  ];
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScholarships = scholarships.filter(
    (scholarship: Scholarship) => {
      const matchCategory =
        selectedCategory === "All" || scholarship.category === selectedCategory;
      const matchCountry =
        selectedCountry === "All" || scholarship.location === selectedCountry;
      const matchSearch =
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchCountry && matchSearch;
    }
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection
        image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&h=1080&fit=crop"
        title="Scholarship Opportunities"
        description="Discover funding opportunities to make your study abroad dreams affordable"
      />

      {/* Filters */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          {/* Category Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Country and Search */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Search by name or title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px]"
            />
          </div>
        </div>
      </section>

      {/* Scholarships */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : filteredScholarships.length > 0 ? (
            filteredScholarships.map(
              (scholarship: Scholarship, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{scholarship.category}</Badge>
                        <Badge variant="destructive">
                          <span className="mr-2"> Deadline:</span>
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(scholarship.deadline)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold">
                        {scholarship.title}
                      </CardTitle>
                      <CardDescription>{scholarship.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{scholarship.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {scholarship.amount}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {scholarship.location}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {scholarship.level}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(scholarship.deadline)}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold">Requirements:</h4>
                        <p className=" text-sm text-gray-600">
                          {scholarship.requirements ||
                            " no requirements available."}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Benefits:</h4>
                        <p className="list-disc list-inside text-sm text-gray-600">
                          {scholarship.benefits || "no benefits listed"}
                        </p>
                      </div>

                      <Button
                        onClick={() => handleNav("/apply-now")}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )
          ) : (
            <p className="col-span-2 text-center text-gray-600">
              No scholarships found matching your criteria.
            </p>
          )}
        </div>
      </section> */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : filteredScholarships.length > 0 ? (
            filteredScholarships.map(
              (scholarship: Scholarship, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Added flex flex-col to make the card a flex container */}
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{scholarship.category}</Badge>
                        <Badge variant="outline">
                          <span className="mr-2"> Deadline:</span>
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(scholarship.deadline)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold">
                        {scholarship.title}
                      </CardTitle>
                      <CardDescription>{scholarship.provider}</CardDescription>
                    </CardHeader>

                    {/* Added flex-1 flex flex-col to make content fill remaining space */}
                    <CardContent className="flex-1 flex flex-col">
                      {/* Content wrapper that will grow to fill available space */}
                      <div className="space-y-4 flex-1">
                        <p>{scholarship.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {scholarship.amount}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {scholarship.location}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            {scholarship.level}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(scholarship.deadline)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">Requirements:</h4>
                          <p className="text-sm text-gray-600">
                            {scholarship.requirements ||
                              " no requirements available."}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Benefits:</h4>
                          <p className="list-disc list-inside text-sm text-gray-600">
                            {scholarship.benefits || "no benefits listed"}
                          </p>
                        </div>
                      </div>

                      {/* Button container that stays at the bottom */}
                      <div className="mt-4 pt-4">
                        <Button
                          onClick={() => handleNav("/apply-now")}
                          className="w-full"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )
          ) : (
            <p className="col-span-2 text-center text-gray-600">
              No scholarships found matching your criteria.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#ff814f] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Need Help Finding Scholarships?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Our expert team can help you identify and apply for scholarships that
          match your profile and goals.
        </p>
        <Button
          variant="outline"
          onClick={() => handleNav("/contact")}
          className=" text-black "
        >
          Get Personalized Scholarship Guidance
        </Button>
      </section>

      <Footer />
    </div>
  );
}
