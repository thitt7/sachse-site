'use client'

import getEvents from '@/lib/getEvents'
import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import EventModal from './eventModal';
import useMediaQuery from '@mui/material/useMediaQuery';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';

const Style = {margin: 0, maxWidth: '100%'}

type Props = {
  events: Event[],
  setID?: any
}

const Client = ({events, setID}: Props) => {

  const isMobile = useMediaQuery('(max-width:480px)');
  const isTablet = useMediaQuery('(max-width:768px)');
  const isDesktop = useMediaQuery('(min-width:768px)');

  const router = useRouter()
  const pathName = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()!

  const [eventID, setEventID] = useState<string>(searchParams.get('id')!)
  const [open, setOpen] = useState(false)
  const [lastDate, setLastDate] = useState()
  const calendarRef: any = useRef();
  const lastDateRef: any = useRef();


  const getEvent = useCallback(
    async () => {
      const event = await getEvents(eventID);
      return event;
    }, [eventID]);

  const handleEventClick = (event: any) => {
    router.push(pathName + '?' + `id=${event.event._def.extendedProps._id}`) 
    setEventID(event.event._def.extendedProps._id)
    setOpen(true)
  }

  useEffect(() => {

    const getDate = async () => {
      const event = await getEvent()
      const {start: date} = event[0]
      
      if (typeof calendarRef.current !== 'undefined' && typeof calendarRef.current !== null) {
        console.log('WRITING REF...')
        lastDateRef.current = date;
        calendarRef.current.getApi().changeView('dayGridMonth', date);
      }
    };

    if (eventID) {
      calendarRef.current.elRef.current.style.visibility = 'hidden';
      getDate().then(() => {
        calendarRef.current.elRef.current.style.visibility = 'visible';
      })
    }
    else {
      console.log()
    }
  
  }, [eventID]);

  return (
    <>
      <div id="events" className="container" style={Style}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listGridPlugin]}
              headerToolbar={isTablet ? { left: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' }
               : { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' }}
              footerToolbar={isTablet ? { center: 'prev,next', } : false}
              initialView={isTablet ? 'dayGridMonth' : 'listWeek'}
              weekends={true}
              events={events}
              eventInteractive={true}
              eventClick={handleEventClick}
              ref={calendarRef}
            />
      </div>
      <EventModal id={eventID} isOpen={open}/>
    </>
  )
}

export default Client;