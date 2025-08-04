"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Flag from "react-world-flags";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { useCountryBySlug } from "@/hooks/admin/queries/countries";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import Image from "next/image";

export default function CountryPage() {
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const { data: countryData, isLoading } = useCountryBySlug(slug);
  const country = countryData?.data || [];

  // Ensure slug is available before accessing data
  if (!slug) return <p>Loading...</p>;

  if (!country) return notFound();
  if (isLoading) return <TableSkeleton rows={10} />;

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <main className="space-y-10 px-4 md:px-20 py-10">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <Flag code={country.flagCode} style={{ width: 50, height: 30 }} />
          </div>
          <h1 className="text-3xl font-bold text-primary">
            Study in {country.name}
          </h1>
          {/* <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {country.intro}
        </p> */}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-muted p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-1">Benefit</h3>
            <p className="text-sm text-muted-foreground">
              {country?.benefits || "No benefits listed."}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-1">Cost of Living</h3>
            <p className="text-sm text-muted-foreground">
              {country?.costOfLiving ||
                "No cost of living information available."}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-1">Popular Universities</h3>
            <p className="text-sm text-muted-foreground">
              {country?.popularUniversities ||
                "No popular universities information available."}
            </p>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Scholarships
            </h2>
            <p className="text-[16px] text-gray-600 mb-6">
              {country?.scholarships || "No description available."}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-[16px] text-gray-600 mb-6">
              {country?.description || "No description available."}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Language Requirements
            </h2>

            <p className="text-[16px] text-gray-600 mb-6">
              {country?.languageRequirements ||
                "No language requirements available."}
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 my-4 justify-center">
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
              </div> */}
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

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            Student Visa Requirements for {country.name}
          </h2>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground text-sm">
            {country?.visaRequirements || "No visa requirements listed."}
          </ul>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg font-semibold mb-4">
            Start your journey to academic excellence in {country.name} with
            expert guidance and support
          </p>
          <Button onClick={() => handleNav("/contact")}>Contact Now</Button>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
