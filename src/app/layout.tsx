import Head from './head';
import Header from './header'
import ScrollTop from './scrolltop';

import '../styles/globals.scss'
import { jost } from './fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" id="html" className={jost.className}>
      <Head />
      <body id="body">
        <Header />
        <ScrollTop/>
        {children}
      </body>
    </html>

  )
}
