"use client"
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export default function AnimatedFade({ children }: PropsWithChildren) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

