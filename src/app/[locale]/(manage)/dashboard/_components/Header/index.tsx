'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}
export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    document.addEventListener('scroll', onScroll, { passive: true })

    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'topbar',
        fixed && 'sticky top-0 z-50',
        offset > 10 && fixed ? 'shadow-sm' : '',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}
