import { initializeApp } from "firebase/app";
import { getDatabase, ref, Unsubscribe } from "firebase/database"


const firebaseConfig = {
    apiKey: "AIzaSyBUOFCCC6S252u2_8BkFgVzDyIk9rhqcWM",
    authDomain: "list-personnale.firebaseapp.com",
    projectId: "list-personnale",
    storageBucket: "list-personnale.appspot.com",
    messagingSenderId: "1075466969080",
    appId: "1:1075466969080:web:d583c929253a7673f0000d"
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const workersRef = ref(db, "workers");

export const getWorkersRef = (id: string | number) => ref(db, `workers/${id}`);

