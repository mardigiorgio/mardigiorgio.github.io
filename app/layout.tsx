import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Script from 'next/script'
import IntroGateClient from './components/IntroGateClient'
import HelloIntro from './components/HelloIntro'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="intro-gate" strategy="beforeInteractive">
          {`(function(){try{
            var seen=false;try{seen=sessionStorage.getItem('introSeen')==='1'}catch(e){}
            if(seen)return;
            var ENV_BASE='${process.env.NEXT_PUBLIC_BASE_PATH || ''}';
            var trim=function(s){return (s||'').replace(/\/$/,'')};
            var fb=function(){try{var u=new URL(document.baseURI);return trim(u.pathname)}catch(e){return ''}};
            var base=trim(ENV_BASE||fb());
            var path=trim(window.location.pathname||'/');
            var isHome=(base===''? (path==='') : (path===base));
            if(!isHome)return;
            var style=document.createElement('style');style.id='__intro-gate-style';
            style.textContent='#__intro-gate{position:fixed;inset:0;z-index:2147483647;background:#fff;opacity:1;transition:opacity 300ms ease}@media(prefers-color-scheme:dark){#__intro-gate{background:#000}}html,body{overflow:hidden !important}';
            document.head.appendChild(style);
            var el=document.createElement('div');el.id='__intro-gate';document.body.appendChild(el);
            window.__introGateFailOpen=function(){try{var g=document.getElementById('__intro-gate');if(g)g.remove()}catch(e){}try{var s=document.getElementById('__intro-gate-style');if(s)s.remove()}catch(e){}};
            window.__introGateTimer=setTimeout(function(){try{window.__introGateFailOpen&&window.__introGateFailOpen()}catch(e){}},4500);
          }catch(e){}})();`}
        </Script>
      </head>
      <body className={inter.className}>
        <IntroGateClient />
        <HelloIntro />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
