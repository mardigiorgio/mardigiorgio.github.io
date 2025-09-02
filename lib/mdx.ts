import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import { MDXComponents } from '@/components/MDXComponents'

export async function renderMDX(source: string) {
  const { content } = await compileMDX<{ [key: string]: any }>({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, [remarkToc, { heading: 'Contents', tight: true }]],
        rehypePlugins: [[rehypePrettyCode, { keepBackground: false }]],
        format: 'mdx',
      },
    },
    components: MDXComponents as any,
  })
  return content
}

