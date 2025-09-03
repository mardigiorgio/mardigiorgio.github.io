import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import HelloIntro from './components/HelloIntro'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-paint gate: if intro not yet seen this session, hide body to avoid FOUC */}
        <style
          // Keep this tiny and inline so it applies before CSS loads
          dangerouslySetInnerHTML={{
            __html: `html.hello-gate body> :not(.hello-intro-root){opacity:0;pointer-events:none}body> *{transition:opacity .4s ease-out}@media(prefers-reduced-motion:reduce){body> *{transition:none}}`,
          }}
        />
        <script
          // Synchronously set the gate class before first paint
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem('helloDrawn')){document.documentElement.classList.add('hello-gate')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={inter.className}>
        <HelloIntro />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
