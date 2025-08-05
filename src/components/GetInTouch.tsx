"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";

const GetInTouch = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "info@limitlessglobalpathways.com",
      link: "mailto:info@limitlessglobalpathways.com",
    },
    {
      icon: Phone,
      title: "Phone",
      info: "+44 7041948285",
      link: "tel:+447041948285",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      info: "@limitlessglobalpathways",
      link: "https://linkedin.com/company/limitlessglobalpathways",
    },
  ];

  return (
    <section className="py-20 bg-[#fa4d32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white max-w-3xl mx-auto"
          >
            Feel free to contact us for information below
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <a
                href={contact.link}
                className="group block p-8 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                <div className="bg-[#fa4d32] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors duration-300">
                  <contact.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {contact.title}
                </h3>
                <p className="text-black">{contact.info}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
