import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Page({ children, title }) {
  return (
    <Box
      sx={{
        paddingTop: '24px',
        paddingBottom: '80px',
      }}
      component="main"
    >
      <Container maxWidth="xl" component="section">
        <Grid container flexDirection="column" alignItems="center" spacing={1}>
          {title && (
            <Grid item>
              <Typography component="div" variant="h4">
                {title}
              </Typography>
            </Grid>
          )}
          <Grid item>{children}</Grid>
        </Grid>
      </Container>
    </Box>
  );
}
