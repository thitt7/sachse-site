import Header from './components/layout/header';
import Footer from './components/layout/footer';
import ScrollTop from './components/layout/scrolltop';

import '../styles/globals.scss'
import { jost } from './fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" id="html" className={jost.className}>
      <body id="body">
        <Header />
        <ScrollTop/>
        {children}
        <Footer />
      </body>
    </html>

  )
}
