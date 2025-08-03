"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCountries } from "@/hooks/admin/queries/countries";
import { ApiCountryResponse } from "@/app/countries/page";
import Flag from "react-world-flags";

function getFlagEmoji(code: string) {
  if (!code || code.length !== 2) return "";
  const base = 127397;
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((c) => base + c.charCodeAt(0))
  );
}

// Component to handle flag display with fallback
const FlagDisplay = ({
  flagCode,
  countryName,
}: {
  flagCode: string;
  countryName: string;
}) => {
  const [useEmojiFlag, setUseEmojiFlag] = useState(true);
  const [emojiSupported, setEmojiSupported] = useState(true);

  useEffect(() => {
    // Test if emoji flags are supported
    const testEmoji = getFlagEmoji("US");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillText(testEmoji, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasPixels = imageData.data.some((pixel) => pixel !== 0);
      setEmojiSupported(hasPixels);
      setUseEmojiFlag(hasPixels);
    }
  }, []);

  if (useEmojiFlag && emojiSupported) {
    return (
      <span className="text-4xl" onError={() => setUseEmojiFlag(false)}>
        {getFlagEmoji(flagCode)}
      </span>
    );
  }

  return (
    <Flag
      code={flagCode}
      style={{
        width: "48px",
        height: "32px",
        borderRadius: "4px",
        objectFit: "cover",
      }}
      fallback={
        <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
          {flagCode} <span className="sr-only">{countryName}</span>
        </div>
      }
    />
  );
};

const ExploreDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  const { data: countryData, isLoading } = useCountries();
  const destinations: ApiCountryResponse[] = countryData?.data || [];
  console.log("Country Data:", destinations);

  const itemWidth = 324; // Width of each destination card (300px + 24px gap)
  const totalItems = destinations.length;

  // Create duplicated destinations for seamless loop
  const duplicatedDestinations = [...destinations, ...destinations];

  // Auto-scroll functionality with seamless loop
  useEffect(() => {
    if (isLoading) return;
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
  }, [isLoading, totalItems]);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading destinations...</p>
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 ml-2" />
      </div>
    );
  }

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
                className="flex gap-2 w-[300px] items-center justify-center rounded-lg px-8 py-4 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col w-[300px] h-[100px] items-center justify-center bg-gray-100 rounded-lg">
                  <FlagDisplay
                    flagCode={destination.flagCode as string}
                    countryName={destination.name as string}
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">
                    {destination.name}
                  </h3>
                </div>
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
            //className="bg-blue-600 hover:bg-blue-700"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreDestinations;
