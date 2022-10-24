import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Page({ children }) {
  return (
    <Box
      sx={{
        paddingTop: '40px',
        paddingBottom: '30px',
      }}
      component="main"
    >
      <Container maxWidth="xl" component="section">
        {children}
      </Container>
    </Box>
  );
}
