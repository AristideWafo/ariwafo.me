import { Section } from "./_components/Section";
import { InfiniteCarousel } from "@/components/InfiniteCarousel";
// import { motion } from "framer-motion";

export const Slide = () => {
  const carouselItems = [
    {
      id: 1,
      alt: "Angular Logo",
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/768px-Angular_full_color_logo.svg.png?20160527092314",
    },
    {
      id: 2,
      alt: "React Logo",
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png",
    },
    {
      id: 3,
      alt: "Spring Boot Logo",
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/330px-Spring_Boot.svg.png",
    },
    {
      id: 4,
      alt: "AWS Logo",
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/768px-Amazon_Web_Services_Logo.svg.png",
    },
    {
      id: 5,
      alt: "Terraform Logo",
      link: "https://raw.githubusercontent.com/kreuzwerker/m1-terraform-provider-helper/main/assets/terraform-logo.png",
    },
  ];

  return (
    <>
      <Section className="flex justify-center items-baseline h-auto">
        <InfiniteCarousel carouselItems={carouselItems} title="My areas of expertise"/>
      </Section>
    </>
  );
};
