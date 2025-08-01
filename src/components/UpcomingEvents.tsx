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
import {
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  Loader2,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEvents } from "@/hooks/admin/queries/events";
import { formatDate } from "@/lib/helpers";
import { Badge } from "./ui/badge";
import { IEvent } from "@/app/admin/events/page";

const UpcomingEvents = () => {
  const { data: eventData, isLoading } = useEvents();
  const events = eventData?.data || [];

  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
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
          <Button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleNav("/events")}
          >
            View All Events
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : events.length > 0 ? (
            events.slice(0, 3).map((event: IEvent, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{event.eventType}</Badge>
                      <Badge variant="destructive">
                        <span className="mr-2"> Deadline:</span>
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(event.registrationDeadline as string)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {event.title}
                    </CardTitle>
                    <CardDescription>
                      Time: {event.time || "No time specified."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{event.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {event.registrationFee}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {`${event.maxAttendees} attendees ` ||
                          " no limit specified."}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {event.speakers || " no speakers listed."}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
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
              No Audience found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
