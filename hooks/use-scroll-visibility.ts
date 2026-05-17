'use client'

import { useEffect, useState, RefObject } from 'react'

export function useScrollVisibility(ref: RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Stop observing after the element has been seen
          observer.unobserve(entry.target)
        }
      },
      {
        margin: '-100px',
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref])

  return isVisible
}
