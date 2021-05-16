import Bugsnag from '@bugsnag/expo';

const error = (errorMessage: string, reason: string) => {
  Bugsnag.notify(
    new Error(`errorMessage: ${errorMessage} error reason: ${reason}`),
  );
};

const logger = {
  error,
};

export default logger;
