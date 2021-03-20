import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';
import AppSplashScreen from './src/screens/AppSplashScreen';

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppSplashScreen />
    </Provider>
  );
};

export default App;
