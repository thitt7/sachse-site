'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'
import { useRouter } from 'next/navigation'

type Props = {
  events: Event[]
}

const Client = ({events}: Props) => {

  const router = useRouter()

  const handleEventClick = (event: any) => {
    const {extendedProps: eventObj} = event.event._def
    const date = new Date (eventObj.start)
    console.log(eventObj)
    // router.push('/dashboard')
  }

  return (
    <div className="container" style={{maxWidth: "1200px", margin: "auto"}}>
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
  )
}

export default Client;