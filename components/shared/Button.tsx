import React from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

const Button = ({ variant = 'primary', children }: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'py-2 px-4 bg-accent-orange text-white',

        variant === 'secondary' && 'bg-white text-black',
      )}
    >
      {children}
    </button>
  )
}

export default Button
