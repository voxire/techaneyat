'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis on touch devices fights the native momentum scroll and breaks
    // ScrollTrigger pinning/scrubbing. Fall back to native scroll on touch.
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(hover: none)').matches ||
        'ontouchstart' in window)

    if (isTouch) {
      // Make sure ScrollTrigger still drives off the native scroll position
      // and recomputes after layout settles.
      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad)
      const t = setTimeout(() => ScrollTrigger.refresh(), 300)
      return () => {
        window.removeEventListener('load', onLoad)
        clearTimeout(t)
      }
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return <>{children}</>
}
