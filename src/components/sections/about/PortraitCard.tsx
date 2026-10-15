import Image from "next/image";
import { Plate } from "@/components/ui/Plate";
import { siteProfile } from "@/lib/content/site";

export function PortraitCard() {
  return (
    <Plate
      figure="FIG_041 · Portrait"
      note={siteProfile.location}
      caption={`${siteProfile.name} · ${siteProfile.role}`}
    >
      <Image
        src="/pictures/picture1.jpg"
        alt={`${siteProfile.name}, ${siteProfile.role}`}
        width={400}
        height={400}
        priority
        sizes="(max-width: 1024px) 100vw, 400px"
        className="h-auto w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
      />
    </Plate>
  );
}
