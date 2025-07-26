"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
//import { Button } from "@/components/ui/button";
export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Thank you for visiting Limitless Global Pathways. At Limitless
              Global Pathways, we are committed to protecting your privacy and
              handling your personal information with care. This Privacy Policy
              outlines how we collect, use, share, and safeguard your data when
              you interact with our website.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="mb-6">
          By accessing or using the Limitless Global Pathways website, you
          acknowledge and agree to the practices described in this Privacy
          Policy. If you do not agree with any part of it, we kindly ask that
          you refrain from using our site.
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              1. Information We Collect
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Country of origin</li>
                <li>Academic background</li>
                <li>Preferred study destinations</li>
                <li>Message content submitted via inquiry forms</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              2. How We Use Your Information
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide personalized study abroad guidance</li>
                <li>To respond to your inquiries and requests</li>
                <li>To improve our services and website experience</li>
                <li>To send you updates, newsletters, and relevant content</li>
                <li>
                  To analyze user behavior for better insights and services
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              3. Third-Party Services
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We may use third-party analytics tools to understand how
                visitors interact with our website. These services may use
                cookies and similar technologies, and are governed by their own
                privacy policies.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
              4. Data Security
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We implement reasonable security measures to protect your
                personal data from unauthorized access, use, or disclosure.
                However, please be aware that no internet transmission is
                completely secure. While we do our best to protect your
                information, we cannot guarantee absolute security.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
              5. Policy Updates
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We may revise this Privacy Policy occasionally to reflect
                changes in our practices or to comply with legal requirements.
                The updated policy will be effective as of the date noted at the
                beginning of the document.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold">
              6. Contact Us
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                If you have any questions or concerns about this Privacy Policy
                or how we handle your data, feel free to reach out to us:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Phone: +44 7825926691</li>
                <li>Email: idn@limitlessglobalpathways.co.uk</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="mt-6">
          By continuing to use the Limitless Global Pathways website, you
          confirm that you have read and agree to this Privacy Policy.
        </p>
      </div>
      <Footer />
    </>
  );
}
