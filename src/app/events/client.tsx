'use client'

import React, { useState, useEffect, useCallback } from 'react'
import EventModal from './eventModal';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'

type Props = {
  events: Event[],
  setID?: any
}

const Client = ({events, setID}: Props) => {

  const router = useRouter()
  const pathName = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()!

  const [eventID, setEventID] = useState<string>(searchParams.get('id')!)
  const [eventObj, setEventObj] = useState()
  const [open, setOpen] = useState(false)

  const createQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleEventClick = (event: any) => {
    const date = new Date (event.event.start)
    const dateFormatted = date.toLocaleString().split(',')[0].replace(/\//g, '-')
    
    // router.push(pathName + '?' + createQuery('date', dateFormatted) + createQuery('id', Event._id))
    router.push(pathName + '?' + `id=${event.event._def.extendedProps._id}`)
    setEventID(event.event._def.extendedProps._id)
    setOpen(true)
  }

  return (
    <>
      <div className="container" style={{ maxWidth: "1200px", margin: "auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventInteractive={true}
          eventClick={handleEventClick}
        />
      </div>
      <EventModal id={eventID} isOpen={open}/>
    </>
  )
}

export default Client;