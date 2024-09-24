import React from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  iconRight?: React.ReactNode
  className?: string
}

const Button = ({
  variant = 'primary',
  children,
  iconRight,
  className,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'py-4 px-6 bg-accent text-brand-black rounded-full',
        iconRight && 'flex justify-center items-center pr-2 py-2',
        variant === 'secondary' && 'bg-white text-black border-transparent',
        className,
      )}
    >
      <span className=" font-medium">{children}</span>
      {iconRight && (
        <span className="ml-4 flex items-center justify-center bg-brand-black rounded-full size-10">
          {iconRight}
        </span>
      )}
    </button>
  )
}

export default Button
