import React from 'react'
import { cn } from '../../lib/utils'


export type SpacingProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl"
}

export const Spacing = ({size = "md"}: SpacingProps) => {
  return (
    <div className={cn(
        size === "sm" && "h-4",
        size === "md" && "h-8",
        size === "lg" && "h-12",
        size === "xl" && "h-16",
        size === "2xl" && "h-20",
        size === "3xl" && "h-24",
        size === "4xl" && "h-28",
        size === "5xl" && "h-32",
        size === "6xl" && "h-36",
        size === "7xl" && "h-40",
        size === "8xl" && "h-44",
    )} ></div>
  )
}
