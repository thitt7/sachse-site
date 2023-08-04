import React from 'react'
import getEvents from '@/lib/getEvents';
import Client from './client';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const Events = () => {

// const events = getEvents();

  return (
    // <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&showTitle=0&showTz=0&showCalendars=0&showTabs=1&src=Y19mYTllZDljNGIzMDNiY2YwY2U1N2EzYzk4YWNlODc5NzJiYWU5MmQyZmUwZDEyMTI1NzkxZGY4ODczNzMwYmJjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%239E69AF&color=%230B8043" style={{border: 0, height: "100%", width: "100%"}}></iframe>
    <Client />
    )
}

export default Events;