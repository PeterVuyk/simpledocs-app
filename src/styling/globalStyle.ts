import defaultStyle from './defaultStyle';
import environment from '../util/environment';
import { CUSTOMER_ACADEMIE_AMBULANCEZORG } from '../model/Environment';
import academieVoorAmbulancezorg from './academieVoorAmbulancezorg';

const GlobalStyle =
  environment.getEnvironment().customer === CUSTOMER_ACADEMIE_AMBULANCEZORG
    ? academieVoorAmbulancezorg
    : defaultStyle;

export default GlobalStyle;
