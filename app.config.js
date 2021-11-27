const developmentConfig = {
  name: 'ambulancezorg-app',
  customer: 'academieVoorAmbulancezorg',
  bundleIdentifier: 'com.petervuyk.ambulancezorgapp',
  firebaseApiKey: 'AIzaSyCj7pKykN3ot7fqp0lf7Wi6JfNtdVFf9PE',
  firebaseAuthDomain: 'ambulancezorg-app.firebaseapp.com',
  firebaseDatabaseUrl:
    'https://ambulancezorg-app-default-rtdb.europe-west1.firebasedatabase.app',
  firebaseProjectId: 'ambulancezorg-app',
  firebaseStorageBucket: 'simpledocs-app',
  firebaseMessagingSenderId: 824736346090,
  firebaseAppId: '1:824736346090:web:51d4dffe875a950d654c93',
  firebaseMeasurementId: 'G-734EL03Y03',
};

const academieVoorAmbulancezorgCustomerConfig = {
  name: 'ambulancezorg-app',
  customer: 'academieVoorAmbulancezorg',
  bundleIdentifier: 'com.petervuyk.ambulancezorgapp',
  firebaseApiKey: 'AIzaSyCj7pKykN3ot7fqp0lf7Wi6JfNtdVFf9PE',
  firebaseAuthDomain: 'ambulancezorg-app.firebaseapp.com',
  firebaseDatabaseUrl:
    'https://ambulancezorg-app-default-rtdb.europe-west1.firebasedatabase.app',
  firebaseProjectId: 'ambulancezorg-app',
  firebaseStorageBucket: 'simpledocs-app',
  firebaseMessagingSenderId: 824736346090,
  firebaseAppId: '1:824736346090:web:51d4dffe875a950d654c93',
  firebaseMeasurementId: 'G-734EL03Y03',
};

const defaultCustomerConfig = {
  name: 'ambulancezorg-app',
  customer: 'ambulancezorgApp',
  bundleIdentifier: 'com.petervuyk.ambulancezorgapp',
  firebaseApiKey: 'AIzaSyCj7pKykN3ot7fqp0lf7Wi6JfNtdVFf9PE',
  firebaseAuthDomain: 'ambulancezorg-app.firebaseapp.com',
  firebaseDatabaseUrl:
    'https://ambulancezorg-app-default-rtdb.europe-west1.firebasedatabase.app',
  firebaseProjectId: 'ambulancezorg-app',
  firebaseStorageBucket: 'simpledocs-app',
  firebaseMessagingSenderId: 824736346090,
  firebaseAppId: '1:824736346090:web:51d4dffe875a950d654c93',
  firebaseMeasurementId: 'G-734EL03Y03',
};

export default ({ config }) => {
  let domainConfig =
    process.env.APP_DOMAIN === 'academie-voor-ambulancezorg'
      ? academieVoorAmbulancezorgCustomerConfig
      : defaultCustomerConfig;
  if (process.env.LOCAL_DEVELOPMENT === 'true') {
    domainConfig = { ...domainConfig, ...developmentConfig };
  }

  return {
    ...config,
    name: domainConfig.name,
    slug: domainConfig.name,
    ios: {
      ...config.ios,
      bundleIdentifier: domainConfig.bundleIdentifier,
    },
    android: {
      ...config.android,
      package: domainConfig.bundleIdentifier,
    },
    extra: {
      ...config.extra,
      firebaseApiKey: domainConfig.firebaseApiKey,
      firebaseAuthDomain: domainConfig.firebaseAuthDomain,
      firebaseDatabaseUrl: domainConfig.firebaseDatabaseUrl,
      firebaseProjectId: domainConfig.firebaseProjectId,
      firebaseStorageBucket: domainConfig.firebaseStorageBucket,
      firebaseMessagingSenderId: domainConfig.firebaseMessagingSenderId,
      firebaseAppId: domainConfig.firebaseAppId,
      firebaseMeasurementId: domainConfig.firebaseMeasurementId,
    },
  };
};
