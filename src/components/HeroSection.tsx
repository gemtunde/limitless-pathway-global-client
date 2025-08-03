import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  image: string;
  title: string;
  description: string;
  className?: string;
}

export default function HeroSection({
  image,
  title,
  description,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`relative py-20 overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          // quality={85}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/50 to-blue-800/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
