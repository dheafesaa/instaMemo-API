import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import argon2 from "argon2"; 
import { auth, db } from "../../config/firebase-app.mjs";

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

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const hashedPassword = await argon2.hash(password);

    const newUser = {
      name,
      email,
      firebaseUid: firebaseUser.uid,
      password: hashedPassword,
    };
    await setDoc(doc(usersCollection, firebaseUser.uid), newUser);

    return res.status(201).json({
      status: "success",
      message: "User Created",
    });
  } catch (error) {
    console.error("Error registering user:", error);

    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
