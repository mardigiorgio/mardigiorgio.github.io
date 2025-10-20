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
          <p>Hi, I'm Marco — an Intelligent Systems Engineering major at DePaul. I'm interested in robotics, control systems, and building things that combine hardware and software.</p>
          <p>I enjoy projects that feel like experiments. I'll sketch out how something should work, build a prototype, then spend time debugging and tuning until it behaves the way I expected. The hands-on process of going from theory to working system is what I find most satisfying.</p>
          <p>I got hooked early. At seven I was remixing Scratch projects; by nine I was convincing my mom to send me to a camp so I could mod Minecraft. Those early projects led me from scripting to low-level systems, then into the worlds of embedded design, signal processing, and intelligent automation.</p>
          <p>Right now I'm focused on control systems, autonomy, and the tools that help engineers build and test complex systems. Whether I'm writing a control loop, setting up sensors, or working with embedded hardware, I like seeing ideas turn into something real that you can measure and improve.</p>
          <p>Outside of classes and projects, I play chess and competitive FPS games like TF2. They're fun ways to unwind, and the strategic thinking definitely carries over to how I approach engineering problems.</p>
          <p>I'm looking for internships in robotics, intelligent systems, or engineering roles where I can work on real hardware, run experiments, and build reliable tools.</p>
        </div>
      </div>

      {/* Skills section moved to /skills */}
    </Section>
  )
}
