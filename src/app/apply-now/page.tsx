"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
//import { Mail, Phone, Clock } from "lucide-react";
import { ApplyFormData, applyFormSchema } from "@/lib/validations";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CountryData = {
  flag: string;
  universities: {
    [university: string]: string[];
  };
};
const countriesData: Record<string, CountryData> = {
  "United Kingdom": {
    flag: "🇬🇧",
    universities: {
      "University of Oxford": ["Computer Science", "Law", "Engineering"],
      "University of Cambridge": ["Mathematics", "Medicine", "Architecture"],
    },
  },
  Canada: {
    flag: "🇨🇦",
    universities: {
      "University of Toronto": ["Physics", "Philosophy", "Computer Science"],
      "McGill University": ["Medicine", "Law", "Music"],
    },
  },
  USA: {
    flag: "🇺🇸",
    universities: {
      "Harvard University": ["Business", "Law", "Psychology"],
      MIT: ["Engineering", "Computer Science", "Mathematics"],
    },
  },
  Ireland: {
    flag: "🇮🇪",
    universities: {
      "Trinity College Dublin": ["English", "Philosophy", "Medicine"],
      "University College Dublin": ["Economics", "Law", "Chemistry"],
    },
  },
  "New Zealand": {
    flag: "🇳🇿",
    universities: {
      "University of Auckland": ["Marine Biology", "Education", "Business"],
      "Victoria University of Wellington": [
        "Political Science",
        "Law",
        "Creative Writing",
      ],
    },
  },
  Wales: {
    flag: "🏴",
    universities: {
      "Cardiff University": ["Journalism", "Engineering", "Psychology"],
      "Swansea University": ["Sports Science", "Computer Science", "Nursing"],
    },
  },
};

export default function ApplyNow() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applyFormSchema),
  });

  const onSubmit = async (data: ApplyFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 7000);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
              Apply Now
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to start your international education journey? We are here
              to guide you every step of the way to secure admission at top
              universities worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Thank you for your message! We&apos;ll get back to you
                      soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h2 className="font-semibold">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        {...register("firstName")}
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        {...register("lastName")}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Enter your Last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        City *
                      </label>
                      <Input
                        id="city"
                        type="text"
                        {...register("city")}
                        className={errors.city ? "border-red-500" : ""}
                        placeholder="Enter your city"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="nationality"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nationality *
                      </label>
                      <Input
                        id="nationality"
                        type="text"
                        {...register("nationality")}
                        className={errors.nationality ? "border-red-500" : ""}
                        placeholder="Enter your Nationality"
                      />
                      {errors.nationality && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nationality.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <h2 className="font-semibold">Contact Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <h2 className="font-semibold">More Info</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>

                    <Select
                      onValueChange={(value) => {
                        setSelectedCountry(value);
                        setSelectedUniversity("");
                        setValue("country", value);
                      }}
                    >
                      <SelectTrigger
                        className={errors.country ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(countriesData).map(
                          ([country, data]) => (
                            <SelectItem key={country} value={country}>
                              <span className="flex items-center gap-2">
                                <span>{data.flag}</span>
                                <span>{country}</span>
                              </span>
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      {...register("country")}
                      value={selectedCountry}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University *
                    </label>
                    {/* <Select
                      disabled={!selectedCountry}
                      onValueChange={(value) => setSelectedUniversity(value)}
                    > */}
                    <Select
                      disabled={!selectedCountry}
                      onValueChange={(value) => {
                        setSelectedUniversity(value);
                        setValue("university", value);
                      }}
                    >
                      <SelectTrigger
                        className={errors.university ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a university" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCountry &&
                          Object.keys(
                            countriesData[selectedCountry]?.universities || {}
                          ).map((university) => (
                            <SelectItem key={university} value={university}>
                              {university}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      {...register("university")}
                      value={selectedUniversity}
                    />
                    {errors.university && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.university.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course of Interest *
                    </label>
                    <Select
                      disabled={!selectedUniversity}
                      onValueChange={(value) => setValue("course", value)}
                    >
                      <SelectTrigger
                        className={errors.course ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          countriesData[selectedCountry]?.universities[
                            selectedUniversity
                          ] || []
                        ).map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("course")} />
                    {errors.course && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.course.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Budget(£) *
                      </label>
                      <Input
                        id="budget"
                        type="text"
                        {...register("budget")}
                        className={errors.budget ? "border-red-500" : ""}
                        placeholder="Enter your Budget"
                      />
                      {errors.budget && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Educational Qualification *
                      </label>
                      <Input
                        id="qualification"
                        type="text"
                        {...register("qualification")}
                        className={errors.qualification ? "border-red-500" : ""}
                        placeholder="Your Last Educational Qualification & Percentage"
                      />
                      {errors.qualification && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.qualification.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Other Information
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      className={errors.message ? "border-red-500" : ""}
                      placeholder="Tell us about your study abroad goals and how we can help you"
                      rows={5}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
