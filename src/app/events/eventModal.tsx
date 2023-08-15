import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
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
    id: string,
    isOpen: boolean
}

const EventModal = ({id, isOpen}: Props) => {

  const getEvent = useCallback(
    async () => {
      const event = await fetch (`/api/events?id=${id}`)
      return await event.json()
    },
    [id]
  );

  // const [eventID, setEventID] = useState<string>(id)
  const [event, setEvent] = useState<Promise<Event>>(async ()=>{return getEvent()})
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent()
      console.log(event)
      setEvent(event[0])
    }
    fetchEvent()
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  console.log('OPEN STATE: ', open)

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          
        </DialogTitle>
        <DialogContent>
        Example Content
        </DialogContent>
       
      </Dialog>
    </>
  )
}

export default EventModal;