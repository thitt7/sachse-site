'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'

import React from 'react'

const Client = () => {

    const events = [
        { title: 'Meeting', start: new Date() }
      ]

  return (
    <div className="container" style={{maxWidth: "1200px", margin: "auto"}}>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listGridPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGrid,dayGridMonth,listWeek'
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