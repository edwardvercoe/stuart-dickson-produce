import React from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  iconRight?: React.ReactNode
}

const Button = ({ variant = 'primary', children, iconRight }: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'py-4 px-6 bg-accent text-brand-black rounded-full border border-brand-black',
        iconRight && 'flex justify-between items-center py-2 pr-2',
        variant === 'secondary' && 'bg-white text-black border-transparent',
      )}
    >
      <span className=" font-medium">{children}</span>
      {iconRight && (
        <span className="ml-4 flex items-center justify-center bg-brand-black rounded-full p-2">
          {iconRight}
        </span>
      )}
    </button>
  )
}

export default Button
