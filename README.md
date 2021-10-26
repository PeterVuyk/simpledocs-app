# Documentation App

The App is ment for any company that would like to have a documentation-app.
Think for example of work instructions, manuals, information for clients and so on.
The app provides books, calculation, decision trees and in the future more.

The app is build in React Native Javascript, with help of Expo we can make it universal for Android and IOS. 
It makes use of a local database (SQLite) and is connected to the application server api.

## Available Scripts

Make sure you are using node 12, we recommend you to use node version manager (nvm).
Make sure 'expo cli' is installed.

In the project directory, you can run:

    expo start

It starts a webpage with instructions how to develop the app in the development mode.

When you are done with the code changes you can run the following command to build an artifact. 

    expo build:android --release-channel staging | prod
    expo build:ios --release-channel staging | prod

You can see everything that you’ve published or see a detailed view with:

    expo publish:history
    expo publish:details --publish-id=6d011971-dfff-406a-83fe-23323fcf8964

