 import stringToColor from "./string-to-color";
 const stringAvatar = (fullname) => {
    return {
      sx: {
        bgcolor: stringToColor(fullname),
      },
      children: `${fullname.split(' ')[0][0]}${fullname.split(' ')[1][0]}`,
    };
  };

export default stringAvatar;