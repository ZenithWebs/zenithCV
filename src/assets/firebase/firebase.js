import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZTCp20ppYtGGVCzdsukDaxb94G5_LNys",
  authDomain: "zenithcv.firebaseapp.com",
  projectId: "zenithcv",
  storageBucket: "zenithcv.firebasestorage.app",
  messagingSenderId: "839173167397",
  appId: "1:839173167397:web:4aba8bd6fd31867049e2cc",
  measurementId: "G-40QDTJLENV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
