# Ambulance App

The App is ment for (student) paramedics. The app contains driving regulations and helpful decicision trees, calculators and references to ambulancezorg.nl.

The app is build in React Native Javascript, with help of Expo we can make it universal for Android and IOS. 
It makes use of a local database (SQLite) and is connected to a Firebase database from Firestore.

## Available Scripts

Make sure you are using node 12, we recommend you to use node version manager (nvm).
Make sure 'expo cli' is installed.

In the project directory, you can run:

    expo start

It starts a webpage with instructions how to develop the app in the development mode.

When you are done with the code changes you can run the following command to build an artifact. 

    expo build:android
    expo build:ios