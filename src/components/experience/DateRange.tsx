import React from 'react'

type DateRangeProps = {
  start: string
  end?: string
  duration?: string
}

export function formatDate(dateString: string): string {
  if (dateString === 'present') return 'Present'
  
  const [year, month] = dateString.split('-')
  return `${month} / ${year}`
}

export default function DateRange({ start, end, duration }: DateRangeProps) {
  // Use provided duration if available
  if (duration) {
    return <span className="text-sm text-neutral-500 dark:text-neutral-400">{duration}</span>
  }
  
  const startFormatted = formatDate(start)
  const endFormatted = end ? formatDate(end) : 'Present'
  
  return (
    <span className="text-sm text-neutral-500 dark:text-neutral-400">
      <time dateTime={start}>{startFormatted}</time>
      {' — '}
      {end && end !== 'present' ? (
        <time dateTime={end}>{endFormatted}</time>
      ) : (
        endFormatted
      )}
    </span>
  )
}
