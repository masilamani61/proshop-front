// Import the functions you need from the SDKs you need
import { initializeApp ,} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkT02geUOdExb4VExrpQmtuFkpAFIU0mo",
  authDomain: "e-commerse-53337.firebaseapp.com",
  projectId: "e-commerse-53337",
  storageBucket: "e-commerse-53337.appspot.com",
  messagingSenderId: "170186838962",
  appId: "1:170186838962:web:9dbe25a277868a29f58aab",
  measurementId: "G-8CZC71GCMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)