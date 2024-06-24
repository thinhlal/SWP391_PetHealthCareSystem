// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwaM6DXLG6R-Y1mahsRC6_EK_I81h5oMk",
    authDomain: "pethealthcare-c3707.firebaseapp.com",
    projectId: "pethealthcare-c3707",
    storageBucket: "pethealthcare-c3707.appspot.com",
    messagingSenderId: "4554847512",
    appId: "1:4554847512:web:809bf0ae0bba7708e15a6d",
    measurementId: "G-YR1DQCKJKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);