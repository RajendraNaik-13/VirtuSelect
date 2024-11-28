'use client'

import React, { useEffect, useState } from 'react'
import { ThemeProvider as Provider } from 'next-themes'

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Provider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </Provider>
  )
}