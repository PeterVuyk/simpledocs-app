import React from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View } from 'react-native';
import TitleBar from '../components/TitleBar';

interface Props {
  retryButtonHandler: () => void;
}

const NoInternetConnectionOverlay: React.FC<Props> = ({
  retryButtonHandler,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Overlay fullScreen isVisible>
        <View style={{ flex: 1, marginTop: 200 }}>
          <TitleBar
            title="Geen internetverbinding"
            subTitle="Controleer uw internetverbinding en probeer het opnieuw"
          />
        </View>
        <View style={{ flex: 3, justifyContent: 'flex-end', margin: 10 }}>
          <Button
            title="Probeer opnieuw"
            onPress={() => retryButtonHandler()}
            buttonStyle={{ backgroundColor: '#154594', borderRadius: 5 }}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default NoInternetConnectionOverlay;
