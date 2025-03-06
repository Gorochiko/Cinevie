"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";

const promotions = [
  {
    title: "Super Saver Deals",
    image: "/f1.jpg",
    description: "Up to 50% off on blockbuster movies!",
  },
  {
    title: "Weekend Specials",
    image: "/f2.jpg",
    description: "Buy 1 Get 1 Free on select movie tickets.",
  },
  {
    title: "Student Discount",
    image: "/f3.jpg",
    description: "Students get 20% off with valid ID.",
  },
  {
    title: "VIP Membership",
    image: "/f4.jpg",
    description: "Exclusive access to early bookings & discounts.",
  },
  {
    title: "Festive Offers",
    image: "/f5.png",
    description: "Celebrate with special festive discounts!",
  },
];

export function Promotion() {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto my-6">
      <h2 className="text-3xl font-bold text-center uppercase tracking-wide relative mb-4">
        <span className="before:absolute before:left-0 before:top-1/2 before:w-24 before:h-0.5 before:bg-black before:-translate-y-1/2"></span>
        <span className="mx-4">Exclusive Promotions</span>
        <span className="after:absolute after:right-0 after:top-1/2 after:w-24 after:h-0.5 after:bg-black after:-translate-y-1/2"></span>
      </h2>

      <div className="relative">
        {/* Left Button */}
        <Button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full z-10"
          onClick={scrollLeft}
        >
          <ChevronLeft />
        </Button>

        {/* Slider */}
        <div ref={sliderRef} className="flex gap-4 overflow-x-hidden scroll-smooth no-scrollbar px-8">
          {promotions.map((promo, i) => (
            <Card key={i} className="min-w-[280px] flex-shrink-0 rounded-lg group overflow-hidden relative">
              <Image
                src={promo.image}
                width={280}
                height={350}
                alt={promo.title}
                className="w-full h-[250px] object-cover group-hover:scale-110 hover:brightness-50 transition-transform duration-700"
              />
              <CardContent className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold">{promo.title}</h3>
                <p className="text-sm">{promo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Button */}
        <Button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full z-10"
          onClick={scrollRight}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
