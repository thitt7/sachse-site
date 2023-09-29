import React from 'react'
import Client from './client'

import getEvents from '@/lib/getEvents'

const Events = async () => {

  // const events = await getEvents(undefined, true, '3')
  const events = await (await fetch(`http://${process.env.HOSTNAME}:${process.env.PORT}/api/events?now=true&limit=3`)).json()

  return (
    <Client events={events} />
  )
}

export default Events;