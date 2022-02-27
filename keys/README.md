### Submit App from expo to Android developer account

With `service-account.json` we give Expo permissions to submit apps to Android developer account.

Read [eas submit](https://docs.expo.dev/submit/android/) for additional documentation.

### Make notifications work with Expo and Firebase for android

**Step 1:**
Create a `google-services.json` file to make sure Expo can work with notifications in firebase.
Follow the steps on: [Client setup](https://docs.expo.dev/push-notifications/using-fcm/#client-setup)

**Step 2:** 
Add the `.json` file to the `keys` directory, prefix it with 
the project name, then add it to `app.json`/`app.config.js`.

**Step 3:**
Upload the server credentials to Expo like the [documentation](https://docs.expo.dev/push-notifications/using-fcm/#uploading-server-credentials),
with the moment of writing the documentation is outdated and is the legacy way. 
Instead of the commands mentioned run `eas credentials`.

**Step 4:**
In the selector, choose 'android', the desired profile and then 'Push notifications'.