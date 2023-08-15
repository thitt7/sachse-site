import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import getEvents from '@/lib/getEvents';

type Event = {
  title?: string,
  slug?: string,
  location?: string,
  address?: string,
  description?: { html: string, text: string },
  start?: Date,
  end?: Date,
  URL?: string,
  img?: { src: string, alt: string },
  allDay?: boolean
}

type Props = {
  id: string,
  isOpen: boolean
}

const EventModal = ({ id, isOpen }: Props) => {

  const getEvent = useCallback(
    async () => {
      const event = await fetch(`/api/events?id=${id}`)
      return await event.json()
    },
    [id]
  );

  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()!

  const [eventID, setEventID] = useState<string>(id)
  const [event, setEvent] = useState<Promise<Event>>()
  const [open, setOpen] = useState(isOpen)

  const handleClose = () => {
    console.log('closing')
    setOpen(false);
    removeParams()
  };

  const removeParams = () => {
    router.push(pathName!)
  }

  useEffect(() => {
    console.log('running useeffect hook...')
    const fetchEvent = async () => {
      const event = await getEvent()
      console.log(event)
      setEvent(event[0])
    }

    if (id) {
      console.log('ID IS NOT NULL')
      fetchEvent()
      setOpen(true)
    }
  }, [])

  console.log('OPEN STATE: ', open)

  return (
    <>
      {
        event ?
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='md'
          >
            <DialogTitle id="alert-dialog-title">
              {event.title}
            </DialogTitle>
            <DialogContent>
              {event.description ? <p dangerouslySetInnerHTML={{ __html: event.description.html }}></p> : ''}
              Your cunt is too pixelated -_-
            </DialogContent>

          </Dialog> : ''
      }
    </>
  )
}

export default EventModal;