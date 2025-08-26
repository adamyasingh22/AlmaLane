"use client"

import type React from "react"
import { useRef } from "react"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className = "" }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault()

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const newValue = min + percentage * (max - min)
      const steppedValue = Math.round(newValue / step) * step

      const newValues = [...value]
      newValues[index] = Math.max(min, Math.min(max, steppedValue))

      // Ensure min <= max for range sliders
      if (newValues.length === 2) {
        if (index === 0 && newValues[0] > newValues[1]) {
          newValues[1] = newValues[0]
        } else if (index === 1 && newValues[1] < newValues[0]) {
          newValues[0] = newValues[1]
        }
      }

      onValueChange(newValues)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div ref={trackRef} className="relative w-full h-2 bg-muted rounded-full cursor-pointer">
        {/* Track fill */}
        {value.length === 2 && (
          <div
            className="absolute h-2 bg-primary rounded-full"
            style={{
              left: `${((value[0] - min) / (max - min)) * 100}%`,
              width: `${((value[1] - value[0]) / (max - min)) * 100}%`,
            }}
          />
        )}

        {/* Thumbs */}
        {value.map((val, index) => (
          <div
            key={index}
            className="absolute w-5 h-5 bg-primary border-2 border-background rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
            style={{ left: `${((val - min) / (max - min)) * 100}%` }}
            onMouseDown={handleMouseDown(index)}
          />
        ))}
      </div>
    </div>
  )
}
