import { Router } from '~/components/router/Router';
// import { setupFirebase } from "~/lib/firebase";
import { useEffect } from 'react';
import { useSignIn, useSignOut } from '~/components/contexts/UserContext';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyD4WAnba7OhWEPPh5Qmva3Y-fcyGfjqnDk',
  authDomain: 'p-christine-choreography.firebaseapp.com',
  projectId: 'p-christine-choreography',
  storageBucket: 'p-christine-choreography. appspot.com',
  messagingSenderId: '892331630683',
  appId: '1:892331630683:web:43331f39b42584d36a1f7e',
  measurementId: 'G-FMTZ793KCQ',
  databaseURL: 'https://p-christine-choreography-default-rtdb.firebaseio.com/',
};

// Initialize Realtime Database and get a reference to the service

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database };
export const datab = getDatabase(app);
const auth = getAuth(app);
export { auth };
function Main() {
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();
  // useEffect(() => {
  //   setupFirebase();

  //   const auth = getAuth();

  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       signIn(user);
  //     } else {
  //       signOut();
  //     }
  //   });
  // }, []);
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  return (
    <main>
      <Router />
    </main>
  );
}

export default Main;
