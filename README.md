# react-native-facebook-firebase
Template for using Facebook login with Firebase. State management with Flux + Redux.
This example app simply displays your Facebook profile picture, as well as a "bio" that gets stored in the users table of your firebase app. The app listens for changes to your firebase table(s) and updates in real time.

![Login Page](http://i.imgur.com/E7mq5Jd.png)
![Facebook Modal](http://imgur.com/sACDWd7.png)
![Home Page](http://imgur.com/31xkbGj.png)

I built this project to be a simple, modular, and easily extended starting point for a common pattern, which you can actually use as the basis for nontrivial projects. The other guides and projects I've found only partially demonstrate integrating Firebase, social login, and Flux/Redux, or insist upon personal tastes in build environment, additional packages, etc.

This is NOT meant to be a crash course in Firebase or Flux/Redux. I tried to keep everything as simple as possible, but I strongly recommend some knowledge of each - refs and listeners in Firebase, Scenes/Routers in Flux, and the state/action paradigm of Redux.

Feedback and contributions are most welcome (especially a tester for iPhone)!


## Installation

### Step 1: [Create a firebase app](https://firebase.google.com/docs/web/setup#add_firebase_to_your_app)
### Step 2: [Get an Facebook App Id](https://developers.facebook.com/)
### Step 3: Enable Facebook Login  ([Firebase docs](https://firebase.google.com/docs/auth/web/facebook-login))
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
Not tested yet. This project uses no Android-specific modules, so it should work by following the [official fbdsk iOS instructions.](https://github.com/facebook/react-native-fbsdk#32-ios-project)

## Usage
### Authentication
Auhentication is done from `Splash.js`, the app landing page. If the user has already been granted a Facebook auth token, `checkFirebaseAuth` exchanges that token for a credential and sign the user into Firebase, or returns the existing user data if they were already signed in. Otherwise, the user is redirected to `Login.js`. Facebook tokens are handled entirely by the `LoginButton` module from `fbsdk`. 

### Accessing Firebase 
1. Attach Listeners

Any listeners for changes to your Firebase database should be attached when the user logs in. See `firebase.js` for the example listener used by this app:
<pre><code>
function attachProfileListener(store){
  ...
  const profileRef = firebaseApp.database().ref().child('users').child(currentUser().uid)
  profileRef.on('value', (snapshot) => {
    store.dispatch( updateProfileSuccess( snapshot.val() ) )
  })
}
</code></pre>
Whenever the `users` entry for the current user is updated, we dispatch the `updateProfileSuccess` action, and then our reducer makes the state changes which are immediately reflected in our React components. For example, our `profile.js` reducer:
<pre><code>
export default function reducer(state = initialState, action) {
  switch (action.type) {
	  case UPDATE_PROFILE_SUCCESS:
	    return {
	      ...state,
	      bio: action.profileData.bio
	    }
      ...
</code></pre>
Now the user's newly updated bio will display in `Home.js` via `this.props.bio`.

2. Updating

Updates to firebase are also handled by Redux actions. In this example, `Home.js` updates the user's bio with the click of a button:

<pre><code>
render(){
  ...
    Button 
      onPress={() => {this.props.updateBio(this.state.text) }} 
      title="Update Bio" 
     />      
  ...
</code></pre>


The `updateBio` action (`actions/profile.js`) calls `updateFirebaseProfile`, and voila! All our Firebase logic is in one place (`firebase.js`), and everything is done asynchronously. Our profile listener will dispatch an action once the update is complete and all of our components will be updated.

### Wiring up Flux and Redux
Everything is handled in `App.js`:
- Configuring the Redux store
- Creating the app's scenes (`Splash`, `Home`, and `Login`)
- Mapping Redux state and dispatch actions to `props`
- Connecting a Flux router containing the scenes to Redux, via `Provider`

