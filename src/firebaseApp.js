const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCvDXr7RL9ECPME3h3UZpC6uCcsYkqNlK0",
  authDomain: "actuamos-backend.firebaseapp.com",
  databaseURL: "https://actuamos-backend-default-rtdb.firebaseio.com",
  projectId: "actuamos-backend",
  storageBucket: "actuamos-backend.appspot.com",
  messagingSenderId: "393488095522",
  appId: "1:393488095522:web:858f9dd3e3e5eb14646d7b",
});

const db = firebase.firestore();
const auth = firebase.auth();
