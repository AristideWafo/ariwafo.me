import React, { ComponentPropsWithoutRef } from 'react'
import { Section } from './_components/Section'

import { cn } from '@/lib/utils'
import { SpringIcon } from './icons/SpringIcon'
import { AngularIcon } from './icons/AngularIcon'
import { AwsIcon } from './icons/AwsIcon'

const Code = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => {
    return (
        <span 
            className={cn(
                'text-primary p-1 m-1 bg-accent/30 font-mono border border-accent rounded-sm border-primary-background ',
                className
            )} 
            {...props} 
        />
    );
};


export const Hero = () => {
  return (
    <Section className='flex flex-row gap-10 justify-between h-auto '>
        
        <div className="flex-[1] flex-col justify-center space-y-4 max-w-2xl h-full">
            <h1 className="text-5xl py-3 font-bold text-foreground text-wrap"> Software Eng. and Community Builder... </h1>
            <p className="text-md text-left  text-slate-600">
            👋🏾 Hi, I’m <span className='text-foreground text-xl font-bold' > Aristide WAFO,</span> a software developer and a Master's student (M2) at UTT 🇫🇷.
            </p>
            <p className="text-md text-left text-slate-600">
            Passionate about innovative technologies, I work on diverse projects using 
            <Code className='inline-flex items-center gap-2 font-bold' > <SpringIcon size={16} />
                Java
                </Code> , 
                <Code className='inline-flex items-center gap-2 font-bold'> <SpringIcon size={16}/> Spring Boot</Code>, 
                <Code className='inline-flex items-center gap-2 font-bold'> <AngularIcon size={16}/> Angular</Code> , and 
                <Code className='inline-flex items-center gap-2 font-bold'> <AwsIcon size={16}/> AWS </Code> . With international experience in France🛫 , I enjoy sharing my knowledge and taking on new challenges.
            </p>
        </div>
        {/* <div className='flex-[1]  ' >
            <img 
            className='rounded-full w-full h-auto'
            src="https://media.licdn.com/dms/image/v2/D4E35AQFPmrEvfEpo7w/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1718717783573?e=1738144800&v=beta&t=xHRmN2rDkNB18CfddY-GB3iWFL2IPViBUajrivbBMgQ" alt="" />
        </div> */}
    </Section>
  )
}
