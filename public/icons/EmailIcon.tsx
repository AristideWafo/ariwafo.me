import React, { ComponentPropsWithoutRef } from 'react'

export const EmailIcon = (props: ComponentPropsWithoutRef<"svg"> & {size?: number}) => {
  return (
    <svg 
      width={props.size || "256px"} 
      height={props.size || "256px"} 
      viewBox="0 0 256 256" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <g>
        <path 
          d="M224,48 L32,48 C14.3269,48 0,62.3269 0,80 L0,176 C0,193.6731 14.3269,208 32,208 L224,208 C241.6731,208 256,193.6731 256,176 L256,80 C256,62.3269 241.6731,48 224,48 Z M224,80 L128,144 L32,80 L224,80 Z M224,176 L32,176 L32,112 L128,176 L224,112 L224,176 Z" 
          fill="currentColor"
        />
      </g>
    </svg>
  )
}