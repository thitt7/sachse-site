import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Box, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
    //   console.log('fetch response: ', event)
      if (event.status == 500) { return 'error' }
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
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('error')

  const handleClose = () => {
    setOpen(false);
    removeParams()
  };

  const removeParams = () => {
    router.push(pathName!)
  }

  useEffect(() => {
    console.log('modal rerendering...')
    const fetchEvent = async () => {

      try {
        const event = await getEvent()
        if (event !== 'error') {
          setEvent(event[0])
        }
        else {
          setError(true)
          setErrorMessage('Server Error: Please try again later!')
        }
      }
      catch (e) {
        console.error(e)
      }
    }

    if (id) {
      setLoading(() => true);
      fetchEvent().then(() => {
        setLoading(() => false)
      })
      setOpen(true)
    }
  }, [])

//   console.log('OPEN STATE: ', open)

  return (
    <>
      {

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth='md'
        >
          {isLoading == true ? <div className='progress'><CircularProgress /></div> : <></>}
          {!error && event ?
            <>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogTitle id="alert-dialog-title">
                {event.title}
              </DialogTitle>
              <DialogContent>
                <p><strong>Date/Time:</strong> {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}</p>
                {event.location ? <p><strong>Location:</strong> {event.location}</p> : ''}
                {event.address ? <p><strong>Address:</strong> <p dangerouslySetInnerHTML={{ __html: event.address }} /></p> : ''}
                {event.description ? <p><strong>Description:</strong><p dangerouslySetInnerHTML={{ __html: event.description.html }}></p></p> : ''}
                <Link target={'_blank'} href={event.URL ? event.URL: ''}><button style={{ margin: 0 }}>READ MORE</button></Link>
              </DialogContent>
            </>
            : ''
          }
        </Dialog>
      }
    </>
  )
}

export default EventModal;