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

const logger = {
  error,
  errorFromMessage,
};

export default logger;
