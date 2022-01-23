import * as Sentry from 'sentry-expo';
import { Severity } from '@sentry/types';

const error = (errorMessage: string, reason: string) => {
  if (__DEV__) {
    console.error('errorMessage', errorMessage, 'reason', reason);
    return;
  }
  Sentry.Native.captureMessage(
    `errorMessage: ${errorMessage} error reason: ${reason}`,
    Severity.Error,
  );
};

const errorFromMessage = (errorMessage: string) => {
  if (__DEV__) {
    console.error('errorMessage', errorMessage);
    return;
  }
  Sentry.Native.captureMessage(errorMessage, Severity.Error);
};

const debugMessage = (errorMessage: string) => {
  if (__DEV__) {
    console.debug('warningMessage', errorMessage);
    return;
  }
  Sentry.Native.captureMessage(errorMessage, Severity.Warning);
};

const logger = {
  error,
  errorFromMessage,
  debugMessage,
};

export default logger;
