import { FontWeight } from '../model/style/FontWeight';

const GlobalStyle = {
  color: {
    white: '#fff',
    primary: {
      light: '#5bb5f6',
      main: '#154594',
      dark: '#052b69',
    },
    secondary: {
      light: '#d4d3d3',
      main: '#b7b7b7',
      dark: '#616161',
      rgbDark: 'rgba(97, 97, 97, 1)',
    },
  },
  typography: {
    h1: {
      fontSize: 21,
      fontWeight: 'bold' as FontWeight,
      letterSpacing: 0.5,
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold' as FontWeight,
    },
    h4: {
      fontSize: 15,
    },
    h5: {
      fontSize: 12,
    },
  },
};

export default GlobalStyle;
