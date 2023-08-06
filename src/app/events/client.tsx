'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'

import React from 'react'

type Props = {
  events: Event[]
}

const Client = ({events}: Props) => {

    // const events = [
    //   { title: 'event 1', date: '2023-07-01' },
    //   { title: 'event 2', date: '2023-07-02' }
    //   ]
    console.log('EVENTS: ',events)

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
            // eventContent={renderEventContent}
          />
    </div>
  )
}

export default Client;