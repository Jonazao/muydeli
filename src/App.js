// Library Dependencies
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Material UI Dependencies
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Internal Dependencies
import { store } from './config/configureStore';
import Routing from './Routing';
import theme from './theme';

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Routing />
            </CssBaseline>
          </ThemeProvider>
        </Router>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
