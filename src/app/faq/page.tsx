"use client";

import { motion } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import { useFaq } from "@/hooks/admin/queries/faq";
import { IFaq } from "../admin/faq/page";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/HeroSection";

// const faqData = [
//   {
//     question: "What is Limitless Global Pathways?",
//     answer:
//       "Limitless Global Pathways is a comprehensive platform dedicated to helping students explore and pursue study abroad opportunities. We provide detailed information on universities, academic programs, scholarships, and application processes across various countries, along with essential tools and resources to guide you through every stage of your international education journey.",
//   },
//   {
//     question: "How can Limitless Global Pathways help me study abroad?",
//     answer:
//       "We serve as your reliable guide by providing curated information about global institutions, connecting you with suitable programs, assisting with application processes, and offering ongoing support throughout your study abroad journey. Our platform is designed to help you make informed decisions with confidence.",
//   },
//   {
//     question: "Is your service free to use?",
//     answer:
//       "Please contact us directly for detailed information about our service offerings and any associated costs. We provide various levels of support to match different student needs and budgets.",
//   },
//   {
//     question: "How do I start my study abroad application?",
//     answer:
//       "Begin by exploring our countries and programs sections to identify your preferred destinations and courses. Use our inquiry forms to connect with our team, who will provide personalized guidance based on your academic background, interests, and career goals.",
//   },
//   {
//     question: "What documents do I need for studying abroad?",
//     answer:
//       "Academic transcripts and certificates\nLanguage proficiency test scores (IELTS, TOEFL, etc.)\nStatement of purpose or personal statement\nLetters of recommendation\nPassport and visa documentation\nFinancial statements or sponsorship letters\nPortfolio (for creative programs)",
//   },
//   {
//     question: "Which countries do you cover?",
//     answer:
//       "We provide information and support for study opportunities in multiple countries worldwide. Visit our countries section to explore detailed information about each destination, including popular universities, program options, and country-specific requirements.",
//   },
//   {
//     question: "Do you offer support for all academic levels?",
//     answer:
//       "Yes, we support students seeking opportunities at various academic levels, including undergraduate, postgraduate, doctoral programs, and professional courses. We also provide information about foundation programs and English language courses.",
//   },
//   {
//     question: "How do I choose the right country and program for me?",
//     answer:
//       "Our team provides personalized consultations to help you identify the best fit based on your academic background, career aspirations, budget, and personal preferences. We consider factors such as program quality, career prospects, living costs, and cultural fit.",
//   },
//   {
//     question: "Do you provide information about scholarships?",
//     answer:
//       "Yes, we maintain comprehensive information about scholarships available for international students, including government scholarships, university-specific awards, and private funding opportunities. Our scholarships section is regularly updated with new opportunities.",
//   },
//   {
//     question: "Can you help me apply for scholarships?",
//     answer:
//       "Absolutely! We provide guidance on scholarship applications, including eligibility criteria, application deadlines, required documents, and tips for writing compelling scholarship essays.",
//   },
//   {
//     question: "What are the typical costs involved in studying abroad?",
//     answer:
//       "Costs vary significantly by country, institution, and program. Generally, you should budget for tuition fees, accommodation, living expenses, health insurance, and travel costs. We provide detailed cost breakdowns for each destination to help you plan your finances effectively.",
//   },
//   {
//     question:
//       "Do you provide ongoing support after I arrive at my destination?",
//     answer:
//       "Yes, we offer continued support to help you settle into your new environment. This includes assistance with accommodation, orientation information, and connecting you with local resources.",
//   },
//   {
//     question: "How can I get in touch with your team?",
//     answer:
//       "You can reach us through our contact forms on the website, email us directly, or schedule a consultation. We strive to respond to all inquiries promptly and provide personalized support.",
//   },
//   {
//     question: "What are your response times?",
//     answer:
//       "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate this in your message, and we'll prioritize your request.",
//   },
// ];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleIndex = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };
  const { data: faqData, isLoading } = useFaq();
  const faqs = faqData?.data || [];
  console.log("FAQs:", faqs);

  return (
    <div className="min-h-screen">
      {/* Hero */}

      <HeroSection
        image="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop"
        title="Frequently Asked Questions"
        description="Everything you need to know about studying abroad and how Limitless Global Pathways can support you."
      />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            faqs
              .filter((faq: IFaq) => typeof faq._id === "string")
              .map((faq: IFaq, index: number) => (
                <motion.div
                  key={faq._id as string}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="border-0 shadow-md">
                    <Collapsible
                      open={openIndex === (faq._id as string)}
                      onOpenChange={() => toggleIndex(faq._id as string)}
                    >
                      <CollapsibleTrigger className="w-full flex justify-between items-center px-6 py-4 font-medium text-left text-gray-900 hover:bg-gray-50">
                        {faq.question}

                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            openIndex === faq._id ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className=" flex flex-col gap-2 p-6 pb-4 text-gray-700 text-sm whitespace-pre-line">
                        <Badge className="bg-[#ff814f] text-white py-2 px-4 w-fit">
                          {faq.category}
                        </Badge>
                        {faq.answer}
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </motion.div>
              ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#ff814f]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Reach out to our expert advisors for personalized guidance and
              support on your study abroad journey.
            </p>
            <Button variant="outline" className=" text-black" size="lg">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
