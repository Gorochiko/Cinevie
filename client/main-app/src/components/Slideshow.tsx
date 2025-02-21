
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const bannerImages = [
  "/2.png",
  "/natra1.jpg",
  "/3.png",
  "/4.jpg",
];

export function Slideshow() {
  return (
    <Carousel className="w-full my-2 max-w-3xl rounded-3xl">
      <CarouselContent>
        {bannerImages.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image src={src} width={400} height={200} alt={`Banner ${index + 1}`} className="w-full h-[400px] object-cover rounded-lg"/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
