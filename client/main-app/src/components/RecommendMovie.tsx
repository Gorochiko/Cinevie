"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const movies = [
  {
    title: "The Last Of Us",
    image: "/poster1.jpg",
    rating: "9.3/10",
    votes: "8.5K Votes",
    genres: "Action/Honor",
  },
  {
    title: "Us",
    image: "/poster2.jpg",
    rating: "9.1/10",
    votes: "4.5K Votes",
    genres: "Drama/Honor",
  },
  {
    title: "King",
    image: "/poster3.jpg",
    rating: "7.9/10",
    votes: "4.8K Votes",
    genres: "Comedy/Drama/Action",
  },
  {
    title: "Avatar",
    image: "/poster4.jpg",
    rating: "8.9/10",
    votes: "58.8K Votes",
    genres: "Action/Historical/Science",
  },
  {
    title: "The Flow",
    image: "/poster5.jpg",
    rating: "8.4/10",
    votes: "675 Votes",
    genres: "Comedy/Family",
  },
  {
    title: "Thanh Gươm Diệt Quỷ",
    image: "/poster6.jpg",
    rating: "8.4/10",
    votes: "675 Votes",
    genres: "Drama/Action/Anime",
  },
];

export function RecommendMovie() {
  const [index, setIndex] = React.useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % (movies.length - itemsPerPage + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + (movies.length - itemsPerPage + 1)) % (movies.length - itemsPerPage + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-7 my-4">
      <h2 className="text-2xl text-white font-bold mb-4">Recommended Movies</h2>

      {/* Slider Wrapper */}
      <div className="overflow-hidden relative">
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {movies.map((movie, i) => (
            <Card key={i} className="w-1/5 flex-shrink-0 overflow-hidden rounded-lg">
              <CardContent className="p-0">
                <Image
                  src={movie.image}
                  width={300}
                  height={400}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-2">
                  <div className="flex items-center text-sm text-white bg-black p-1 rounded-md">
                    <Star className="h-4 w-4 text-red-500" />
                    <span className="ml-1">{movie.rating}</span>
                    <span className="ml-auto">{movie.votes}</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{movie.title}</h3>
                  <p className="text-gray-500 text-sm">{movie.genres}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        ←
      </Button>
      <Button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        →
      </Button>
    </div>
  );
}
