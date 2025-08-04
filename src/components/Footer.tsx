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
            {/* <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo-2.png"
                alt="Limitless Global Pathways Logo"
                height={50}
                width={100}
                className="object-contain h-16 w-auto brightness-0 invert"
              />
            </Link> */}
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Limitless Global Pathways Logo"
                height={50}
                width={100}
                className="object-contain h-17 w-auto brightness-0 invert"
                //priority
              />
            </Link>
            <p className="text-white text-2xl mb-0 max-w-md">
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
                <Link href="/about" className="text-white hover:text-[#ff814f]">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white hover:text-[#ff814f]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/scholarships"
                  className="text-white hover:text-[#ff814f]"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#ff814f]"
                >
                  Countries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-[#ff814f]"
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
                <Link href="/blog" className="text-white hover:text-[#ff814f]">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-white hover:text-[#ff814f]"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white hover:text-[#ff814f]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-[#ff814f]"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white hover:text-[#ff814f]"
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
                  className="text-white hover:text-[#ff814f]"
                >
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#ff814f]"
                >
                  United States
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#ff814f]"
                >
                  Canada
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#ff814f]"
                >
                  Ireland
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-white hover:text-[#ff814f]"
                >
                  Wales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-800 mt-8 pt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-[#ff814f] font-semibold text-sm mb-4 md:mb-0">
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
