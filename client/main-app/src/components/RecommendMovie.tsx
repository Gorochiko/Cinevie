"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getFilms } from "@/lib/actions";
import { LoadingCatSimple } from "./loading/loadingDot";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const router = useRouter();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await getFilms();
        setFilms(response.results || []);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phim:", error);
      }
    };
    fetchFilms();
  }, []);

  if (films.length === 0) {
    return <div className="text-white text-center"><LoadingCatSimple/></div>;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto p-7 my-4">
      <h2 className="text-3xl font-bold text-center uppercase tracking-wide relative mb-4">
        <span className="before:absolute before:left-0 before:top-1/2 before:w-24 before:h-0.5 before:bg-white before:-translate-y-1/2"></span>
        <span className="mx-4 text-white">Movie Selection</span>
        <span className="after:absolute after:right-0 after:top-1/2 after:w-24 after:h-0.5 after:bg-white after:-translate-y-1/2"></span>
      </h2>

      {/* Carousel */}
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {films.map((film) => (
            <CarouselItem key={film._id} className="md:basis-1/3 lg:basis-1/5">
              <div className="p-1">
                <Card
                  className="relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => router.push(`/movies/${film._id}`)}
                >
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
