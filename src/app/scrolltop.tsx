'use client'

import { Fab, Fade } from "@mui/material";
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollTop = () => {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      const anchor = (
        (event.target as HTMLElement).ownerDocument || document
      ).querySelector('header');
  
      if (anchor) {window.scrollTo(0,0);}
    };
  
    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
        </Box>
      </Fade>
    );
  }

  export default ScrollTop