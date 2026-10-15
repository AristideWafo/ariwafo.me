import Image from 'next/image'
import React from 'react'

type CompanyLogoProps = {
  src?: string
  alt: string
  size?: number
}

export default function CompanyLogo({ src, alt, size = 44 }: CompanyLogoProps) {
  if (!src) {
    const initial = alt.charAt(0).toUpperCase()
    return (
      <div
        className="flex shrink-0 items-center justify-center border border-border bg-surface font-mono text-sm"
        style={{ width: size, height: size }}
      >
        {initial}
      </div>
    )
  }

  return (
    <div
      className="shrink-0 overflow-hidden border border-border bg-background"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`${alt} logo`}
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
