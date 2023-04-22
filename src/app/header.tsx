'use client'

import Link from 'next/link';
import styles from '../styles/header.module.scss';

import React, { useState, useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
  }

  const navItems = ['Alerts', 'News', 'Events'];

const Header = (props: Props) => {
    const mobile = useMediaQuery('(max-width:860px)');
    const desktop = useMediaQuery('(min-width:860px)');

    const { window } = props;
    const headerHeight = document.querySelector('header')?.offsetHeight
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState: any) => !prevState);
    };
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
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
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
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
                  top: `${headerHeight}px`,
                  display: { xs: 'block', sm: 'none' },
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