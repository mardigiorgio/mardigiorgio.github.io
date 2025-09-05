import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'
// socials removed: header now contains social links

export const metadata = { title: 'Marco DiGiorgio — Contact' }

export default function ContactPage() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight text-center">Contact</h1>
      <p className="opacity-80 mt-2 text-center">Reach out via the form or socials.</p>
      <ContactForm />
      {/* Social links moved to the header; removing duplicates here */}
    </Section>
  )
}
