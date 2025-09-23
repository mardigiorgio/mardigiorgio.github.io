import Section from '@/components/Section'
import { withBasePath } from '@/lib/basePath'

// moved skills content to a dedicated /skills page

export const metadata = {
  title: 'Marco DiGiorgio — About',
}

export default function AboutPage() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold tracking-tight text-center">About</h1>
      <div className="mt-4 md:flow-root">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath('/images/headshot.jpg') as string}
          alt="Marco DiGiorgio"
          className="rounded-2xl w-48 h-48 object-cover mx-auto md:mx-0 md:float-left md:mr-6 md:mb-4"
        />
        <div className="space-y-4 opacity-90">
          <p>Hi, I’m Marco — an Intelligent Systems Engineering major at DePaul who studies how sensing, computation, and actuators cooperate to build responsive systems.</p>
          <p>My favorite work lives where prototypes feel like lab experiments. I map out the physics, wire up instrumentation, then iterate on control logic and software until the system behaves the way the model predicted. That mix of theory, data, and hands-on debugging is what keeps me up refining experiments long after midnight.</p>
          <p>I got hooked early. At seven I was remixing Scratch projects; by nine I was convincing my mom to send me to a camp so I could mod Minecraft. Those early projects led me from scripting to low-level systems, then into the worlds of embedded design, signal processing, and intelligent automation.</p>
          <p>Today I’m fascinated by control systems, autonomy, and the computational tools that help engineers reason about complex environments. Whether I’m building a feedback loop, tuning a perception pipeline, or designing software for hardware with tight constraints, I love translating scientific models into something you can watch, measure, and improve.</p>
          <p>Outside of the lab, I sharpen my pattern recognition by playing chess and competitive FPS titles like TF2. The strategic thinking, situational awareness, and constant iteration echo the mental loops I rely on when engineering resilient systems.</p>
          <p>I’m looking for opportunities that blend research, intelligent systems, and rigorous engineering — the kind of teams where building smarter infrastructure or robots means running experiments, interrogating data, and shipping reliable tools.</p>
        </div>
      </div>

      {/* Skills section moved to /skills */}
    </Section>
  )
}
