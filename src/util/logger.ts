import Bugsnag from '@bugsnag/expo';

const error = (errorMessage: string, reason: string) => {
  if (__DEV__) {
    console.error('errorMessage', errorMessage, 'reason', reason);
    return;
  }
  Bugsnag.notify(
    new Error(`errorMessage: ${errorMessage} error reason: ${reason}`),
  );
};

const errorFromMessage = (errorMessage: string) => {
  if (__DEV__) {
    console.error('errorMessage', errorMessage);
    return;
  }
  Bugsnag.notify(new Error(`errorMessage: ${errorMessage}`));
};

const debugMessage = (errorMessage: string) => {
  if (__DEV__) {
    console.debug('warningMessage', errorMessage);
  }
};

const logger = {
  error,
  errorFromMessage,
  debugMessage,
};

export default logger;
