import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'
// socials removed: header now contains social links

export const metadata = { title: 'Marco DiGiorgio — Contact' }

export default function ContactPage() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight text-center">Contact</h1>
      <p className="opacity-80 mt-2 text-center">Curious about collaborating on intelligent systems research, prototyping instrumentation, or bringing resilient automation ideas to life? Let’s talk.</p>
      <ContactForm />
      {/* Social links moved to the header; removing duplicates here */}
    </Section>
  )
}
