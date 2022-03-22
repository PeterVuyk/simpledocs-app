import NetInfo from '@react-native-community/netinfo';

const hasInternetConnection = async (): Promise<boolean> => {
  return NetInfo.fetch().then(state => {
    return state.isConnected !== false;
  });
};

const internetConnectivity = {
  hasInternetConnection,
};

export default internetConnectivity;
