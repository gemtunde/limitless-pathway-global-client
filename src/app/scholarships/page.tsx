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
} from "lucide-react";
import Footer from "@/components/Footer";

export default function Scholarships() {
  const scholarships = [
    {
      title: "Fulbright U.S. Student Program",
      provider: "U.S. State Department",
      amount: "Full funding",
      deadline: "October 1, 2025",
      location: "United States",
      level: "Graduate",
      description:
        "The Fulbright Program offers research, study, and teaching opportunities in over 140 countries.",
      requirements: [
        "Bachelor's degree",
        "U.S. citizenship",
        "Strong academic record",
      ],
      benefits: [
        "Full tuition",
        "Monthly stipend",
        "Travel allowance",
        "Health insurance",
      ],
      category: "Research",
    },
    {
      title: "Chevening Scholarships",
      provider: "UK Government",
      amount: "Full funding",
      deadline: "November 7, 2025",
      location: "United Kingdom",
      level: "Master's",
      description:
        "Chevening Scholarships are awarded to exceptional individuals with leadership potential.",
      requirements: [
        "Bachelor's degree",
        "Work experience",
        "English proficiency",
      ],
      benefits: [
        "Full tuition",
        "Monthly stipend",
        "Travel costs",
        "Visa application",
      ],
      category: "Leadership",
    },
    {
      title: "Commonwealth Scholarships",
      provider: "Commonwealth Scholarship Commission",
      amount: "Full funding",
      deadline: "October 1, 2025",
      location: "UK & Commonwealth",
      level: "Master's/PhD",
      description:
        "For citizens of Commonwealth countries to pursue postgraduate studies.",
      requirements: [
        "Commonwealth citizenship",
        "First-class degree",
        "Development impact",
      ],
      benefits: [
        "Full tuition",
        "Living allowance",
        "Return airfare",
        "Thesis grant",
      ],
      category: "Development",
    },
    {
      title: "Erasmus+ Programme",
      provider: "European Commission",
      amount: "Partial funding",
      deadline: "Multiple deadlines",
      location: "Europe",
      level: "Various",
      description:
        "EU programme for education, training, youth and sport in Europe.",
      requirements: [
        "EU citizenship or enrollment",
        "Academic excellence",
        "Language skills",
      ],
      benefits: [
        "Monthly grant",
        "Travel support",
        "Language courses",
        "Insurance",
      ],
      category: "Exchange",
    },
    {
      title: "Australia Awards",
      provider: "Australian Government",
      amount: "Full funding",
      deadline: "April 30, 2025",
      location: "Australia",
      level: "Master's/PhD",
      description:
        "Long-term development scholarships for developing countries.",
      requirements: [
        "Developing country citizenship",
        "Leadership potential",
        "Development focus",
      ],
      benefits: [
        "Full tuition",
        "Living allowance",
        "Health cover",
        "Return airfare",
      ],
      category: "Development",
    },
    {
      title: "DAAD Scholarships",
      provider: "German Academic Exchange Service",
      amount: "Partial/Full funding",
      deadline: "Various deadlines",
      location: "Germany",
      level: "Master's/PhD",
      description:
        "Scholarships for international students to study in Germany.",
      requirements: [
        "Bachelor's degree",
        "German/English proficiency",
        "Academic excellence",
      ],
      benefits: [
        "Monthly stipend",
        "Travel allowance",
        "Health insurance",
        "German courses",
      ],
      category: "Academic",
    },
  ];

  const categories = [
    "All",
    "Research",
    "Leadership",
    "Development",
    "Exchange",
    "Academic",
  ];
  const countries = [
    "All",
    ...Array.from(new Set(scholarships.map((s) => s.location))),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchCategory =
      selectedCategory === "All" || scholarship.category === selectedCategory;
    const matchCountry =
      selectedCountry === "All" || scholarship.location === selectedCountry;
    const matchSearch =
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchCountry && matchSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Scholarship Opportunities
        </h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Discover funding opportunities to make your study abroad dreams
          affordable
        </p>
      </section>

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((scholarship, index) => (
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
                        <Clock className="w-3 h-3 mr-1" />
                        {scholarship.deadline}
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
                        {scholarship.deadline}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {scholarship.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold">Benefits:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {scholarship.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-600">
              No scholarships found matching your criteria.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Need Help Finding Scholarships?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Our expert team can help you identify and apply for scholarships that
          match your profile and goals.
        </p>
        <Button className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500">
          Get Personalized Scholarship Guidance
        </Button>
      </section>

      <Footer />
    </div>
  );
}
