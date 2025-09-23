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
        Disciplines and tooling I lean on to design, simulate, and validate intelligent systems. Use the filters to explore strengths across modeling, control, and the software that supports them.
      </p>

      <div className="mt-8">
        <SkillsGrid groups={groups} />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="card-base p-5">
          <div className="text-sm font-semibold mb-1">Focus Areas</div>
          <p className="text-sm opacity-80">
            Intelligent control systems, embedded experimentation, and the infrastructure that keeps data and decisions coherent.
          </p>
        </div>
        <div className="card-base p-5">
          <div className="text-sm font-semibold mb-1">How I Work</div>
          <p className="text-sm opacity-80">
            Hypothesis-driven builds: model the behavior, instrument the system, then iterate with tight feedback loops and clear documentation.
          </p>
        </div>
        <div className="card-base p-5">
          <div className="text-sm font-semibold mb-1">Always Learning</div>
          <p className="text-sm opacity-80">
            Currently digging deeper into estimation theory, perception pipelines, and scientific computing workflows.
          </p>
        </div>
      </div>
    </Section>
  )
}
