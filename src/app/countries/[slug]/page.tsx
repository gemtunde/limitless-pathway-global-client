// app/countries/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
//import { countriesData } from "@/data/countries";
import { Button } from "@/components/ui/button";
import Flag from "react-world-flags";
import { notFound } from "next/navigation";
import { countriesData } from "@/data/countries";
import Footer from "@/components/Footer";

export default function CountryPage() {
  //   const { slug } = useParams();
  //   const country = countriesData.find((c) => c.slug === slug);
  const params = useParams();
  const slug = params?.slug;

  // Ensure slug is available before accessing data
  if (!slug) return <p>Loading...</p>;

  const country = countriesData.find((country) => country.slug === slug);

  if (!country) return notFound();

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
          {country.benefits.map((benefit, i) => (
            <div key={i} className="bg-muted p-4 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Scholarships</h2>
          <div className="space-y-4">
            {country.scholarships.map((scholarship, i) => (
              <div key={i}>
                <h4 className="font-semibold text-primary mb-1">
                  {scholarship.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {scholarship.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

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
            {country.visaRequirements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
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
          <Button>Contact Now</Button>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
