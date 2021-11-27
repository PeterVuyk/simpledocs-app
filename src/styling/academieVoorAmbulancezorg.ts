import { FontWeight } from '../model/style/FontWeight';

const academieVoorAmbulancezorg = {
  color: {
    white: '#fff',
    primary: {
      light: '#BDCAD1',
      main: '#283339',
      dark: '#262626',
    },
    default: {
      light: '#d4d3d3',
      main: '#b7b7b7',
      dark: '#616161',
      rgbDark: 'rgba(97, 97, 97, 1)',
    },
    brandColor: {
      secondary: '#FFEA00',
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
    tabSelection: '#FFEA00',
  },
};

export default academieVoorAmbulancezorg;
