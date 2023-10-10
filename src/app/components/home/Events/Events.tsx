import React from 'react'
import Client from './client'

import getEvents from '@/lib/getEvents'

const Events = async () => {

  const events = await getEvents(undefined, true, '3')
  // const events = await (await fetch(`${process.env.API_URL}/api/events?limit=3&now=true`)).json()

  return (
    <Client events={events} />
  )
}

export default Events;