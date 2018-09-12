import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBLEX7iZntFl-xVHhe9CRRRQiAxHnW1dWg",
    authDomain: "trip-reviewer-2018.firebaseapp.com",
    databaseURL: "https://trip-reviewer-2018.firebaseio.com",
    projectId: "trip-reviewer-2018",
    storageBucket: "trip-reviewer-2018.appspot.com",
    messagingSenderId: "721559559011"
};

firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch((error) => {
    console.log(error);
});

export {
    firebase
}