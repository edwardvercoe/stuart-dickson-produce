import React, { forwardRef } from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  iconRight?: React.ReactNode
  className?: string
  asChild?: boolean
}

export const buttonStyles = ({
  variant = 'primary',
  iconRight,
  className,
}: Partial<ButtonProps>) =>
  cn(
    'py-4 px-6 bg-accent text-brand-black rounded-full text-center',
    iconRight && 'flex justify-center items-center pr-2 py-2',
    variant === 'secondary' && 'bg-white text-black border-transparent',
    className,
  )

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, iconRight, className, asChild }, ref) => {
    const Comp = asChild ? 'span' : 'button'

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        className={buttonStyles({ variant, iconRight, className })}
      >
        <span className="font-medium">{children}</span>
        {iconRight && (
          <span className="ml-4 flex items-center justify-center bg-brand-black rounded-full size-10">
            {iconRight}
          </span>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export default Button
