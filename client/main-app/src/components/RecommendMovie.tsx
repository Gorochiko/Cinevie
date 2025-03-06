"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFilms } from "@/lib/actions";

interface Film {
  _id: string;
  title: string;
  description: string;
  age: number;
  timeLength: number;
  year: number;
  onStage: string;
  image: string;
}

export function RecommendMovie() {
  const [films, setFilms] = useState<Film[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      try {
        const response = await getFilms();
        setFilms(response.results || []);
        console.log(response,"usafihosahoiahoiasfhoisaf");
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phim:", error);
      }
      setLoading(false);
    };
    fetchFilms();
  }, []);

  const maxIndex = films.length > 0 ? Math.ceil(films.length / itemsPerPage) - 1 : 0;

  const nextSlide = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  if (films.length === 0) {
    return <p className="text-white text-center">Không có phim...</p>;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto p-7 my-4">
      <h2 className="text-3xl font-bold text-center uppercase tracking-wide relative mb-4">
        <span className="before:absolute before:left-0 before:top-1/2 before:w-24 before:h-0.5 before:bg-white before:-translate-y-1/2"></span>
        <span className="mx-4 text-white">Movie Selection</span>
        <span className="after:absolute after:right-0 after:top-1/2 after:w-24 after:h-0.5 after:bg-white after:-translate-y-1/2"></span>
      </h2>

      <div className="relative overflow-hidden">
        {/* Slider */}
        <div className="flex gap-4 transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
          {films.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage).map((film) => (
            <Card key={film._id} className="relative w-1/5 flex-shrink-0 overflow-hidden  rounded-lg group">
              <CardContent className="p-0">
                <Image
                  src={`http://localhost:8080${film.image}`}
                  alt={film.title}
                  width={300}
                  height={400}
                  className="w-full h-[400px] object-cover group-hover:scale-110 hover:brightness-50 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold">{film.title}</h3>
                  <p className="text-sm">{film.year}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 opacity-50 hover:opacity-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 opacity-50 hover:opacity-100"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
}
