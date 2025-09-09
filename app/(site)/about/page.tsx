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
          <p>Hi, I’m Marco — a computer science student and aspiring engineer with a passion for cybersecurity, backend development, and systems programming.</p>
          <p>I’m fascinated by how computers work at every layer, and I love building software that’s both reliable and secure. Most of all, I enjoy diving into personal projects — the kind where I get lost in the work, experimenting with ideas late into the night until they turn into something real and usable. For me, projects aren’t just practice; they’re where I learn the most and push myself the hardest.</p>
          <p>My journey started early: at 7, I was tinkering with Scratch games; by 9, I convinced my mom to sign me up for a coding camp where I built my first Minecraft mod. From there, I dug into security, picked up new languages, and discovered how much I enjoy creating intelligent systems that solve problems and do genuinely cool things.</p>
          <p>I’ve also grown passionate about control systems and robotics — the challenge of designing software that can sense, decide, and act in the physical world fascinates me. Working with sensors, feedback loops, and real-time constraints feels like bridging the gap between theory and reality. It’s a space where my love for low-level logic, data processing, and system reliability all come together, and it pushes me to think about how code interacts with the environment around it.</p>
          <p>Outside of coding, I play chess and dive into competitive games like TF2 and other first-person titles. Both teach me strategy, adaptability, and focus — skills I carry back into my engineering mindset.</p>
          <p>Looking ahead, I’m motivated by the idea of working on projects that blend control theory, systems programming, and cybersecurity into tools with real-world impact. Whether it’s building safer infrastructure, experimenting with robotics, or strengthening digital systems, I see engineering as both a craft and a puzzle — and I love getting absorbed in solving it.</p>
        </div>
      </div>

      {/* Skills section moved to /skills */}
    </Section>
  )
}
