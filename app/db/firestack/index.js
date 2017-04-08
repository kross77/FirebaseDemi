import firebase from 'firebase';

// const firebaseConfig = {
// 	apiKey: "AIzaSyD28EphbGb2fj02EnVWBUy2U8xNDIDYZPg",
// 	authDomain: "liker-716a1.firebaseapp.com",
// 	databaseURL: "https://liker-716a1.firebaseio.com",
// 	storageBucket: "liker-716a1.appspot.com",
// 	messagingSenderId: "629288419467",
// };

const firebaseConfig = {
	apiKey: "AIzaSyDFpgk_iHq07O63X8XiHNP0U5voa17zdBA",
	authDomain: "upwork-notifications.firebaseapp.com",
	databaseURL: "https://upwork-notifications.firebaseio.com",
	storageBucket: "upwork-notifications.appspot.com",
	messagingSenderId: "611608259932"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const categories =
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