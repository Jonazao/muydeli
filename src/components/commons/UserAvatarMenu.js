import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthServer } from '../../config/configureTemplate';
import stringToAvatar from '../../helpers/string-to-avatar';
import { setAuth } from '../../features/auth/authSlice';

export default function UserAvatarMenu({ fullName }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOnLogoutClick = useCallback(() => {
    dispatch(setAuth({ isAuthenticated: false }));
  }, [dispatch]);

  if (!fullName || !useAuthServer) {
    return null;
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar {...stringToAvatar(fullName)} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOnLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
