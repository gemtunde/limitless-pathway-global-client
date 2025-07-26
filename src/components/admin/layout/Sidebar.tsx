"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  Home,
  Users,
  GraduationCap,
  MapPin,
  Award,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
} from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  icon: any;
  submenu?: SubMenuItem[];
};

type SubMenuItem = {
  name: string;
  href: string;
};

// const menuItems: MenuItem[] = [
//   {
//     name: "Home",
//     href: "/",
//     submenu: [
//       { name: "Banner", href: "/admin/banner" },
//       { name: "Scholarships", href: "/admin/scholarships" },
//       { name: "Overview", href: "/overview" },
//     ],
//   },
//   {
//     name: "About Us",
//     href: "/about",
//     submenu: [
//       // { name: "Our Story", href: "/about/story" },
//       // { name: "Team", href: "/about/team" },
//       // { name: "Mission", href: "/about/mission" },
//     ],
//   },
//   {
//     name: "Services",
//     href: "/services",
//     submenu: [
//       { name: "Consulting", href: "/services/consulting" },
//       { name: "Training", href: "/services/training" },
//       { name: "Support", href: "/services/support" },
//     ],
//   },
//   {
//     name: "Countries",
//     href: "/countries",
//     submenu: [
//       { name: "USA", href: "/countries/usa" },
//       { name: "Canada", href: "/countries/canada" },
//       { name: "UK", href: "/countries/uk" },
//     ],
//   },
//   {
//     name: "Scholarship",
//     href: "/scholarship",
//     submenu: [
//       { name: "Applications", href: "/scholarship/applications" },
//       { name: "Eligibility", href: "/scholarship/eligibility" },
//       { name: "Deadlines", href: "/scholarship/deadlines" },
//     ],
//   },
//   {
//     name: "Contact Us",
//     href: "/contact",
//     submenu: [
//       { name: "Form", href: "/contact/form" },
//       { name: "Locations", href: "/contact/locations" },
//       { name: "Support", href: "/contact/support" },
//     ],
//   },
// ];
const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    name: "Home",
    href: "/admin/banner",
    icon: Home,
    submenu: [
      { name: "Banner", href: "/admin/banner" },
      { name: "Scholarships", href: "/admin/scholarships" },
      { name: "Overview", href: "/overview" },
    ],
  },
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
  {
    name: "Applications",
    href: "/admin/applications",
    icon: Users,
  },
  {
    name: "About Team",
    href: "/admin/team",
    icon: Users,
  },
  {
    name: "Contact Messages",
    href: "/admin/contact",
    icon: MessageSquare,
  },
  {
    name: "FAQs",
    href: "/admin/faq",
    icon: MessageSquare,
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
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-2 px-4 text-lg font-semibold">
            <Link href="/admin" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span>LGP Admin</span>
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
                        ? "bg-accent text-accent-foreground"
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
                          "flex items-center space-x-2 px-4 py-2 text-sm rounded-md hover:bg-muted",
                          pathname === subItem.href && "bg-muted font-semibold"
                        )}
                      >
                        <span className="ml-4">{subItem.name}</span>
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

// export function Sidebar({ className }: { className?: string }) {
//   const pathname = usePathname();
//   const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
//     {}
//   );

//   const toggleMenu = (href: string) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [href]: !prev[href],
//     }));
//   };

//   return (
//     <div className={cn("pb-12 min-h-screen", className)}>
//       <div className="space-y-4 py-4">
//         <div className="px-3 py-2">
//           <div className="mb-2 px-4 text-lg font-semibold">
//             <Link href="/admin" className="flex items-center space-x-2">
//               <GraduationCap className="h-6 w-6" />
//               <span>LGP Admin</span>
//             </Link>
//           </div>
//           <div className="space-y-1 mt-12">
//             {menuItems.map((item) => (
//               <div key={item.href}>
//                 <div
//                   className={cn(
//                     "flex items-center justify-between space-x-2 rounded-lg p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer",
//                     pathname === item.href ||
//                       (item.submenu &&
//                         item.submenu.some((sub) => pathname === sub.href))
//                       ? "bg-accent text-accent-foreground"
//                       : "transparent"
//                   )}
//                   onClick={() => item.submenu && toggleMenu(item.href)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <item.icon className="h-4 w-4" />
//                     <span>{item.name}</span>
//                   </div>
//                   {item.submenu &&
//                     (expandedMenus[item.href] ? (
//                       <ChevronDown className="h-4 w-4" />
//                     ) : (
//                       <ChevronRight className="h-4 w-4" />
//                     ))}
//                 </div>

//                 {item.submenu && expandedMenus[item.href] && (
//                   <div className="ml-8 space-y-1 mt-1">
//                     {item.submenu.map((subItem) => (
//                       <Link
//                         key={subItem.href}
//                         href={subItem.href}
//                         className={cn(
//                           "flex items-center space-x-2 px-4 py-2 text-sm rounded-md hover:bg-muted",
//                           pathname === subItem.href && "bg-muted font-semibold"
//                         )}
//                       >
//                         <span className="ml-4">{subItem.name}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function Sidebar({ className }: { className?: string }) {
//   //const pathname = usePathname();
//   const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
//     {}
//   );

//   const toggleMenu = (href: string) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [href]: !prev[href],
//     }));
//   };

//   // Check if current path or any submenu path is active
//   const isMenuActive = (item: MenuItem) => {
//     return (
//       pathname === item.href ||
//       (item.submenu && item.submenu.some((sub) => pathname === sub.href))
//     );
//   };
//   const pathname = usePathname();
//   return (
//     // <aside className="w-64 bg-white border-r px-4">
//     //   <Link href="/admin">
//     //     <Image
//     //       src="/logo.png"
//     //       alt="Limitless Global Pathways Logo"
//     //       height={100}
//     //       width={100}
//     //       //className="object-contain"
//     //       //  priority
//     //     />
//     //   </Link>
//     //   <nav className="space-y-1">
//     //     {menuItems.map((item) => (
//     //       <div key={item.href} className="space-y-1">
//     //         <div
//     //           className={cn(
//     //             "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-muted",
//     //             isMenuActive(item) && "bg-muted font-semibold"
//     //           )}
//     //           onClick={() => toggleMenu(item.href)}
//     //         >
//     //           <Link href={item.href} className="flex-1">
//     //             {item.name}
//     //           </Link>
//     //           {item.submenu &&
//     //             (expandedMenus[item.href] ? (
//     //               <ChevronDown className="h-4 w-4" />
//     //             ) : (
//     //               <ChevronRight className="h-4 w-4" />
//     //             ))}
//     //         </div>

//     //         {item.submenu && expandedMenus[item.href] && (
//     //           <div className="ml-4 space-y-1">
//     //             {item.submenu.map((subItem) => (
//     //               <Link
//     //                 key={subItem.href}
//     //                 href={subItem.href}
//     //                 className={cn(
//     //                   "block px-3 py-2 rounded-md hover:bg-muted text-sm",
//     //                   pathname === subItem.href && "bg-muted font-semibold"
//     //                 )}
//     //               >
//     //                 {subItem.name}
//     //               </Link>
//     //             ))}
//     //           </div>
//     //         )}
//     //       </div>
//     //     ))}
//     //   </nav>
//     // </aside>
//     <div className={cn("pb-12 min-h-screen", className)}>
//       <div className="space-y-4 py-4">
//         <div className="px-3 py-2">
//           <div className="mb-2 px-4 text-lg font-semibold">
//             <Link href="/admin" className="flex items-center space-x-2">
//               <GraduationCap className="h-6 w-6" />
//               <span>LGP Admin</span>
//             </Link>
//             {/* <Link href="/admin">
//               <Image
//                 src="/logo.png"
//                 alt="Limitless Global Pathways Logo"
//                 height={100}
//                 width={100}
//                 className="object-contain"
//                 //  priority
//               />
//             </Link> */}
//           </div>
//           <div className="space-y-1 mt-12">
//             {menuItems.map((item) => (
//               <div key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                     pathname === item.href
//                       ? "bg-accent text-accent-foreground"
//                       : "transparent"
//                   )}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   <span>{item.name}</span>
//                 </Link>

//                 {item.submenu && expandedMenus[item.href] && (
//                   <div className="ml-4 space-y-1">
//                     {item.submenu.map((subItem) => (
//                       <Link
//                         key={subItem.href}
//                         href={subItem.href}
//                         className={cn(
//                           "block px-3 py-2 rounded-md hover:bg-muted text-sm",
//                           pathname === subItem.href && "bg-muted font-semibold"
//                         )}
//                       >
//                         {subItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
