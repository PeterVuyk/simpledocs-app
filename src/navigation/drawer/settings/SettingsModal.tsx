import React, { FC, useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Switch, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import TitleBar from '../../../components/titleBar/TitleBar';
import globalStyle from '../../../styling/globalStyle';
import logger from '../../../util/logger';
import internetConnectivity from '../../../helper/internetConnectivity';
import LoadingSpinner from '../../../components/LoadingSpinner';
import notificationToggle from '../../../notification/notificationToggle';
import AlertBox from '../../../components/AlertBox';
import notificationToken from '../../../notification/notificationToken';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dialogActions: {
    marginTop: 10,
    marginRight: -20,
    marginLeft: -20,
    marginBottom: -20,
    alignSelf: 'stretch',
    padding: 10,
    flexDirection: 'row-reverse',
    backgroundColor: globalStyle.color.default.light,
  },
  buttonStyle: {
    backgroundColor: globalStyle.color.primary.main,
    borderRadius: 5,
  },
});

interface Props {
  onCloseModal: () => void;
}

const SettingsModal: FC<Props> = ({ onCloseModal }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hasInternet, setHasInternet] = useState<boolean | null>(null);
  const [allowNotifications, setAllowNotifications] = useState<boolean | null>(
    null,
  );
  const isFocused = useIsFocused();

  // On isFocused is required to make sure to check for internet connection
  // if the user locked and unlocked while the settings modal was open.
  useEffect(() => {
    internetConnectivity.hasInternetConnection().then(setHasInternet);
    notificationToken.hasExpoPushToken().then(setAllowNotifications);
  }, [isFocused]);

  /**
   * submit should take at least 3 seconds, otherwise the changes are not applied
   * before the user directly goes back to the settings to check the changes
   */
  const handleSubmit = (notificationAllowed: boolean) => {
    const startTime = new Date().getTime();
    setSubmitting(true);
    notificationToggle(notificationAllowed)
      .then(isSuccessful => {
        if (isSuccessful) {
          const submitTime = new Date().getTime() - startTime;
          setTimeout(() => onCloseModal(), 3000 - submitTime);
          return;
        }
        setErrorMessage(
          notificationAllowed
            ? 'Het aanzetten van meldingen is niet gelukt, controleer of het versturen van notificaties is toegestaan in de app instellingen van je telefoon en probeer het daarna opnieuw.'
            : 'Het uitzetten van meldingen is helaas niet gelukt, probeer het later opnieuw.',
        );
        setSubmitting(false);
      })
      .catch(reason => {
        logger.error(
          'User tried to toggle notifications via settings but failed.',
          reason,
        );
        setErrorMessage(
          'Oeps, iets ging mis bij wijzigen van de instellingen. Probeer het later opnieuw.',
        );
        setSubmitting(false);
      });
  };

  if (hasInternet === null || allowNotifications === null) {
    return null;
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          onCloseModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TitleBar
              title="Instellingen"
              subTitle={`${
                hasInternet
                  ? ''
                  : 'Zet het internet aan om de instellingen te wijzigen. '
              }We doen ons best om je alleen meldingen te sturen waarvan we denken dat je die wilt lezen. Je kunt hier je voorkeur aanpassen.`}
            />
            {errorMessage === '' && <LoadingSpinner hidden={!submitting} />}
            {errorMessage !== '' && (
              <AlertBox message={errorMessage} severity="warning" />
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  textAlignVertical: 'center',
                  paddingRight: 10,
                }}
              >
                Meldingen:
              </Text>
              <Switch
                disabled={submitting || !hasInternet}
                trackColor={{
                  false: '#767577',
                  true: globalStyle.toggle.selectedTrackColor,
                }}
                thumbColor={
                  allowNotifications
                    ? globalStyle.toggle.selectedThumbColor
                    : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={setAllowNotifications}
                value={allowNotifications}
              />
            </View>
            <View style={styles.dialogActions}>
              <Button
                title="Opslaan"
                onPress={() => handleSubmit(allowNotifications)}
                disabled={submitting || !hasInternet}
                buttonStyle={[{ marginLeft: 10 }, styles.buttonStyle]}
              />
              <Button
                title="Sluiten"
                onPress={onCloseModal}
                disabled={submitting}
                buttonStyle={styles.buttonStyle}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsModal;
