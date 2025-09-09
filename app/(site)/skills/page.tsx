import Section from '@/components/Section'
import skills from '@/data/skills.json'
import SkillsGrid from '@/components/SkillsGrid'

type SkillLevel = 'Proficient' | 'Experienced' | 'Familiar'
type SkillItem = { name: string; level: SkillLevel }
type SkillGroup = { category: string; items: SkillItem[] }

export const metadata = {
  title: 'Marco DiGiorgio — Skills',
}

export default function SkillsPage() {
  const groups = skills as SkillGroup[]
  // Highlights removed per request

  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight text-center">Skills</h1>

      <p className="mt-3 text-neutral-700 dark:text-neutral-300 opacity-90 max-w-2xl mx-auto text-center">
        A practical mix of systems, security, and backend foundations. Use the
        filters to explore by proficiency and see where I’m strongest.
      </p>

      <div className="mt-8">
        <SkillsGrid groups={groups} />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="card-base p-5">
          <div className="text-sm font-semibold mb-1">Focus Areas</div>
          <p className="text-sm opacity-80">
            Secure, reliable software with an interest in low-level systems and backend architecture.
          </p>
        </div>
        <div className="card-base p-5">
          <div className="text-sm font-semibold mb-1">How I Work</div>
          <p className="text-sm opacity-80">
            Pragmatic, test-minded, and curious. I value clarity, maintainability, and performance.
          </p>
        </div>
        <div className="card-base p-5">
          <div className="text-sm font-semibold mb-1">Always Learning</div>
          <p className="text-sm opacity-80">
            I regularly explore new tooling and techniques to deepen fundamentals and broaden perspective.
          </p>
        </div>
      </div>
    </Section>
  )
}
