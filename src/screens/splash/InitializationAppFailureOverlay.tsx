import React, { FC, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import TitleBar from '../../components/titleBar/TitleBar';
import debugHandler from '../../debug/debugHandler';
import tearDown from '../../database/synchronize/restore/tearDownDatabase';
import configurationsStorage from '../../storage/configurationsStorage';
import logger from '../../util/logger';

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
    debugHandler
      .dumpConfigToStorage()
      .then(tearDown.down)
      .then(configurationsStorage.removeSystemConfiguration)
      .catch(reason => {
        logger.error(
          'InitializationAppFailureOverlay Tried to dump config and tearDown database and systemConfig but failed resulting in a failure state',
          reason,
        );
      });
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
