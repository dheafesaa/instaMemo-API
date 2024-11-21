import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import bcrypt from "bcrypt";

const firebaseConfig = {
  apiKey: "AIzaSyCaCieh2J7pQWxNu7zSkPBX-tWSu868Fe4",
  authDomain: "instamemo-55140.firebaseapp.com",
  projectId: "instamemo-55140",
  storageBucket: "instamemo-55140.firebasestorage.app",
  messagingSenderId: "933546212819",
  appId: "1:933546212819:web:f4ee57b913f62db8700326",
  measurementId: "G-FTEYJCJ3C1",
};

const fireInit = initializeApp(firebaseConfig);
const db = getFirestore(fireInit);
const auth = getAuth(fireInit);

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Name, email, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 6 characters.",
      });
    }

    const usersCollection = collection(db, "users");
    const existingUserSnapshot = await getDocs(
      query(usersCollection, where("email", "==", email))
    );

    if (!existingUserSnapshot.empty) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists.",
      });
    }

    const counterRef = doc(db, "counters", "users_counter");
    const counterSnapshot = await getDoc(counterRef);

    let userId;
    if (counterSnapshot.exists()) {
      const currentCounter = counterSnapshot.data().value;
      userId = currentCounter + 1;

      await updateDoc(counterRef, { value: userId });
    } else {
      userId = 1;

      await setDoc(counterRef, { value: userId });
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: userId,
      name,
      email,
      firebaseUid: firebaseUser.uid, 
      password: hashedPassword, 
    };
    await setDoc(doc(usersCollection, String(userId)), newUser);

    return res.status(201).json({
      status: "success",
      message: "User Created",
    });
  } catch (error) {
    console.error("Error registering user:", error);

    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";

    return res.status(errorCode).json({
      status: "error",
      message: errorMessage,
    });
  }
};
