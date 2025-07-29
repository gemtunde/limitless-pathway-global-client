// app/admin/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  //GraduationCap,
  Award,
  MessageSquare,
  Calendar,
  FileText,
  //TrendingUp,
  Globe,
  Mail,
  //Clock,
} from "lucide-react";
import Link from "next/link";

// Mock data for dashboard stats
const dashboardStats = {
  totalApplications: 1247,
  newApplications: 23,
  totalScholarships: 156,
  activeScholarships: 89,
  totalCountries: 7,
  blogPosts: 45,
  publishedPosts: 38,
  unreadMessages: 12,
  upcomingEvents: 3,
  teamMembers: 8,
};

const recentApplications = [
  {
    id: 1,
    name: "John Doe",
    country: "United Kingdom",
    course: "Computer Science",
    status: "new",
    date: "2024-01-22",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    country: "Canada",
    course: "Business Administration",
    status: "reviewing",
    date: "2024-01-21",
  },
  {
    id: 3,
    name: "Michael Chen",
    country: "United States",
    course: "Medicine",
    status: "contacted",
    date: "2024-01-20",
  },
  {
    id: 4,
    name: "Aisha Ibrahim",
    country: "Australia",
    course: "Engineering",
    status: "accepted",
    date: "2024-01-19",
  },
];

const recentMessages = [
  {
    id: 1,
    name: "David Wilson",
    subject: "UK Data Science Programs",
    status: "unread",
    date: "2024-01-22",
  },
  {
    id: 2,
    name: "Aisha Ibrahim",
    subject: "Canadian Public Health",
    status: "replied",
    date: "2024-01-21",
  },
  {
    id: 3,
    name: "James Okafor",
    subject: "Australian Engineering",
    status: "read",
    date: "2024-01-20",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "UK Study Expo – Virtual",
    date: "2025-10-20",
    type: "virtual",
    registered: 245,
  },
  {
    id: 2,
    title: "Canada Education Fair",
    date: "2025-11-15",
    type: "in-person",
    registered: 156,
  },
  {
    id: 3,
    title: "USA University Webinar",
    date: "2025-09-25",
    type: "virtual",
    registered: 89,
  },
];

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "unread":
        return "bg-red-100 text-red-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              Total Applications
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalApplications.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{dashboardStats.newApplications} new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Scholarships
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.activeScholarships}
            </div>
            <p className="text-xs text-muted-foreground">
              of {dashboardStats.totalScholarships} total scholarships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Study Countries
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalCountries}
            </div>
            <p className="text-xs text-muted-foreground">
              Available destinations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.unreadMessages}
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
              <CardTitle>Recent Applications</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/applications">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
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
                    {/* <span className="text-sm text-muted-foreground">
                      {new Date(application.date).toLocaleDateString()}
                    </span> */}
                    {new Date(application.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))}
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
                <Link href="/admin/applications">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Applications
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/scholarships">
                  <Award className="mr-2 h-4 w-4" />
                  Add Scholarship
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/blog">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Blog Post
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/events">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Event
                </Link>
              </Button>
            </div>

            <div className="pt-4 border-t">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Messages</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/contact">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMessages.map((message) => (
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
                </div>
              ))}
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
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                        {/* {new Date(event.date).toLocaleDateString()} •{" "} */}
                        {event.registered} registered
                      </p>
                      {/* 
                      {new Date(application.date).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})}

                      */}
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
