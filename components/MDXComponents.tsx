import Image from 'next/image'
import Prose from './Prose'
import { withBasePath } from '@/lib/basePath'

export const MDXComponents = {
  wrapper: ({ children }: any) => <Prose>{children}</Prose>,
  img: (props: any) => {
    const { src, ...rest } = props || {}
    // Use native img to keep next export simple for MDX images
    // eslint-disable-next-line @next/next/no-img-element
    return <img loading="lazy" src={withBasePath(src) as any} {...rest} />
  },
  pre: (props: any) => <pre className="not-prose" {...props} />,
}
