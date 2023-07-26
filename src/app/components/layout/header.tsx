'use client'

import Link from 'next/link';
import Hamburger, { handleHamburgerClick } from './hamburger';
import styles from '../styles/header.module.scss';

import React, { useState, useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

interface Props {
    window?: () => Window;
  }

  const navItems = ['Alerts', 'News', 'Events', 'Trash'];

const Header = (props: Props) => {
    const isMobile = useMediaQuery('(max-width:480px)');
    const isTablet = useMediaQuery('(max-width:768px)');
    const isDesktop = useMediaQuery('(min-width:768px)');

    const { window } = props;
    // const headerHeight = document.querySelector('header')?.offsetHeight
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = (e: React.MouseEvent) => {
      setMobileOpen((prevState: any) => !prevState);
    };
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <List>
          {navItems.map((item) => (
            <Link href={`/${item.toLowerCase()}`}>
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <header>
          <Box className="nav" sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
              <Toolbar>
                  {isTablet ? 
                  <IconButton
                  disableRipple
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  >
                  <Hamburger/>
                  </IconButton> 
                  : 
                  <></>}
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  <Link href={`/`}>Sachse Community Site</Link>
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {navItems.map((item) => (
                    <Link href={`/${item.toLowerCase()}`}>
                        <Button key={item} sx={{ color: '#fff' }}>
                          {item}
                        </Button>
                    </Link>
                  ))}
                </Box>
              </Toolbar>
            </AppBar>
            <Box component="nav">
              <Drawer
                className="hamburger-drawer"
                container={container}
                variant="temporary"
                anchor="bottom"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true, }}
                sx={{
                  // top: `${headerHeight}px`,
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
                }}
              >
                {drawer}
              </Drawer>
            </Box>
          </Box>
      </header>
    );
}

export default Header