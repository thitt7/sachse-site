import React, { useCallback, useEffect, useState } from 'react'
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

const EventModal = ({id}: Props) => {

  const getEvent = useCallback(
    async () => {
      const event = await fetch (`/api/events?id=${id}`)
      return await event.json()
    },
    [id]
  );

  // const [eventID, setEventID] = useState<string>(id)
  const [event, setEvent] = useState<Promise<Event>>(async ()=>{return getEvent()})

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent()
      console.log(event)
      setEvent(event[0])
    }
    fetchEvent()
  }, [])

  return (
    <>
      <div>Event ID: {event.URL}</div>
    </>
  )
}

export default EventModal;