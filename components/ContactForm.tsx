"use client"
import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = e.currentTarget
    const action = form.action
    const method = form.method || 'POST'
    const body = new FormData(form)

    try {
      const res = await fetch(action, {
        method,
        body,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Request failed')
      const data = (await res.json().catch(() => ({}))) as any
      if (data?.ok === false) throw new Error(data?.error || 'Submission error')
      form.reset()
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setError('Something went wrong. Please try again or email me directly.')
    }
  }

  return (
    <form action="https://formspree.io/f/xyzdogoz" method="POST" className="mt-6 max-w-xl mx-auto space-y-3" onSubmit={onSubmit}>
      {/* Honeypot field to reduce spam */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label className="block">
        <span className="text-sm block">Name</span>
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm block">Email</span>
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm block">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          placeholder="Tell me about your project or question..."
          className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2"
        />
      </label>
      <button
        disabled={status === 'submitting'}
        className="rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 block mx-auto disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send'}
      </button>
      <div className="text-center text-sm min-h-[1.25rem]" aria-live="polite">
        {status === 'success' ? <span className="opacity-80">Thanks! I’ll get back to you soon.</span> : null}
        {status === 'error' ? <span className="text-red-600 dark:text-red-400">{error}</span> : null}
      </div>
    </form>
  )
}
