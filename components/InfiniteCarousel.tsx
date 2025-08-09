"use client";


import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Section } from "../app/_components/Section";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface CarouselItem {
  id: number;
  alt: string;
  link: string;
}

export const InfiniteCarousel = ({
  title,
  description,
  carouselItems,
}: {
  title?: string;
  description?: string;
  carouselItems: CarouselItem[];
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, playOnInit: true })
  );

  // Dupliquer les éléments pour créer l'illusion de défilement infini
  const duplicatedItems = [...carouselItems, ...carouselItems];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,120,120,0.05),transparent_50%)]"></div>

      <Section className="relative z-10 px-0">
        {title || description ? (
          <div className="text-left">
            {title && (
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-muted-foreground">{description}</p>
            )}
          </div>
        ) : null}

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayRef.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {duplicatedItems.map((item, index) => (
              <CarouselItem
                key={`${item.id}-${index}`}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="group relative">
                  <Card className="overflow-hidden border-none bg-transparent shadow-none transition-all">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <div className="relative h-20 w-20 transition-all duration-300 ease-in-out group-hover:scale-110">
                        <Image
                          src={item.link}
                          alt={item.alt}
                          fill
                          className={cn(
                            "object-contain transition-all duration-500",
                            "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                          )}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <div className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary/70 transition-all duration-300 group-hover:w-1/2"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Section>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};
