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
        {/* Pre-paint gate: only on first visit to homepage and only if not drawn this session */}
        <style
          // Keep this tiny and inline so it applies before CSS loads
          dangerouslySetInnerHTML={{
            __html: `html.hello-intro-pending body> :not(.hello-intro-root){opacity:0;pointer-events:none}body> *{transition:opacity .4s ease-out}@media(prefers-reduced-motion:reduce){body> *{transition:none}}`,
          }}
        />
        <script
          // Synchronously set the gate class before first paint, but only for homepage entry
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var drawn=sessionStorage.getItem('helloDrawn');if(drawn){return}var ENV_BASE=(typeof window!=='undefined' && window.__BASE_PATH__)||'${process.env.NEXT_PUBLIC_BASE_PATH||''}';
var detectPrefix=function(){try{var scripts=document.getElementsByTagName('script');for(var i=0;i<scripts.length;i++){var src=scripts[i].getAttribute('src')||'';var j=src.indexOf('/_next/');if(j>0){return src.slice(0,j)}}}catch(e){}return ''};
var base=ENV_BASE||detectPrefix()||'';if(base!==''){base=base.replace(/\/$/,'')}
var path=window.location.pathname||'/';var isHome=(base===''? (path==='/'||path==='') : (path===base||path===base+'/'));
if(isHome){document.documentElement.classList.add('hello-intro-pending')}}catch(e){}}();`,
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
