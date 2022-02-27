export default ({ config }) => {
  return {
    ...config,
    name: process.env.APP_JSON_NAME,
    slug: process.env.APP_JSON_SLUG,
    splash: {
      ...config.splash,
      backgroundColor: process.env.APP_JSON_SPLASH_BACKGROUNDCOLOR,
    },
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.APP_JSON_BUNDLE_IDENTIFIER,
    },
    android: {
      ...config.android,
      googleServicesFile: process.env.APP_JSON_GOOGLE_SERVICES_JSON_PATH,
      package: process.env.APP_JSON_BUNDLE_IDENTIFIER,
    },
  };
};
