import React from 'react'
import getEvents from '@/lib/getEvents';

type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: {html: string, text: string},
    start?: Date,
    end?: Date,
    URL?: string,
    img?: {src: string, alt: string},
    allDay?: boolean
}

type Props = {
    id: string
}

const EventModal = async ({id}: Props) => {
    
    const event = await getEvents(id)

  return (
    <div>Event ID: {id}</div>
  )
}

export default EventModal;