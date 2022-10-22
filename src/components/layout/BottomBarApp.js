import * as React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import menuItems from './navigationConfig';
import useMediaQuery from '@mui/material/useMediaQuery';

import useMenuNavigation from '../../hooks/useMenuNavigation';

export default function BottomBarApp() {
  const { navigationItem, setNavigationItem } = useMenuNavigation();

  const handleOnChange = (event, newValue) => {
    setNavigationItem(newValue);
  };
  const isMediumOrDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    isMediumOrDown && (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels value={navigationItem} onChange={handleOnChange} sx={{ overflowX: 'auto' }}>
          {menuItems.map((item) => {
            return (
              <BottomNavigationAction
                key={item.value}
                label={item.label}
                value={item.value}
                icon={<item.icon />}
                component={Link}
                to={item.url}
              />
            );
          })}
        </BottomNavigation>
      </Paper>
    )
  );
}
