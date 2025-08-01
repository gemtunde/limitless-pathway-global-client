"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  GraduationCap,
  Loader2,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";
import { useScholarships } from "@/hooks/admin/queries/scholarships";
import { Scholarship } from "@/app/admin/scholarships/page";
import { Badge } from "./ui/badge";
import { formatDate } from "@/lib/helpers";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Scholarships = () => {
  const { data: scholarshipData, isLoading } = useScholarships();
  const scholarships = scholarshipData?.data || [];

  const router = useRouter();
  const handleNav = (path: string) => {
    router.push(path);
  };
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
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : scholarships.length > 0 ? (
            scholarships
              .slice(0, 3)
              .map((scholarship: Scholarship, index: number) => (
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
              ))
          ) : (
            <p className="col-span-2 text-center text-gray-600">
              No scholarships found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
