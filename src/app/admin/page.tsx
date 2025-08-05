"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  //GraduationCap,
  Award,
  //MessageSquare,
  Calendar,
  FileText,
  //TrendingUp,
  Globe,
  Mail,
  Loader2,
  //Clock,
} from "lucide-react";
import Link from "next/link";
import { useService } from "@/hooks/admin/queries/service";
import { Service } from "./services/page";
import { useScholarships } from "@/hooks/admin/queries/scholarships";
import { Scholarship } from "./scholarships/page";
import { useEvents } from "@/hooks/admin/queries/events";
import { IEvent } from "./events/page";
import { useCountries } from "@/hooks/admin/queries/countries";

export default function AdminDashboard() {
  //services
  const { data: serviceData, isLoading: isLoadingServices } = useService();
  const services = serviceData?.data || [];

  // scholarships
  const { data: scholarshipData, isLoading: isLoadingScholarships } =
    useScholarships();
  const scholarships = scholarshipData?.data || [];

  //events
  const { data: eventData, isLoading: isLoadingEvents } = useEvents();
  const events = eventData?.data || [];

  //countries
  const { data: countryData, isLoading: isLoadingCountries } = useCountries();
  const countries = countryData?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here is what is happening with your consultancy.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Services
            </CardTitle>
            <Users className="h-4 w-4 text-[#fa4d32]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingServices ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              ) : (
                services.length || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              services offered by your us
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Scholarships
            </CardTitle>
            <Award className="h-4 w-4 text-[#fa4d32]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingScholarships ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              ) : (
                scholarships.length || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Scholarships available for students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Globe className="h-4 w-4 text-[#fa4d32]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingEvents ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              ) : (
                events.length || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upcoming events for students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <Mail className="h-4 w-4 text-[#fa4d32]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingCountries ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              ) : (
                countries.length || 0
              )}
              {/* {dashboardStats.unreadMessages} */}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Applications */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Services</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/services">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingServices ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : services.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No recent services available.
                </p>
              ) : (
                services.slice(0, 4).map((service: Service) => (
                  <div
                    key={service._id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#fa4d32] flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      {new Date(service.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div> */}
                  </div>
                ))
              )}

              {/* {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{application.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {application.course} • {application.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(application.date).toLocaleDateString()}
                    </span>
                    {new Date(application.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))} */}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Stats */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button asChild className="w-full justify-start">
                <Link href="/admin">
                  <Users className="mr-2 h-4 w-4 text-[#fa4d32]" />
                  Manage Applications
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/scholarships">
                  <Award className="mr-2 h-4 w-4 text-[#fa4d32]" />
                  Add Scholarship
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/blog">
                  <FileText className="mr-2 h-4 w-4 text-[#fa4d32] " />
                  Create Blog Post
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/events">
                  <Calendar className="mr-2 h-4 w-4 text-[#fa4d32]" />
                  Schedule Event
                </Link>
              </Button>
            </div>

            {/* <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">System Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blog Posts</span>
                  <span>
                    {dashboardStats.publishedPosts}/{dashboardStats.blogPosts}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team Members</span>
                  <span>{dashboardStats.teamMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Upcoming Events</span>
                  <span>{dashboardStats.upcomingEvents}</span>
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>

      {/* Additional Content */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Scholarships</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/scholarships">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoadingScholarships ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : services.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No recent scholarships available.
                </p>
              ) : (
                scholarships.slice(0, 4).map((scholarship: Scholarship) => (
                  <div
                    key={scholarship._id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#fa4d32] flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {scholarship.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {scholarship.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {scholarship.category}
                    </Badge>
                  </div>
                ))
              )}

              {/* recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{message.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      //size="sm"
                      className={getStatusColor(message.status)}
                    >
                      {message.status}
                    </Badge>
                  </div>
                </div> */}
              {/* ))} */}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/events">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoadingEvents ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : services.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No recent events available.
                </p>
              ) : (
                events.slice(0, 3).map((event: IEvent) => (
                  <div
                    key={event._id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-[#fa4d32]" />
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="font-medium text-sm">
                          {" "}
                          {event.registeredCount} registered
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {event.eventType}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
