import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shape from './shape';
import components from './components';

let theme = createTheme({
  palette,
  typography,
  breakpoints,
  shape,
});

// Theme composition when there is a necessity of providing additional properties based on theme variables
theme = createTheme(theme, {
  components: components(theme),
});

export default theme;
