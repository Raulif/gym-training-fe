'use client'
import {useEffect, useState} from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import {getFirestore, type Firestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const useFirebase = () => {
  const [firebase, setFirebase] = useState<FirebaseApp>();
  const [db, setDb] = useState<Firestore>();
  useEffect(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDJI2QFYACzOVkB6B0kfmwqxg_YOTiuh_I",
      authDomain: "training-program-app-417e0.firebaseapp.com",
      projectId: "training-program-app-417e0",
      storageBucket: "training-program-app-417e0.appspot.com",
      messagingSenderId: "379695354629",
      appId: "1:379695354629:web:d410a20df2eea336795d6c"
    };
    
    if (!firebase) {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      setFirebase(app);
      setDb(db);
    }
  }, [firebase]);

  return {firebase, db};
}

export default useFirebase;