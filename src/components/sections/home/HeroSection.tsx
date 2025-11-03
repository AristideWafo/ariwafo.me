import React from "react";
import Image from 'next/image';

import { Section } from "@/components/ui/Section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeroSection() {
  return (
    <Section className="pt-20 md:pt-28 md:pb-0">
      <div className=" flex flex-col-reverse md:flex-row gap-10">
        <div className="flex-[3] space-y-6 flex flex-col justify-center">
          <h1 className="text-[45px] md:text-[50px] font-bold tracking-tight">
            Cloud & DevOps Engineer
          </h1>
          <p className="text-muted-foreground text-lg md:w-[80%]">
            Helping teams deliver reliable cloud infrastructure through
            Infrastructure as Code, CI/CD automation, and built-in
            observability.
          </p>
        </div>
        <div className="flex-[1] aspect-square relative">
          <Image
            className="h-full w-full object-cover rounded-full"
            src="/pictures/picture1.jpg"
            alt="Profile picture"
            fill
          />
          <div className="absolute bottom-0 flex flex-row">
            <Avatar className="h-16 w-16 md:h-12 md:w-12 ">
              <AvatarImage
                src="https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
                alt="SAA-C03"
              />
              <AvatarFallback>SAA</AvatarFallback>
            </Avatar>
            <Avatar className="h-16 w-16 md:h-12 md:w-12 ">
              <AvatarImage
                src="https://images.credly.com/size/680x680/images/ed4be915-68f8-428a-b332-40ded9084ee5/blob"
                alt="Terraform Associate"
              />
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </Section>
  );
}