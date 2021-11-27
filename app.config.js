export default ({ config }) => {
  return {
    ...config,
    name: process.env.APP_JSON_NAME,
    slug: process.env.APP_JSON_SLUG,
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.APP_JSON_BUNDLE_IDENTIFIER,
    },
    android: {
      ...config.android,
      package: process.env.APP_JSON_BUNDLE_IDENTIFIER,
    },
  };
};
