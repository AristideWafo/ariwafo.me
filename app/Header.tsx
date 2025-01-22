import React from 'react'
import { Section } from './_components/Section'
import {  buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { GithubIcon } from './icons/GithubIcon'
import { XIcon } from './icons/XIcon'
import { LinkedinIcon } from './icons/LinkedinIcon'

export const Header = () => {
  return (
    <header>
        <Section className='flex items-baseline py-4'>
            <h1 className="text-xl  text-foreground font-bold font-mono ">ariwafo.me</h1>
            <div className="flex-1"></div>
            <ul className='flex gap-2'>
                <Link href="https://www.linkedin.com/in/aristidewafo/" className={cn(buttonVariants({variant:"outline"}), "size-7 p-0")} >
                    <LinkedinIcon size={12} className='text-foreground' />
                </Link>
                <Link href="https://github.com/AristideWafo" className={cn(buttonVariants({variant:"outline"}), "size-7 p-0")} >
                    <GithubIcon size={12} className='text-foreground' />
                </Link>
                <Link href="https://x.com/JerryWafo/" className={cn(buttonVariants({variant:"outline"}), "size-7 p-0")} >
                    <XIcon size={12} className='text-foreground' />
                </Link>

            </ul>
        </Section>
    </header>

  )
}
