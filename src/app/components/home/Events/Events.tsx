import React from 'react'
import Client from './client'

import getEvents from '@/lib/getEvents'

const Events = async () => {

  const now = new Date(Date.now()).toISOString()
  const events = await getEvents(undefined, now, '3')

  return (
    <Client events={events} />
  )
}

export default Events;