'use client';

import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const FormSuccess = () => {

const searchParams = useSearchParams()!
const [open, setOpen] = useState(() => {
    if (searchParams.get('form')) {return true}
    else {return false}
});

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Thank you for signing up!
        </Alert>
      </Snackbar>
  )
}

export default FormSuccess;