import React from 'react';
import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AppFab({ onClick, Icon }) {
  const theme = useTheme();
  const isMediumOrDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom
      in={true}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit}ms`,
      }}
      unmountOnExit
    >
      <Fab
        onClick={onClick}
        sx={{ position: 'absolute', bottom: isMediumOrDown ? 72 : 16, right: 16 }}
        aria-label="Add"
        color="secondary"
      >
        <Icon />
      </Fab>
    </Zoom>
  );
}
