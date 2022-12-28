import React, { forwardRef } from 'react';
import Box from '@mui/material/Box';

const Step = forwardRef((props, ref) => {
  const { children, ...restProps } = props;
  return (
    <Box ref={ref} {...restProps}>
      {children}
    </Box>
  );
});

export default Step;
