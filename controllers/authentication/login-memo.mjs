import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required.",
      });
    }

    const usersCollection = collection(db, "users");
    const emailQuery = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(emailQuery);

    if (querySnapshot.empty) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    const userData = querySnapshot.docs[0].data();

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password.",
      });
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const accessToken = await user.getIdToken();

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
