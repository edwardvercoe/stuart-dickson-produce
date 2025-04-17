import { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ContainerProps<T extends ElementType = 'div'> = {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
  as?: T
  fullBleed?: boolean
}

/**
 * Container component that provides consistent max-width and padding across the site
 * @param size - The max-width variant to use:
 *   - default: max-w-[1560px] (standard content width)
 *   - narrow: max-w-[800px] (for text-heavy sections)
 *   - wide: max-w-[1920px] (for full-width sections)
 * @param fullBleed - Whether to remove horizontal padding
 * @param as - The HTML element to render as (default: div)
 */
export const Container = <T extends ElementType = 'div'>({
  children,
  className,
  size = 'default',
  as,
  fullBleed = false,
}: ContainerProps<T>) => {
  const Component = as || 'div'

  return (
    <Component
      className={cn(
        'mx-auto w-full',
        // Base padding (can be removed with fullBleed)
        !fullBleed && 'px-5 md:px-8 lg:px-12',
        // Max-width variants
        size === 'default' && 'max-w-[1560px]',
        size === 'narrow' && 'max-w-[800px]',
        size === 'wide' && 'max-w-[1920px]',
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default Container
