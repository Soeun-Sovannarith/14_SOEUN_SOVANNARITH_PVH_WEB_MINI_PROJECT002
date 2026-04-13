"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, value, defaultValue, ...props }, ref) => {
  
  const safeValue = React.useMemo(() => {
    if (Array.isArray(value)) return value
    if (typeof value === "number") return [value]
    if (defaultValue && Array.isArray(defaultValue)) return defaultValue
    return [0]
  }, [value, defaultValue])

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={safeValue}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-gray-900" />
      </SliderPrimitive.Track>
      {safeValue.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-5 w-5 rounded-full border-2 border-gray-900 bg-black ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
