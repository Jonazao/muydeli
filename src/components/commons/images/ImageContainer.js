import React from 'react';
import Box from '@mui/material/Box';
export default function ImageContainer({
  component: Component,
  imageUrl,
  aspectRatio,
  sx,
  imageProps = {},
  ...rest
}) {
  const { sx: imageSx, ...restImageProps } = imageProps;
  return (
    <Component
      {...rest}
      sx={{
        ...sx,
        position: 'relative',
        '&::before': {
          display: 'block',
          content: "''",
          paddingBottom: `${aspectRatio}%`,
        },
      }}
    >
      <Box
        {...restImageProps}
        sx={{
          ...imageSx,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url('${imageUrl}')`,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </Component>
  );
}
