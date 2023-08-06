import React from 'react'
import getEvents from '@/lib/getEvents';
import Client from './client';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const Events = async () => {

const events = await getEvents();

  return (
    <Client events={events}/>
    )
}

export default Events;