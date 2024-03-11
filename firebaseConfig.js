import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'mangastack-d3e08.firebaseapp.com',
  projectId: 'mangastack-d3e08',
  storageBucket: 'mangastack-d3e08.appspot.com',
  messagingSenderId: '627701975786',
  appId: '1:627701975786:web:62a4fd1765c1b183172593',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
