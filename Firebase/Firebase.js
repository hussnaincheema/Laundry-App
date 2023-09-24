import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDm9FMRUmuDZuLycoiAgP1DmbwmEH3z4Wo",
  authDomain: "laundryapp-533b8.firebaseapp.com",
  projectId: "laundryapp-533b8",
  storageBucket: "laundryapp-533b8.appspot.com",
  messagingSenderId: "882704626308",
  appId: "1:882704626308:web:b8d92f62a52103578348d1"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth, db};