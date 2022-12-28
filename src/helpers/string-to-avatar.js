import stringToColor from './string-to-color';
const stringAvatar = (fullName) => {
  return {
    sx: {
      bgcolor: stringToColor(fullName),
    },
    children: `${fullName.split(' ')[0][0]}${fullName.split(' ')[1][0]}`,
  };
};

export default stringAvatar;
