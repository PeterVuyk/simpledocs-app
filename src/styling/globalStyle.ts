import defaultStyle from './defaultStyle';
import environment from '../util/environment';
import { CUSTOMER_ACADEMIE_AMBULANCEZORG } from '../model/Environment';
import academieVoorAmbulancezorgStyle from './academieVoorAmbulancezorgStyle';

const GlobalStyle =
  environment.getEnvironment().customer === CUSTOMER_ACADEMIE_AMBULANCEZORG
    ? academieVoorAmbulancezorgStyle
    : defaultStyle;

export default GlobalStyle;
