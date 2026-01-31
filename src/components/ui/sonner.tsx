"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner 
      position="top-center"
      expand={false}
      richColors
      closeButton
      duration={2000}
    />
  )
}
