import Image from 'next/image'
import Prose from './Prose'

export const MDXComponents = {
  wrapper: ({ children }: any) => <Prose>{children}</Prose>,
  img: (props: any) => (
    // Use native img to keep next export simple for MDX images
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" {...props} />
  ),
  pre: (props: any) => <pre className="not-prose" {...props} />,
}

