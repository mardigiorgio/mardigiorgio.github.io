"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { PropsWithChildren, useEffect, useState } from 'react'

export default function AnimatedFade({ children }: PropsWithChildren) {
  const prefersReducedMotion = useReducedMotion()
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const initial = prefersReducedMotion || !isMounted ? false : { opacity: 0, y: 8 }
  const animate = { opacity: 1, y: 0 }

  return (
    <motion.div initial={initial} animate={animate} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}
