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
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  DollarSign,
  GraduationCap,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/helpers";
import { useEvents } from "@/hooks/admin/queries/events";
import { IEvent } from "../admin/events/page";
import HeroSection from "@/components/HeroSection";

{
  /* <SelectItem value="draft">Draft</SelectItem> */
}
// <SelectItem value="published">In Progress</SelectItem>
// <SelectItem value="cancelled">Cancelled</SelectItem>
// <SelectItem value="completed">Completed</SelectItem>

type BadgeVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "primary"
  | null;

export const EventStatusBadge = ({ status }: { status: string }) => {
  const getBadgeVariant = (status: string): BadgeVariant => {
    switch (status.toLowerCase()) {
      case "completed":
        return "primary";
      case "published":
        return "secondary";
      case "cancelled":
      case "draft":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Badge variant={getBadgeVariant(status)}>
      {status === "published" ? "In Progress" : status}
    </Badge>
  );
};
export default function EventPage() {
  const { data: eventData, isLoading } = useEvents();
  const events = eventData?.data || [];

  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}

      <HeroSection
        image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop"
        title="Event Opportunities"
        description="Discover funding opportunities to make your study abroad dreams affordable."
      />

      {/* Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : events.length > 0 ? (
            events.map((event: IEvent, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Added flex flex-col to make the card a flex container */}
                <Card className="h-full border-0 shadow-lg hover:shadow-xl flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{event.eventType}</Badge>
                      <EventStatusBadge status={event.status} />
                      <Badge variant="outline">
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

                  {/* Added flex-1 flex flex-col to make content fill remaining space */}
                  <CardContent className="flex-1 flex flex-col">
                    {/* Content wrapper that will grow to fill available space */}
                    <div className="space-y-4 flex-1">
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

                      <div>
                        <h4 className="font-semibold">Agenda:</h4>
                        <p className="text-sm text-gray-600">
                          {event.agenda || " no agenda available."}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Requirements:</h4>
                        <p className="text-sm text-gray-600">
                          {event.requirements || " no requirements available."}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Audience:</h4>
                        <p className="list-disc list-inside text-sm text-gray-600">
                          {event.targetAudience || "no Audience listed"}
                        </p>
                      </div>
                    </div>

                    {/* Button container that stays at the bottom */}
                    <div className="mt-4 pt-4">
                      <Button
                        onClick={() => handleNav("/apply-now")}
                        className="w-full"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-600">
              No Events found matching your criteria.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#ff814f] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Need Help Finding Scholarships?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Our expert team can help you identify and apply for scholarships that
          match your profile and goals.
        </p>
        <Button
          variant="outline"
          className=" text-black"
          onClick={() => handleNav("/contact")}
        >
          Get Personalized Scholarship Guidance
        </Button>
      </section>

      <Footer />
    </div>
  );
}
