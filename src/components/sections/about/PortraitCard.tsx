import Image from 'next/image';

export function PortraitCard() {
  return (
    <div className="rounded-2xl shadow-xs overflow-hidden rotate-3 bg-muted/50 border border-border/50">
      <Image
        src="/images/portrait-placeholder.jpg"
        alt="Portrait of the site owner (placeholder)"
        width={400}
        height={400}
        priority
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
