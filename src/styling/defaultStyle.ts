import { FontWeight } from '../model/style/FontWeight';

const defaultStyle = {
  color: {
    white: '#fff',
    primary: {
      light: '#5bb5f6',
      main: '#154594',
      dark: '#052b69',
    },
    default: {
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
  bottomTabLayout: {
    tabSelection: '#fff',
  },
  titleLayout: {
    color: '#154594',
  },
  header: {
    backgroundColor: '#E5E5EA',
  },
};

export default defaultStyle;
