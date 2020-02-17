import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff6f60',
      main: '#DE6262',
      dark: '#ab000d',
    },
    secondary: {
      light: '#e5ffff',
      main: '#b2dfdb',
      dark: '#82ada9',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
