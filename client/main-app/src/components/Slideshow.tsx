"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Calendar, Play, Clock } from 'lucide-react';
import { getFilms } from "../lib/actions";
import { Film } from "../types";
import { useRouter } from "next/navigation";

export function Slideshow() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Assuming you're using Next.js or a similar framework
  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getFilms(); 
      setFilms(res || []);
    } catch (error) {
      console.error("Error fetching films:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const path = process.env.NEXT_PUBLIC_BACKEND_DOMAIN; // Ensure this is defined in your environment variables
  useEffect(() => {
    handleFetchData();
  }, []); // Empty dependency array to fetch only once
  
  if (isLoading) {
    return (
      <div className="h-[600px] w-full bg-gray-900 animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!films || films.length === 0) {
    return <div className="h-[600px] w-full bg-gray-900 flex items-center justify-center text-white text-xl">No films available</div>;
  }
  
  const currentFilm = films[0]; // Get the first film for the slideshow
  // Function to ensure we're using a landscape image 
  const getOptimizedImageUrl = (imageUrl: string) => {
    // If you need to transform the image URL to ensure landscape orientation, do it here
    // For now, we'll just use the original URL
    return `${path}${imageUrl}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full overflow-hidden rounded-xl"
    >
      <div className="relative h-[600px] w-full">
        {/* Background image with parallax effect */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10" />
          <img 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            src={getOptimizedImageUrl(currentFilm.image) || "/placeholder.svg"}
            alt={currentFilm.title}
          />
        </motion.div>
        
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
        
        {/* Animated particles effect */}
        <div className="absolute inset-0 z-20 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`index${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{ 
                y: [null, Math.random() * 100 + "%"],
                opacity: [null, Math.random() * 0.3]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Banner content with staggered animations */}
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-center z-30">
          <div className="max-w-2xl">
            <AnimatePresence>
             
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {currentFilm.title}
              </motion.h1>

              <motion.div 
                className="flex flex-wrap items-center gap-6 text-white/90 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-lg">{currentFilm.year}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-lg">{currentFilm.timeLength} phút</span>
                </div>
              </motion.div>
              
              <motion.p
                className="text-white/80 text-lg mb-8 max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {currentFilm.description || "Experience the magic of cinema with this spectacular film. Book your tickets now for an unforgettable experience."}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => router.push(`/movies/${currentFilm._id}`)}
                  className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6 rounded-xl shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105"
                >
                  Đặt vé ngay
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5 fill-white" />
                  Xem trailer
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-red-600/20 to-transparent rounded-full blur-3xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.div>
  );
}
