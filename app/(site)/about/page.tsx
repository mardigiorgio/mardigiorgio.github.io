import Section from '@/components/Section'
import { withBasePath } from '@/lib/basePath'

// moved skills content to a dedicated /skills page

export const metadata = {
  title: 'Marco DiGiorgio — About',
}

export default function AboutPage() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight text-center md:text-left">About</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath('/images/headshot.jpg') as string} alt="Marco DiGiorgio" className="rounded-2xl w-48 h-48 object-cover mx-auto md:mx-0" />
        <div className="md:col-span-2 space-y-4 opacity-90">
          <p>Hi, I’m Marco — a computer science student and aspiring engineer who loves cybersecurity, backend development, and systems programming.</p>
          <p>I’m fascinated by how computers work at every layer and enjoy building reliable, secure software that bridges low-level logic with real-world applications.</p>
          <p>Outside of code, I play chess and dive into competitive video games like TF2 and other first-person titles.</p>
        </div>
      </div>

      {/* Skills section moved to /skills */}
    </Section>
  )
}
