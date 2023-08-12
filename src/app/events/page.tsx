import React from 'react'
import getEvents from '@/lib/getEvents';
import Client from './client';
import EventModal from './eventModal';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const Events = async () => {

  const events = await getEvents();

  return (
    <>
      <Client events={events} setID={setEventID}/>
      
      {/* <EventModal id={'64d1cc9b2e195bf274542e2d'}/> */}
    </>
  )
}

const setEventID = (id: string) => {id}

export default Events;