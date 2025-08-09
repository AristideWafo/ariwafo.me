import React from 'react'
import { Experience } from '@/lib/content/experience'
import ExperienceItem from './ExperienceItem'

type ExperienceCardProps = {
  title?: string
  items: Experience[]
}

export default function ExperienceCard({ title, items }: ExperienceCardProps) {
  return (
    <div className="">
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      )}
      
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
