import React from 'react'
import Client from './client'

import getEvents from '@/lib/getEvents'

const Events = async () => {

  const events = await getEvents(undefined, true, '3')

  return (
    <Client events={events} />
  )
}

export default Events;