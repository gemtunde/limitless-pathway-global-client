"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ExploreDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  const destinations = [
    {
      name: "UK",
      flag: "🇬🇧",
      bgColor: "bg-red-50",
    },
    {
      name: "USA",
      flag: "🇺🇸",
      bgColor: "bg-blue-50",
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      bgColor: "bg-red-50",
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      bgColor: "bg-green-50",
    },
    {
      name: "Germany",
      flag: "🇩🇪",
      bgColor: "bg-yellow-50",
    },
    {
      name: "France",
      flag: "🇫🇷",
      bgColor: "bg-blue-50",
    },
    {
      name: "Japan",
      flag: "🇯🇵",
      bgColor: "bg-red-50",
    },
    {
      name: "Singapore",
      flag: "🇸🇬",
      bgColor: "bg-purple-50",
    },

    {
      name: "Netherlands",
      flag: "🇳🇱",
      bgColor: "bg-teal-50",
    },
  ];

  const itemWidth = 324; // Width of each destination card (300px + 24px gap)
  //const visibleItems = 3;
  const totalItems = destinations.length;

  // Create duplicated destinations for seamless loop
  const duplicatedDestinations = [...destinations, ...destinations];

  // Auto-scroll functionality with seamless loop
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Reset to beginning when reaching the end of original array
          if (nextIndex >= totalItems) {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentIndex(0);
              setIsTransitioning(false);
            }, 50);
            return 0;
          }
          return nextIndex;
        });
      }, 3000); // Auto-scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [totalItems]);

  // Handle manual navigation
  const handlePrevious = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(totalItems - 1);
          setIsTransitioning(false);
        }, 50);
        return totalItems - 1;
      }
      return prevIndex - 1;
    });

    // Restart auto-scroll after manual navigation
    setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= totalItems) {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentIndex(0);
              setIsTransitioning(false);
            }, 50);
            return 0;
          }
          return nextIndex;
        });
      }, 3000);
    }, 1000);
  };

  const handleNext = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= totalItems) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(0);
          setIsTransitioning(false);
        }, 50);
        return 0;
      }
      return nextIndex;
    });

    // Restart auto-scroll after manual navigation
    setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= totalItems) {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentIndex(0);
              setIsTransitioning(false);
            }, 50);
            return 0;
          }
          return nextIndex;
        });
      }, 3000);
    }, 1000);
  };

  const router = useRouter();

  const handleNav = () => {
    router.push("/countries");
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Destinations
          </motion.h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className={`flex gap-20 ${isTransitioning ? "" : "transition-transform duration-500 ease-in-out"}`}
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          >
            {duplicatedDestinations.map((destination, index) => (
              <motion.div
                key={`${destination.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: (index % totalItems) * 0.1,
                }}
                className={`${destination.bgColor} flex gap-2 items-center justify-center  rounded-lg px-8 py-4 text-center hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="text-6xl">{destination.flag}</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {destination.name}
                </h3>
              </motion.div>
            ))}
          </div>
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={handleNav}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreDestinations;
