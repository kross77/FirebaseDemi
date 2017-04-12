import * as firebase from "firebase";

// const firebaseConfig = {
// 	apiKey: "AIzaSyD28EphbGb2fj02EnVWBUy2U8xNDIDYZPg",
// 	authDomain: "liker-716a1.firebaseapp.com",
// 	databaseURL: "https://liker-716a1.firebaseio.com",
// 	storageBucket: "liker-716a1.appspot.com",
// 	messagingSenderId: "629288419467",
// };

const firebaseConfig = {
	apiKey: "AIzaSyD_KASc1I0wW1hmNpsAfu9CrhimucSPxjQ",
	authDomain: "gta-house.firebaseapp.com",
	databaseURL: "https://gta-house.firebaseio.com",
	projectId: "gta-house",
	storageBucket: "gta-house.appspot.com",
	messagingSenderId: "586484192857"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const root =
	() => (firebaseApp.database().ref());

export const jobs =
	() => (firebaseApp.database().ref('/user/1/jobs'));

export const rssFeeds =
	() => (firebaseApp.database().ref('/user/1/rss'));

export const viewed =
	() => (firebaseApp.database().ref('/user/1/viewed/jobs')) ;


export const categoryImages =
	(key) => (firebaseApp.database().ref(key+'/images')) ;


export default firebaseApp;
