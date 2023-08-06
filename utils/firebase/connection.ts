import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const config = {
	apiKey: "AIzaSyASR9DuSo1uV9kkQZAUgxn0gytyZw-jE_A",
	authDomain: "flashread-3eb1c.firebaseapp.com",
	projectId: 'cool',
	//projectId: "flashread-3eb1c",
	storageBucket: "flashread-3eb1c.appspot.com",
	messagingSenderId: "694506559599",
	appId: "1:694506559599:web:0c8d4f6643415bde05559a",
	measurementId: "G-VGNT230HVK"
};

const app = initializeApp(config);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(firestore, 'localhost', 8080);
connectStorageEmulator(storage, 'localhost', 9199);

export { auth, storage, firestore };
