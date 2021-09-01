import React, { FC, useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import TitleBar from '../../components/TitleBar';

const styles = StyleSheet.create({
  messageContainer: { flex: 1, marginTop: 200 },
  buttonContainer: { flex: 3, justifyContent: 'flex-end', margin: 10 },
  buttonStyle: { backgroundColor: '#154594', borderRadius: 5 },
});

interface Props {
  onRetryButtonAction: () => void;
}

const NoInternetConnectionOverlay: FC<Props> = ({ onRetryButtonAction }) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <Overlay fullScreen isVisible>
        <View style={styles.messageContainer}>
          <TitleBar
            title="Geen internetverbinding"
            subTitle="Controleer uw internetverbinding en probeer het opnieuw"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={buttonDisabled}
            title="Probeer opnieuw"
            onPress={() => {
              setButtonDisabled(true);
              onRetryButtonAction();
              setButtonDisabled(false);
            }}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default NoInternetConnectionOverlay;
