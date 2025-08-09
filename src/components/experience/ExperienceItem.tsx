import React from 'react'
import { Experience } from '@/lib/content/experience'
import CompanyLogo from './CompanyLogo'
import DateRange from './DateRange'
import Link from 'next/link'

type ExperienceItemProps = Experience

export default function ExperienceItem({ company, role, start, end, duration, logo, url }: ExperienceItemProps) {
const content = (
    <>
        <div className="flex items-center gap-3">
            <CompanyLogo src={logo} alt={company} />
            <div>
                <h3 className="text-base font-semibold">{company}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{role}</p>
            </div>
        </div>
        
        <div className="text-sm text-neutral-500 dark:text-neutral-400 md:text-right">
            <DateRange start={start} end={end} duration={duration} />
        </div>
    </>
)

// Wrap with link if URL is provided
if (url) {
    return (
        <li>
            <Link 
                href={url}
                className="group grid gap-3 md:grid-cols-[auto,1fr] items-center rounded-2xl px-2 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 focus-within:ring-2 focus:outline-none"
            >
                {content}
            </Link>
        </li>
    )
}

return (
    <li className="group grid gap-3 md:grid-cols-[auto,1fr] items-center rounded-2xl px-2 py-3">
        {content}
    </li>
)
}
