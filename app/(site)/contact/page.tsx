import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'
import socials from '@/data/socials.json'

export const metadata = { title: 'Marco DiGiorgio — Contact' }

export default function ContactPage() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="opacity-80 mt-2">Reach out via the form or socials.</p>
      <ContactForm />
      <div className="mt-8 text-sm space-x-4">
        <a aria-label="GitHub" href={(socials as any).github} target="_blank" rel="noreferrer" className="underline">GitHub</a>
        <a aria-label="LinkedIn" href={(socials as any).linkedin} target="_blank" rel="noreferrer" className="underline">LinkedIn</a>
      </div>
    </Section>
  )
}
