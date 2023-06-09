import Header from './header'
import ScrollTop from './scrolltop';

import '../styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <ScrollTop/>
        {children}
      </body>
    </html>

  )
}
