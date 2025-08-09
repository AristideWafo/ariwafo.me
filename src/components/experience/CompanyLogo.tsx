import Image from 'next/image'
import React from 'react'

type CompanyLogoProps = {
  src?: string
  alt: string
  size?: number
}

export default function CompanyLogo({ src, alt, size = 44 }: CompanyLogoProps) {
  if (!src) {
    // Fallback to first letter initial if no logo
    const initial = alt.charAt(0).toUpperCase()
    return (
      <div 
        className="flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
        style={{ width: size, height: size }}
      >
        <span className="text-sm font-medium">{initial}</span>
      </div>
    )
  }

  return (
    <div className="rounded-full border border-neutral-200 dark:border-neutral-800 overflow-hidden" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={`${alt} logo`}
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  )
}
