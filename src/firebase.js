import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmcPFRYRA4Muowhac0Btp6uyNrudGn154",
  authDomain: "todoreact-a6913.firebaseapp.com",
  projectId: "todoreact-a6913",
  storageBucket: "todoreact-a6913.appspot.com",
  messagingSenderId: "721862425828",
  appId: "1:721862425828:web:8f0fc72c449b83e99740f1",
  measurementId: "G-MGBZCZZKEB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
