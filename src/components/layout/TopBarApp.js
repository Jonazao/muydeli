import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import menuItems from './navigationConfig';
import UserAvatarMenu from '../commons/UserAvatarMenu';
import useMenuNavigation from '../../hooks/useMenuNavigation';

const TopBarToolbar = () => {
  const theme = useTheme();
  const { navigationItem, setNavigationItem } = useMenuNavigation();
  const handleChange = useCallback(
    (event, newValue) => {
      setNavigationItem(newValue);
    },
    [setNavigationItem],
  );
  const isMediumOrUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Muy Deli
      </Typography>
      {isMediumOrUp && (
        <Tabs
          sx={{ color: theme.palette.primary.contrastText }}
          textColor="inherit"
          TabIndicatorProps={{ sx: { background: theme.palette.primary.contrastText } }}
          value={navigationItem}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {menuItems.map((item) => {
            return (
              <Tab
                key={item.value}
                iconPosition="start"
                label={item.label}
                value={item.value}
                icon={<item.icon />}
                component={Link}
                to={item.url}
              />
            );
          })}
        </Tabs>
      )}
      <UserAvatarMenu fullName="Jhonnatan Guerrero" />
    </Toolbar>
  );
};

export default function TopBarApp() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <TopBarToolbar />
      </AppBar>
      <TopBarToolbar />
    </Box>
  );
}
