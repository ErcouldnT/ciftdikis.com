// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCS8xQBUiS6XpqqiG9nLm_wCQD58tOJrPo',
	authDomain: 'ciftdikis-c977d.firebaseapp.com',
	projectId: 'ciftdikis-c977d',
	storageBucket: 'ciftdikis-c977d.appspot.com',
	messagingSenderId: '510863319324',
	appId: '1:510863319324:web:6a70302a29e538229e9ad9',
	measurementId: 'G-GCE3B2F42M'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
