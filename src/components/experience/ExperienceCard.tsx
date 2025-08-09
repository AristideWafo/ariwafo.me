import React from 'react'
import { Experience } from '@/lib/content/experience'
import ExperienceItem from './ExperienceItem'

type ExperienceCardProps = {
  title?: string
  items: Experience[]
}

export default function ExperienceCard({ items }: ExperienceCardProps) {
  return (
    <div className="">
      <ul className="space-y-2">
        {items.map((item, index) => (
          <ExperienceItem 
            key={`${item.company}-${index}`}
            {...item}
          />
        ))}
      </ul>
    </div>
  )
}
