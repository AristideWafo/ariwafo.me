import React from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { siteProfile } from "@/lib/content/site";
import { iconMap } from "../about/SocialLinks";

const certifications = [
  {
    code: "AWS SAA-C03",
    label: "AWS Solutions Architect Associate",
    url: "https://www.credly.com/badges/52141aa9-dfb7-41d5-9061-e2eb9391d37a/public_url",
    image: "/certifications/aws.png",
    fallback: "SAA",
  },
  {
    code: "Terraform Associate",
    label: "HashiCorp Terraform Associate",
    url: "https://www.credly.com/badges/d039aa35-e434-44a4-9904-f0eb32ec4a41/public_url",
    image: "/certifications/terraform.png",
    fallback: "TA",
  },
];

export function HeroSection() {
  return (
    <Section className="pt-20 md:pb-0">
      <div className="flex flex-col-reverse md:flex-row gap-10">
        {/* Content Section */}
        <div className="flex-[3] space-y-4 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Cloud & DevOps Engineer
          </h1>
          <p className="text-muted-foreground text-lg md:w-4/5 leading-relaxed">
            Helping teams deliver reliable cloud infrastructure through
            Infrastructure as Code, CI/CD automation, and built-in
            observability.
          </p>
            <div className="flex items-center gap-2">
            {siteProfile.socials.map((s) => {
              const IconComponent = iconMap[s.label as keyof typeof iconMap];

              return (
              <Link
                key={s.label}
                href={s.href}
                className="flex items-center justify-center w-10 h-10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-lg transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {IconComponent && (
                <IconComponent size={20} />
                )}
              </Link>
              );
            })}
            </div>
        </div>

        {/* Profile Picture Section */}
        <div className="flex-1 aspect-square relative">
          <Image
            className="h-full w-full object-cover rounded-full border-4 border-white dark:border-neutral-800 shadow-lg"
            src="/pictures/picture1.jpg"
            alt="Aristide WAFO - Cloud & DevOps Engineer"
            fill
            priority
            sizes="(max-width: 768px) 300px, 400px"
          />

          {/* Certifications Badges */}
          <div className="absolute -bottom-2 -right-2 flex gap-1">
            {certifications.map((cert) => (
              <a
                key={cert.code}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-110"
                aria-label={`View ${cert.label} certification`}
              >
                <Avatar className="h-16 w-16 md:h-14 md:w-14 border-2 border-white dark:border-neutral-800 shadow-md">
                  <AvatarImage src={cert.image} alt={cert.label} />
                  <AvatarFallback className="text-xs font-semibold">
                    {cert.fallback}
                  </AvatarFallback>
                </Avatar>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
