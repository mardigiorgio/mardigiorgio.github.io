import Section from '@/components/Section'
import skills from '@/data/skills.json'

export const metadata = {
  title: 'Marco DiGiorgio — About',
}

export default function AboutPage() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/headshot.jpg" alt="Marco DiGiorgio" className="rounded-2xl w-48 h-48 object-cover" />
        <div className="md:col-span-2 space-y-4 opacity-90">
          <p>Hi, I’m Marco — a software engineer who loves security, systems, and building delightful web apps.</p>
          <p>I enjoy shipping fast, reliable software with clear UX and strong performance budgets.</p>
          <p>Outside of code, I tinker with hardware, read RFCs, and hike.</p>
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
