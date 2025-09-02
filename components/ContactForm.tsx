"use client"
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  return (
    <form
      action="https://formspree.io/f/xyyvlbzy"
      method="POST"
      className="mt-6 max-w-xl space-y-3"
      onSubmit={() => setStatus('sent')}
    >
      <label className="block">
        <span className="text-sm">Your Email</span>
        <input required type="email" name="email" className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-sm">Message</span>
        <textarea required name="message" rows={6} className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
      </label>
      <button className="rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2">Send</button>
      {status === 'sent' ? <p className="text-sm opacity-70">Thanks! I’ll get back to you soon.</p> : null}
    </form>
  )
}

