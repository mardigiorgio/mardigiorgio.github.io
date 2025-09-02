import { PropsWithChildren } from 'react'

export default function Section({ children }: PropsWithChildren) {
  return <section className="container-readable my-12 md:my-16">{children}</section>
}

