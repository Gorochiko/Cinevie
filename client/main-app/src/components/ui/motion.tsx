"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useState ,ReactElement} from "react"

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
  from?: "bottom" | "top" | "left" | "right" | "none"
  distance?: number
  once?: boolean
  asChild?: boolean
}
interface WithStyle {
  style?: React.CSSProperties
  className?: string
}
export function FadeIn({
  children,
  delay = 0,
  duration = 300,
  from = "bottom",
  distance = 20,
  className,
  once = true,
  asChild = false,
  ...props
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      if (once) setHasAnimated(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, once])

  const getTransform = () => {
    if (hasAnimated) return "translate3d(0, 0, 0)"
    if (!isVisible) {
      switch (from) {
        case "bottom":
          return `translate3d(0, ${distance}px, 0)`
        case "top":
          return `translate3d(0, -${distance}px, 0)`
        case "left":
          return `translate3d(-${distance}px, 0, 0)`
        case "right":
          return `translate3d(${distance}px, 0, 0)`
        default:
          return "translate3d(0, 0, 0)"
      }
    }
    return "translate3d(0, 0, 0)"
  }

  const styles = {
    transform: getTransform(),
    opacity: hasAnimated ? 1 : isVisible ? 1 : 0,
    transition: `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
  }

  // If asChild is true, clone the child and pass the animation styles
  if (asChild && React.isValidElement(children)) {
    const child = children as ReactElement<WithStyle>
    return React.cloneElement(child, {
      style: {
        ...styles,
        ...(child.props.style || {}),
      },
      className: cn(className, child.props.className),
      ...props,
    })
  }

  return (
    <div className={cn(className)} style={styles} {...props}>
      {children}
    </div>
  )
}

export function CountUp({
  value,
  duration = 1000,
  formatter = (value: number) => value.toString(),
  className,
}: {
  value: number
  duration?: number
  formatter?: (value: number) => string
  className?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span className={className}>{formatter(count)}</span>
}

export function Pulse({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse", className)}>{children}</div>
}

