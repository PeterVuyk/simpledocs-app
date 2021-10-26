import React, { FC, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import TitleBar from '../../components/TitleBar';
import debugHandler from '../../debug/debugHandler';

const styles = StyleSheet.create({
  messageContainer: { flex: 1, marginTop: 200 },
  buttonContainer: { flex: 3, justifyContent: 'flex-end', margin: 10 },
  buttonStyle: { backgroundColor: '#154594', borderRadius: 5 },
});

/**
 * This overlay will only be displayed if an error occurs during the initialization at the first startup.
 * This error can only occur by a developer error that is not spotted during testing.
 */
const InitializationAppFailureOverlay: FC = () => {
  useEffect(() => {
    debugHandler.dumpConfigToStorage();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Overlay fullScreen isVisible>
        <View style={styles.messageContainer}>
          <TitleBar
            title="Initialiseren van de app is mislukt"
            subTitle="Oeps, iets ging mis bij het starten van de app. Herstart de app en als dat niet werkt neem dan contact met ons op: mail@mail.nl. Wij lossen dit dan zo snel mogelijk op!"
          />
        </View>
      </Overlay>
    </View>
  );
};

export default InitializationAppFailureOverlay;
