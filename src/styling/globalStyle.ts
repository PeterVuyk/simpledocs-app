import defaultStyle from './defaultStyle';
import environment from '../util/environment';
import { CUSTOMER_FOO_BAR } from '../model/Environment';
import fooBarStyle from './fooBarStyle';

const GlobalStyle =
  environment.getEnvironment().customer === CUSTOMER_FOO_BAR
    ? fooBarStyle
    : defaultStyle;

export default GlobalStyle;
