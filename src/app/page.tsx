import Image from 'next/image'
import Example from './example'
import '../styles/globals.scss'

export default async function Home() {

  // const alerts = await getAlerts(0,10,0);

  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <Example />
    </main>
  )
}
