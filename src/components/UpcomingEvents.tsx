"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UpcomingEvents = () => {
  const events = [
    {
      title: "UK Study Expo - Virtual Edition",
      description:
        "Virtual event connecting students with top UK institutions and scholarship providers.",
      date: "October 20, 2025",
      time: "10:00 AM - 4:00 PM WAT",
      location: "Online",
      image: "/event-1.jpg",
    },
    {
      title: "Mastering the Scholarship Application Process",
      description:
        "This live webinar will guide you through writing compelling applications for top scholarships.",

      date: "November 5, 2025",
      time: "2:00 PM - 4:00 PM WAT",
      location: "Online",
      image: "/event-2.jpg",
    },
    {
      title: "Meet and Greet - Study in United Kingdom ",
      description:
        "Learn about studying in Ireland and hear from scholarship reps at this exclusive event.",
      date: "November 15, 2025",
      time: "11:00 AM - 1:00 PM WAT",
      location: "Online",
      image: "/welcome.jpg",
    },
  ];
  const router = useRouter();

  const handleNav = () => {
    router.push("/register");
  };
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
            Coming Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Get tips, advice, and updates on studying abroad
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg border-0 bg-gray-50 overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-gray-800">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {event.location}
                    </span>
                  </div>
                </CardContent>

                <Button
                  onClick={handleNav}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-t-none"
                >
                  Register Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
