"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import { useState } from "react";
//import Image from "next/image";

import {
  Home,
  Users,
  GraduationCap,
  MapPin,
  Award,
  Calendar,
  FileText,
  MessageSquare,
  User,
} from "lucide-react";
import Image from "next/image";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  submenu?: SubMenuItem[];
};

type SubMenuItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  // {
  //   name: "Home",
  //   href: "/admin/banner",
  //   icon: Home,
  //   submenu: [
  //     { name: "Banner", href: "/admin/banner" },
  //     { name: "Scholarships", href: "/admin/scholarships" },
  //     { name: "Overview", href: "/overview" },
  //   ],
  // },
  {
    name: "Services",
    href: "/admin/services",
    icon: Settings,
  },
  {
    name: "Countries",
    href: "/admin/countries",
    icon: MapPin,
  },
  {
    name: "Scholarships",
    href: "/admin/scholarships",
    icon: Award,
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    name: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  // {
  //   name: "Applications",
  //   href: "/admin/applications",
  //   icon: Users,
  // },
  {
    name: "About Team",
    href: "/admin/team",
    icon: Users,
  },
  // {
  //   name: "Contact Messages",
  //   href: "/admin/contact",
  //   icon: MessageSquare,
  // },
  {
    name: "FAQs",
    href: "/admin/faq",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/admin/update-profile",
    icon: Settings,
    submenu: [
      {
        name: "User Profile",
        href: "/admin/update-profile",
        icon: GraduationCap,
      },
      {
        name: "Change Password",
        href: "/admin/change-password",
        icon: Home,
      },
      { name: "Create User", href: "//admin/create-user", icon: User },
    ],
  },
];
export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  const toggleMenu = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  const isMenuActive = (item: MenuItem) => {
    return (
      pathname === item.href ||
      (item.submenu && item.submenu.some((sub) => pathname === sub.href))
    );
  };

  return (
    <div className={cn("pb-12 min-h-screen bg-black w-[20%]", className)}>
      <div className="space-y-4 py-4  text-white h-full">
        <div className="px-3 py-2">
          <div className="mb-2 text-lg font-semibold">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image
                src="/logo-4.png"
                alt="Limitless Global Pathways Logo"
                height={50}
                width={100}
                className="object-contain h-18 w-auto"
              />
            </Link>
          </div>
          <div className="space-y-1 mt-12">
            {menuItems.map((item) => (
              <div key={item.href}>
                <div className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between space-x-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      isMenuActive(item)
                        ? "bg-accent text-[#fa4d32]"
                        : "transparent"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.submenu && (
                      <button
                        onClick={(e) => toggleMenu(e, item.href)}
                        className="p-1 rounded hover:bg-muted"
                      >
                        {expandedMenus[item.href] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </Link>
                </div>

                {item.submenu && expandedMenus[item.href] && (
                  <div className="ml-8 space-y-1 mt-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-2 my-4 text-sm rounded-md hover:bg-muted",
                          pathname === subItem.href &&
                            "bg-muted font-semibold text-[#fa4d32]"
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.name}</span>
                        </div>
                        {/* <span className="ml-4">{subItem.name}</span> */}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
