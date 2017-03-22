# react-native-facebook-firebase
Template for using Facebook login with Firebase. State management with Flux + Redux.
This example app simply displays your Facebook profile picture, as well as a "bio" that gets stored in the users table of your firebase app. The app listens for changes to your firebase table(s) and updates in real time.

![Login Page](http://i.imgur.com/E7mq5Jd.png)
![Facebook Modal](http://imgur.com/sACDWd7.png)
![Home Page](http://imgur.com/31xkbGj.png)


## Installation

### Step 1: ![Create a firebase app](https://firebase.google.com/docs/web/setup#add_firebase_to_your_app)
### Step 2: ![Get an Facebook App Id](https://developers.facebook.com/)
### Step 3: Enable Facebook Login (![from official firebase docs](https://firebase.google.com/docs/auth/web/facebook-login))
1. On the Facebook for Developers site, get the App ID and an App Secret for your app.
2. In the Firebase console, open the Auth section.
3. On the Sign in method tab, enable the Facebook sign-in method and specify the App ID and App Secret you got from Facebook.
4. Then, make sure your OAuth redirect URI (e.g. my-app-12345.firebaseapp.com/__/auth/handler) is listed as one of your OAuth redirect URIs in your Facebook app's settings page on the Facebook for Developers site in the Product Settings > Facebook Login config.

### Step 4: Install the project files
1. Create a new react-native project.
2. Copy `package.json, index.*.js, App.js, and src/` directory to your new project.
3. Run `npm install --save`
4. Run `react-native link` to compile Facebook SDK native extensions.

### Step 5: ANDROID configuration
Make the following changes to your android project files:
1. Add app id string to `strings.xml`
2. Add meta data tag to `AndroidManifest.xml`
3. Modify `MainActivity.java` and `MainApplication.java`
  
See ANDROID_TEMPLATE_FILES/ in this project for reference.
More information can be found at https://github.com/facebook/react-native-fbsdk.

### Step 4 - IOS configuration
Not tested yet.

## About
I built this project to be a simple, modular, and easily extended starting point for a common pattern. The other guides and projects I've found only partially demonstrate integrating Firebase, social login, and Flux/Redux.

Feedback and contributions are most welcome (especially a tester for iPhone)!

