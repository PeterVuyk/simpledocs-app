### Submit App from expo to Android developer account

With `service-account.json` we give Expo permissions to submit apps to Android developer account.

Read [eas submit](https://docs.expo.dev/submit/android/) for additional documentation.

### Make notifications work with Expo and Firebase for android

**Step 1:**
Create a `google-services.json` file to make sure Expo can work with notifications in firebase.
Follow the steps on: [Client setup](https://docs.expo.dev/push-notifications/using-fcm/#client-setup)

In order to make a json file you need to add a new Android app to firebase. When the json is created
validate the values, few pointers:
- Make sure the package name is the same as in the app.json
- Make sure the 'App ID' is set in 'mobilesdk_app_id' (you can find the App ID in Firebase)
- Make sure the 'api key' and 'oauth client' is correct.

**Step 2:** 
Add the `.json` file to the `keys` directory, prefix it with 
the project name, then add it to `app.json`/`app.config.js`.

**Step 3:**
Upload the server credentials to Expo like the [documentation](https://docs.expo.dev/push-notifications/using-fcm/#uploading-server-credentials),
with the moment of writing the documentation is outdated and is the legacy way. 
Instead of the commands mentioned run `eas credentials`.

**Step 4:**
In the selector, choose 'android', the desired profile and then 'Push notifications'.

### Make notifications work with Expo for ios

A push notification needs to be added for every eas profile.

Generate a push notification by expo. Run `eas credentials` and follow the
[documentation](https://docs.expo.dev/app-signing/managed-credentials/#ios)

Important: When sending a notification, check the error log from the cloud functions
if the notifications are successful. Sometimes, these errors will contain further details
claiming an InvalidProviderToken error. This is actually tied to both your APN key
and your provisioning profile. To resolve this error, you should rebuild the app and regenerate
a new push key and provisioning profile.