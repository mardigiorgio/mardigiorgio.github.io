import Section from '@/components/Section'

export default function NotFound() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="opacity-80 mt-2">The page you’re looking for doesn’t exist.</p>
      <a className="underline mt-4 inline-block" href="/">Go home</a>
    </Section>
  )
}

