'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Limitless Global Pathways made my dream of studying in the UK possible.",
      name: "Amira Yusuf",
      location: "Nigeria",
    },
    {
      quote: "The team helped me secure a scholarship I didn&apos;t even know I was eligible for.",
      name: "Samuel Mensah",
      location: "Ghana",
    },
    {
      quote: "Their pre-departure support gave me the confidence I needed.",
      name: "Fatima Bello",
      location: "Abuja",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Hear from our students who found theirs through LGP
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg border-0 bg-gray-100">
                <CardHeader className="text-center">
                  <Quote className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {testimonial.quote}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-500">
                    {testimonial.name} - {testimonial.location}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

