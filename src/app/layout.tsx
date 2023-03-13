import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <nav>This is an example nav</nav>
        {children}
      </body>
    </html>

  )
}
