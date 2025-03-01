import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

export const Section = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn("max-w-4xl m-auto px-4", props.className)}>
        {props.children}
    </section>
  )
}
