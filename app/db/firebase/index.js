import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyD28EphbGb2fj02EnVWBUy2U8xNDIDYZPg",
	authDomain: "liker-716a1.firebaseapp.com",
	databaseURL: "https://liker-716a1.firebaseio.com",
	storageBucket: "liker-716a1.appspot.com",
	messagingSenderId: "629288419467",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const categories =
	() => (firebaseApp.database().ref());
export const categoryImages =
	(key) => (firebaseApp.database().ref(key+'/images')) ;


export default firebaseApp;