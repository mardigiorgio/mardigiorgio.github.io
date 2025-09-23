import { evaluate } from '@mdx-js/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import { MDXComponents } from '@/components/MDXComponents'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { jsxDEV } from 'react/jsx-dev-runtime'
import { createElement } from 'react'

export async function renderMDX(source: string) {
  const development = process.env.NODE_ENV !== 'production'
  const { default: MDXContent } = await evaluate(source, {
    Fragment,
    jsx,
    jsxs,
    ...(development ? { jsxDEV } : {}),
    development,
    remarkPlugins: [remarkMath, remarkGfm, [remarkToc, { heading: 'Contents', tight: true }]],
    rehypePlugins: [rehypeKatex, [rehypePrettyCode, { keepBackground: false }]],
    useMDXComponents: () => MDXComponents,
  })

  return createElement(MDXContent, { components: MDXComponents })
}
