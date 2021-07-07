import Bugsnag from '@bugsnag/expo';

const error = (errorMessage: string, reason: string) => {
  Bugsnag.notify(
    new Error(`errorMessage: ${errorMessage} error reason: ${reason}`),
  );
};

const errorFromMessage = (errorMessage: string) => {
  Bugsnag.notify(new Error(`errorMessage: ${errorMessage}`));
};

const logger = {
  error,
  errorFromMessage,
};

export default logger;
