import React from 'react'

type DateRangeProps = {
  start: string
  end?: string
  duration?: string
}

const isOngoing = (value?: string) => !value || value.toLowerCase() === 'present'

export function formatDate(dateString: string): string {
  if (isOngoing(dateString)) return 'Present'

  const [year, month] = dateString.split('-')
  // Anything that is not a YYYY-MM pair is shown as-is rather than as "undefined / x".
  if (!year || !month) return dateString
  return `${month} / ${year}`
}

export default function DateRange({ start, end, duration }: DateRangeProps) {
  if (duration) {
    return (
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {duration}
      </span>
    )
  }

  return (
    <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
      <time dateTime={start}>{formatDate(start)}</time>
      {' — '}
      {isOngoing(end) ? (
        <span className="text-primary">Present</span>
      ) : (
        <time dateTime={end}>{formatDate(end!)}</time>
      )}
    </span>
  )
}
