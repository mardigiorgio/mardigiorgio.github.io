import Section from '@/components/Section'
import { withBasePath } from '@/lib/basePath'
import skills from '@/data/skills.json'

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

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {(skills as any[]).map((group) => (
            <div key={group.category} className="card-base p-4">
              <h3 className="font-medium mb-3">{group.category}</h3>
              <ul className="space-y-3">
                {group.items.map((item: any) => (
                  <li key={item.name} className="">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{item.name}</span>
                      <span className="opacity-60">{item.stars}/5</span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden" role="progressbar" aria-label={`${item.name} proficiency`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={item.stars}>
                      <div className="h-full bg-neutral-900 dark:bg-white" style={{ width: `${Math.max(0, Math.min(5, item.stars)) * 20}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
