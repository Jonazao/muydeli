import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthServer } from '../../config/configureTemplate';
import stringToColor from '../../helpers/string-to-color';
import { setAuth } from '../../features/auth/authSlice';

const stringAvatar = (fullname) => {
  return {
    sx: {
      bgcolor: stringToColor(fullname),
    },
    children: `${fullname.split(' ')[0][0]}${fullname.split(' ')[1][0]}`,
  };
};

export default function UserAvatarMenu({ fullname }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!fullname || !useAuthServer) {
    return null;
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnLogoutClick = () => {
    dispatch(setAuth({ isAutenticated: false }));
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar {...stringAvatar(fullname)} />
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
