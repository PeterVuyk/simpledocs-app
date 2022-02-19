import { getAuth } from 'firebase/auth';

const hasExpoPushToken = async (): Promise<boolean> => {
  const token = await getAuth()
    .currentUser?.getIdTokenResult(true)
    .then(value => value.claims.expoPushToken);
  return !(token === undefined || token === null);
};

export default hasExpoPushToken;
