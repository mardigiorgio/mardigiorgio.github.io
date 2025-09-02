// global styles are imported in root layout
import { PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/seo'
import { Analytics } from '@/lib/analytics'

export const metadata = {
  title: siteConfig.titleTemplate.replace('%s', 'Home'),
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
}

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Analytics />
    </>
  )
}
