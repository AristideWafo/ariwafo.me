import Image from 'next/image';

export function PortraitCard() {
  return (
    <div className="rounded-2xl shadow-xs overflow-hidden rotate-3 bg-muted/50 border border-border/50 w-fit">
      <Image
        src="/pictures/picture1.jpg"
        alt="Portrait of the site owner (placeholder)"
        width={350}
        height={350}
        priority
        className="w-[350px] h-[350px] object-cover scale-100"
      />
    </div>
  );
}
