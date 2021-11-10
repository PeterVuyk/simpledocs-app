import React, { FC, ReactNode, useEffect } from 'react';
import { NOTIFICATION_TYPE_NO_INTERNET_CONNECTION } from '../../model/NotificationType';
import useNotification from './useNotification';
import internetConnectivity from '../../helper/internetConnectivity';

interface Props {
  children: ReactNode;
}
const InternetSuggestedNotification: FC<Props> = ({ children }) => {
  const { notify } = useNotification();

  const hasInternetConnection = async (): Promise<boolean> => {
    return internetConnectivity.hasInternetConnection();
  };

  useEffect(() => {
    const notifyIfNoInternetConnection = async () => {
      if (!(await hasInternetConnection())) {
        notify(NOTIFICATION_TYPE_NO_INTERNET_CONNECTION);
      }
    };
    notifyIfNoInternetConnection();
  }, [notify]);

  return <>{children}</>;
};

export default InternetSuggestedNotification;
