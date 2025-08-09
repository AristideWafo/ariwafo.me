import React from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeroSection() {
  return (
    <Section className="pt-20 md:pt-28 md:pb-0">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Cloud & DevOps Engineer
        </h1>
        <p className="text-muted-foreground text-lg">
          Helping teams deliver reliable cloud infrastructure through
          Infrastructure as Code, CI/CD automation, and built-in observability.
        </p>
        <div className="flex -space-x-4">
          <Avatar className="h-16 w-16 ">
            <AvatarImage src="https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png" alt="SAA-C03" />
            <AvatarFallback>SAA</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16 ">
            <AvatarImage src="https://images.credly.com/size/680x680/images/ed4be915-68f8-428a-b332-40ded9084ee5/blob" alt="Terraform Associate" />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Contact
          </Button>
          <Button href="/cases" variant="secondary">
            Case Studies
          </Button>
        </div>
      </div>
    </Section>
  );
}
