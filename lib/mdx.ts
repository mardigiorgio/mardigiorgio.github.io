import { evaluate } from '@mdx-js/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import { MDXComponents } from '@/components/MDXComponents'
import * as runtime from 'react/jsx-runtime'
import { createElement } from 'react'

export async function renderMDX(source: string) {
  const { default: MDXContent } = await evaluate(source, {
    Fragment: runtime.Fragment,
    jsx: runtime.jsx,
    jsxs: runtime.jsxs,
    jsxDEV: runtime.jsxDEV,
    development: process.env.NODE_ENV !== 'production',
    remarkPlugins: [remarkMath, remarkGfm, [remarkToc, { heading: 'Contents', tight: true }]],
    rehypePlugins: [rehypeKatex, [rehypePrettyCode, { keepBackground: false }]],
    useMDXComponents: () => MDXComponents,
  })

  return createElement(MDXContent, { components: MDXComponents })
}
