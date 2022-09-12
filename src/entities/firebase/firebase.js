
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHtkYP2I18woNeWYXuXmNG0IF4nPi3jiw",
    authDomain: "vxnnbuild.firebaseapp.com",
    projectId: "vxnnbuild",
    storageBucket: "vxnnbuild.appspot.com",
    messagingSenderId: "732784709940",
    appId: "1:732784709940:web:f33e8735adfbf45b59d561",
    measurementId: "G-971PZB0BZ5"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app