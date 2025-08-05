"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-4.png"
                alt="Limitless Global Pathways Logo"
                height={50}
                width={100}
                className="object-contain h-18 w-auto"
              />
            </Link>
            <p className="text-white text-2xl my-4 max-w-md">
              Your gateway to a successful academic journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Featured Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white hover:text-[#fa4d32]">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/scholarships"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Countries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-white hover:text-[#fa4d32]">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white hover:text-[#fa4d32]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#fa4d32]"
                >
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#fa4d32]"
                >
                  United States
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Canada
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Ireland
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#fa4d32]"
                >
                  Wales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-800 mt-8 pt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-[#fa4d32] font-semibold text-sm mb-4 md:mb-0">
            © 2025 Limitless Global Pathways. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-blue-200 hover:text-white text-sm">
              <TwitterIcon />
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white text-sm">
              <FacebookIcon />
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white text-sm">
              <TwitchIcon />
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white text-sm">
              <LinkedinIcon />
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white text-sm">
              <YoutubeIcon />
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white text-sm">
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
