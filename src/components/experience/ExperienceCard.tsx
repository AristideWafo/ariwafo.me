import React from 'react'
import { Experience } from '@/lib/content/experience'
import ExperienceItem from './ExperienceItem'

type ExperienceCardProps = {
  items: Experience[]
  /** Numbers each row, for the full history page. */
  numbered?: boolean
}

export default function ExperienceCard({ items, numbered = false }: ExperienceCardProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <ExperienceItem
          key={`${item.company}-${index}`}
          index={numbered ? index : undefined}
          {...item}
        />
      ))}
    </ul>
  )
}
