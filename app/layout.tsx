import '@/styles/globals.css'
import 'katex/dist/katex.min.css'
import { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Script from 'next/script'
import HelloIntro from './components/HelloIntro'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="intro-guard" strategy="beforeInteractive">
          {`(function(){try{
            var w=window,d=document;
            // 1) Checks
            var seen=false;try{seen=sessionStorage.getItem('helloSeen')==='1'}catch(e){}
            var prefersReduce=false;try{prefersReduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
            // Determine if this is the Home path under the configured base path
            var ENV_BASE='${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}';
            var trim=function(s){return (s||'').replace(/\/+$/,'')};
            var fromBaseURI=function(){try{var u=new URL(d.baseURI);return trim(u.pathname)}catch(e){return ''}};
            var base=trim(ENV_BASE||fromBaseURI());
            var path=trim(w.location&&w.location.pathname||'/');
            var isHome;
            if(base===''||base==='/'){ isHome = (path==='')||(path==='/'); }
            else { isHome = path===base; }
            if(!isHome||seen||prefersReduce){ return; }

            // 2) Mark document pending and inject minimal critical CSS
            d.documentElement.setAttribute('data-intro-pending','1');
            var css = ''+
              '/* Fade siblings while intro prepares; keep layout stable */' +
              'body>*,body>*::before,body>*::after{transition:opacity 200ms ease;}' +
              'html[data-intro-pending] body{overflow:hidden;}' +
              'html[data-intro-pending] body>:not(#hello-intro-root){opacity:0 !important;pointer-events:none !important;}'
            ;
            var st=d.createElement('style'); st.id='intro-critical'; st.textContent=css; d.head.appendChild(st);

            // 3) Global finish hook + fail-open
            w.finishIntro = function(){
              try{sessionStorage.setItem('helloSeen','1')}catch(e){}
              try{d.documentElement.removeAttribute('data-intro-pending')}catch(e){}
            };
            w.__introFailTimer = w.setTimeout(function(){ try{ w.finishIntro && w.finishIntro() }catch(e){} }, 6000);
          }catch(e){/* fail-open by doing nothing */}})();`}
        </Script>
      </head>
      <body className={inter.className}>
        <HelloIntro />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
